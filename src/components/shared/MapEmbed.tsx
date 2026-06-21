import { getGoogleMapsEmbedUrl } from "@/lib/maps";
import { cn } from "@/lib/utils";

type MapEmbedProps = {
  query: string;
  title?: string;
  className?: string;
  zoom?: number;
};

export function MapEmbed({ query, title, className, zoom }: MapEmbedProps) {
  const src = getGoogleMapsEmbedUrl(query, zoom);

  return (
    <div
      className={cn(
        "relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-muted shadow-inner",
        className
      )}
    >
      <iframe
        title={title ?? `Map showing ${query}`}
        src={src}
        className="absolute inset-0 h-full w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
