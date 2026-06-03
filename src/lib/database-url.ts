/**
 * Normalise DATABASE_URL for serverless + poolers (Vercel, Prisma Postgres, Neon, Supabase).
 * Prevents "Timed out fetching a new connection from the connection pool".
 */
function appendParam(url: string, key: string, value: string): string {
  if (url.includes(`${key}=`)) return url;
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}${key}=${value}`;
}

export function getDatabaseUrl(): string {
  const url = process.env.DATABASE_URL;
  if (!url || url.startsWith("file:")) return url ?? "";

  let normalized = url;

  // One connection per serverless instance / dev worker — critical for small pools
  normalized = appendParam(normalized, "connection_limit", "1");
  normalized = appendParam(normalized, "pool_timeout", "30");

  // Transaction poolers (Prisma Postgres pooled, Neon pooler, Supabase 6543)
  if (
    normalized.includes("pooler") ||
    normalized.includes("pooled.") ||
    normalized.includes(":6543")
  ) {
    normalized = appendParam(normalized, "pgbouncer", "true");
  }

  return normalized;
}
