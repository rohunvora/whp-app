export default function LandingPage() {
	return (
		<div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
			{/* Nav */}
			<nav className="flex items-center justify-between px-6 py-6 max-w-6xl mx-auto border-b border-[var(--border)]">
				<div className="flex items-center gap-3">
					<div className="w-8 h-8 border border-[var(--foreground)] flex items-center justify-center">
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
							<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
							<polyline points="22 4 12 14.01 9 11.01" />
						</svg>
					</div>
					<span className="font-semibold text-lg tracking-tight">Certified</span>
				</div>
				<a 
					href="#waitlist" 
					className="text-sm hover:opacity-70 transition-opacity"
				>
					Join waitlist →
				</a>
			</nav>

			{/* Hero - Grid based, asymmetric */}
			<section className="grid grid-cols-12 gap-6 px-6 py-16 md:py-24 max-w-6xl mx-auto">
				<div className="col-span-12 md:col-span-7 space-y-8">
					{/* Badge */}
					<div className="inline-block px-3 py-1 border border-[var(--border)] text-xs font-medium uppercase tracking-widest text-[var(--muted-foreground)]">
						Built for Whop Courses
					</div>

					{/* Headline */}
					<h1 className="text-[clamp(2.5rem,6vw,4rem)] font-bold tracking-tight leading-[0.95]">
						The certificate feature Whop forgot to build
					</h1>

					{/* Subheadline */}
					<p className="text-lg text-[var(--muted-foreground)] max-w-xl leading-relaxed">
						Automatically issue branded completion certificates when students finish your courses. The #1 requested feature in Courses app reviews.
					</p>

					{/* CTA */}
					<div className="flex flex-col sm:flex-row gap-3 pt-4">
						<a 
							href="#waitlist"
							className="px-6 py-3 bg-[var(--primary)] text-[var(--primary-foreground)] font-medium hover:opacity-90 transition-opacity text-center"
						>
							Get early access
						</a>
						<a 
							href="#how-it-works"
							className="px-6 py-3 border border-[var(--border)] text-[var(--foreground)] font-medium hover:bg-[var(--muted)] transition-colors text-center"
						>
							See how it works
						</a>
					</div>

					<p className="text-sm text-[var(--muted-foreground)]">
						Join 50+ Whop creators on the waitlist
					</p>
				</div>

				{/* Certificate Preview */}
				<div className="col-span-12 md:col-span-5">
					<div className="border border-[var(--border)] p-6 bg-[var(--muted)]">
						<div className="bg-white border border-[var(--border)] p-8 text-center">
							<div className="w-12 h-12 mx-auto mb-4 border-2 border-[var(--foreground)] flex items-center justify-center">
								<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
									<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
									<polyline points="22 4 12 14.01 9 11.01" />
								</svg>
							</div>
							<p className="text-xs uppercase tracking-[0.2em] text-[var(--muted-foreground)] mb-3">Certificate of Completion</p>
							<h3 className="text-xl font-bold mb-1">Alex Thompson</h3>
							<p className="text-sm text-[var(--muted-foreground)] mb-3">has successfully completed</p>
							<p className="text-base font-semibold mb-4">Advanced Trading Masterclass</p>
							<div className="flex items-center justify-center gap-4 text-xs text-[var(--muted-foreground)] border-t border-[var(--border)] pt-4">
								<span>December 15, 2024</span>
								<span>•</span>
								<span>Verified ✓</span>
							</div>
						</div>
						<div className="flex justify-between mt-4 text-xs text-[var(--muted-foreground)]">
							<span>↑ Auto-generated</span>
							<span>Shareable link included →</span>
						</div>
					</div>
				</div>
			</section>

			{/* Pain point */}
			<section className="px-6 py-12 max-w-6xl mx-auto border-t border-[var(--border)]">
				<div className="grid grid-cols-12 gap-6">
					<div className="col-span-12 md:col-span-8 md:col-start-3">
						<div className="border-l-2 border-[var(--foreground)] pl-6">
							<p className="text-lg italic text-[var(--foreground)] mb-4">
								"Great course app but no certificates? Really? My students keep asking for proof of completion. Basic feature that should exist."
							</p>
							<p className="text-sm text-[var(--muted-foreground)]">— Actual Whop Courses review</p>
						</div>
					</div>
				</div>
			</section>

			{/* Features */}
			<section id="how-it-works" className="px-6 py-16 max-w-6xl mx-auto border-t border-[var(--border)]">
				<div className="grid grid-cols-12 gap-6 mb-12">
					<div className="col-span-12 md:col-span-6">
						<h2 className="text-3xl font-bold tracking-tight">
							Everything you need.<br />Nothing you don't.
						</h2>
					</div>
					<div className="col-span-12 md:col-span-6 flex items-end">
						<p className="text-[var(--muted-foreground)]">Set up once, certificates issue forever.</p>
					</div>
				</div>

				<div className="grid grid-cols-12 gap-px bg-[var(--border)]">
					{/* Feature 1 */}
					<div className="col-span-12 md:col-span-4 bg-[var(--background)] p-6">
						<div className="text-2xl mb-4">⚡</div>
						<h3 className="text-base font-semibold mb-2">Automatic issuance</h3>
						<p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
							Student finishes course → certificate appears. No manual work.
						</p>
					</div>

					{/* Feature 2 */}
					<div className="col-span-12 md:col-span-4 bg-[var(--background)] p-6">
						<div className="text-2xl mb-4">🎨</div>
						<h3 className="text-base font-semibold mb-2">Your brand, your design</h3>
						<p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
							Upload logo, pick colors, add signature. Templates in 2 minutes.
						</p>
					</div>

					{/* Feature 3 */}
					<div className="col-span-12 md:col-span-4 bg-[var(--background)] p-6">
						<div className="text-2xl mb-4">🔗</div>
						<h3 className="text-base font-semibold mb-2">Verification links</h3>
						<p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
							Public URLs for LinkedIn. Employers verify instantly.
						</p>
					</div>

					{/* Feature 4 */}
					<div className="col-span-12 md:col-span-4 bg-[var(--background)] p-6">
						<div className="text-2xl mb-4">↻</div>
						<h3 className="text-base font-semibold mb-2">Backfill existing</h3>
						<p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
							One click to issue all missing certificates. Instant value.
						</p>
					</div>

					{/* Feature 5 */}
					<div className="col-span-12 md:col-span-4 bg-[var(--background)] p-6">
						<div className="text-2xl mb-4">📄</div>
						<h3 className="text-base font-semibold mb-2">PDF downloads</h3>
						<p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
							Beautiful PDFs students can download, print, frame.
						</p>
					</div>

					{/* Feature 6 */}
					<div className="col-span-12 md:col-span-4 bg-[var(--background)] p-6">
						<div className="text-2xl mb-4">🔔</div>
						<h3 className="text-base font-semibold mb-2">Push notifications</h3>
						<p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
							"Your certificate is ready." Delightful completion moments.
						</p>
					</div>
				</div>
			</section>

			{/* Pricing */}
			<section className="px-6 py-16 max-w-6xl mx-auto border-t border-[var(--border)]">
				<div className="grid grid-cols-12 gap-6">
					<div className="col-span-12 md:col-span-4">
						<h2 className="text-3xl font-bold tracking-tight mb-2">Simple pricing</h2>
						<p className="text-[var(--muted-foreground)]">Scales with your success</p>
					</div>
					<div className="col-span-12 md:col-span-8">
						<div className="border border-[var(--border)] p-8">
							<div className="inline-block px-3 py-1 border border-[var(--border)] text-xs font-medium uppercase tracking-widest text-[var(--muted-foreground)] mb-6">
								Early adopter pricing
							</div>
							<div className="flex items-baseline gap-1 mb-2">
								<span className="text-5xl font-bold">$29</span>
								<span className="text-[var(--muted-foreground)]">/month</span>
							</div>
							<p className="text-[var(--muted-foreground)] mb-6">Includes 100 certificates/month</p>
							
							<div className="flex flex-wrap gap-6 text-sm text-[var(--muted-foreground)] border-t border-[var(--border)] pt-6">
								<span className="flex items-center gap-2">
									<span>✓</span> Unlimited courses
								</span>
								<span className="flex items-center gap-2">
									<span>✓</span> Unlimited templates
								</span>
								<span className="flex items-center gap-2">
									<span>✓</span> Verification links
								</span>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Waitlist */}
			<section id="waitlist" className="px-6 py-16 max-w-6xl mx-auto border-t border-[var(--border)]">
				<div className="grid grid-cols-12 gap-6">
					<div className="col-span-12 md:col-span-6">
						<h2 className="text-3xl font-bold tracking-tight mb-4">Get early access</h2>
						<p className="text-[var(--muted-foreground)]">
							Be first to know when we launch. Early adopters get 50% off first 3 months.
						</p>
					</div>
					<div className="col-span-12 md:col-span-6">
						<form 
							action="https://formspree.io/f/placeholder" 
							method="POST"
							className="flex flex-col sm:flex-row gap-3"
						>
							<input 
								type="email" 
								name="email"
								placeholder="your@email.com" 
								required
								className="flex-1 px-4 py-3 bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:border-[var(--foreground)] transition-colors"
							/>
							<button 
								type="submit"
								className="px-6 py-3 bg-[var(--primary)] text-[var(--primary-foreground)] font-medium hover:opacity-90 transition-opacity whitespace-nowrap"
							>
								Join waitlist
							</button>
						</form>
						<p className="mt-3 text-xs text-[var(--muted-foreground)]">No spam. Just launch updates.</p>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="px-6 py-8 border-t border-[var(--border)]">
				<div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
					<div className="flex items-center gap-2">
						<div className="w-6 h-6 border border-[var(--foreground)] flex items-center justify-center">
							<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
								<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
								<polyline points="22 4 12 14.01 9 11.01" />
							</svg>
						</div>
						<span className="text-sm font-medium">Certified</span>
					</div>
					<p className="text-xs text-[var(--muted-foreground)]">
						Built for Whop. Not affiliated with Whop Inc.
					</p>
				</div>
			</footer>
		</div>
	);
}