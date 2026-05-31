import { PrismaClient } from "@prisma/client";

/**
 * Reuse a single PrismaClient across hot reloads (dev) and warm serverless invocations (prod).
 *
 * Vercel env (required):
 *   DATABASE_URL  → pooled URL (POSTGRES_PRISMA_URL) — used by the live app
 *   DIRECT_URL    → direct URL (POSTGRES_URL_NON_POOLING) — migrations/seed only
 *
 * Never put a prisma_migration or direct URL in DATABASE_URL.
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function assertPooledDatabaseUrl() {
  const url = process.env.DATABASE_URL ?? "";
  if (
    process.env.NODE_ENV === "production" &&
    (url.includes("prisma_migration") || url.includes("non_pooling"))
  ) {
    console.error(
      "[Prisma] DATABASE_URL looks like a migration/direct URL. Use the pooled URL (POSTGRES_PRISMA_URL) for DATABASE_URL and set DIRECT_URL to the direct URL."
    );
  }
}

function createPrismaClient() {
  assertPooledDatabaseUrl();
  return new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

globalForPrisma.prisma = prisma;
