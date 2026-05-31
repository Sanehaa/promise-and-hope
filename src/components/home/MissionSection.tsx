import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

type MissionSectionProps = {
  imageUrl: string;
  title: string;
  description: string;
};

export function MissionSection({ imageUrl, title, description }: MissionSectionProps) {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <ScrollReveal direction="left">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-xl">
              <ImageWithFallback
                src={imageUrl}
                alt="Volunteers serving meals to community members"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right" delay={0.15}>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
              Our Mission
            </p>
            <h2 className="font-heading text-3xl font-semibold text-balance sm:text-4xl">
              {title}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{description}</p>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 font-semibold text-primary transition-colors hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
            >
              Learn About Us
              <ArrowRight className="h-4 w-4" />
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
