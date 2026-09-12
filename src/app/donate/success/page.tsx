import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { ShareMissionButton } from "@/components/donation/ShareMissionButton";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

export default function DonationSuccessPage() {
  return (
    <section className="min-h-[70vh] flex items-center py-20">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 text-center">
        <ScrollReveal>
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
            <CheckCircle className="h-10 w-10 text-primary" aria-hidden />
          </div>
          <h1 className="font-heading text-4xl font-semibold text-balance">
            Thank You for Your Generosity
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Your gift is a promise of hope to someone who needs it today. Because of
            supporters like you, families receive food, children attend school, and
            communities find strength to rebuild.
          </p>
          <p className="mt-6 text-sm text-muted-foreground">
            If you completed your donation through Square, you should receive a confirmation
            email from them shortly.
          </p>
          <p className="mt-8 text-muted-foreground">
            Your kindness creates ripples of hope that reach far beyond what we can see.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/">Return Home</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/projects">View Our Projects</Link>
            </Button>
            <ShareMissionButton />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
