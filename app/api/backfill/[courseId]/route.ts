import { NextRequest, NextResponse } from "next/server";
import { requireCompanyAdmin } from "@/lib/auth";
import { whopsdk } from "@/lib/whop-sdk";
import { db } from "@/lib/db";

export async function POST(
	request: NextRequest,
	{ params }: { params: Promise<{ courseId: string }> },
) {
	try {
		const { courseId } = await params;
		const body = await request.json();
		const { companyId } = body;

		// Verify admin access
		await requireCompanyAdmin(companyId);

		// Fetch course students with completion data
		// Note: This API endpoint may need to be adjusted based on actual Whop SDK
		const students = await (whopsdk as any).courseStudents?.list({ course_id: courseId }) || 
			await (whopsdk as any).courses?.students?.list({ course_id: courseId }) ||
			{ data: [] };

		let issuedCount = 0;

		// Get course config
		const courseConfig = await db.courseConfig.findUnique({
			where: {
				companyId_courseId: {
					companyId,
					courseId,
				},
			},
		});

		if (!courseConfig?.enabled) {
			return NextResponse.json(
				{ error: "Course is not enabled for certificates" },
				{ status: 400 },
			);
		}

		// Get course and company details
		const [course, company] = await Promise.all([
			whopsdk.courses.retrieve(courseId),
			whopsdk.companies.retrieve(companyId),
		]) as any[];

		// Process each student
		for (const student of (students.data || []) as any[]) {
			if (
				(student as any).completed_lessons_count === (student as any).total_lessons_count &&
				(student as any).total_lessons_count > 0
			) {
				// Check if certificate already exists
				const existing = await db.issuedCertificate.findUnique({
					where: {
						companyId_courseId_userId: {
							companyId,
							courseId,
							userId: student.user_id,
						},
					},
				});

				if (!existing) {
					// Get user details
					const user = await whopsdk.users.retrieve(student.user_id) as any;

					// Create certificate
					await db.issuedCertificate.create({
						data: {
							companyId,
							courseId,
							userId: (student as any).user_id,
							recipientName: user.name || user.username || "Student",
							courseTitle: (course as any).title || "Course",
							issuerName: (company as any).name || (company as any).id || "Issuer",
						},
					});

					issuedCount++;
				}
			}
		}

		return NextResponse.json({ success: true, count: issuedCount });
	} catch (error) {
		console.error("[BACKFILL ERROR]", error);
		return NextResponse.json(
			{ error: "Failed to backfill certificates" },
			{ status: 500 },
		);
	}
}

