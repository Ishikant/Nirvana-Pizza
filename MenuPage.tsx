import { MenuNav } from "@/components/menu/MenuNav";
import { MenuSection } from "@/components/menu/MenuSection";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { PhoneIcon, PinIcon } from "@/components/ui/Icons";
import { menu } from "@/content/menu";
import { site } from "@/content/site";
import { formatPhone, telHref } from "@/lib/format";
import { directionsUrl, hasPhone, orderingState } from "@/lib/links";

export function MenuPage() {
  const categories = menu.map(({ id, name }) => ({ id, name }));
  const ordering = orderingState();

  return (
    <>
      <div className="on-paper bg-paper text-soot">
        <div className="shell pb-8 pt-12 sm:pt-16 lg:pb-14 lg:pt-20">
          <h1 className="text-hero">Menu</h1>
        </div>

        <div className="shell pb-16 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:pb-28">
          <MenuNav
            categories={categories}
            className="bleed-x sticky top-0 z-30 border-y border-rule bg-paper/95 backdrop-blur-md md:top-16 lg:top-[6.75rem] lg:col-span-3 lg:mx-0 lg:self-start lg:border-0 lg:bg-transparent lg:backdrop-blur-none"
          />

          <div className="lg:col-span-9">
            {menu.map((category) => (
              <MenuSection key={category.id} category={category} />
            ))}
          </div>
        </div>
      </div>

      <section className="bg-ink text-paper" aria-labelledby="menu-visit-heading">
        <div className="shell flex flex-col gap-8 py-16 md:flex-row md:items-end md:justify-between lg:py-24">
          <div>
            <h2 id="menu-visit-heading" className="text-title">
              See you on Teaster Lane.
            </h2>
            <address className="text-lead mt-4 not-italic text-ash">
              {site.address.street}, {site.address.city}, {site.address.region}{" "}
              {site.address.postalCode}
            </address>
          </div>
          <div className="flex flex-wrap gap-3">
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
            {ordering === "live" ? (
              <ButtonLink href="/#order" variant="light">
                Order online
              </ButtonLink>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
}
