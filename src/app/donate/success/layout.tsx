import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Thank You",
  description: "Thank you for your generous donation to Promise and Hope.",
  path: "/donate/success",
});

export default function DonationSuccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
