"use client";

import { useMemo, useState } from "react";
import { GalleryGrid } from "./GalleryGrid";

export type GalleryItemView = {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  alt: string;
};

type GalleryClientProps = {
  items: GalleryItemView[];
  categories: string[];
};

export function GalleryClient({ items, categories }: GalleryClientProps) {
  const [category, setCategory] = useState<string>("All");

  const filtered = useMemo(() => {
    if (category === "All") return items;
    return items.filter((item) => item.category === category);
  }, [items, category]);

  return (
    <GalleryGrid
      items={filtered}
      categories={categories}
      activeCategory={category}
      onCategoryChange={setCategory}
    />
  );
}
