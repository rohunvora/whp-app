import { headers } from "next/headers";
import { whopsdk } from "./whop-sdk";

export async function requireCompanyAdmin(companyId: string) {
	const headersList = await headers();
	const { userId } = await whopsdk.verifyUserToken(headersList);
	const access = await whopsdk.users.checkAccess(companyId, { id: userId });

	if (access.access_level !== "admin") {
		throw new Error("Admin access required");
	}

	return { userId, access };
}

export async function requireExperienceAccess(experienceId: string) {
	const headersList = await headers();
	const { userId } = await whopsdk.verifyUserToken(headersList);
	const access = await whopsdk.users.checkAccess(experienceId, { id: userId });

	if (!access.has_access) {
		throw new Error("Access denied");
	}

	return { userId, access };
}

