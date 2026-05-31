"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

export function StickyDonateButton() {
  return (
    <Link
      href="/donate"
      className={cn(
        "fixed bottom-6 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:hidden",
        "md:hidden"
      )}
      aria-label="Donate now"
    >
      <Heart className="h-6 w-6 fill-current" />
    </Link>
  );
}
