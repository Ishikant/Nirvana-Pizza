import Link from "next/link";
import { Lockup } from "@/components/brand/Wordmark";
import { FacebookIcon, InstagramIcon, TikTokIcon } from "@/components/ui/Icons";
import { site } from "@/content/site";
import { formatPhone, formatTime, telHref } from "@/lib/format";
import { directionsUrl, hasHours, hasPhone, orderingState, socialLinks } from "@/lib/links";

const socialIcons = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  tiktok: TikTokIcon,
} as const;

const heading = "text-fine font-semibold text-ash";
const link =
  "link-underline inline-flex min-h-11 items-center whitespace-nowrap text-paper/90 hover:text-paper md:min-h-9";

export function SiteFooter() {
  const socials = socialLinks();
  const ordering = orderingState();
  const { address } = site;

  return (
    <footer className="bg-ink text-paper">
      <div className="shell border-t border-smoke pb-[calc(7rem+env(safe-area-inset-bottom))] pt-14 md:pb-14 lg:pt-20">
        <div className="grid gap-x-10 gap-y-12 md:grid-cols-12">
          <div className="md:col-span-12 lg:col-span-5">
            <Link href="/" className="inline-block text-[2.25rem] sm:text-[2.75rem]">
              <Lockup detailed />
              <span className="sr-only">{site.name}, home</span>
            </Link>
            <p className="mt-7 max-w-[30ch] text-ash">
              Pizza, and a good deal more, in {address.city}, {address.regionName}.
            </p>
          </div>

          <div className="md:col-span-4 lg:col-span-3">
            <h2 className={heading}>Visit</h2>
            <address className="mt-3 not-italic leading-relaxed">
              {address.street}
              <br />
              {address.city}, {address.region} {address.postalCode}
            </address>
            <p className="mt-2">
              <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className={link}>
                Get directions
              </a>
            </p>
            {hasPhone ? (
              <p>
                <a href={telHref(site.phone)} className={link}>
                  {formatPhone(site.phone)}
                </a>
              </p>
            ) : null}
            {site.email ? (
              <p>
                <a href={`mailto:${site.email}`} className={link}>
                  {site.email}
                </a>
              </p>
            ) : null}
          </div>

          {hasHours ? (
            <div className="md:col-span-4">
              <h2 className={heading}>Hours</h2>
              <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-6 gap-y-1.5 leading-relaxed">
                {site.hours.map((h) => (
                  <div key={h.label} className="contents">
                    <dt>{h.label}</dt>
                    <dd className="text-ash">
                      {formatTime(h.opens)} to {formatTime(h.closes)}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ) : null}

          <nav aria-label="Footer" className={hasHours ? "md:col-span-6" : "md:col-span-4 lg:col-span-2"}>
            <h2 className={heading}>Explore</h2>
            <ul className="mt-2">
              <li>
                <Link href="/menu" className={link}>
                  Menu
                </Link>
              </li>
              <li>
                <Link href="/#food" className={link}>
                  Our food
                </Link>
              </li>
              <li>
                <Link href="/#visit" className={link}>
                  Visit
                </Link>
              </li>
              {ordering !== "off" ? (
                <li>
                  <Link href="/#order" className={link}>
                    Order online
                  </Link>
                </li>
              ) : null}
            </ul>
          </nav>

          {socials.length > 0 ? (
            <div className="md:col-span-4 lg:col-span-2">
              <h2 className={heading}>Follow</h2>
              <ul className="-ml-2.5 mt-2 flex gap-1">
                {socials.map((s) => {
                  const Icon = socialIcons[s.id];
                  return (
                    <li key={s.id}>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${site.name} on ${s.name}`}
                        className="flex h-11 w-11 items-center justify-center text-paper/85 transition-colors duration-200 hover:text-flame"
                      >
                        <Icon width={22} height={22} />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}
        </div>

        <p className="text-fine mt-14 text-ash">© {site.name}</p>
      </div>
    </footer>
  );
}
