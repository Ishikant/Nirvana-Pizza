import Link from "next/link";
import { Lockup } from "@/components/brand/Wordmark";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { site } from "@/content/site";
import { formatPhone, telHref } from "@/lib/format";
import { directionsUrl, hasPhone, orderingState } from "@/lib/links";

const navLink =
  "relative inline-flex min-h-11 items-center px-3 text-[0.9375rem] font-medium text-paper/85 transition-colors duration-200 hover:text-paper after:absolute after:inset-x-3 after:bottom-2 after:h-px after:origin-left after:scale-x-0 after:bg-flame after:transition-transform after:duration-300 after:ease-soft hover:after:scale-x-100";

export function SiteHeader() {
  const ordering = orderingState();

  return (
    <header className="border-b border-smoke bg-ink text-paper md:sticky md:top-0 md:z-40">
      <div className="shell flex h-16 items-center justify-between gap-4 lg:h-[4.75rem]">
        <Link href="/" className="-my-2 py-2 text-[1.3125rem] lg:text-[1.5rem]">
          <Lockup />
          <span className="sr-only">{site.name}, home</span>
        </Link>

        <nav aria-label="Main">
          <ul className="-mr-3 flex items-center lg:mr-0 lg:gap-1">
            <li>
              <Link href="/menu" className={navLink}>
                Menu
              </Link>
            </li>
            <li>
              <Link href="/#visit" className={navLink}>
                Visit
              </Link>
            </li>
            {ordering === "live" ? (
              <li className="hidden sm:block">
                <Link href="/#order" className={navLink}>
                  Order online
                </Link>
              </li>
            ) : null}
            {hasPhone ? (
              <li className="hidden lg:block">
                <a href={telHref(site.phone)} className={navLink}>
                  {formatPhone(site.phone)}
                </a>
              </li>
            ) : null}
            <li className="ml-4 hidden lg:block">
              <ButtonLink href={directionsUrl} external variant="light" className="min-h-11 px-5">
                Get directions
              </ButtonLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
