"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ImageWithFallback } from "./ImageWithFallback";
import type { CaseStoryView } from "@/types/content";
import { cn } from "@/lib/utils";

type StoryCardProps = {
  story: CaseStoryView;
  className?: string;
};

export function StoryCard({ story, className }: StoryCardProps) {
  return (
    <motion.article whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300 }}>
      <Card className={cn("overflow-hidden transition-shadow hover:shadow-lg", className)}>
        <Link href={`/case-stories/${story.slug}`} className="block group">
          <div className="relative aspect-[4/3] overflow-hidden">
            <ImageWithFallback
              src={story.imageUrl}
              alt={story.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
          <CardContent className="p-6">
            <div className="mb-2 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" aria-hidden />
              {story.location}
            </div>
            <h3 className="font-heading text-xl font-semibold group-hover:text-primary transition-colors">
              {story.title}
            </h3>
            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
              {story.excerpt}
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
              Read Story
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </CardContent>
        </Link>
      </Card>
    </motion.article>
  );
}
