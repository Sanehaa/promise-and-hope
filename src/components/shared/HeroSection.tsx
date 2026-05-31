"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ImageWithFallback } from "./ImageWithFallback";
import { cn } from "@/lib/utils";

type HeroSectionProps = {
  title: string;
  subtitle?: string;
  description?: string;
  image: string;
  imageAlt: string;
  children?: React.ReactNode;
  compact?: boolean;
  overlay?: "dark" | "warm";
};

export function HeroSection({
  title,
  subtitle,
  description,
  image,
  imageAlt,
  children,
  compact = false,
  overlay = "dark",
}: HeroSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className={cn(
        "relative flex items-center overflow-hidden",
        compact ? "min-h-[40vh]" : "min-h-[85vh]"
      )}
    >
      <div className="absolute inset-0">
        <ImageWithFallback
          src={image}
          alt={imageAlt}
          fill
          variant="dark"
          className="scale-105"
        />
        <div
          className={cn(
            "absolute inset-0",
            overlay === "dark"
              ? "bg-gradient-to-r from-charcoal/90 via-charcoal/70 to-charcoal/50"
              : "bg-gradient-to-r from-forest/90 via-forest/75 to-forest/40"
          )}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          {subtitle && (
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-accent">
              {subtitle}
            </p>
          )}
          <h1 className="font-heading text-4xl font-semibold leading-tight text-white text-balance sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {description && (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/90">
              {description}
            </p>
          )}
          {children && <div className="mt-8 flex flex-wrap gap-4">{children}</div>}
        </motion.div>
      </div>
    </section>
  );
}
