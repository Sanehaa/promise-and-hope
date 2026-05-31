import { ImageWithFallback } from "./ImageWithFallback";

type PageHeroProps = {
  title: string;
  description?: string;
  image: string;
  imageAlt: string;
};

export function PageHero({ title, description, image, imageAlt }: PageHeroProps) {
  return (
    <section className="relative flex min-h-[35vh] items-center overflow-hidden bg-forest">
      <div className="absolute inset-0">
        <ImageWithFallback
          src={image}
          alt={imageAlt}
          fill
          variant="dark"
          className="opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest/95 to-forest/70" />
      </div>
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <h1 className="font-heading text-4xl font-semibold text-white text-balance sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-lg text-white/85">{description}</p>
        )}
      </div>
    </section>
  );
}
