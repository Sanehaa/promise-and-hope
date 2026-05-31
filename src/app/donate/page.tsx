import type { Metadata } from "next";
import { Shield, Eye, Heart } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { DonationForm } from "@/components/donation/DonationForm";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { getPageHero, getDonationCauses, getSuggestedAmounts } from "@/lib/queries";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Donate",
  description:
    "Give hope today. Donate to Promise and Hope and support families and communities.",
  path: "/donate",
});

const trustIndicators = [
  { icon: Shield, label: "Secure Donation" },
  { icon: Eye, label: "Transparent Giving" },
  { icon: Heart, label: "Direct Community Impact" },
];

export default async function DonatePage() {
  const [hero, causes, suggestedAmounts] = await Promise.all([
    getPageHero("donate"),
    getDonationCauses(),
    getSuggestedAmounts(),
  ]);

  return (
    <>
      <PageHero
        title={hero?.title ?? "Give Hope Today"}
        description={hero?.description ?? ""}
        image={hero?.imageUrl ?? "/images/hero/donate-hero.jpg"}
        imageAlt={hero?.imageAlt ?? "Donate to Promise and Hope"}
      />

      <section className="py-12 border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-8">
            {trustIndicators.map(({ icon: Icon, label }) => (
              <ScrollReveal key={label}>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-medium">{label}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <DonationForm causes={causes} suggestedAmounts={suggestedAmounts} />
        </div>
      </section>
    </>
  );
}
