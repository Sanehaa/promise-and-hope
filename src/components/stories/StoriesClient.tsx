"use client";

import { useMemo, useState } from "react";
import { StoryCard } from "@/components/shared/StoryCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { CaseStoryView } from "@/types/content";

type StoriesClientProps = {
  stories: CaseStoryView[];
  categories: string[];
};

export function StoriesClient({ stories, categories }: StoriesClientProps) {
  const [category, setCategory] = useState<string>("All");

  const filtered = useMemo(() => {
    if (category === "All") return stories;
    return stories.filter((s) => s.category === category);
  }, [stories, category]);

  return (
    <div>
      <Tabs value={category} onValueChange={setCategory} className="mb-8">
        <TabsList className="flex-wrap h-auto">
          {categories.map((cat) => (
            <TabsTrigger key={cat} value={cat}>
              {cat}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((story) => (
          <StoryCard key={story.slug} story={story} />
        ))}
      </div>
    </div>
  );
}
