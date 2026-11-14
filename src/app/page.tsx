import type { Metadata } from "next";
import { HomePage } from "@/components/home/HomePage";
import { site } from "@/content/site";
import { baseOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    ...baseOpenGraph,
    url: "/",
    title: `${site.name} | Pizza in ${site.address.city}, ${site.address.region}`,
    description: site.description,
  },
};

export default function Page() {
  return <HomePage />;
}
