import { MenuItemRow } from "@/components/menu/MenuItemRow";
import type { MenuCategory } from "@/content/menu";
import { formatAmount } from "@/lib/format";
import { findMenuPhoto } from "@/lib/photos";

export function MenuSection({ category }: { category: MenuCategory }) {
  const titleId = `${category.id}-title`;

  return (
    <section
      id={category.id}
      aria-labelledby={titleId}
      className="scroll-mt-[3.25rem] border-t border-rule py-10 first:border-t-0 first:pt-4 lg:scroll-mt-8 lg:py-14 lg:first:pt-0"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1.5">
        <h2 id={titleId} className="text-heading">
          {category.name}
        </h2>
        {category.note ? <p className="text-small text-clay">{category.note}</p> : null}
      </div>

      <ul className="mt-7 grid gap-x-14 gap-y-7 md:grid-cols-2 lg:mt-9">
        {category.items.map((item) => (
          <MenuItemRow key={item.id} item={item} photo={findMenuPhoto(item.id)} />
        ))}
      </ul>

      {category.addOns || category.details ? (
        <div className="text-small mt-8 grid gap-x-14 gap-y-5 border-t border-dashed border-rule pt-6 md:grid-cols-2">
          {category.addOns ? (
            <div>
              <h3 className="font-semibold">{category.addOns.title}</h3>
              <ul className="mt-1.5 text-clay">
                {category.addOns.options.map((option) => (
                  <li key={option.name} className="flex items-baseline justify-between gap-4 py-0.5">
                    <span>{option.name}</span>
                    <span className="flex-none tabular-nums">+{formatAmount(option.amount)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {category.details?.map((detail) => (
            <div key={detail.title}>
              <h3 className="font-semibold">{detail.title}</h3>
              <p className="mt-1.5 text-clay">{detail.text}</p>
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}
