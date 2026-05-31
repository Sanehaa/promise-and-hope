import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { getPageHero } from "@/lib/queries";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Terms & Conditions",
  description: "Terms and Conditions for Promise and Hope.",
  path: "/terms",
});

export default async function TermsPage() {
  const hero = await getPageHero("terms");

  return (
    <>
      <PageHero
        title={hero?.title ?? "Terms & Conditions"}
        description={hero?.description ?? ""}
        image={hero?.imageUrl ?? "/images/hero/about-hero.jpg"}
        imageAlt={hero?.imageAlt ?? "Terms"}
      />
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-muted-foreground text-sm mb-8">Last updated: May 2026</p>
          <h2 className="font-heading text-2xl font-semibold mt-8 mb-4">Donations</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            All donations are voluntary gifts processed via Stripe. Donations are final and
            non-refundable except where required by law.
          </p>
          <h2 className="font-heading text-2xl font-semibold mt-8 mb-4">Governing Law</h2>
          <p className="text-muted-foreground leading-relaxed">
            These terms are governed by the laws of England and Wales.
          </p>
        </div>
      </section>
    </>
  );
}
