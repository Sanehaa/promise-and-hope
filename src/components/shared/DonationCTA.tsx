import { ImageWithFallback } from "./ImageWithFallback";
import { ScrollReveal } from "./ScrollReveal";
import { DonateButton } from "./DonateButton";

type DonationCTAProps = {
  title: string;
  description: string;
  imageUrl: string;
};

export function DonationCTA({ title, description, imageUrl }: DonationCTAProps) {
  return (
    <section className="relative overflow-hidden py-20">
      <div className="absolute inset-0">
        <ImageWithFallback
          src={imageUrl}
          alt="Community members receiving support"
          fill
          variant="dark"
        />
        <div className="absolute inset-0 bg-forest/85" />
      </div>
      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6">
        <ScrollReveal>
          <h2 className="font-heading text-3xl font-semibold text-white text-balance sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-white/90">{description}</p>
          <div className="mt-8 flex justify-center">
            <DonateButton size="lg" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
