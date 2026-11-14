import type { Metadata } from "next";
import { MenuPage } from "@/components/menu/MenuPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/content/site";
import { baseOpenGraph } from "@/lib/seo";
import { menuJsonLd } from "@/lib/structured-data";

const description = `The full ${site.name} menu with prices: pizzas, butter chicken and tandoori pizzas, curry wraps, appetizers, sandwiches, salads, pasta, entrées, desserts and drinks.`;

export const metadata: Metadata = {
  title: "Menu",
  description,
  alternates: { canonical: "/menu" },
  openGraph: {
    ...baseOpenGraph,
    url: "/menu",
    title: `Menu | ${site.name}`,
    description,
  },
};

export default function Page() {
  return (
    <>
      <MenuPage />
      <JsonLd data={menuJsonLd()} />
    </>
  );
}
