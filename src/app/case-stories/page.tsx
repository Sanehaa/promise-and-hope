import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { StoriesClient } from "@/components/stories/StoriesClient";
import { DonationCTA } from "@/components/shared/DonationCTA";
import {
  getPageHero,
  getCaseStories,
  getStoryCategories,
  getSiteSettings,
} from "@/lib/queries";
import { toCaseStoryView } from "@/types/content";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Case Stories",
  description: "Impact stories from Promise and Hope.",
  path: "/case-stories",
});

export default async function CaseStoriesPage() {
  const [hero, storiesRaw, categories, settings, ctaHero] = await Promise.all([
    getPageHero("case-stories"),
    getCaseStories(),
    getStoryCategories(),
    getSiteSettings(["donation.cta.title", "donation.cta.description"]),
    getPageHero("donation-cta"),
  ]);

  return (
    <>
      <PageHero
        title={hero?.title ?? "Case Stories"}
        description={hero?.description ?? ""}
        image={hero?.imageUrl ?? "/images/hero/stories-hero.jpg"}
        imageAlt={hero?.imageAlt ?? "Impact stories"}
      />
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StoriesClient
            stories={storiesRaw.map(toCaseStoryView)}
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
