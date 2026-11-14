import { site } from "@/content/site";

const { address } = site;

export const addressLine = `${address.street}, ${address.city}, ${address.region} ${address.postalCode}`;

const destination = encodeURIComponent(`${site.name}, ${addressLine}`);

/** Opens turn-by-turn directions in Google Maps (or the Maps app on a phone). */
export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;

/** Opens the location in Apple Maps. */
export const appleMapsUrl = `https://maps.apple.com/?daddr=${encodeURIComponent(addressLine)}`;

export function liveOrderingProviders() {
  return site.ordering.providers.filter((p) => p.url.trim() !== "");
}

export function announcedOrderingProviders() {
  return site.ordering.providers.filter((p) => p.url.trim() === "" && p.announce);
}

/**
 * "live": at least one service has a URL.
 * "soon": none yet, but the coming-soon note is switched on.
 * "off":  nothing about ordering is shown anywhere.
 */
export function orderingState(): "live" | "soon" | "off" {
  if (liveOrderingProviders().length > 0) return "live";
  if (site.ordering.showComingSoon && announcedOrderingProviders().length > 0) return "soon";
  return "off";
}

export function socialLinks() {
  const entries = [
    { id: "instagram", name: "Instagram", url: site.social.instagram },
    { id: "facebook", name: "Facebook", url: site.social.facebook },
    { id: "tiktok", name: "TikTok", url: site.social.tiktok },
  ] as const;
  return entries.filter((e) => e.url.trim() !== "");
}

export const hasPhone = site.phone.trim() !== "";
export const hasHours = site.hours.length > 0;
