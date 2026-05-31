import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { GalleryClient } from "@/components/gallery/GalleryClient";
import { getPageHero, getGalleryItems, getGalleryCategories } from "@/lib/queries";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Gallery",
  description: "Photos from Promise and Hope charity work.",
  path: "/gallery",
});

export default async function GalleryPage() {
  const [hero, items, categories] = await Promise.all([
    getPageHero("gallery"),
    getGalleryItems(),
    getGalleryCategories(),
  ]);

  const galleryItems = items.map((item) => ({
    id: item.id,
    title: item.title,
    category: item.category,
    imageUrl: item.imageUrl,
    alt: item.alt,
  }));

  return (
    <>
      <PageHero
        title={hero?.title ?? "Gallery"}
        description={hero?.description ?? ""}
        image={hero?.imageUrl ?? "/images/hero/gallery-hero.jpg"}
        imageAlt={hero?.imageAlt ?? "Gallery"}
      />
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <GalleryClient items={galleryItems} categories={categories} />
        </div>
      </section>
    </>
  );
}
