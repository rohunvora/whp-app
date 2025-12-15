"use client";

import { Button } from "@whop/react/components";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Template {
	id: string;
	name: string;
	logoUrl?: string | null;
	backgroundUrl?: string | null;
	primaryColor: string;
	titleText: string;
	signatureText?: string | null;
	active: boolean;
}

export function TemplateEditor({
	companyId,
	template,
}: {
	companyId: string;
	template?: Template;
}) {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		name: template?.name || "",
		logoUrl: template?.logoUrl || "",
		backgroundUrl: template?.backgroundUrl || "",
		primaryColor: template?.primaryColor || "#000000",
		titleText: template?.titleText || "Certificate of Completion",
		signatureText: template?.signatureText || "",
		active: template?.active ?? true,
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			const url = template
				? `/api/templates/${template.id}`
				: "/api/templates";
			const method = template ? "PUT" : "POST";

			const response = await fetch(url, {
				method,
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					companyId,
					...formData,
				}),
			});

			if (response.ok) {
				router.push(`/dashboard/${companyId}/templates`);
				router.refresh();
			} else {
				console.error("Failed to save template");
			}
		} catch (error) {
			console.error("Error saving template:", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-6">
			<div className="border border-gray-a4 rounded-lg p-6 bg-gray-a2">
				<h2 className="text-6 font-semibold mb-4">Template Details</h2>

				<div className="flex flex-col gap-4">
					<div>
						<label className="block text-3 font-medium mb-2">Template Name</label>
						<input
							type="text"
							value={formData.name}
							onChange={(e) =>
								setFormData({ ...formData, name: e.target.value })
							}
							className="w-full px-3 py-2 border border-gray-a4 rounded-lg bg-white text-gray-12"
							required
						/>
					</div>

					<div>
						<label className="block text-3 font-medium mb-2">
							Certificate Title
						</label>
						<input
							type="text"
							value={formData.titleText}
							onChange={(e) =>
								setFormData({ ...formData, titleText: e.target.value })
							}
							className="w-full px-3 py-2 border border-gray-a4 rounded-lg bg-white text-gray-12"
							required
						/>
					</div>

					<div>
						<label className="block text-3 font-medium mb-2">
							Signature Text
						</label>
						<input
							type="text"
							value={formData.signatureText}
							onChange={(e) =>
								setFormData({ ...formData, signatureText: e.target.value })
							}
							className="w-full px-3 py-2 border border-gray-a4 rounded-lg bg-white text-gray-12"
							placeholder="e.g., Instructor Name"
						/>
					</div>

					<div>
						<label className="block text-3 font-medium mb-2">
							Primary Color
						</label>
						<input
							type="color"
							value={formData.primaryColor}
							onChange={(e) =>
								setFormData({ ...formData, primaryColor: e.target.value })
							}
							className="h-10 w-32 border border-gray-a4 rounded-lg"
						/>
					</div>

					<div>
						<label className="block text-3 font-medium mb-2">Logo URL</label>
						<input
							type="url"
							value={formData.logoUrl}
							onChange={(e) =>
								setFormData({ ...formData, logoUrl: e.target.value })
							}
							className="w-full px-3 py-2 border border-gray-a4 rounded-lg bg-white text-gray-12"
							placeholder="https://example.com/logo.png"
						/>
					</div>

					<div>
						<label className="block text-3 font-medium mb-2">
							Background Image URL
						</label>
						<input
							type="url"
							value={formData.backgroundUrl}
							onChange={(e) =>
								setFormData({ ...formData, backgroundUrl: e.target.value })
							}
							className="w-full px-3 py-2 border border-gray-a4 rounded-lg bg-white text-gray-12"
							placeholder="https://example.com/background.png"
						/>
					</div>

					<div className="flex items-center gap-2">
						<input
							type="checkbox"
							id="active"
							checked={formData.active}
							onChange={(e) =>
								setFormData({ ...formData, active: e.target.checked })
							}
							className="w-4 h-4"
						/>
						<label htmlFor="active" className="text-3">
							Active (can be used for certificates)
						</label>
					</div>
				</div>
			</div>

			<div className="flex gap-4">
				<Button type="submit" variant="classic" size="3" disabled={loading}>
					{loading ? "Saving..." : template ? "Update Template" : "Create Template"}
				</Button>
				<Button
					type="button"
					variant="soft"
					size="3"
					onClick={() => router.back()}
				>
					Cancel
				</Button>
			</div>
		</form>
	);
}

