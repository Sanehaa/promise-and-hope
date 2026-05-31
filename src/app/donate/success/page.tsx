import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { ShareMissionButton } from "@/components/donation/ShareMissionButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { resolveDonationForSuccessPage } from "@/lib/donations/complete-donation";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

type Props = {
  searchParams: Promise<{ session_id?: string }>;
};

function statusLabel(status: string): string {
  switch (status) {
    case "completed":
      return "Confirmed";
    case "pending":
      return "Processing";
    case "expired":
      return "Expired";
    default:
      return status;
  }
}

export default async function DonationSuccessPage({ searchParams }: Props) {
  const { session_id: sessionId } = await searchParams;
  const donation = sessionId
    ? await resolveDonationForSuccessPage(sessionId)
    : null;

  return (
    <section className="min-h-[70vh] flex items-center py-20">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 text-center">
        <ScrollReveal>
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
            <CheckCircle className="h-10 w-10 text-primary" aria-hidden />
          </div>
          <h1 className="font-heading text-4xl font-semibold text-balance">
            Thank You for Your Generosity
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Your gift is a promise of hope to someone who needs it today. Because of
            supporters like you, families receive food, children attend school, and
            communities find strength to rebuild.
          </p>

          {donation && (
            <Card className="mt-8 text-left border-primary/20">
              <CardContent className="p-6 space-y-3">
                <h2 className="font-heading text-lg font-semibold">Donation Confirmation</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Reference</span>
                    <span className="font-mono font-medium">{donation.reference}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Amount</span>
                    <span className="font-semibold text-primary">
                      {formatCurrency(donation.amount)}
                      {donation.frequency === "monthly" && "/month"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cause</span>
                    <span className="font-medium">{donation.cause.label}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <span
                      className={`font-medium ${
                        donation.status === "completed" ? "text-primary" : ""
                      }`}
                    >
                      {statusLabel(donation.status)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {!donation && sessionId && (
            <p className="mt-6 text-sm text-muted-foreground">
              Your payment is being processed. Confirmation details will appear shortly.
            </p>
          )}

          <p className="mt-8 text-muted-foreground">
            Your kindness creates ripples of hope that reach far beyond what we can see.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/">Return Home</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/projects">View Our Projects</Link>
            </Button>
            <ShareMissionButton />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
