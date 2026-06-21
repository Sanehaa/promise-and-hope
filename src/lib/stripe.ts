import Stripe from "stripe";

let stripe: Stripe | null = null;
let cachedKey: string | null = null;

export function getStripeSecretKey(): string | undefined {
  return process.env.STRIPE_SECRET_KEY;
}

export function getStripeMode(): "live" | "test" | "missing" | "invalid" {
  const key = getStripeSecretKey();
  if (!key) return "missing";
  if (key.startsWith("sk_live_")) return "live";
  if (key.startsWith("sk_test_")) return "test";
  return "invalid";
}

export function getStripe(): Stripe {
  const key = getStripeSecretKey();

  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }

  if (!key.startsWith("sk_live_") && !key.startsWith("sk_test_")) {
    throw new Error("STRIPE_SECRET_KEY must start with sk_live_ or sk_test_");
  }

  if (stripe && cachedKey === key) {
    return stripe;
  }

  stripe = new Stripe(key);
  cachedKey = key;
  return stripe;
}

export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001";
}
