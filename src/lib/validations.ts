import { z } from "zod";

export const contactFormSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  subject: z.string().min(3, "Please enter a subject"),
  message: z.string().min(10, "Please enter a message of at least 10 characters"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export type NewsletterFormValues = z.infer<typeof newsletterSchema>;

export const donationFormSchema = z.object({
  frequency: z.enum(["one-time", "monthly"]),
  amount: z.number().min(1, "Please select or enter a donation amount"),
  customAmount: z.string().optional(),
  cause: z.string().min(1, "Please select a cause"),
  fullName: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  address: z.string().optional(),
  message: z.string().optional(),
  anonymous: z.boolean(),
  giftAid: z.boolean(),
});

export type DonationFormValues = z.infer<typeof donationFormSchema>;
