"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

type ServiceCardProps = {
  title: string;
  description: string;
  iconName: string;
  href: string;
  className?: string;
};

export function ServiceCard({
  title,
  description,
  iconName,
  href,
  className,
}: ServiceCardProps) {
  const Icon = getIcon(iconName);

  return (
    <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300 }}>
      <Link href={href} className={cn("block h-full group", className)}>
        <Card className="h-full border-border/60 transition-shadow duration-300 group-hover:shadow-lg group-focus-visible:ring-2 group-focus-visible:ring-ring">
          <CardContent className="flex h-full flex-col p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary">
              <Icon className="h-6 w-6" aria-hidden />
            </div>
            <h3 className="font-heading text-xl font-semibold">{title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
              Learn more
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
