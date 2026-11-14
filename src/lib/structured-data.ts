import { menu } from "@/content/menu";
import { site } from "@/content/site";
import { socialLinks } from "@/lib/links";

/**
 * schema.org data for search engines. Only facts that are filled in
 * src/content/site.ts are included, so nothing here is ever a guess.
 */

const restaurantId = `${site.url}/#restaurant`;

export function restaurantJsonLd(image?: string | null) {
  const sameAs = socialLinks().map((s) => s.url);
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": restaurantId,
    name: site.name,
    url: site.url,
    description: site.description,
    servesCuisine: ["Pizza"],
    hasMenu: `${site.url}/menu`,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    ...(site.phone ? { telephone: `+1${site.phone.replace(/\D/g, "").replace(/^1(?=\d{10}$)/, "")}` } : {}),
    ...(site.email ? { email: site.email } : {}),
    ...(image ? { image: `${site.url}${image}` } : {}),
    ...(sameAs.length ? { sameAs } : {}),
    ...(site.hours.length
      ? {
          openingHoursSpecification: site.hours.map((h) => ({
            "@type": "OpeningHoursSpecification",
            dayOfWeek: h.days,
            opens: h.opens,
            closes: h.closes,
          })),
        }
      : {}),
  };
}

export function menuJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    "@id": `${site.url}/menu#menu`,
    name: `${site.name} menu`,
    url: `${site.url}/menu`,
    inLanguage: "en-US",
    hasMenuSection: menu.map((category) => ({
      "@type": "MenuSection",
      name: category.name,
      ...(category.note ? { description: category.note } : {}),
      hasMenuItem: category.items.map((item) => ({
        "@type": "MenuItem",
        name: item.name,
        ...(item.description ? { description: item.description } : {}),
        offers:
          typeof item.price === "number"
            ? { "@type": "Offer", price: item.price.toFixed(2), priceCurrency: "USD" }
            : item.price.map((p) => ({
                "@type": "Offer",
                name: p.label.replace(/\s+for$/, ""),
                price: p.amount.toFixed(2),
                priceCurrency: "USD",
              })),
      })),
    })),
  };
}
