import type { ReactNode } from "react";
import { ActionBar, type BarAction } from "@/components/layout/ActionBar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { site } from "@/content/site";
import { telHref } from "@/lib/format";
import { directionsUrl, hasPhone, orderingState } from "@/lib/links";

/** Builds the phone action bar from whatever is filled in in site.ts. */
function barActions(): BarAction[] {
  const orderingLive = orderingState() === "live";
  const actions: BarAction[] = [
    { id: "menu", label: "Menu", href: "/menu", primary: !orderingLive },
    { id: "directions", label: "Directions", href: directionsUrl, external: true },
  ];
  if (hasPhone) actions.push({ id: "call", label: "Call", href: telHref(site.phone) });
  if (orderingLive) actions.push({ id: "order", label: "Order", href: "/#order", primary: true });
  return actions;
}

/** Everything that wraps a page: skip link, header, footer, phone action bar. */
export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[60] focus:rounded-[2px] focus:bg-paper focus:px-4 focus:py-3 focus:font-semibold focus:text-soot"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">{children}</main>
      <SiteFooter />
      <ActionBar actions={barActions()} />
    </>
  );
}
