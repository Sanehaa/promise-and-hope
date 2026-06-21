import { NextResponse } from "next/server";
import { donationFormSchema } from "@/lib/validations";
import { prisma } from "@/lib/prisma";
import { getStripe, getSiteUrl, getStripeMode } from "@/lib/stripe";

function generateReference() {
  return `PH-${Date.now().toString(36).toUpperCase()}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = donationFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const cause = await prisma.donationCause.findUnique({
      where: { slug: data.cause },
    });

    if (!cause) {
      return NextResponse.json({ error: "Invalid donation cause" }, { status: 400 });
    }

    const reference = generateReference();
    const amountInPence = Math.round(data.amount * 100);

    if (amountInPence < 100) {
      return NextResponse.json({ error: "Minimum donation is £1" }, { status: 400 });
    }

    const donation = await prisma.donation.create({
      data: {
        reference,
        amount: data.amount,
        currency: "gbp",
        frequency: data.frequency,
        status: "pending",
        donorName: data.fullName,
        donorEmail: data.email,
        donorPhone: data.phone || null,
        donorAddress: data.address || null,
        message: data.message || null,
        anonymous: data.anonymous,
        giftAid: data.giftAid,
        causeId: cause.id,
        projectId: body.projectId || null,
      },
    });

    const stripeMode = getStripeMode();
    if (stripeMode === "test") {
      console.warn(
        "[Stripe Checkout] STRIPE_SECRET_KEY is sk_test_ on this server. Real cards will be declined."
      );
    }

    const stripe = getStripe();
    const siteUrl = getSiteUrl();
    const isMonthly = data.frequency === "monthly";

    const session = await stripe.checkout.sessions.create({
      mode: isMonthly ? "subscription" : "payment",
      customer_email: data.email,
      line_items: [
        {
          price_data: {
            currency: "gbp",
            unit_amount: amountInPence,
            ...(isMonthly
              ? { recurring: { interval: "month" as const } }
              : {}),
            product_data: {
              name: `Donation — ${cause.label}`,
              description: `Promise and Hope · Ref ${reference}`,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        donationId: donation.id,
        reference,
        causeSlug: cause.slug,
        giftAid: String(data.giftAid),
        anonymous: String(data.anonymous),
      },
      success_url: `${siteUrl}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/donate?cancelled=1`,
    });

    await prisma.donation.update({
      where: { id: donation.id },
      data: { stripeSessionId: session.id },
    });

    return NextResponse.json({
      url: session.url,
      reference,
      // Helps confirm test vs live if debugging (session.livemode matches secret key mode)
      stripeLiveMode: session.livemode,
    });
  } catch (error) {
    console.error("[Stripe Checkout]", error);
    const message =
      error instanceof Error && error.message.includes("STRIPE_SECRET_KEY")
        ? "Payment system is not configured. Please add Stripe keys to .env.local"
        : "Unable to start checkout";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
