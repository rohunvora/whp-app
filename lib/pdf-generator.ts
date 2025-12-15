import { db } from "./db";

export async function generateCertificatePDF(certificateId: string): Promise<Buffer> {
	const certificate = await db.issuedCertificate.findUnique({
		where: { id: certificateId },
	});

	if (!certificate) {
		throw new Error("Certificate not found");
	}

	// Get course config to find template
	const courseConfig = await db.courseConfig.findUnique({
		where: {
			companyId_courseId: {
				companyId: certificate.companyId,
				courseId: certificate.courseId,
			},
		},
		include: { template: true },
	});

	const template = courseConfig?.template || {
		primaryColor: "#000000",
		titleText: "Certificate of Completion",
		signatureText: null,
		logoUrl: null,
		backgroundUrl: null,
	};

	// Generate HTML for certificate
	const html = generateCertificateHTML(certificate, template);

	// For production PDF generation, use an external PDF service
	// or set up Playwright separately. For now, return HTML.
	// 
	// To enable Playwright PDF generation:
	// 1. Install playwright: pnpm add playwright
	// 2. Uncomment the code below
	// 
	// try {
	//   const { chromium } = require('playwright');
	//   const browser = await chromium.launch();
	//   const page = await browser.newPage();
	//   await page.setContent(html, { waitUntil: 'networkidle' });
	//   const pdf = await page.pdf({ format: 'A4', landscape: true, printBackground: true });
	//   await browser.close();
	//   return Buffer.from(pdf);
	// } catch (error) {
	//   console.error('PDF generation failed:', error);
	// }

	// Return HTML as buffer (can be rendered as preview)
	return Buffer.from(html, "utf-8");
}

function generateCertificateHTML(certificate: any, template: any): string {
	return `
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<style>
		@page {
			size: A4 landscape;
			margin: 0;
		}
		body {
			margin: 0;
			padding: 60px;
			font-family: 'Georgia', serif;
			background: ${template.backgroundUrl ? `url('${template.backgroundUrl}')` : '#ffffff'};
			background-size: cover;
			background-position: center;
			min-height: 100vh;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
		}
		.certificate-container {
			width: 100%;
			max-width: 900px;
			text-align: center;
			border: 8px solid ${template.primaryColor};
			padding: 60px 40px;
			background: rgba(255, 255, 255, 0.95);
			box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
		}
		.logo {
			max-width: 150px;
			margin-bottom: 30px;
		}
		.title {
			font-size: 48px;
			font-weight: bold;
			color: ${template.primaryColor};
			margin-bottom: 20px;
			text-transform: uppercase;
			letter-spacing: 3px;
		}
		.subtitle {
			font-size: 24px;
			color: #666;
			margin-bottom: 40px;
		}
		.recipient-name {
			font-size: 42px;
			font-weight: bold;
			color: #333;
			margin: 30px 0;
			font-style: italic;
		}
		.course-name {
			font-size: 28px;
			color: #555;
			margin: 20px 0;
		}
		.date {
			font-size: 18px;
			color: #777;
			margin-top: 50px;
		}
		.signature {
			margin-top: 60px;
			padding-top: 40px;
			border-top: 2px solid ${template.primaryColor};
		}
		.signature-text {
			font-size: 20px;
			color: #333;
			margin-top: 20px;
		}
	</style>
</head>
<body>
	<div class="certificate-container">
		${template.logoUrl ? `<img src="${template.logoUrl}" alt="Logo" class="logo" />` : ""}
		<div class="title">${template.titleText}</div>
		<div class="subtitle">This is to certify that</div>
		<div class="recipient-name">${certificate.recipientName}</div>
		<div class="subtitle">has successfully completed</div>
		<div class="course-name">${certificate.courseTitle}</div>
		<div class="date">
			Issued on ${new Date(certificate.issuedAt).toLocaleDateString("en-US", {
				year: "numeric",
				month: "long",
				day: "numeric",
			})}
		</div>
		${template.signatureText ? `
		<div class="signature">
			<div class="signature-text">${template.signatureText}</div>
		</div>
		` : ""}
	</div>
</body>
</html>
	`;
}
