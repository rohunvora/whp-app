import type { Metadata } from "next";
import { Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { WhopAppWrapper } from "./whop-wrapper";

const fraunces = Fraunces({
	variable: "--font-fraunces",
	subsets: ["latin"],
	weight: ["400", "500", "600", "700", "800", "900"],
});

const jetbrainsMono = JetBrains_Mono({
	variable: "--font-jetbrains",
	subsets: ["latin"],
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
			className={`${fraunces.variable} ${jetbrainsMono.variable} antialiased`}
			style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
		>
				<WhopAppWrapper>{children}</WhopAppWrapper>
			</body>
		</html>
	);
}
