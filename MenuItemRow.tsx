import Image from "next/image";
import type { MenuItem } from "@/content/menu";
import { priceLines } from "@/lib/format";

/**
 * One line of the menu: name and price on a shared baseline, description
 * beneath. If a photo exists for the item it appears as a small thumbnail.
 */
export function MenuItemRow({ item, photo }: { item: MenuItem; photo: string | null }) {
  const prices = priceLines(item.price);

  return (
    <li className="flex gap-4">
      {photo ? (
        <div className="relative h-20 w-20 flex-none overflow-hidden rounded-[2px] bg-stone">
          <Image src={photo} alt="" fill sizes="80px" className="object-cover" />
        </div>
      ) : null}

      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-[1.0625rem] font-semibold leading-snug">{item.name}</h3>
          <p className="flex-none text-right text-[1.0625rem] font-medium tabular-nums leading-snug">
            {prices.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
        </div>

        {item.description ? (
          <p className="text-small mt-1 max-w-[46ch] text-clay">{item.description}</p>
        ) : null}

        {item.tags?.length ? (
          <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
            {item.tags.map((tag) => (
              <li key={tag} className="text-fine font-semibold text-ember">
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </li>
  );
}
