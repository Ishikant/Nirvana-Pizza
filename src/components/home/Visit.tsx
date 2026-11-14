import Image from "next/image";
import { SliceMark } from "@/components/brand/SliceMark";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ExternalIcon, PhoneIcon, PinIcon } from "@/components/ui/Icons";
import { visit } from "@/content/home";
import { site } from "@/content/site";
import { formatPhone, formatTime, telHref } from "@/lib/format";
import { appleMapsUrl, directionsUrl, hasHours, hasPhone } from "@/lib/links";

/** Address, directions, phone and hours. Phone and hours appear once set in site.ts. */
export function Visit() {
  const { address } = site;

  return (
    <section id="visit" className="section-y bg-ink text-paper" aria-labelledby="visit-heading">
      <div className="shell grid gap-x-16 gap-y-12 lg:grid-cols-12">
        <div className="flex flex-col lg:col-span-5">
          <h2 id="visit-heading" className="text-title max-w-[12ch]">
            {visit.heading}
          </h2>
          <p className="text-lead mt-4 text-ash">{visit.body}</p>

          <address className="mt-9 font-display text-[clamp(1.375rem,6.6vw,2.375rem)] font-medium leading-[1.12] tracking-[-0.01em] not-italic">
            {address.street}
            <br />
            {address.city}, {address.region} {address.postalCode}
          </address>

          {hasHours ? (
            <dl className="mt-8 grid max-w-sm grid-cols-[auto_1fr] gap-x-8 gap-y-1.5 border-t border-smoke pt-5">
              {site.hours.map((h) => (
                <div key={h.label} className="contents">
                  <dt>{h.label}</dt>
                  <dd className="text-ash">
                    {formatTime(h.opens)} to {formatTime(h.closes)}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}

          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href={directionsUrl} external>
              <PinIcon />
              Get directions
            </ButtonLink>
            {hasPhone ? (
              <ButtonLink href={telHref(site.phone)} variant="light">
                <PhoneIcon />
                Call {formatPhone(site.phone)}
              </ButtonLink>
            ) : null}
          </div>

          <p className="text-small mt-4 text-ash">
            <a
              href={appleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline inline-flex min-h-11 items-center"
            >
              Open in Apple Maps
            </a>
          </p>
        </div>

        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block aspect-[4/3] overflow-hidden rounded-[2px] bg-coal lg:col-span-7 lg:aspect-auto lg:min-h-[28rem]"
        >
          {/* Contour lines, the way a trail map draws the Smokies. Decorative only. */}
          <Image
            src="/graphics/contours.svg"
            alt=""
            fill
            unoptimized
            className="object-cover transition-transform duration-700 ease-soft group-hover:scale-[1.03]"
          />

          <span className="absolute left-1/2 top-[44%] flex -translate-x-1/2 -translate-y-full flex-col items-center">
            <SliceMark detailed className="h-11 text-flame drop-shadow-[0_6px_10px_rgba(0,0,0,0.45)] sm:h-14" />
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-flame" />
          </span>

          <span className="text-small absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 sm:p-6">
            <span>
              <span className="block font-semibold">{site.name}</span>
              <span className="block text-ash">{address.street}</span>
            </span>
            <span className="flex flex-none items-center gap-1.5 text-ash transition-colors duration-200 group-hover:text-paper">
              Open map
              <span className="sr-only">in Google Maps (opens in a new tab)</span>
              <ExternalIcon width={18} height={18} />
            </span>
          </span>
        </a>
      </div>
    </section>
  );
}
