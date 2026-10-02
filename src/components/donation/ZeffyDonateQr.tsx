import Image from "next/image";
import { getZeffyDonationUrl } from "@/lib/zeffy";
import { Card, CardContent } from "@/components/ui/card";

export function ZeffyDonateQr() {
  const url = getZeffyDonationUrl();

  return (
    <Card className="mt-8 border-primary/20">
      <CardContent className="flex flex-col items-center gap-4 p-6 text-center sm:flex-row sm:text-left">
        <Image
          src="/images/donate/zeffy-donate-qr.png"
          alt="QR code to donate to Promise and Hope via Zeffy"
          width={140}
          height={140}
          className="rounded-lg border border-border bg-white p-2"
        />
        <div>
          <h3 className="font-heading text-lg font-semibold">Scan to donate</h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            Point your phone camera at this code to open our secure Zeffy donation form.
          </p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-sm font-medium text-primary hover:underline"
          >
            Open donation form
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
