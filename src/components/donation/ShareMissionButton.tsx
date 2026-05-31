"use client";

import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ShareMissionButton() {
  return (
    <Button
      variant="ghost"
      size="lg"
      type="button"
      onClick={() => {
        if (navigator.share) {
          void navigator.share({
            title: "Promise and Hope",
            text: "I supported Promise and Hope — a faith-inspired charity bringing hope to communities.",
            url: window.location.origin,
          });
        }
      }}
    >
      <Share2 className="h-4 w-4" />
      Share Our Mission
    </Button>
  );
}
