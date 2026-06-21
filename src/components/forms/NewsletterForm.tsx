"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { newsletterSchema, type NewsletterFormValues } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type NewsletterFormProps = {
  variant?: "default" | "footer" | "inline";
  className?: string;
};

export function NewsletterForm({ variant = "default", className }: NewsletterFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (data: NewsletterFormValues) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to subscribe");
      toast.success("Thank you for subscribing!");
      reset();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFooter = variant === "footer";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn(
        "flex flex-col gap-3",
        variant === "inline" && "sm:flex-row sm:items-end",
        className
      )}
      noValidate
    >
      <div className={cn("flex-1", variant === "inline" && "sm:max-w-md")}>
        <Label htmlFor="newsletter-email" className={cn(isFooter && "text-primary-foreground/90")}>
          Email address
        </Label>
        <Input
          id="newsletter-email"
          type="email"
          placeholder="promiseandhope@outlook.com"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "newsletter-email-error" : undefined}
          className={cn("mt-1.5", isFooter && "bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50")}
          {...register("email")}
        />
        {errors.email && (
          <p id="newsletter-email-error" className="mt-1 text-xs text-destructive" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>
      <Button
        type="submit"
        variant={isFooter ? "accent" : "default"}
        disabled={isSubmitting}
        className={variant === "inline" ? "shrink-0" : ""}
      >
        {isSubmitting ? "Subscribing..." : "Subscribe"}
      </Button>
    </form>
  );
}
