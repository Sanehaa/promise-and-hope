import { HomeHero } from "@/components/home/HomeHero";
import { ImpactStats } from "@/components/shared/ImpactStats";
import { MissionSection } from "@/components/home/MissionSection";
import { HomeServicesSection } from "@/components/home/HomeServicesSection";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { StoryCard } from "@/components/shared/StoryCard";
import { DonationCTA } from "@/components/shared/DonationCTA";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CTAButton } from "@/components/shared/CTAButton";
import {
  getSiteSettings,
  getPageHero,
  getHomeServices,
  getProjects,
  getCaseStories,
  getImpactStats,
  getTestimonials,
} from "@/lib/queries";
import { toProjectView, toCaseStoryView } from "@/types/content";

export default async function HomePage() {
  const [
    settings,
    homeHero,
    missionHero,
    ctaHero,
    homeServices,
    projectsRaw,
    storiesRaw,
    impactStats,
    testimonials,
  ] = await Promise.all([
    getSiteSettings([
      "home.hero.title",
      "home.hero.description",
      "home.hero.trust_line",
      "home.mission.title",
      "home.mission.description",
      "donation.cta.title",
      "donation.cta.description",
    ]),
    getPageHero("home"),
    getPageHero("mission"),
    getPageHero("donation-cta"),
    getHomeServices(),
    getProjects(true),
    getCaseStories(true),
    getImpactStats(),
    getTestimonials(),
  ]);

  const featuredProjects = projectsRaw.slice(0, 4).map(toProjectView);
  const featuredStories = storiesRaw.slice(0, 3).map(toCaseStoryView);

  return (
    <>
      <HomeHero
        imageUrl={homeHero?.imageUrl ?? "/images/hero/home-hero.jpg"}
        title={settings["home.hero.title"] ?? "Restoring Hope. Transforming Lives."}
        description={settings["home.hero.description"] ?? ""}
        trustLine={settings["home.hero.trust_line"] ?? ""}
      />
      <ImpactStats stats={impactStats} />
      <MissionSection
        imageUrl={missionHero?.imageUrl ?? "/images/hero/mission.jpg"}
        title={settings["home.mission.title"] ?? ""}
        description={settings["home.mission.description"] ?? ""}
      />
      <HomeServicesSection services={homeServices} />

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Active Projects"
            title="Projects Making a Real Difference"
            description="Support a specific cause and see exactly how your generosity creates lasting impact."
          />
          <div className="grid gap-8 sm:grid-cols-2">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <CTAButton href="/projects" variant="outline">
              View All Projects
            </CTAButton>
          </div>
        </div>
      </section>

      <DonationCTA
        title={settings["donation.cta.title"] ?? ""}
        description={settings["donation.cta.description"] ?? ""}
        imageUrl={ctaHero?.imageUrl ?? "/images/hero/donation-cta.jpg"}
      />

      <section className="py-20 lg:py-28 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Impact Stories"
            title="Lives Touched, Hope Restored"
            description="Every story is told with dignity and respect."
          />
          <div className="grid gap-8 md:grid-cols-3">
            {featuredStories.map((story) => (
              <StoryCard key={story.slug} story={story} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <CTAButton href="/case-stories" variant="outline">
              Read More Stories
            </CTAButton>
          </div>
        </div>
      </section>

      <TestimonialsSection testimonials={testimonials} />
      <NewsletterSection />
    </>
  );
}
