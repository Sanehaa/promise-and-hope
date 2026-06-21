import { NextResponse } from "next/server";
import { getStripeMode, getSiteUrl } from "@/lib/stripe";

/**
 * Check which Stripe mode the *deployed server* is using.
 * Local .env does NOT affect Vercel — only Vercel → Settings → Environment Variables.
 *
 * Visit: /api/stripe/status on your live site after deploy.
 */
export async function GET() {
  const mode = getStripeMode();

  return NextResponse.json({
    stripeMode: mode,
    siteUrl: getSiteUrl(),
    message:
      mode === "live"
        ? "Server is using LIVE Stripe keys — real cards work."
        : mode === "test"
          ? "Server is using TEST Stripe keys — only test cards (4242...) work. Update STRIPE_SECRET_KEY in Vercel to sk_live_ and redeploy."
          : "STRIPE_SECRET_KEY is missing or invalid on this server.",
  });
}
