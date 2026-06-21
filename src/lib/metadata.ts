import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://promiseandhope.org";
const siteName = "Promise and Hope";

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Faith-Inspired Charity Supporting Communities`,
    template: `%s | ${siteName}`,
  },
  description:
    "Promise and Hope is a faith-inspired charity supporting vulnerable families in Lahore and Sheikhupura through education, food relief, humanitarian assistance and compassionate giving.",
  keywords: [
    "charity",
    "donation",
    "faith",
    "community support",
    "relief",
    "education",
    "humanitarian assistance",
  ],
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName,
    title: `${siteName} | Faith-Inspired Charity Supporting Communities`,
    description:
      "Promise and Hope is a faith-inspired charity supporting vulnerable families in Lahore and Sheikhupura through education, food relief, humanitarian assistance and compassionate giving.",
    images: [
      {
        url: "/images/og-share.jpg",
        width: 1200,
        height: 630,
        alt: "Promise and Hope — Faith in Action. Hope in Every Heart.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | Faith-Inspired Charity`,
    description:
      "Supporting vulnerable communities through compassion, practical support, and lasting change.",
    images: ["/images/og-share.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export function createPageMetadata({
  title,
  description,
  path = "",
}: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${siteName}`,
      description,
      url: `${siteUrl}${path}`,
    },
  };
}
