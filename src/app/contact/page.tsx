import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock, Globe, Share2, Heart, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { Card, CardContent } from "@/components/ui/card";
import { MapEmbed } from "@/components/shared/MapEmbed";
import { getPageHero, getSiteSettings } from "@/lib/queries";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Contact Us",
  description: "Get in touch with Promise and Hope.",
  path: "/contact",
});

const socialLinks = [
  { icon: Globe, label: "Facebook", href: "#" },
  { icon: Share2, label: "Twitter", href: "#" },
  { icon: Heart, label: "Instagram", href: "#" },
  { icon: MessageCircle, label: "LinkedIn", href: "#" },
];

export default async function ContactPage() {
  const [hero, settings] = await Promise.all([
    getPageHero("contact"),
    getSiteSettings(["org.email", "org.phone", "org.address"]),
  ]);

  const contactInfo = [
    { icon: Mail, title: "Email", value: settings["org.email"], href: `mailto:${settings["org.email"]}` },
    { icon: Phone, title: "Phone", value: settings["org.phone"], href: `tel:${settings["org.phone"]?.replace(/\s/g, "")}` },
    { icon: MapPin, title: "Registered Office", value: settings["org.address"] },
    { icon: Clock, title: "Opening Hours", value: "Monday – Friday: 9:00 AM – 5:30 PM" },
  ];

  return (
    <>
      <PageHero
        title={hero?.title ?? "Contact Us"}
        description={hero?.description ?? ""}
        image={hero?.imageUrl ?? "/images/hero/contact-hero.jpg"}
        imageAlt={hero?.imageAlt ?? "Contact"}
      />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-16">
            {contactInfo.map(({ icon: Icon, title, value, href }) => (
              <Card key={title}>
                <CardContent className="p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-primary mb-4">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold">{title}</h3>
                  {href && value ? (
                    <a href={href} className="mt-2 block text-sm text-muted-foreground hover:text-primary transition-colors">
                      {value}
                    </a>
                  ) : (
                    <p className="mt-2 text-sm text-muted-foreground">{value}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-heading text-3xl font-semibold">Send Us a Message</h2>
              <p className="mt-2 text-muted-foreground">
                Fill in the form below and our team will respond within 2–3 business days.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>

            <div>
              <MapEmbed
                query={settings["org.address"] ?? "47 Findern Green, Sneinton, Nottingham, NG3 7BU"}
                title="Promise and Hope office location"
              />

              <div className="mt-8">
                <h3 className="font-heading text-lg font-semibold">Follow Us</h3>
                <div className="mt-4 flex gap-3">
                  {socialLinks.map(({ icon: Icon, label, href }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
