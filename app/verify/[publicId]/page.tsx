import { db } from "@/lib/db";
import { notFound } from "next/navigation";

export default async function VerifyPage({
	params,
}: {
	params: Promise<{ publicId: string }>;
}) {
	const { publicId } = await params;

	const certificate = await db.issuedCertificate.findUnique({
		where: { publicId },
	});

	if (!certificate) {
		notFound();
	}

	const isValid = !certificate.revokedAt;

	return (
		<div className="flex flex-col items-center justify-center min-h-screen p-8">
			<div className="max-w-2xl w-full border border-gray-a4 rounded-lg p-8 bg-gray-a2">
				<div className="text-center mb-8">
					{isValid ? (
						<div className="inline-block px-4 py-2 bg-green-a3 text-green-11 rounded-lg text-5 font-semibold mb-4">
							✓ Valid Certificate
						</div>
					) : (
						<div className="inline-block px-4 py-2 bg-red-a3 text-red-11 rounded-lg text-5 font-semibold mb-4">
							✗ Certificate Revoked
						</div>
					)}
				</div>

				<div className="space-y-4">
					<div>
						<div className="text-2 text-gray-10">Recipient</div>
						<div className="text-6 font-semibold">{certificate.recipientName}</div>
					</div>

					<div>
						<div className="text-2 text-gray-10">Course</div>
						<div className="text-6 font-semibold">{certificate.courseTitle}</div>
					</div>

					<div>
						<div className="text-2 text-gray-10">Issued By</div>
						<div className="text-5">{certificate.issuerName}</div>
					</div>

					<div>
						<div className="text-2 text-gray-10">Issue Date</div>
						<div className="text-5">
							{new Date(certificate.issuedAt).toLocaleDateString("en-US", {
								year: "numeric",
								month: "long",
								day: "numeric",
							})}
						</div>
					</div>

					{certificate.revokedAt && (
						<div>
							<div className="text-2 text-gray-10">Revoked On</div>
							<div className="text-5">
								{new Date(certificate.revokedAt).toLocaleDateString("en-US", {
									year: "numeric",
									month: "long",
									day: "numeric",
								})}
							</div>
						</div>
					)}
				</div>

				<div className="mt-8 pt-6 border-t border-gray-a4 text-center">
					<p className="text-2 text-gray-10">
						This certificate was issued via Whop Certificates App
					</p>
				</div>
			</div>
		</div>
	);
}

