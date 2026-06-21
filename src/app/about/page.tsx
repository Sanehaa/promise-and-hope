import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { DonationCTA } from "@/components/shared/DonationCTA";
import { CTAButton } from "@/components/shared/CTAButton";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { Card, CardContent } from "@/components/ui/card";
import { getIcon } from "@/lib/icons";
import {
  getPageHero,
  getSiteSettings,
  getCoreValues,
  getTimelineEvents,
  getTeamMembers,
} from "@/lib/queries";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "About Us",
  description: "Learn about Promise and Hope — our mission, values, and commitment to serving communities.",
  path: "/about",
});

export default async function AboutPage() {
  const [hero, missionHero, settings, coreValues, timeline, team, ctaHero] =
    await Promise.all([
      getPageHero("about"),
      getPageHero("mission"),
      getSiteSettings([
        "about.story.title",
        "about.story.description",
        "about.story.paragraph1",
        "about.story.paragraph2",
        "about.mission",
        "about.vision",
        "donation.cta.title",
        "donation.cta.description",
      ]),
      getCoreValues(),
      getTimelineEvents(),
      getTeamMembers(),
      getPageHero("donation-cta"),
    ]);

  return (
    <>
      <PageHero
        title={hero?.title ?? "About Us"}
        description={hero?.description ?? ""}
        image={hero?.imageUrl ?? "/images/hero/about-hero.png"}
        imageAlt={hero?.imageAlt ?? "About Promise and Hope"}
      />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <ScrollReveal>
              <SectionHeading
                align="left"
                eyebrow="Our Story"
                title={settings["about.story.title"] ?? ""}
                description={settings["about.story.description"] ?? ""}
              />
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {settings["about.story.paragraph1"] ?? ""}
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {settings["about.story.paragraph2"] ?? ""}
              </p>
            </ScrollReveal>
            <ScrollReveal direction="right" delay={0.1}>
              <div className="relative aspect-video overflow-hidden rounded-2xl shadow-lg">
                <ImageWithFallback
                  src={missionHero?.imageUrl ?? "/images/hero/mission.png"}
                  alt="Community outreach"
                  fill
                  sizes="50vw"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <h2 className="font-heading text-3xl font-semibold">Our Mission</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {settings["about.mission"] ?? ""}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="font-heading text-3xl font-semibold">Our Vision</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {settings["about.vision"] ?? ""}
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="What Guides Us" title="Our Core Values" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {coreValues.map((value, i) => {
              const Icon = getIcon(value.iconName);
              return (
                <ScrollReveal key={value.id} delay={i * 0.08}>
                  <Card className="h-full text-center">
                    <CardContent className="flex flex-col items-center p-6">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-primary">
                        <Icon className="h-7 w-7" />
                      </div>
                      <h3 className="mt-4 font-heading text-lg font-semibold">{value.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Our Journey" title="Organisation Timeline" />
          <div className="relative mx-auto max-w-3xl">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border md:left-1/2 md:-translate-x-px" />
            {timeline.map((item, i) => (
              <ScrollReveal key={item.id} delay={i * 0.1}>
                <div className={`relative mb-10 flex gap-8 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className="hidden md:block md:w-1/2" />
                  <div className="absolute left-4 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground md:left-1/2">
                    {item.year.slice(2)}
                  </div>
                  <div className="ml-12 md:ml-0 md:w-1/2 md:px-8">
                    <Card>
                      <CardContent className="p-6">
                        <p className="text-sm font-semibold text-accent">{item.year}</p>
                        <h3 className="mt-1 font-heading text-lg font-semibold">{item.title}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Leadership"
            title="Our Team"
            description="Dedicated leaders guiding Promise and Hope with wisdom and integrity."
          />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, i) => (
              <ScrollReveal key={member.id} delay={i * 0.08}>
                <Card className="overflow-hidden text-center">
                  <div className="relative aspect-square">
                    <ImageWithFallback
                      src={member.imageUrl}
                      alt={member.name}
                      fill
                      sizes="25vw"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-heading text-lg font-semibold">{member.name}</h3>
                    <p className="text-sm text-accent font-medium">{member.role}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{member.bio}</p>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 text-center">
        <div className="mx-auto max-w-2xl px-4">
          <h2 className="font-heading text-3xl font-semibold">Join Our Mission</h2>
          <p className="mt-4 text-muted-foreground">
            Whether through giving, volunteering, or prayer — your support makes hope possible.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <CTAButton href="/donate">Donate Today</CTAButton>
            <CTAButton href="/contact" variant="outline">
              Volunteer With Us
            </CTAButton>
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
