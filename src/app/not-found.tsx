import Link from "next/link";
import { Home, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-20 text-center">
      <p className="text-8xl font-heading font-semibold text-primary/20">404</p>
      <h1 className="mt-4 font-heading text-3xl font-semibold sm:text-4xl">
        Page Not Found
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground leading-relaxed">
        The page you are looking for may have been moved or no longer exists. But hope is
        never lost — let us help you find your way.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Button asChild size="lg">
          <Link href="/">
            <Home className="h-4 w-4" />
            Return Home
          </Link>
        </Button>
        <Button asChild variant="accent" size="lg">
          <Link href="/donate">
            <Heart className="h-4 w-4" />
            Donate Now
          </Link>
        </Button>
      </div>
    </section>
  );
}
