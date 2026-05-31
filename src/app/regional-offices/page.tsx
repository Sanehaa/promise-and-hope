import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { OfficeCard } from "@/components/shared/OfficeCard";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { getPageHero, getRegionalOffices } from "@/lib/queries";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Regional Offices",
  description: "Find Promise and Hope regional offices.",
  path: "/regional-offices",
});

export default async function RegionalOfficesPage() {
  const [hero, offices] = await Promise.all([
    getPageHero("regional-offices"),
    getRegionalOffices(),
  ]);

  const officeViews = offices.map((o) => ({
    slug: o.slug,
    name: o.name,
    region: o.region,
    address: o.address,
    phone: o.phone,
    email: o.email,
    hours: o.hours,
    imageUrl: o.imageUrl,
    mapUrl: o.mapUrl,
    isHeadOffice: o.isHeadOffice,
  }));

  return (
    <>
      <PageHero
        title={hero?.title ?? "Regional Offices"}
        description={hero?.description ?? ""}
        image={hero?.imageUrl ?? "/images/hero/offices-hero.jpg"}
        imageAlt={hero?.imageAlt ?? "Regional offices"}
      />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Find an Office Near You"
            description="Each regional office serves as a hub for programmes, partnerships, and community engagement."
          />
          <div className="grid gap-8 sm:grid-cols-2">
            {officeViews.map((office, i) => (
              <ScrollReveal key={office.slug} delay={i * 0.08}>
                <OfficeCard office={office} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Our Reach"
            description="Promise and Hope serves communities across the UK, East Africa, and South Asia."
          />
          <div className="relative aspect-[16/7] overflow-hidden rounded-2xl border border-border bg-muted shadow-inner">
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <MapPin className="h-12 w-12 text-primary/40 mb-4" aria-hidden />
              <p className="font-heading text-xl font-semibold text-muted-foreground">
                Interactive Map Placeholder
              </p>
              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                Connect Google Maps API here to display office locations.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
