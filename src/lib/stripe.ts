import Stripe from "stripe";

let stripe: Stripe | null = null;

export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  console.log("STRIPE KEY PREFIX:", key?.slice(0, 8));

  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }

  if (!stripe) {
    stripe = new Stripe(key);
  }

  return stripe;
}

export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:5555";
}
