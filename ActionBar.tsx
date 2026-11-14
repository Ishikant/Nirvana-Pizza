"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BagIcon, MenuIcon, PhoneIcon, PinIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";

/**
 * The bar pinned to the bottom of a phone screen with the things people
 * come for: the menu, directions, a call, an order.
 *
 * On the home page it stays out of the way until the hero buttons have
 * scrolled off (see HeroActions), so the same actions are never on screen twice.
 */

export type BarAction = {
  id: "menu" | "directions" | "call" | "order";
  label: string;
  href: string;
  /** Opens outside the site (maps, another website). */
  external?: boolean;
  /** Drawn in orange. Give this to one action only. */
  primary?: boolean;
};

const icons = {
  menu: MenuIcon,
  directions: PinIcon,
  call: PhoneIcon,
  order: BagIcon,
} as const;

export function ActionBar({ actions }: { actions: BarAction[] }) {
  const pathname = usePathname();
  const onHome = pathname === "/";

  const shown = actions.filter((a) => !(a.id === "menu" && pathname === "/menu"));
  if (shown.length === 0) return null;

  const roomy = shown.length <= 2;
  // If the usual main action is hidden on this page, the first one takes over.
  const primaryId = (shown.find((a) => a.primary) ?? shown[0]).id;

  return (
    <nav
      aria-label="Quick actions"
      className={cn(
        "action-bar fixed inset-x-0 bottom-0 z-50 border-t border-smoke bg-ink/95 text-paper backdrop-blur-md md:hidden",
        "pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]",
        // On the home page the bar waits until the hero buttons are out of view.
        onHome && "await-hero",
      )}
    >
      <ul className="grid auto-cols-fr grid-flow-col divide-x divide-smoke">
        {shown.map((action) => {
          const Icon = icons[action.id];
          const classes = cn(
            "flex h-[3.75rem] w-full items-center justify-center font-semibold transition-colors duration-200 active:bg-coal",
            roomy ? "gap-2.5 text-[0.9375rem]" : "flex-col gap-1 text-[0.75rem]",
            action.id === primaryId ? "text-flame" : "text-paper",
          );
          const content = (
            <>
              <Icon width={roomy ? 20 : 22} height={roomy ? 20 : 22} />
              <span>{action.label}</span>
            </>
          );
          return (
            <li key={action.id}>
              {action.external || !action.href.startsWith("/") ? (
                <a
                  href={action.href}
                  className={classes}
                  {...(action.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {content}
                </a>
              ) : (
                <Link href={action.href} className={classes}>
                  {content}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
