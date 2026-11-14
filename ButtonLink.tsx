import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * The site's one button. It is always a link, because every action here
 * goes somewhere: a page, a section, the phone dialer or a maps app.
 *
 * flame   solid orange, the single main action in a view
 * light   outlined, for use on black
 * ink     solid black, the main action on paper
 * dark    outlined, for use on paper
 */
type Variant = "flame" | "light" | "ink" | "dark";

const base =
  "group/btn inline-flex min-h-12 items-center justify-center gap-2.5 rounded-[2px] px-6 py-3 text-[0.9375rem] font-semibold leading-none tracking-[0.005em] transition-[background-color,border-color,color,transform] duration-200 ease-soft active:scale-[0.98]";

const variants: Record<Variant, string> = {
  flame: "bg-flame text-ink hover:bg-paper",
  light: "border border-ash/45 text-paper hover:border-paper hover:bg-paper hover:text-ink",
  ink: "bg-soot text-paper hover:bg-ember",
  dark: "border border-soot/30 text-soot hover:border-soot hover:bg-soot hover:text-paper",
};

export function ButtonLink({
  href,
  variant = "flame",
  external = false,
  className,
  children,
  ...rest
}: {
  href: string;
  variant?: Variant;
  /** Opens in a new tab. Use for other websites, not for tel: or page links. */
  external?: boolean;
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
}) {
  const classes = cn(base, variants[variant], className);
  const isPlainAnchor = external || /^(tel:|mailto:|https?:)/.test(href);

  if (isPlainAnchor) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}
