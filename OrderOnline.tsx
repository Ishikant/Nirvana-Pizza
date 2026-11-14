import { ButtonLink } from "@/components/ui/ButtonLink";
import { ExternalIcon } from "@/components/ui/Icons";
import { ordering as copy } from "@/content/home";
import {
  announcedOrderingProviders,
  directionsUrl,
  liveOrderingProviders,
  orderingState,
} from "@/lib/links";

/**
 * Online ordering. Fill in a service's URL in src/content/site.ts and its
 * row here becomes a working link. Services without a URL are shown as
 * "coming soon" (or not at all, see site.ts). No URL is ever invented.
 */
export function OrderOnline() {
  const state = orderingState();
  if (state === "off") return null;

  const live = liveOrderingProviders();
  const soon = announcedOrderingProviders();

  return (
    <section
      id="order"
      className="on-paper bg-stone text-soot"
      aria-labelledby="order-heading"
    >
      <div className="shell grid gap-x-16 gap-y-10 py-16 lg:grid-cols-12 lg:items-center lg:py-24">
        <div className="lg:col-span-5">
          <h2 id="order-heading" className="text-title">
            {copy.heading}
          </h2>
          <p className="text-lead mt-4 max-w-[36ch] text-clay">
            {state === "live" ? copy.liveBody : copy.comingSoonBody}
          </p>
          {state === "soon" ? (
            <ButtonLink href={directionsUrl} external variant="ink" className="mt-7">
              Get directions
            </ButtonLink>
          ) : null}
        </div>

        <ul className="border-t border-soot/15 lg:col-span-6 lg:col-start-7">
          {live.map((provider) => (
            <li key={provider.id} className="border-b border-soot/15">
              <a
                href={provider.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-[4.5rem] items-center justify-between gap-4 py-4"
              >
                <span className="text-heading">{provider.name}</span>
                <span className="text-small flex items-center gap-2 font-semibold transition-colors duration-200 group-hover:text-ember">
                  Order now
                  <ExternalIcon className="transition-transform duration-300 ease-soft group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  <span className="sr-only">(opens in a new tab)</span>
                </span>
              </a>
            </li>
          ))}
          {soon.map((provider) => (
            <li
              key={provider.id}
              className="flex min-h-[4.5rem] items-center justify-between gap-4 border-b border-soot/15 py-4"
            >
              <span className="text-heading text-soot/65">{provider.name}</span>
              <span className="text-small text-clay">Coming soon</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
