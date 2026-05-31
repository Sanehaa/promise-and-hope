import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { getPageHero } from "@/lib/queries";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy",
  description: "Privacy Policy for Promise and Hope.",
  path: "/privacy-policy",
});

export default async function PrivacyPolicyPage() {
  const hero = await getPageHero("privacy-policy");

  return (
    <>
      <PageHero
        title={hero?.title ?? "Privacy Policy"}
        description={hero?.description ?? ""}
        image={hero?.imageUrl ?? "/images/hero/about-hero.jpg"}
        imageAlt={hero?.imageAlt ?? "Privacy policy"}
      />
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-muted-foreground text-sm mb-8">Last updated: May 2026</p>
          <h2 className="font-heading text-2xl font-semibold mt-8 mb-4">Introduction</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Promise and Hope is committed to protecting your privacy. This policy explains how we
            collect, use, and safeguard your personal information.
          </p>
          <h2 className="font-heading text-2xl font-semibold mt-8 mb-4">Payments</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Donations are processed securely through Stripe. We do not store card details on our
            servers. Stripe&apos;s privacy policy applies to payment data.
          </p>
          <h2 className="font-heading text-2xl font-semibold mt-8 mb-4">Contact</h2>
          <p className="text-muted-foreground leading-relaxed">
            For privacy enquiries, contact{" "}
            <a href="mailto:privacy@promiseandhope.org" className="text-primary hover:underline">
              privacy@promiseandhope.org
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
