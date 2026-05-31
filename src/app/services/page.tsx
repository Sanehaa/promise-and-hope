import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { DonationCTA } from "@/components/shared/DonationCTA";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { Button } from "@/components/ui/button";
import { getIcon } from "@/lib/icons";
import { getPageHero, getServices, getSiteSettings } from "@/lib/queries";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Our Services",
  description: "Explore Promise and Hope charity services.",
  path: "/services",
});

export default async function ServicesPage() {
  const [hero, services, settings, ctaHero] = await Promise.all([
    getPageHero("services"),
    getServices(),
    getSiteSettings(["donation.cta.title", "donation.cta.description"]),
    getPageHero("donation-cta"),
  ]);

  return (
    <>
      <PageHero
        title={hero?.title ?? "Our Services"}
        description={hero?.description ?? ""}
        image={hero?.imageUrl ?? "/images/hero/services-hero.jpg"}
        imageAlt={hero?.imageAlt ?? "Charity services"}
      />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="How We Serve"
            description="Each service is delivered with dignity, cultural sensitivity, and a commitment to lasting impact."
          />
          <div className="space-y-20">
            {services.map((service, index) => {
              const Icon = getIcon(service.iconName);
              return (
                <ScrollReveal key={service.id} delay={0.05}>
                  <article
                    id={service.slug}
                    className={`grid items-center gap-10 lg:grid-cols-2 ${
                      index % 2 === 1 ? "lg:flex-row-reverse" : ""
                    }`}
                  >
                    <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
                        <ImageWithFallback
                          src={service.imageUrl}
                          alt={service.title}
                          fill
                          sizes="50vw"
                        />
                      </div>
                    </div>
                    <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary">
                        <Icon className="h-6 w-6" aria-hidden />
                      </div>
                      <h2 className="font-heading text-3xl font-semibold">{service.title}</h2>
                      <p className="mt-4 text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                      <Button asChild className="mt-6">
                        <Link href="/donate">Support This Cause</Link>
                      </Button>
                    </div>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <DonationCTA
        title={settings["donation.cta.title"] ?? ""}
        description={settings["donation.cta.description"] ?? ""}
        imageUrl={ctaHero?.imageUrl ?? "/images/hero/donation-cta.jpg"}
      />
    </>
  );
}
