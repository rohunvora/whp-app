"use client";

import { WhopApp } from "@whop/react/components";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

// Pages that don't need Whop SDK (public pages)
const PUBLIC_PATHS = ["/", "/verify", "/discover"];

export function WhopAppWrapper({ children }: { children: ReactNode }) {
	const pathname = usePathname();
	
	// Check if current path is a public page
	const isPublicPage = PUBLIC_PATHS.some(
		(path) => pathname === path || pathname.startsWith("/verify/")
	);

	// Skip WhopApp wrapper for public pages
	if (isPublicPage || !process.env.NEXT_PUBLIC_WHOP_APP_ID) {
		return <>{children}</>;
	}

	return <WhopApp>{children}</WhopApp>;
}

