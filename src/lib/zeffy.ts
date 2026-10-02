/** Promise and Hope — Donate to Change Lives (Zeffy) */
export const DEFAULT_ZEFFY_DONATION_URL =
  "https://www.zeffy.com/en-GB/donation-form/donate-to-change-lives-25427";

export function getZeffyDonationUrl(): string {
  return process.env.NEXT_PUBLIC_ZEFFY_DONATION_URL?.trim() || DEFAULT_ZEFFY_DONATION_URL;
}

/** Optional iframe `src` from Zeffy Share → Embed → Campaign (paste src only). */
export function getZeffyEmbedSrc(): string {
  const src = process.env.NEXT_PUBLIC_ZEFFY_EMBED_SRC?.trim();
  if (!src) {
    return "";
  }
  return src;
}

export function isZeffyConfigured(): boolean {
  return Boolean(getZeffyDonationUrl() || getZeffyEmbedSrc());
}
