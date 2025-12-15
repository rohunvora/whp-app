import { NextRequest, NextResponse } from "next/server";
import { requireCompanyAdmin } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { companyId, name, logoUrl, backgroundUrl, primaryColor, titleText, signatureText, active } = body;

		// Verify admin access
		await requireCompanyAdmin(companyId);

		// Create template
		const template = await db.certificateTemplate.create({
			data: {
				companyId,
				name,
				logoUrl,
				backgroundUrl,
				primaryColor,
				titleText,
				signatureText,
				active: active ?? true,
			},
		});

		return NextResponse.json(template);
	} catch (error) {
		console.error("[TEMPLATE CREATE ERROR]", error);
		return NextResponse.json(
			{ error: "Failed to create template" },
			{ status: 500 },
		);
	}
}

