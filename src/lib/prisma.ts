import { PrismaClient } from "@prisma/client";
import { getDatabaseUrl } from "@/lib/database-url";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function assertDatabaseEnv() {
  const url = process.env.DATABASE_URL ?? "";
  if (
    process.env.NODE_ENV === "production" &&
    (url.includes("prisma_migration") || url.includes("non_pooling"))
  ) {
    console.error(
      "[Prisma] DATABASE_URL must be the pooled URL (POSTGRES_PRISMA_URL), not the migration URL."
    );
  }
}

function createPrismaClient() {
  assertDatabaseEnv();
  const url = getDatabaseUrl();

  return new PrismaClient({
    datasources: url ? { db: { url } } : undefined,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

globalForPrisma.prisma = prisma;
