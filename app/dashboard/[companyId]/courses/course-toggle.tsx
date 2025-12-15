"use client";

import { Button } from "@whop/react/components";
import { useState } from "react";

export function CourseToggle({
	companyId,
	courseId,
	enabled: initialEnabled,
	templateId,
}: {
	companyId: string;
	courseId: string;
	enabled: boolean;
	templateId?: string | null;
}) {
	const [enabled, setEnabled] = useState(initialEnabled);
	const [loading, setLoading] = useState(false);

	const handleToggle = async () => {
		setLoading(true);
		try {
			const response = await fetch(`/api/courses/${courseId}/toggle`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					companyId,
					courseId,
					enabled: !enabled,
				}),
			});

			if (response.ok) {
				setEnabled(!enabled);
			} else {
				console.error("Failed to toggle course");
			}
		} catch (error) {
			console.error("Error toggling course:", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex items-center gap-4">
			<Button
				variant={enabled ? "classic" : "soft"}
				size="2"
				onClick={handleToggle}
				disabled={loading}
			>
				{enabled ? "Enabled" : "Disabled"}
			</Button>
		</div>
	);
}

