import { Button } from "@whop/react/components";
import { requireExperienceAccess } from "@/lib/auth";
import { db } from "@/lib/db";
import { whopsdk } from "@/lib/whop-sdk";
import Link from "next/link";
import { CopyVerificationLinkButton } from "./copy-link-button";

export default async function ExperiencePage({
	params,
}: {
	params: Promise<{ experienceId: string; restPath?: string[] }>;
}) {
	const { experienceId } = await params;
	const { userId } = await requireExperienceAccess(experienceId);

	// Get companyId from experience
	const experience = await whopsdk.experiences.retrieve(experienceId);
	const companyId = experience.company?.id;

	if (!companyId) {
		return (
			<div className="flex flex-col p-8 gap-4">
				<h1 className="text-9 font-bold">Error</h1>
				<p className="text-3 text-gray-10">Could not determine company.</p>
			</div>
		);
	}

	// Fetch user's certificates
	const certificates = await db.issuedCertificate.findMany({
		where: {
			companyId,
			userId,
			revokedAt: null,
		},
		orderBy: {
			issuedAt: "desc",
		},
	});

	return (
		<div className="flex flex-col p-8 gap-6">
			<div className="flex justify-between items-center">
				<h1 className="text-9 font-bold">My Certificates</h1>
			</div>

			<p className="text-3 text-gray-10">
				View and download your course completion certificates.
			</p>

			<div className="flex flex-col gap-4">
				{certificates.map((cert: any) => (
					<div
						key={cert.id}
						className="border border-gray-a4 rounded-lg p-6 bg-gray-a2"
					>
						<div className="flex items-start justify-between">
							<div className="flex-1">
								<h3 className="text-6 font-semibold">{cert.courseTitle}</h3>
								<p className="text-3 text-gray-10 mt-1">
									Issued on {new Date(cert.issuedAt).toLocaleDateString()}
								</p>
								<p className="text-2 text-gray-10 mt-1">
									Issued by {cert.issuerName}
								</p>
							</div>
							<div className="flex gap-2">
								{cert.pdfUrl ? (
									<a
										href={cert.pdfUrl}
										target="_blank"
										rel="noopener noreferrer"
									>
										<Button variant="classic" size="2">
											Download PDF
										</Button>
									</a>
								) : (
									<Link href={`/api/certificates/${cert.id}/download`}>
										<Button variant="classic" size="2">
											Download PDF
										</Button>
									</Link>
								)}
								<CopyVerificationLinkButton publicId={cert.publicId} />
							</div>
						</div>
					</div>
				))}
			</div>

			{certificates.length === 0 && (
				<div className="text-center py-12 text-gray-10">
					<p>You don't have any certificates yet.</p>
					<p className="text-2 mt-2">
						Complete courses to earn certificates automatically.
					</p>
				</div>
			)}
		</div>
	);
}

