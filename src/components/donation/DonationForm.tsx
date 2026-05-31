"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Lock } from "lucide-react";
import { donationFormSchema, type DonationFormValues } from "@/lib/validations";
import type { DonationCauseItem } from "@/types/content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DonationSummary } from "./DonationSummary";
import { cn, formatCurrency } from "@/lib/utils";

type DonationFormProps = {
  causes: DonationCauseItem[];
  suggestedAmounts: number[];
  projectId?: string;
};

export function DonationForm({ causes, suggestedAmounts, projectId }: DonationFormProps) {
  const defaultAmount = suggestedAmounts.includes(25) ? 25 : suggestedAmounts[0] ?? 25;
  const [selectedPreset, setSelectedPreset] = useState<number | null>(defaultAmount);
  const [isCustom, setIsCustom] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<DonationFormValues>({
    resolver: zodResolver(donationFormSchema),
    defaultValues: {
      frequency: "one-time",
      amount: defaultAmount,
      cause: causes[0]?.slug ?? "",
      anonymous: false,
      giftAid: false,
    },
  });

  const frequency = watch("frequency");
  const amount = watch("amount");
  const cause = watch("cause");
  const giftAid = watch("giftAid");

  const selectAmount = (value: number) => {
    setSelectedPreset(value);
    setIsCustom(false);
    setValue("amount", value, { shouldValidate: true });
  };

  const onSubmit = async (data: DonationFormValues) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/donate/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, projectId }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error ?? "Checkout failed");
      if (result.url) {
        window.location.href = result.url;
        return;
      }
      throw new Error("No checkout URL returned");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-8 lg:grid-cols-3" noValidate>
      <div className="space-y-6 lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-lg">Donation Frequency</CardTitle>
          </CardHeader>
          <CardContent>
            <Controller
              name="frequency"
              control={control}
              render={({ field }) => (
                <div className="flex rounded-xl bg-muted p-1" role="group" aria-label="Donation frequency">
                  {(["one-time", "monthly"] as const).map((freq) => (
                    <button
                      key={freq}
                      type="button"
                      onClick={() => field.onChange(freq)}
                      className={cn(
                        "flex-1 rounded-lg py-2.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        field.value === freq
                          ? "bg-card text-primary shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                      aria-pressed={field.value === freq}
                    >
                      {freq === "one-time" ? "One-time" : "Monthly"}
                    </button>
                  ))}
                </div>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-lg">Select Amount</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
              {suggestedAmounts.map((preset) => (
                <motion.button
                  key={preset}
                  type="button"
                  whileTap={{ scale: 0.97 }}
                  onClick={() => selectAmount(preset)}
                  className={cn(
                    "rounded-xl border-2 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    selectedPreset === preset && !isCustom
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card hover:border-primary/50"
                  )}
                  aria-pressed={selectedPreset === preset && !isCustom}
                >
                  {formatCurrency(preset)}
                </motion.button>
              ))}
            </div>
            <div>
              <button
                type="button"
                onClick={() => {
                  setIsCustom(true);
                  setSelectedPreset(null);
                }}
                className={cn(
                  "mb-2 text-sm font-medium",
                  isCustom ? "text-primary" : "text-muted-foreground hover:text-primary"
                )}
              >
                Custom amount
              </button>
              <AnimatePresence>
                {isCustom && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <Label htmlFor="customAmount">Enter amount (£)</Label>
                    <Input
                      id="customAmount"
                      type="number"
                      min={1}
                      step={1}
                      className="mt-1.5"
                      onChange={(e) =>
                        setValue("amount", Number(e.target.value) || 0, {
                          shouldValidate: true,
                        })
                      }
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {errors.amount && (
              <p className="text-xs text-destructive" role="alert">
                {errors.amount.message}
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-lg">Choose a Cause</CardTitle>
          </CardHeader>
          <CardContent>
            <Controller
              name="cause"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger aria-label="Select donation cause">
                    <SelectValue placeholder="Select a cause" />
                  </SelectTrigger>
                  <SelectContent>
                    {causes.map((c) => (
                      <SelectItem key={c.slug} value={c.slug}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-lg">Your Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="donorName">Full Name *</Label>
                <Input id="donorName" className="mt-1.5" {...register("fullName")} />
                {errors.fullName && (
                  <p className="mt-1 text-xs text-destructive">{errors.fullName.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="donorEmail">Email Address *</Label>
                <Input id="donorEmail" type="email" className="mt-1.5" {...register("email")} />
                {errors.email && (
                  <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>
                )}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="donorPhone">Phone (optional)</Label>
                <Input id="donorPhone" type="tel" className="mt-1.5" {...register("phone")} />
              </div>
              <div>
                <Label htmlFor="donorAddress">Billing Address (optional)</Label>
                <Input id="donorAddress" className="mt-1.5" {...register("address")} />
              </div>
            </div>
            <div>
              <Label htmlFor="donorMessage">Message (optional)</Label>
              <Textarea id="donorMessage" className="mt-1.5" rows={3} {...register("message")} />
            </div>
            <div className="space-y-3">
              <Controller
                name="anonymous"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="anonymous"
                      checked={field.value}
                      onCheckedChange={(v) => field.onChange(v === true)}
                    />
                    <Label htmlFor="anonymous" className="font-normal cursor-pointer">
                      Donate anonymously
                    </Label>
                  </div>
                )}
              />
              <Controller
                name="giftAid"
                control={control}
                render={({ field }) => (
                  <div className="flex items-start gap-2">
                    <Checkbox
                      id="giftAid"
                      checked={field.value}
                      onCheckedChange={(v) => field.onChange(v === true)}
                      className="mt-0.5"
                    />
                    <Label htmlFor="giftAid" className="font-normal cursor-pointer leading-relaxed">
                      I am a UK taxpayer and wish to claim Gift Aid on my donation
                    </Label>
                  </div>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20 bg-secondary/20">
          <CardContent className="flex items-center gap-3 p-4">
            <Lock className="h-5 w-5 shrink-0 text-primary" aria-hidden />
            <p className="text-sm text-muted-foreground">
              You will be redirected to Stripe&apos;s secure checkout to complete your payment.
            </p>
          </CardContent>
        </Card>

        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting
            ? "Redirecting to secure checkout..."
            : `Continue to Payment — ${formatCurrency(amount)}`}
        </Button>
      </div>

      <div>
        <DonationSummary
          frequency={frequency}
          amount={amount}
          causeSlug={cause}
          causes={causes}
          giftAid={giftAid}
        />
      </div>
    </form>
  );
}
