import type { Metadata } from "next";
import { site } from "@/content/site";

/** The picture shown when a link to the site is shared (public/og.png, 1200 x 630). */
export const shareImage = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: `${site.name}, pizza in ${site.address.city}, ${site.address.regionName}`,
};

/** Open Graph fields every page shares. Pages add their own url, title and description. */
export const baseOpenGraph: NonNullable<Metadata["openGraph"]> = {
  type: "website",
  siteName: site.name,
  locale: "en_US",
  images: [shareImage],
};
