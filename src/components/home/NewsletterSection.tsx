import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

export function NewsletterSection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="rounded-2xl bg-sage/40 px-6 py-12 sm:px-12 lg:flex lg:items-center lg:justify-between lg:gap-12">
            <div className="max-w-xl">
              <h2 className="font-heading text-3xl font-semibold text-balance sm:text-4xl">
                Stay Connected to Our Mission
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Receive charity updates, impact stories, and ways to make a difference.
                We respect your privacy and never share your details.
              </p>
            </div>
            <div className="mt-8 lg:mt-0 lg:min-w-[400px]">
              <NewsletterForm variant="inline" />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
