import { Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export type TestimonialView = {
  name: string;
  role: string;
  quote: string;
};

export function TestimonialCard({ testimonial }: { testimonial: TestimonialView }) {
  return (
    <Card className="h-full border-border/60 bg-card">
      <CardContent className="flex h-full flex-col p-6">
        <Quote className="mb-4 h-8 w-8 text-accent/60" aria-hidden />
        <blockquote className="flex-1 text-base leading-relaxed text-foreground italic">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>
        <footer className="mt-6 border-t border-border pt-4">
          <cite className="not-italic">
            <p className="font-semibold">{testimonial.name}</p>
            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
          </cite>
        </footer>
      </CardContent>
    </Card>
  );
}
