import Link from "next/link";

export default function LandingPage() {
	return (
		<div className="min-h-screen bg-stone-50 text-stone-900 overflow-hidden">
			{/* Subtle texture background */}
			<div className="fixed inset-0 overflow-hidden pointer-events-none opacity-30">
				<div className="absolute inset-0" style={{
					backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
				}} />
			</div>

			{/* Nav */}
			<nav className="relative z-10 flex items-center justify-between px-6 py-6 max-w-6xl mx-auto border-b border-stone-200">
				<div className="flex items-center gap-3">
					<div className="w-10 h-10 rounded border-2 border-stone-800 flex items-center justify-center bg-stone-100">
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-stone-800">
							<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
							<polyline points="22 4 12 14.01 9 11.01" />
						</svg>
					</div>
					<span className="font-bold text-xl tracking-tight text-stone-900">Certified</span>
				</div>
				<a 
					href="#waitlist" 
					className="text-sm text-stone-600 hover:text-stone-900 transition-colors font-medium"
				>
					Join waitlist →
				</a>
			</nav>

			{/* Hero */}
			<section className="relative z-10 px-6 pt-16 pb-24 max-w-6xl mx-auto">
				<div className="flex flex-col items-center text-center">
					{/* Badge */}
					<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stone-200 border border-stone-300 text-stone-700 text-xs font-semibold mb-8 uppercase tracking-wide">
						Built for Whop Courses
					</div>

					{/* Headline */}
					<h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.1] max-w-4xl text-stone-900">
						<span>The certificate feature</span>
						<br />
						<span className="text-stone-600">
							Whop forgot to build
						</span>
					</h1>

					{/* Subheadline */}
					<p className="mt-8 text-lg sm:text-xl text-stone-600 max-w-2xl leading-relaxed">
						Automatically issue branded completion certificates when students finish your courses. 
						<span className="text-stone-800 font-medium"> The #1 requested feature</span> in Courses app reviews.
					</p>

					{/* CTA */}
					<div className="mt-12 flex flex-col sm:flex-row gap-4">
						<a 
							href="#waitlist"
							className="px-8 py-4 bg-stone-900 text-stone-50 font-semibold rounded-lg hover:bg-stone-800 transition-colors text-center border-2 border-stone-900"
						>
							Get early access
						</a>
						<a 
							href="#how-it-works"
							className="px-8 py-4 bg-white border-2 border-stone-300 text-stone-700 font-medium rounded-lg hover:border-stone-400 transition-colors text-center"
						>
							See how it works
						</a>
					</div>

					{/* Social proof hint */}
					<p className="mt-10 text-sm text-stone-500">
						Join 50+ Whop creators on the waitlist
					</p>
				</div>
			</section>

			{/* Certificate Preview */}
			<section className="relative z-10 px-6 pb-32 max-w-5xl mx-auto">
				<div className="relative">
					{/* Certificate mockup */}
					<div className="relative bg-white border-2 border-stone-300 rounded-lg p-6 sm:p-8 shadow-lg">
						<div className="bg-white rounded border-2 border-stone-200 p-8 sm:p-12 text-stone-900 max-w-2xl mx-auto">
							{/* Certificate content */}
							<div className="text-center border-4 border-stone-300 p-8 sm:p-12">
								<div className="w-20 h-20 mx-auto mb-6 rounded-full border-4 border-stone-800 flex items-center justify-center bg-stone-100">
									<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-stone-800">
										<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
										<polyline points="22 4 12 14.01 9 11.01" />
									</svg>
								</div>
								<p className="text-xs uppercase tracking-[0.3em] text-stone-500 mb-6 font-semibold">Certificate of Completion</p>
								<h3 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-3">Alex Thompson</h3>
								<p className="text-stone-600 mb-6 text-lg">has successfully completed</p>
								<p className="text-xl sm:text-2xl font-bold text-stone-800 mb-8">Advanced Trading Masterclass</p>
								<div className="flex items-center justify-center gap-6 text-sm text-stone-500 border-t border-stone-200 pt-6">
									<span>December 15, 2024</span>
									<span className="w-1 h-1 rounded-full bg-stone-400" />
									<span>Verified ✓</span>
								</div>
							</div>
						</div>

						{/* Floating badges */}
						<div className="absolute -top-3 -right-3 px-3 py-1.5 bg-stone-900 text-stone-50 text-xs font-semibold rounded border-2 border-stone-800 shadow-md">
							Auto-generated
						</div>
						<div className="absolute -bottom-3 -left-3 px-3 py-1.5 bg-white border-2 border-stone-300 text-stone-700 text-xs font-medium rounded shadow-md">
							Shareable link included
						</div>
					</div>
				</div>
			</section>

			{/* Pain point */}
			<section className="relative z-10 px-6 pb-24 max-w-4xl mx-auto">
				<div className="bg-red-50 border-2 border-red-200 rounded-lg p-8">
					<div className="flex items-start gap-4">
						<div className="w-12 h-12 rounded-lg bg-red-100 border-2 border-red-300 flex items-center justify-center flex-shrink-0 text-2xl">
							😤
						</div>
						<div>
							<h3 className="text-lg font-bold text-red-900 mb-2">Sound familiar?</h3>
							<blockquote className="text-stone-700 italic border-l-4 border-red-400 pl-4 text-base leading-relaxed">
								"Great course app but no certificates? Really? My students keep asking for proof of completion. 
								Basic feature that should exist."
							</blockquote>
							<p className="mt-4 text-sm text-stone-600 font-medium">— Actual Whop Courses review</p>
						</div>
					</div>
				</div>
			</section>

			{/* Features */}
			<section id="how-it-works" className="relative z-10 px-6 pb-32 max-w-6xl mx-auto">
				<div className="text-center mb-16">
					<h2 className="text-3xl sm:text-4xl font-bold mb-4 text-stone-900">
						Everything you need. Nothing you don't.
					</h2>
					<p className="text-stone-600 text-lg">Set up once, certificates issue forever.</p>
				</div>

				<div className="grid md:grid-cols-3 gap-6">
					{/* Feature 1 */}
					<div className="bg-white border-2 border-stone-200 rounded-lg p-6 hover:border-stone-400 transition-colors">
						<div className="w-12 h-12 rounded-lg bg-stone-100 border-2 border-stone-300 flex items-center justify-center mb-4">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-stone-700">
								<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
							</svg>
						</div>
						<h3 className="text-lg font-bold mb-2 text-stone-900">Automatic issuance</h3>
						<p className="text-stone-600 text-sm leading-relaxed">
							Student finishes course → certificate appears. No manual work. Webhooks handle everything.
						</p>
					</div>

					{/* Feature 2 */}
					<div className="bg-white border-2 border-stone-200 rounded-lg p-6 hover:border-stone-400 transition-colors">
						<div className="w-12 h-12 rounded-lg bg-stone-100 border-2 border-stone-300 flex items-center justify-center mb-4">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-stone-700">
								<rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
								<circle cx="8.5" cy="8.5" r="1.5" />
								<polyline points="21 15 16 10 5 21" />
							</svg>
						</div>
						<h3 className="text-lg font-bold mb-2 text-stone-900">Your brand, your design</h3>
						<p className="text-stone-600 text-sm leading-relaxed">
							Upload logo, pick colors, add signature. Templates that match your brand in 2 minutes.
						</p>
					</div>

					{/* Feature 3 */}
					<div className="bg-white border-2 border-stone-200 rounded-lg p-6 hover:border-stone-400 transition-colors">
						<div className="w-12 h-12 rounded-lg bg-stone-100 border-2 border-stone-300 flex items-center justify-center mb-4">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-stone-700">
								<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
								<path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
							</svg>
						</div>
						<h3 className="text-lg font-bold mb-2 text-stone-900">Verification links</h3>
						<p className="text-stone-600 text-sm leading-relaxed">
							Public URLs students can share on LinkedIn. Employers verify instantly. Increases your course value.
						</p>
					</div>

					{/* Feature 4 */}
					<div className="bg-white border-2 border-stone-200 rounded-lg p-6 hover:border-stone-400 transition-colors">
						<div className="w-12 h-12 rounded-lg bg-stone-100 border-2 border-stone-300 flex items-center justify-center mb-4">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-stone-700">
								<polyline points="23 4 23 10 17 10" />
								<path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
							</svg>
						</div>
						<h3 className="text-lg font-bold mb-2 text-stone-900">Backfill existing</h3>
						<p className="text-stone-600 text-sm leading-relaxed">
							Students who completed before? One click to issue all missing certificates. Instant value.
						</p>
					</div>

					{/* Feature 5 */}
					<div className="bg-white border-2 border-stone-200 rounded-lg p-6 hover:border-stone-400 transition-colors">
						<div className="w-12 h-12 rounded-lg bg-stone-100 border-2 border-stone-300 flex items-center justify-center mb-4">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-stone-700">
								<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
								<polyline points="14 2 14 8 20 8" />
								<line x1="16" y1="13" x2="8" y2="13" />
								<line x1="16" y1="17" x2="8" y2="17" />
							</svg>
						</div>
						<h3 className="text-lg font-bold mb-2 text-stone-900">PDF downloads</h3>
						<p className="text-stone-600 text-sm leading-relaxed">
							Beautiful PDFs students can download, print, frame. Professional quality, automatic generation.
						</p>
					</div>

					{/* Feature 6 */}
					<div className="bg-white border-2 border-stone-200 rounded-lg p-6 hover:border-stone-400 transition-colors">
						<div className="w-12 h-12 rounded-lg bg-stone-100 border-2 border-stone-300 flex items-center justify-center mb-4">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-stone-700">
								<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
								<path d="M13.73 21a2 2 0 0 1-3.46 0" />
							</svg>
						</div>
						<h3 className="text-lg font-bold mb-2 text-stone-900">Push notifications</h3>
						<p className="text-stone-600 text-sm leading-relaxed">
							"Congrats! Your certificate is ready." Delightful moments that increase completion rates.
						</p>
					</div>
				</div>
			</section>

			{/* Pricing preview */}
			<section className="relative z-10 px-6 pb-32 max-w-4xl mx-auto">
				<div className="text-center mb-12">
					<h2 className="text-3xl sm:text-4xl font-bold mb-4 text-stone-900">Simple pricing</h2>
					<p className="text-stone-600 text-lg">Scales with your success</p>
				</div>

				<div className="bg-white border-2 border-stone-300 rounded-lg p-8 text-center shadow-lg">
					<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stone-100 border-2 border-stone-300 text-stone-700 text-xs font-bold mb-6 uppercase tracking-wide">
						Early adopter pricing
					</div>
					<div className="flex items-baseline justify-center gap-1 mb-2">
						<span className="text-5xl font-bold text-stone-900">$29</span>
						<span className="text-stone-600">/month</span>
					</div>
					<p className="text-stone-600 mb-8">Includes 100 certificates/month</p>
					
					<div className="flex flex-col sm:flex-row gap-4 justify-center text-sm text-stone-600">
						<span className="flex items-center gap-2">
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-stone-800">
								<polyline points="20 6 9 17 4 12" />
							</svg>
							Unlimited courses
						</span>
						<span className="flex items-center gap-2">
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-stone-800">
								<polyline points="20 6 9 17 4 12" />
							</svg>
							Unlimited templates
						</span>
						<span className="flex items-center gap-2">
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-stone-800">
								<polyline points="20 6 9 17 4 12" />
							</svg>
							Verification links
						</span>
					</div>
				</div>
			</section>

			{/* Waitlist */}
			<section id="waitlist" className="relative z-10 px-6 pb-32 max-w-2xl mx-auto">
				<div className="bg-stone-100 border-2 border-stone-300 rounded-lg p-8 sm:p-12 text-center">
					<h2 className="text-3xl font-bold mb-4 text-stone-900">Get early access</h2>
					<p className="text-stone-600 mb-8 text-lg">
						Be first to know when we launch. Early adopters get 50% off first 3 months.
					</p>
					
					<form 
						action="https://formspree.io/f/placeholder" 
						method="POST"
						className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
					>
						<input 
							type="email" 
							name="email"
							placeholder="your@email.com" 
							required
							className="flex-1 px-4 py-3 bg-white border-2 border-stone-300 rounded-lg text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-500 transition-colors"
						/>
						<button 
							type="submit"
							className="px-6 py-3 bg-stone-900 text-stone-50 font-semibold rounded-lg hover:bg-stone-800 transition-colors whitespace-nowrap border-2 border-stone-900"
						>
							Join waitlist
						</button>
					</form>

					<p className="mt-4 text-xs text-stone-500">No spam. Just launch updates.</p>
				</div>
			</section>

			{/* Footer */}
			<footer className="relative z-10 px-6 py-8 border-t-2 border-stone-200 bg-white">
				<div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
					<div className="flex items-center gap-3">
						<div className="w-8 h-8 rounded border-2 border-stone-800 flex items-center justify-center bg-stone-100">
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-stone-800">
								<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
								<polyline points="22 4 12 14.01 9 11.01" />
							</svg>
						</div>
						<span className="text-sm font-bold text-stone-900">Certified</span>
					</div>
					<p className="text-xs text-stone-600">
						Built for Whop. Not affiliated with Whop Inc.
					</p>
				</div>
			</footer>
		</div>
	);
}