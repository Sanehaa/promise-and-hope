"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type ProgressBarProps = {
  value: number;
  className?: string;
  showLabel?: boolean;
};

export function ProgressBar({ value, className, showLabel = true }: ProgressBarProps) {
  const prefersReducedMotion = useReducedMotion();
  const clamped = Math.min(Math.max(value, 0), 100);

  return (
    <div className={cn("w-full", className)}>
      <div
        className="h-2.5 w-full overflow-hidden rounded-full bg-muted"
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
          initial={{ width: 0 }}
          whileInView={{ width: `${clamped}%` }}
          viewport={{ once: true }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 1, ease: [0.22, 1, 0.36, 1] }
          }
        />
      </div>
      {showLabel && (
        <p className="mt-1.5 text-right text-xs font-medium text-muted-foreground">
          {clamped}% funded
        </p>
      )}
    </div>
  );
}
