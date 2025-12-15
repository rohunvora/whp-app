"use client";

import { Button } from "@whop/react/components";
import { useState } from "react";

export function BackfillButton({
	companyId,
	courseId,
}: {
	companyId: string;
	courseId: string;
}) {
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState<{ success: boolean; count?: number; error?: string } | null>(null);

	const handleBackfill = async () => {
		setLoading(true);
		setResult(null);

		try {
			const response = await fetch(`/api/backfill/${courseId}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ companyId }),
			});

			const data = await response.json();
			if (response.ok) {
				setResult({ success: true, count: data.count });
			} else {
				setResult({ success: false, error: data.error || "Failed to backfill" });
			}
		} catch (error) {
			setResult({ success: false, error: "Network error" });
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex flex-col items-end gap-2">
			<Button
				variant="classic"
				size="2"
				onClick={handleBackfill}
				disabled={loading}
			>
				{loading ? "Processing..." : "Backfill"}
			</Button>
			{result && (
				<div className={`text-2 ${result.success ? "text-green-11" : "text-red-11"}`}>
					{result.success
						? `Issued ${result.count} certificates`
						: result.error}
				</div>
			)}
		</div>
	);
}

