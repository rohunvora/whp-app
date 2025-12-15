import { Button } from "@whop/react/components";
import { whopsdk } from "@/lib/whop-sdk";
import { requireCompanyAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import { CourseToggle } from "./course-toggle";

export default async function CoursesPage({
	params,
}: {
	params: Promise<{ companyId: string }>;
}) {
	const { companyId } = await params;
	await requireCompanyAdmin(companyId);

	// Fetch courses for this company
	const courses = await whopsdk.courses.list({ company_id: companyId });

	// Fetch course configs
	const courseConfigs = await db.courseConfig.findMany({
		where: { companyId },
		include: { template: true },
	});

	const configMap = new Map(
		courseConfigs.map((config: any) => [config.courseId, config]),
	);

	return (
		<div className="flex flex-col p-8 gap-6">
			<div className="flex justify-between items-center">
				<h1 className="text-9 font-bold">Course Certificates</h1>
			</div>

			<p className="text-3 text-gray-10">
				Enable certificate issuance for your courses. When students complete a
				course, they'll automatically receive a certificate.
			</p>

			<div className="flex flex-col gap-4">
				{courses.data?.map((course: any) => {
					const config = configMap.get(course.id) as any;
					return (
						<div
							key={course.id}
							className="border border-gray-a4 rounded-lg p-4 bg-gray-a2"
						>
							<div className="flex items-center justify-between">
								<div className="flex-1">
									<h3 className="text-6 font-semibold">{course.title}</h3>
									<p className="text-3 text-gray-10 mt-1">
										Course ID: {course.id}
									</p>
								</div>
								<CourseToggle
									companyId={companyId}
									courseId={course.id}
									enabled={config?.enabled ?? false}
									templateId={config?.templateId}
								/>
							</div>
						</div>
					);
				})}
			</div>

			{courses.data?.length === 0 && (
				<div className="text-center py-12 text-gray-10">
					<p>No courses found. Create a course in Whop first.</p>
				</div>
			)}
		</div>
	);
}

