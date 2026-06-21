export function getGoogleMapsSearchUrl(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function getGoogleMapsEmbedUrl(query: string, zoom = 15): string {
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=${zoom}&output=embed`;
}

/** Primary Promise and Hope contact details (UK registered office). */
export const ORG_CONTACT = {
  email: "promiseandhope@outlook.com",
  phone: "+44 7477 860805",
  address: "47 Findern Green, Sneinton, Nottingham, NG3 7BU",
} as const;
