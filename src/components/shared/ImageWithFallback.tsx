"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ImageIcon } from "lucide-react";

/** Set to true in .env.local once your images are in /public/images/ */
const LOAD_LOCAL_IMAGES =
  process.env.NEXT_PUBLIC_LOAD_LOCAL_IMAGES === "true";

type ImageWithFallbackProps = {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  /** Dark placeholder for hero areas; light for cards */
  variant?: "dark" | "light";
};

function ImagePlaceholder({
  alt,
  fill,
  className,
  src,
  variant = "light",
}: {
  alt: string;
  fill?: boolean;
  className?: string;
  src: string;
  variant?: "dark" | "light";
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center",
        variant === "dark"
          ? "bg-gradient-to-br from-forest via-forest/90 to-charcoal"
          : "bg-gradient-to-br from-sage/80 via-secondary to-muted",
        fill && "absolute inset-0 h-full w-full",
        className
      )}
      role="img"
      aria-label={alt}
    >
      <ImageIcon
        className={cn(
          "mb-2 h-10 w-10 opacity-40",
          variant === "dark" ? "text-white/50" : "text-muted-foreground"
        )}
      />
      <span
        className={cn(
          "px-4 text-center text-xs opacity-60",
          variant === "dark" ? "text-white/60" : "text-muted-foreground"
        )}
      >
        Add image: {src.replace("/images/", "")}
      </span>
    </div>
  );
}

/**
 * Shows a gradient placeholder until images exist in /public/images/.
 * Enable real images: add files, then set NEXT_PUBLIC_LOAD_LOCAL_IMAGES=true in .env.local
 */
export function ImageWithFallback({
  src,
  alt,
  fill,
  width,
  height,
  className,
  variant = "light",
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);

  const showPlaceholder = !LOAD_LOCAL_IMAGES || hasError;

  if (showPlaceholder) {
    return (
      <ImagePlaceholder
        alt={alt}
        fill={fill}
        className={className}
        src={src}
        variant={variant}
      />
    );
  }

  const imgClass = cn("object-cover", fill && "absolute inset-0 h-full w-full", className);

  if (fill) {
    return (
      // Native img avoids Next/Image 404 optimizer errors when files are missing
      <img
        src={src}
        alt={alt}
        className={imgClass}
        onError={() => setHasError(true)}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={imgClass}
      onError={() => setHasError(true)}
    />
  );
}
