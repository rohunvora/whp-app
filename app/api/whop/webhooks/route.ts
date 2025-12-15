import { waitUntil } from "@vercel/functions";
import type { NextRequest } from "next/server";
import { whopsdk } from "@/lib/whop-sdk";
import { db } from "@/lib/db";

export async function POST(request: NextRequest): Promise<Response> {
	// Validate the webhook to ensure it's from Whop
	const requestBodyText = await request.text();
	const headers = Object.fromEntries(request.headers);
	const webhookData = whopsdk.webhooks.unwrap(requestBodyText, { headers });

	// Handle the webhook event asynchronously
	if (webhookData.type === "course_lesson_interaction.completed") {
		waitUntil(handleCourseLessonCompleted(webhookData.data));
	}

	// Return 200 quickly to prevent retries
	return new Response("OK", { status: 200 });
}

async function handleCourseLessonCompleted(data: any) {
	try {
		// Extract webhook message ID - check common field names
		const webhookMsgId = data.id || data.message_id || data.webhook_id || `webhook-${Date.now()}-${Math.random()}`;
		const { user_id, course_id, lesson_id, experience_id } = data;

		// Idempotency check
		const existing = await db.processedWebhook.findUnique({
			where: { webhookMsgId },
		});

		if (existing) {
			console.log(`[WEBHOOK] Already processed: ${webhookMsgId}`);
			return;
		}

		// Store webhook as processed
		await db.processedWebhook.create({
			data: { webhookMsgId },
		});

		// Fetch course details to get companyId
		const course = await whopsdk.courses.retrieve(course_id) as any;
		const companyId = (course as any).company_id || (course as any).companyId || (course as any).company?.id;

		// Upsert CourseCache
		await db.courseCache.upsert({
			where: { courseId: course_id },
			update: {
				title: course.title || "Untitled Course",
				sourceExperienceId: experience_id,
				updatedAt: new Date(),
			},
			create: {
				courseId: course_id,
				companyId,
				title: course.title || "Untitled Course",
				sourceExperienceId: experience_id,
			},
		});

		// Upsert CompletedLesson (unique constraint handles duplicates)
		await db.completedLesson.upsert({
			where: {
				courseId_userId_lessonId: {
					courseId: course_id,
					userId: user_id,
					lessonId: lesson_id,
				},
			},
			update: {},
			create: {
				courseId: course_id,
				userId: user_id,
				lessonId: lesson_id,
			},
		});

		// Get total lesson count (fetch if missing)
		let courseCache = await db.courseCache.findUnique({
			where: { courseId: course_id },
		});

		if (!courseCache?.totalLessonsCount) {
			const lessons = await whopsdk.courseLessons.list({ course_id });
			const totalLessonsCount = lessons.data?.length || 0;

			await db.courseCache.update({
				where: { courseId: course_id },
				data: { totalLessonsCount },
			});

			courseCache = await db.courseCache.findUnique({
				where: { courseId: course_id },
			});
		}

		// Count user's completed lessons
		const completedCount = await db.completedLesson.count({
			where: {
				courseId: course_id,
				userId: user_id,
			},
		});

		// Check if course is enabled for certificates
		const courseConfig = await db.courseConfig.findUnique({
			where: {
				companyId_courseId: {
					companyId,
					courseId: course_id,
				},
			},
		});

		// Issue certificate if completion criteria met
		if (
			courseConfig?.enabled &&
			courseCache?.totalLessonsCount &&
			completedCount >= courseCache.totalLessonsCount
		) {
			// Check if certificate already exists (unique constraint prevents duplicates)
			const existingCert = await db.issuedCertificate.findUnique({
				where: {
					companyId_courseId_userId: {
						companyId,
						courseId: course_id,
						userId: user_id,
					},
				},
			});

			if (!existingCert) {
				// Get user and company details for snapshots
				const [user, company] = await Promise.all([
					whopsdk.users.retrieve(user_id),
					whopsdk.companies.retrieve(companyId),
				]) as any[];

				// Create certificate record
				await db.issuedCertificate.create({
					data: {
						companyId,
						courseId: course_id,
						userId: user_id,
						recipientName: (user as any).name || (user as any).username || "Student",
						courseTitle: courseCache.title,
						issuerName: (company as any).name || (company as any).id || "Issuer",
					},
				});

				// Queue PDF generation (will be handled separately)
				console.log(`[CERTIFICATE] Issued for user ${user_id}, course ${course_id}`);

				// Optionally send notification (if experience is configured)
				// This would require checking CompanyConfig.defaultAppExperienceId
			}
		}
	} catch (error) {
		console.error("[WEBHOOK ERROR]", error);
		// Don't throw - we've already returned 200
	}
}

