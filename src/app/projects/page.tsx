import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { ProjectsClient } from "@/components/projects/ProjectsClient";
import { DonationCTA } from "@/components/shared/DonationCTA";
import {
  getPageHero,
  getProjects,
  getProjectCategories,
  getSiteSettings,
} from "@/lib/queries";
import { toProjectView } from "@/types/content";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Our Projects",
  description: "Support active Promise and Hope charity projects.",
  path: "/projects",
});

export default async function ProjectsPage() {
  const [hero, projectsRaw, categories, settings, ctaHero] = await Promise.all([
    getPageHero("projects"),
    getProjects(),
    getProjectCategories(),
    getSiteSettings(["donation.cta.title", "donation.cta.description"]),
    getPageHero("donation-cta"),
  ]);

  return (
    <>
      <PageHero
        title={hero?.title ?? "Our Projects"}
        description={hero?.description ?? ""}
        image={hero?.imageUrl ?? "/images/hero/projects-hero.jpg"}
        imageAlt={hero?.imageAlt ?? "Charity projects"}
      />
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ProjectsClient
            projects={projectsRaw.map(toProjectView)}
            categories={categories}
          />
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
