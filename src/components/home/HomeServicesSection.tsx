"use client";

import { ServiceCard } from "@/components/shared/ServiceCard";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

type HomeService = {
  slug: string;
  homeTitle: string | null;
  homeDescription: string | null;
  homeIconName: string | null;
  title: string;
  shortDescription: string;
  iconName: string;
};

export function HomeServicesSection({ services }: { services: HomeService[] }) {
  return (
    <section className="bg-secondary/30 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="What We Do"
          title="Compassionate Services for Every Need"
          description="From emergency relief to long-term community development, we meet people where they are with practical, dignified support."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <ScrollReveal key={service.slug} delay={i * 0.08}>
              <ServiceCard
                title={service.homeTitle ?? service.title}
                description={service.homeDescription ?? service.shortDescription}
                iconName={service.homeIconName ?? service.iconName}
                href={`/services#${service.slug}`}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
