import { HeroSection } from "@/components/shared/HeroSection";
import { CTAButton } from "@/components/shared/CTAButton";
import { DonateButton } from "@/components/shared/DonateButton";

type HomeHeroProps = {
  imageUrl: string;
  title: string;
  description: string;
  trustLine: string;
};

export function HomeHero({ imageUrl, title, description, trustLine }: HomeHeroProps) {
  return (
    <HeroSection
      title={title}
      description={description}
      image={imageUrl}
      imageAlt="Community members supported by Promise and Hope charity"
    >
      <DonateButton size="lg" />
      <CTAButton
        href="/projects"
        variant="outline"
        size="lg"
        className="border-white text-white hover:bg-white hover:text-primary"
      >
        Explore Our Work
      </CTAButton>
      <p className="w-full basis-full text-sm italic text-white/70 mt-2">{trustLine}</p>
    </HeroSection>
  );
}
