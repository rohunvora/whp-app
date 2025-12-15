import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { requireCompanyAdmin } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(
	request: NextRequest,
	{ params }: { params: Promise<{ courseId: string }> },
) {
	try {
		const { courseId } = await params;
		const body = await request.json();
		const { companyId, enabled } = body;

		// Verify admin access
		await requireCompanyAdmin(companyId);

		// Upsert course config
		await db.courseConfig.upsert({
			where: {
				companyId_courseId: {
					companyId,
					courseId,
				},
			},
			update: {
				enabled,
			},
			create: {
				companyId,
				courseId,
				enabled,
			},
		});

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("[TOGGLE ERROR]", error);
		return NextResponse.json(
			{ error: "Failed to toggle course" },
			{ status: 500 },
		);
	}
}

