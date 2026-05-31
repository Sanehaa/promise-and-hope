"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ImageWithFallback } from "./ImageWithFallback";
import { ProgressBar } from "./ProgressBar";
import { DonateButton } from "./DonateButton";
import { formatCurrency, calculateProgress } from "@/lib/utils";
import type { ProjectView } from "@/types/content";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: ProjectView;
  className?: string;
};

export function ProjectCard({ project, className }: ProjectCardProps) {
  const progress = calculateProgress(project.raisedAmount, project.targetAmount);

  return (
    <motion.article whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300 }}>
      <Card className={cn("overflow-hidden transition-shadow hover:shadow-lg", className)}>
        <Link href={`/projects/${project.slug}`} className="block">
          <div className="relative aspect-[16/10] overflow-hidden">
            <ImageWithFallback
              src={project.imageUrl}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </Link>
        <CardContent className="p-6">
          <div className="mb-2 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" aria-hidden />
            {project.location}
          </div>
          <Link href={`/projects/${project.slug}`}>
            <h3 className="font-heading text-xl font-semibold transition-colors hover:text-primary">
              {project.title}
            </h3>
          </Link>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {project.shortDescription}
          </p>
          <div className="mt-4">
            <ProgressBar value={progress} />
            <div className="mt-2 flex justify-between text-xs font-medium">
              <span className="text-primary">
                Raised {formatCurrency(project.raisedAmount)}
              </span>
              <span className="text-muted-foreground">
                Goal {formatCurrency(project.targetAmount)}
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="gap-3 px-6 pb-6 pt-0">
          <DonateButton size="sm" className="flex-1" />
          <Link
            href={`/projects/${project.slug}`}
            className="text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
          >
            Details
          </Link>
        </CardFooter>
      </Card>
    </motion.article>
  );
}
