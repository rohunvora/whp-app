import { requireCompanyAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import { TemplateEditor } from "../template-editor";
import { notFound } from "next/navigation";

export default async function EditTemplatePage({
	params,
}: {
	params: Promise<{ companyId: string; id: string }>;
}) {
	const { companyId, id } = await params;
	await requireCompanyAdmin(companyId);

	const template = await db.certificateTemplate.findFirst({
		where: {
			id,
			companyId,
		},
	});

	if (!template) {
		notFound();
	}

	return (
		<div className="flex flex-col p-8 gap-6">
			<h1 className="text-9 font-bold">Edit Template: {template.name}</h1>
			<TemplateEditor companyId={companyId} template={template} />
		</div>
	);
}

