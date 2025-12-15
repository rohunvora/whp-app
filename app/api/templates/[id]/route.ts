import { NextRequest, NextResponse } from "next/server";
import { requireCompanyAdmin } from "@/lib/auth";
import { db } from "@/lib/db";

export async function PUT(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const { id } = await params;
		const body = await request.json();
		const { companyId, name, logoUrl, backgroundUrl, primaryColor, titleText, signatureText, active } = body;

		// Verify admin access
		await requireCompanyAdmin(companyId);

		// Update template
		const template = await db.certificateTemplate.update({
			where: { id },
			data: {
				name,
				logoUrl,
				backgroundUrl,
				primaryColor,
				titleText,
				signatureText,
				active,
			},
		});

		return NextResponse.json(template);
	} catch (error) {
		console.error("[TEMPLATE UPDATE ERROR]", error);
		return NextResponse.json(
			{ error: "Failed to update template" },
			{ status: 500 },
		);
	}
}

