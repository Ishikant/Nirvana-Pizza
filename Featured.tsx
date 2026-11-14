import { ButtonLink } from "@/components/ui/ButtonLink";
import { Photo } from "@/components/ui/Photo";
import { featured } from "@/content/home";
import { priceLines } from "@/lib/format";
import { findMenuItem, type LocatedItem } from "@/lib/menu";
import { findMenuPhoto } from "@/lib/photos";

/**
 * A lead dish and a short list beside it. Names, prices and descriptions
 * come straight from the menu, so this section can never disagree with it.
 */
export function Featured() {
  const dishes = featured.itemIds
    .map((id) => findMenuItem(id))
    .filter((d): d is LocatedItem => d !== null);
  if (dishes.length === 0) return null;

  const [lead, ...rest] = dishes;

  return (
    <section id="featured" className="section-y bg-ink text-paper" aria-labelledby="featured-heading">
      <div className="shell">
        <div className="max-w-2xl">
          <h2 id="featured-heading" className="text-title">
            {featured.heading}
          </h2>
          <p className="text-lead mt-4 text-ash">{featured.body}</p>
        </div>

        <div className="mt-10 grid gap-x-14 gap-y-10 lg:mt-16 lg:grid-cols-12">
          <article className="lg:col-span-7">
            <Photo
              src={findMenuPhoto(lead.item.id)}
              alt={lead.item.name}
              label={`${lead.item.name} photo`}
              file={`menu/${lead.item.id}`}
              sizes="(min-width: 64rem) 55vw, 100vw"
              tone="dark"
              variant={0}
              className="aspect-[4/3]"
            />
            <div className="mt-5 flex items-baseline justify-between gap-6">
              <h3 className="text-heading">{lead.item.name}</h3>
              <p className="text-lead flex-none tabular-nums text-flame">
                {priceLines(lead.item.price).join(", ")}
              </p>
            </div>
            {lead.item.description ? (
              <p className="mt-2 max-w-[52ch] text-ash">{lead.item.description}</p>
            ) : null}
          </article>

          {rest.length > 0 ? (
            <ul className="divide-y divide-smoke border-y border-smoke lg:col-span-5 lg:self-start">
              {rest.map(({ item }, i) => (
                <li
                  key={item.id}
                  className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-4 py-5 sm:grid-cols-[7.5rem_minmax(0,1fr)] sm:gap-6 sm:py-6"
                >
                  <Photo
                    src={findMenuPhoto(item.id)}
                    alt={item.name}
                    label={`${item.name} photo`}
                    file={`menu/${item.id}`}
                    sizes="(min-width: 40rem) 120px, 88px"
                    tone="dark"
                    variant={i + 1}
                    showGuide={false}
                    className="aspect-square self-start"
                  />
                  <div>
                    <h3 className="text-subheading">{item.name}</h3>
                    <p className="mt-0.5 tabular-nums text-flame">
                      {priceLines(item.price).join(", ")}
                    </p>
                    {item.description ? (
                      <p className="text-small mt-1.5 text-ash">{item.description}</p>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <ButtonLink href="/menu" variant="light" className="mt-10 lg:mt-14">
          View the whole menu
        </ButtonLink>
      </div>
    </section>
  );
}
