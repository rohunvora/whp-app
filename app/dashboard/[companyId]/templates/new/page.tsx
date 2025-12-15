import { requireCompanyAdmin } from "@/lib/auth";
import { TemplateEditor } from "../template-editor";

export default async function NewTemplatePage({
	params,
}: {
	params: Promise<{ companyId: string }>;
}) {
	const { companyId } = await params;
	await requireCompanyAdmin(companyId);

	return (
		<div className="flex flex-col p-8 gap-6">
			<h1 className="text-9 font-bold">Create Certificate Template</h1>
			<TemplateEditor companyId={companyId} />
		</div>
	);
}

