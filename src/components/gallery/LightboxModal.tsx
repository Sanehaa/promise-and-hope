"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import type { GalleryItemView } from "./GalleryClient";

type LightboxModalProps = {
  item: GalleryItemView | null;
  onClose: () => void;
};

export function LightboxModal({ item, onClose }: LightboxModalProps) {
  return (
    <Dialog open={!!item} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden">
        {item && (
          <>
            <DialogTitle className="sr-only">{item.title}</DialogTitle>
            <div className="relative aspect-[4/3] w-full sm:aspect-video">
              <ImageWithFallback src={item.imageUrl} alt={item.alt} fill sizes="90vw" />
            </div>
            <div className="p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                {item.category}
              </p>
              <h3 className="font-heading text-2xl font-semibold mt-1">{item.title}</h3>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
