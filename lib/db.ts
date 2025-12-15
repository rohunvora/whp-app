// Lazy-loaded Prisma client to avoid build errors
let _db: any = null;

const createPrismaClient = () => {
	// Dynamic import to avoid build-time errors
	const { PrismaClient } = require("@prisma/client");
	return new PrismaClient({
		log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
	});
};

const globalForPrisma = globalThis as unknown as {
	prisma: any | undefined;
};

export const db = new Proxy({} as any, {
	get(_, prop) {
		if (!_db) {
			if (!process.env.DATABASE_URL) {
				// Return a mock during build time
				return () => Promise.resolve(null);
			}
			_db = globalForPrisma.prisma ?? createPrismaClient();
			if (process.env.NODE_ENV !== "production") {
				globalForPrisma.prisma = _db;
			}
		}
		return _db[prop];
	},
});

