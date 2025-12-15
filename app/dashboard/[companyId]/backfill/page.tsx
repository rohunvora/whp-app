import { Button } from "@whop/react/components";
import { requireCompanyAdmin } from "@/lib/auth";
import { whopsdk } from "@/lib/whop-sdk";
import { db } from "@/lib/db";
import { BackfillButton } from "./backfill-button";

export default async function BackfillPage({
	params,
}: {
	params: Promise<{ companyId: string }>;
}) {
	const { companyId } = await params;
	await requireCompanyAdmin(companyId);

	// Fetch enabled courses
	const courseConfigs = await db.courseConfig.findMany({
		where: { companyId, enabled: true },
		include: { template: true },
	});

	// Fetch course details
	const courses = await Promise.all(
		courseConfigs.map(async (config: any) => {
			try {
				const course = await whopsdk.courses.retrieve(config.courseId);
				return { config, course };
			} catch (error) {
				console.error(`Failed to fetch course ${config.courseId}:`, error);
				return null;
			}
		}),
	);

	const validCourses = courses.filter((c: any) => c !== null) as Array<{
		config: any;
		course: any;
	}>;

	return (
		<div className="flex flex-col p-8 gap-6">
			<div className="flex justify-between items-center">
				<div>
					<h1 className="text-9 font-bold">Backfill Certificates</h1>
					<p className="text-3 text-gray-10 mt-2">
						Issue certificates to students who already completed courses before
						the app was installed.
					</p>
				</div>
			</div>

			<div className="flex flex-col gap-4">
				{validCourses.map(({ config, course }) => (
					<div
						key={config.courseId}
						className="border border-gray-a4 rounded-lg p-4 bg-gray-a2"
					>
						<div className="flex items-center justify-between">
							<div className="flex-1">
								<h3 className="text-6 font-semibold">{course.title}</h3>
								<p className="text-3 text-gray-10 mt-1">
									Course ID: {config.courseId}
								</p>
								{config.template && (
									<p className="text-2 text-gray-10 mt-1">
										Template: {config.template.name}
									</p>
								)}
							</div>
							<BackfillButton
								companyId={companyId}
								courseId={config.courseId}
							/>
						</div>
					</div>
				))}
			</div>

			{validCourses.length === 0 && (
				<div className="text-center py-12 text-gray-10">
					<p>No enabled courses found. Enable courses first to backfill certificates.</p>
				</div>
			)}
		</div>
	);
}

