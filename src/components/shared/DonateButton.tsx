import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type DonateButtonProps = {
  className?: string;
  size?: "default" | "sm" | "lg";
  showIcon?: boolean;
};

export function DonateButton({
  className,
  size = "default",
  showIcon = true,
}: DonateButtonProps) {
  return (
    <Button asChild variant="accent" size={size} className={cn("font-semibold", className)}>
      <Link href="/donate">
        {showIcon && <Heart className="fill-current" />}
        Donate Now
      </Link>
    </Button>
  );
}
