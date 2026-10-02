export type BankDetails = {
  accountName: string;
  bankName: string;
  sortCode: string;
  accountNumber: string;
};

export const DEFAULT_BANK_DETAILS: BankDetails = {
  accountName: "Promise and Hope Ltd",
  bankName: "HSBC",
  sortCode: "40-35-18",
  accountNumber: "94844025",
};

export function formatSortCode(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.length !== 6) return raw;
  return `${digits.slice(0, 2)}-${digits.slice(2, 4)}-${digits.slice(4, 6)}`;
}

export function bankDetailsFromSettings(
  settings: Record<string, string | undefined>
): BankDetails {
  const sortRaw = settings["donation.bank.sort_code"] ?? "403518";
  return {
    accountName: settings["donation.bank.account_name"] ?? DEFAULT_BANK_DETAILS.accountName,
    bankName: settings["donation.bank.bank_name"] ?? DEFAULT_BANK_DETAILS.bankName,
    sortCode: formatSortCode(sortRaw),
    accountNumber:
      settings["donation.bank.account_number"] ?? DEFAULT_BANK_DETAILS.accountNumber,
  };
}
