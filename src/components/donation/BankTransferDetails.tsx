import { Building2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { BankDetails } from "@/lib/bank-details";

type BankTransferDetailsProps = {
  bank: BankDetails;
  id?: string;
};

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:justify-between sm:gap-4">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-semibold tabular-nums text-foreground">{value}</dd>
    </div>
  );
}

export function BankTransferDetails({ bank, id = "bank-transfer" }: BankTransferDetailsProps) {
  return (
    <Card id={id} className="border-primary/25 shadow-md scroll-mt-24">
      <CardHeader>
        <CardTitle className="font-heading text-xl flex items-center gap-2">
          <Building2 className="h-5 w-5 text-primary" aria-hidden />
          Donate by bank transfer (HSBC)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          Please transfer your gift directly to our HSBC account. Use your name as the payment
          reference so we can thank you and allocate your donation correctly.
        </p>
        <dl className="grid gap-3 rounded-xl bg-secondary/40 p-4 text-sm">
          <DetailRow label="Account name" value={bank.accountName} />
          <DetailRow label="Bank" value={bank.bankName} />
          <DetailRow label="Sort code" value={bank.sortCode} />
          <DetailRow label="Account number" value={bank.accountNumber} />
        </dl>
        <p className="text-xs text-muted-foreground">
          After paying, you may email us at{" "}
          <a href="mailto:promiseandhope@outlook.com" className="text-primary hover:underline">
            promiseandhope@outlook.com
          </a>{" "}
          with your name and amount if you would like a receipt.
        </p>
      </CardContent>
    </Card>
  );
}
