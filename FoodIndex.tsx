import Link from "next/link";
import { SliceMark } from "@/components/brand/SliceMark";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { food } from "@/content/home";
import { menu } from "@/content/menu";

/** "Our food": a short introduction and the whole menu at a glance. */
export function FoodIndex() {
  return (
    <section
      id="food"
      className="on-paper section-y bg-paper text-soot"
      aria-labelledby="food-heading"
    >
      <div className="shell grid gap-x-16 gap-y-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <h2 id="food-heading" className="text-title max-w-[14ch]">
              {food.heading}
            </h2>
            <p className="text-lead mt-6 max-w-[40ch] text-clay">{food.body}</p>
            <ButtonLink href="/menu" variant="ink" className="mt-8">
              See the full menu
            </ButtonLink>
          </div>
        </div>

        <ul className="border-t border-rule lg:col-span-7">
          {menu.map((category) => (
            <li key={category.id} className="border-b border-rule">
              <Link
                href={`/menu#${category.id}`}
                className="group flex items-center gap-4 py-4 transition-colors duration-200 sm:py-5"
              >
                <span className="min-w-0 flex-1">
                  <span className="text-subheading flex items-baseline">
                    <SliceMark className="mr-0 h-[0.62em] w-0 text-ember opacity-0 transition-all duration-300 ease-soft group-hover:mr-2.5 group-hover:w-[0.56em] group-hover:opacity-100 group-focus-visible:mr-2.5 group-focus-visible:w-[0.56em] group-focus-visible:opacity-100" />
                    {category.name}
                  </span>
                  <span className="text-small mt-1 block text-clay">{category.summary}</span>
                </span>
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="flex-none text-clay transition-transform duration-300 ease-soft group-hover:translate-x-1 group-hover:text-soot"
                >
                  <path d="M9 5.5 15.5 12 9 18.5" />
                </svg>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
