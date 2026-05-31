"use client";

import { Shield, Heart, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";
import type { DonationCauseItem } from "@/types/content";

type DonationSummaryProps = {
  frequency: "one-time" | "monthly";
  amount: number;
  causeSlug: string;
  causes: DonationCauseItem[];
  giftAid: boolean;
};

export function DonationSummary({
  frequency,
  amount,
  causeSlug,
  causes,
  giftAid,
}: DonationSummaryProps) {
  const causeLabel =
    causes.find((c) => c.slug === causeSlug)?.label ?? "Where Most Needed";

  return (
    <Card className="sticky top-24 border-primary/20 shadow-md">
      <CardHeader className="pb-4">
        <CardTitle className="font-heading text-xl">Donation Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Type</span>
          <span className="font-medium capitalize">
            {frequency === "monthly" ? "Monthly" : "One-time"}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Cause</span>
          <span className="font-medium text-right max-w-[60%]">{causeLabel}</span>
        </div>
        <Separator />
        <div className="flex justify-between">
          <span className="font-medium">Total</span>
          <span className="font-heading text-2xl font-semibold text-primary">
            {formatCurrency(amount)}
            {frequency === "monthly" && (
              <span className="text-sm font-normal text-muted-foreground">/mo</span>
            )}
          </span>
        </div>
        {giftAid && (
          <p className="rounded-lg bg-secondary p-3 text-xs text-secondary-foreground">
            Gift Aid declaration noted. We will claim an extra 25p for every £1 you donate
            (UK taxpayers).
          </p>
        )}

        <div className="space-y-3 pt-2">
          {[
            { icon: Shield, text: "Secure Donation via Stripe" },
            { icon: Eye, text: "Transparent Giving" },
            { icon: Heart, text: "Direct Community Impact" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-xs text-muted-foreground">
              <Icon className="h-4 w-4 text-primary" aria-hidden />
              {text}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
