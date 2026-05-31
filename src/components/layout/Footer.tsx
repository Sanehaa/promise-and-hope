import Link from "next/link";
import { Globe, Share2, Heart, MessageCircle, Mail, Phone, MapPin } from "lucide-react";
import { getSiteSettings } from "@/lib/queries";
import type { NavLinkItem } from "@/types/content";
import { DonateButton } from "@/components/shared/DonateButton";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { Separator } from "@/components/ui/separator";

const socialLinks = [
  { href: "#", label: "Facebook", icon: Globe },
  { href: "#", label: "Twitter", icon: Share2 },
  { href: "#", label: "Instagram", icon: Heart },
  { href: "#", label: "LinkedIn", icon: MessageCircle },
];

type FooterProps = {
  quickLinks: NavLinkItem[];
  usefulLinks: NavLinkItem[];
};

export async function Footer({ quickLinks, usefulLinks }: FooterProps) {
  const settings = await getSiteSettings([
    "org.name",
    "org.tagline",
    "org.summary",
    "org.email",
    "org.phone",
    "org.address",
    "org.charity_number",
  ]);

  const orgName = settings["org.name"] ?? "Promise and Hope";
  const tagline = settings["org.tagline"] ?? "";
  const summary = settings["org.summary"] ?? "";

  return (
    <footer className="bg-forest text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block">
              <h2 className="font-heading text-2xl font-semibold">{orgName}</h2>
              {tagline && (
                <p className="mt-1 text-sm italic text-primary-foreground/70">{tagline}</p>
              )}
            </Link>
            {summary && (
              <p className="mt-4 text-sm leading-relaxed text-primary-foreground/80">
                {summary}
              </p>
            )}
            <div className="mt-6">
              <DonateButton size="sm" />
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-accent">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/80 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-accent">
              Useful Links
            </h3>
            <ul className="space-y-2">
              {usefulLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/80 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-accent">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              {settings["org.address"] && (
                <li className="flex gap-2">
                  <MapPin className="h-4 w-4 shrink-0 text-accent" aria-hidden />
                  {settings["org.address"]}
                </li>
              )}
              {settings["org.phone"] && (
                <li className="flex gap-2">
                  <Phone className="h-4 w-4 shrink-0 text-accent" aria-hidden />
                  <a href={`tel:${settings["org.phone"].replace(/\s/g, "")}`} className="hover:text-accent transition-colors">
                    {settings["org.phone"]}
                  </a>
                </li>
              )}
              {settings["org.email"] && (
                <li className="flex gap-2">
                  <Mail className="h-4 w-4 shrink-0 text-accent" aria-hidden />
                  <a href={`mailto:${settings["org.email"]}`} className="hover:text-accent transition-colors">
                    {settings["org.email"]}
                  </a>
                </li>
              )}
            </ul>

            <h3 className="mb-3 mt-8 text-sm font-semibold uppercase tracking-wider text-accent">
              Stay Connected
            </h3>
            <NewsletterForm variant="footer" />
          </div>
        </div>

        <Separator className="my-10 bg-primary-foreground/20" />

        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex gap-4">
            {socialLinks.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/10 text-primary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
          <p className="text-center text-xs text-primary-foreground/60">
            {settings["org.charity_number"] && (
              <>Registered Charity No. {settings["org.charity_number"]} · </>
            )}
            © {new Date().getFullYear()} {orgName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
