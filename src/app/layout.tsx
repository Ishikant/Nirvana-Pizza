import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { JsonLd } from "@/components/seo/JsonLd";
import { photoSlots } from "@/content/photos";
import { site } from "@/content/site";
import { findPhoto } from "@/lib/photos";
import { baseOpenGraph, shareImage } from "@/lib/seo";
import { restaurantJsonLd } from "@/lib/structured-data";
import "./globals.css";

// Both typefaces are served from this site (no third-party font requests).
const bodoni = localFont({
  src: "./fonts/BodoniModa-Variable.woff2",
  weight: "400 900",
  style: "normal",
  variable: "--font-bodoni",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

const figtree = localFont({
  src: "./fonts/Figtree-Variable.woff2",
  weight: "300 900",
  style: "normal",
  variable: "--font-figtree",
  display: "swap",
  adjustFontFallback: "Arial",
});

const title = `${site.name} | Pizza in ${site.address.city}, ${site.address.region}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    ...baseOpenGraph,
    title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImage.url],
  },
  formatDetection: { telephone: false, address: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0d0c0b",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${bodoni.variable} ${figtree.variable}`}>
      <body>
        <SiteChrome>{children}</SiteChrome>
        <JsonLd data={restaurantJsonLd(findPhoto(photoSlots.hero.file))} />
      </body>
    </html>
  );
}
