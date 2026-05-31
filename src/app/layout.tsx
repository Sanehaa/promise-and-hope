import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import { Toaster } from "sonner";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StickyDonateButton } from "@/components/layout/StickyDonateButton";
import { PageTransition } from "@/components/layout/PageTransition";
import { defaultMetadata } from "@/lib/metadata";
import { getNavLinks } from "@/lib/queries";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = defaultMetadata;

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mainNav, footerQuick, footerUseful] = await Promise.all([
    getNavLinks("main"),
    getNavLinks("footer_quick"),
    getNavLinks("footer_useful"),
  ]);

  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable} h-full`}>
      <body className="min-h-full flex flex-col font-sans antialiased bg-background text-foreground">
        <Navbar links={mainNav} />
        <main className="flex-1 pt-0">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer quickLinks={footerQuick} usefulLinks={footerUseful} />
        <StickyDonateButton />
        <Toaster position="top-center" richColors closeButton />
      </body>
    </html>
  );
}
