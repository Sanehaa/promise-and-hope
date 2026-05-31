"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "./ImageWithFallback";
import { cn } from "@/lib/utils";

export type OfficeView = {
  slug: string;
  name: string;
  region: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  imageUrl: string;
  mapUrl: string;
  isHeadOffice: boolean;
};

type OfficeCardProps = {
  office: OfficeView;
  className?: string;
};

export function OfficeCard({ office, className }: OfficeCardProps) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300 }}>
      <Card className={cn("overflow-hidden", className)}>
        <div className="relative aspect-[16/9]">
          <ImageWithFallback
            src={office.imageUrl}
            alt={`${office.name} office`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {office.isHeadOffice && (
            <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
              Head Office
            </span>
          )}
        </div>
        <CardContent className="space-y-4 p-6">
          <div>
            <h3 className="font-heading text-xl font-semibold">{office.name}</h3>
            <p className="text-sm text-muted-foreground">{office.region}</p>
          </div>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
              <span>{office.address}</span>
            </li>
            <li className="flex gap-3">
              <Phone className="h-4 w-4 shrink-0 text-primary" aria-hidden />
              <a href={`tel:${office.phone}`} className="hover:text-primary transition-colors">
                {office.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="h-4 w-4 shrink-0 text-primary" aria-hidden />
              <a href={`mailto:${office.email}`} className="hover:text-primary transition-colors">
                {office.email}
              </a>
            </li>
            <li className="flex gap-3">
              <Clock className="h-4 w-4 shrink-0 text-primary" aria-hidden />
              <span>{office.hours}</span>
            </li>
          </ul>
          <Button variant="outline" size="sm" asChild className="w-full">
            <a href={office.mapUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
              View on Map
            </a>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
