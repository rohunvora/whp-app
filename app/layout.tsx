import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { WhopAppWrapper } from "./whop-wrapper";

// Using Inter as Mona Sans alternative (Swiss Precision kit)
// Note: Mona Sans is GitHub's proprietary font, not on Google Fonts
const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
	weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
	title: "Certified — Auto-issue certificates for Whop Courses",
	description: "The #1 missing feature from Whop Courses. Automatically issue branded completion certificates when students finish your courses.",
	openGraph: {
		title: "Certified — Auto-issue certificates for Whop Courses",
		description: "The #1 missing feature from Whop Courses. Automatically issue branded completion certificates.",
		type: "website",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
		<body
			className={`${inter.variable} antialiased`}
			style={{ fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, sans-serif" }}
		>
				<WhopAppWrapper>{children}</WhopAppWrapper>
			</body>
		</html>
	);
}
