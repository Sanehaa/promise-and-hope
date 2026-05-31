import type Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";

function paymentIntentId(session: Stripe.Checkout.Session): string | null {
  if (typeof session.payment_intent === "string") return session.payment_intent;
  return session.payment_intent?.id ?? null;
}

function isCheckoutSessionPaid(session: Stripe.Checkout.Session): boolean {
  return session.status === "complete" && session.payment_status === "paid";
}

/**
 * Mark a donation completed when Stripe confirms checkout succeeded.
 * Safe to call from webhook and success page (idempotent).
 */
export async function completeDonationFromCheckoutSession(
  session: Stripe.Checkout.Session
) {
  const donationId = session.metadata?.donationId;
  if (!donationId || !isCheckoutSessionPaid(session)) {
    return null;
  }

  const existing = await prisma.donation.findUnique({
    where: { id: donationId },
    include: { project: true, cause: true },
  });

  if (!existing) return null;

  if (existing.status === "completed") {
    return existing;
  }

  const donation = await prisma.donation.update({
    where: { id: donationId },
    data: {
      status: "completed",
      stripePaymentIntentId: paymentIntentId(session),
      completedAt: new Date(),
    },
    include: { project: true, cause: true },
  });

  if (donation.projectId && donation.project) {
    await prisma.project.update({
      where: { id: donation.projectId },
      data: {
        raisedAmount: donation.project.raisedAmount + donation.amount,
      },
    });
  }

  return donation;
}

/** Load donation for success page — syncs with Stripe if still pending. */
export async function resolveDonationForSuccessPage(sessionId: string) {
  const stripe = getStripe();

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const completed = await completeDonationFromCheckoutSession(session);
    if (completed) return completed;
  } catch (error) {
    console.error("[Donation success] Stripe session retrieve failed", error);
  }

  return prisma.donation.findUnique({
    where: { stripeSessionId: sessionId },
    include: { cause: true, project: true },
  });
}
