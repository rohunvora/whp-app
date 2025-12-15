import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { requireCompanyAdmin } from "@/lib/auth";
import { whopsdk } from "@/lib/whop-sdk";
import { db } from "@/lib/db";
import { generateCertificatePDF } from "@/lib/pdf-generator";

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const { id } = await params;

		// Get certificate
		const certificate = await db.issuedCertificate.findUnique({
			where: { id },
		});

		if (!certificate) {
			return NextResponse.json({ error: "Certificate not found" }, { status: 404 });
		}

		// Check if PDF already exists
		if (certificate.pdfUrl) {
			return NextResponse.redirect(certificate.pdfUrl);
		}

		// Verify user has access (they should own the certificate or be admin)
		const headersList = await headers();
		const token = headersList.get("x-whop-user-token");

		if (!token) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
		}

		try {
			const headersList = await headers();
			const { userId } = await whopsdk.verifyUserToken(headersList);

			// Check if user owns the certificate or is admin
			if (userId !== certificate.userId) {
				// Check if admin
				const access = await whopsdk.users.checkAccess(certificate.companyId, {
					id: userId,
				});
				if (access.access_level !== "admin") {
					return NextResponse.json(
						{ error: "Unauthorized" },
						{ status: 403 },
					);
				}
			}
		} catch {
			return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
		}

		// Generate PDF
		const pdfBuffer = await generateCertificatePDF(id);

		// For MVP, return PDF directly
		// In production, you'd upload to R2/S3 and store URL
		return new NextResponse(pdfBuffer as unknown as BodyInit, {
			headers: {
				"Content-Type": "application/pdf",
				"Content-Disposition": `attachment; filename="certificate-${certificate.publicId}.pdf"`,
			},
		});
	} catch (error) {
		console.error("[PDF DOWNLOAD ERROR]", error);
		return NextResponse.json(
			{ error: "Failed to generate PDF" },
			{ status: 500 },
		);
	}
}

