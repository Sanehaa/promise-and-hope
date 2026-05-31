import { PrismaClient } from "@prisma/client";

/**
 * Reuse a single PrismaClient across hot reloads (dev) and warm serverless invocations (prod).
 * On Vercel, DATABASE_URL must be a *pooled* connection string — never the migration/direct URL.
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  return new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

globalForPrisma.prisma = prisma;
