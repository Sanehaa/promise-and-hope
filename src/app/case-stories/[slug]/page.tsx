import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapPin } from "lucide-react";
import {
  getCaseStoryBySlug,
  getRelatedStories,
  getSiteSettings,
  getPageHero,
} from "@/lib/queries";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { StoryCard } from "@/components/shared/StoryCard";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { DonationCTA } from "@/components/shared/DonationCTA";
import { Card, CardContent } from "@/components/ui/card";
import { toCaseStoryView } from "@/types/content";
import { createPageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const story = await getCaseStoryBySlug(slug);
  if (!story) return {};
  return createPageMetadata({
    title: story.title,
    description: story.excerpt,
    path: `/case-stories/${slug}`,
  });
}

export default async function StoryDetailPage({ params }: Props) {
  const { slug } = await params;
  const raw = await getCaseStoryBySlug(slug);
  if (!raw) notFound();

  const story = toCaseStoryView(raw);
  const relatedRaw = await getRelatedStories(slug, 3);
  const related = relatedRaw.map(toCaseStoryView).filter((s) => s.slug !== slug);
  const [settings, ctaHero] = await Promise.all([
    getSiteSettings(["donation.cta.title", "donation.cta.description"]),
    getPageHero("donation-cta"),
  ]);

  return (
    <>
      <div className="relative min-h-[45vh]">
        <ImageWithFallback src={story.imageUrl} alt={story.title} fill variant="dark" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 to-transparent" />
        <div className="absolute bottom-0 mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8 w-full">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Case Stories", href: "/case-stories" },
              { label: story.title },
            ]}
            className="text-white/70 [&_a]:text-white/80 [&_span]:text-white"
          />
          <span className="inline-block rounded-full bg-accent/90 px-3 py-1 text-xs font-semibold text-accent-foreground mb-3">
            {story.category}
          </span>
          <h1 className="font-heading text-4xl font-semibold text-white sm:text-5xl">
            {story.title}
          </h1>
          <p className="mt-2 flex items-center gap-2 text-white/80">
            <MapPin className="h-4 w-4" />
            {story.location}
          </p>
        </div>
      </div>

      <article className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {story.content.map((paragraph, i) => (
            <p key={i} className="mb-6 text-lg leading-relaxed text-muted-foreground">
              {paragraph}
            </p>
          ))}
          <Card className="mt-8 border-primary/20 bg-secondary/30">
            <CardContent className="p-6">
              <h2 className="font-heading text-xl font-semibold text-primary">Impact Summary</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">{story.impactSummary}</p>
            </CardContent>
          </Card>
        </div>
      </article>

      {related.length > 0 && (
        <section className="bg-muted/30 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-2xl font-semibold mb-8">More Stories</h2>
            <div className="grid gap-8 md:grid-cols-3">
              {related.map((s) => (
                <StoryCard key={s.slug} story={s} />
              ))}
            </div>
          </div>
        </section>
      )}

      <DonationCTA
        title={settings["donation.cta.title"] ?? ""}
        description={settings["donation.cta.description"] ?? ""}
        imageUrl={ctaHero?.imageUrl ?? "/images/hero/donation-cta.jpg"}
      />
    </>
  );
}
