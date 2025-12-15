"use client";

import { Button } from "@whop/react/components";
import { useState } from "react";

export function CopyVerificationLinkButton({ publicId }: { publicId: string }) {
	const [copied, setCopied] = useState(false);

	const handleCopy = async () => {
		const url = `${window.location.origin}/verify/${publicId}`;
		await navigator.clipboard.writeText(url);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<Button variant="soft" size="2" onClick={handleCopy}>
			{copied ? "Copied!" : "Copy Verification Link"}
		</Button>
	);
}

