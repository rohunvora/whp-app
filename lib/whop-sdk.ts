import { Whop } from "@whop/sdk";

// Lazy-load SDK to avoid build-time errors when env vars are missing
let _whopsdk: Whop | null = null;

export const getWhopSdk = () => {
	if (!_whopsdk) {
		_whopsdk = new Whop({
			appID: process.env.NEXT_PUBLIC_WHOP_APP_ID,
			apiKey: process.env.WHOP_API_KEY || "placeholder",
			webhookKey: btoa(process.env.WHOP_WEBHOOK_SECRET || ""),
		});
	}
	return _whopsdk;
};

// For backwards compatibility - will throw at runtime if env vars missing
export const whopsdk = new Proxy({} as Whop, {
	get(_, prop) {
		return getWhopSdk()[prop as keyof Whop];
	},
});
