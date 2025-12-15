import { Button } from "@whop/react/components";
import Link from "next/link";
import { requireCompanyAdmin } from "@/lib/auth";
import { db } from "@/lib/db";

export default async function TemplatesPage({
	params,
}: {
	params: Promise<{ companyId: string }>;
}) {
	const { companyId } = await params;
	await requireCompanyAdmin(companyId);

	const templates = await db.certificateTemplate.findMany({
		where: { companyId },
		orderBy: { createdAt: "desc" },
	});

	return (
		<div className="flex flex-col p-8 gap-6">
			<div className="flex justify-between items-center">
				<h1 className="text-9 font-bold">Certificate Templates</h1>
				<Link href={`/dashboard/${companyId}/templates/new`}>
					<Button variant="classic" size="3">
						Create Template
					</Button>
				</Link>
			</div>

			<p className="text-3 text-gray-10">
				Design certificate templates that will be issued to students upon course
				completion.
			</p>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{templates.map((template: any) => (
					<Link
						key={template.id}
						href={`/dashboard/${companyId}/templates/${template.id}`}
					>
						<div className="border border-gray-a4 rounded-lg p-4 bg-gray-a2 hover:bg-gray-a3 transition-colors">
							<div className="flex items-center justify-between mb-2">
								<h3 className="text-5 font-semibold">{template.name}</h3>
								{template.active ? (
									<span className="text-2 px-2 py-1 bg-green-a3 text-green-11 rounded">
										Active
									</span>
								) : (
									<span className="text-2 px-2 py-1 bg-gray-a4 text-gray-10 rounded">
										Inactive
									</span>
								)}
							</div>
							<p className="text-3 text-gray-10">
								Title: {template.titleText}
							</p>
							{template.signatureText && (
								<p className="text-2 text-gray-10 mt-1">
									Signature: {template.signatureText}
								</p>
							)}
						</div>
					</Link>
				))}
			</div>

			{templates.length === 0 && (
				<div className="text-center py-12 text-gray-10">
					<p>No templates yet. Create your first template to get started.</p>
					<Link href={`/dashboard/${companyId}/templates/new`}>
						<Button variant="classic" size="3" className="mt-4">
							Create Template
						</Button>
					</Link>
				</div>
			)}
		</div>
	);
}

