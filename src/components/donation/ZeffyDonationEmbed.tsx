import { getZeffyEmbedSrc } from "@/lib/zeffy";

export function ZeffyDonationEmbed() {
  const src = getZeffyEmbedSrc();
  if (!src) return null;

  return (
    <div className="mt-12 rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-6">
      <h2 className="font-heading text-2xl font-semibold mb-2">Donate securely with Zeffy</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Complete your gift below. Zeffy processes payments at no cost to Promise and Hope.
      </p>
      <div className="relative w-full overflow-hidden rounded-xl bg-muted">
        <iframe
          title="Donate to Promise and Hope via Zeffy"
          src={src}
          className="mx-auto block min-h-[900px] w-full max-w-2xl border-0"
          loading="lazy"
          allow="payment *"
        />
      </div>
    </div>
  );
}
