/** Promise and Hope Square payment link — https://square.link/u/YB8kQy0g */
export const DEFAULT_SQUARE_PAYMENT_LINK = "https://square.link/u/YB8kQy0g";

export function getSquarePaymentLink(): string {
  return process.env.NEXT_PUBLIC_SQUARE_PAYMENT_LINK?.trim() || DEFAULT_SQUARE_PAYMENT_LINK;
}
