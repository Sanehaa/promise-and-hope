import Link from "next/link";
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CTAButtonProps = ButtonProps & {
  href: string;
  children: React.ReactNode;
};

export function CTAButton({ href, children, className, ...props }: CTAButtonProps) {
  return (
    <Button asChild className={cn(className)} {...props}>
      <Link href={href}>{children}</Link>
    </Button>
  );
}
