"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { LightboxModal } from "./LightboxModal";
import type { GalleryItemView } from "./GalleryClient";

type GalleryGridProps = {
  items: GalleryItemView[];
  categories: string[];
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
};

export function GalleryGrid({
  items,
  categories,
  activeCategory,
  onCategoryChange,
}: GalleryGridProps) {
  const [selected, setSelected] = useState<GalleryItemView | null>(null);

  return (
    <>
      <Tabs value={activeCategory} onValueChange={onCategoryChange} className="mb-8">
        <TabsList className="flex-wrap h-auto">
          {categories.map((cat) => (
            <TabsTrigger key={cat} value={cat}>
              {cat}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-muted/30 py-16 text-center">
          <p className="text-muted-foreground">No images found for this category.</p>
        </div>
      ) : (
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {items.map((item, index) => (
            <motion.button
              key={item.id}
              type="button"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              onClick={() => setSelected(item)}
              aria-label={`View ${item.title}`}
            >
              <div className="relative min-h-[200px]">
                <ImageWithFallback
                  src={item.imageUrl}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-charcoal/80 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <span className="text-xs font-medium uppercase tracking-wider text-accent">
                    {item.category}
                  </span>
                  <span className="font-heading text-lg font-semibold text-white">
                    {item.title}
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      )}

      <LightboxModal item={selected} onClose={() => setSelected(null)} />
    </>
  );
}
