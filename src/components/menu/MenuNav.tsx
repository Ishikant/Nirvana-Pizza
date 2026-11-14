"use client";

import { useEffect, useRef, useState } from "react";
import { SliceMark } from "@/components/brand/SliceMark";
import { cn } from "@/lib/cn";

/**
 * Jump links for the menu. On a phone it is a strip that sticks to the top
 * of the screen and scrolls sideways; on a large screen it is a list down
 * the left. The links are plain anchors, so they work before any script
 * loads. The script only keeps the current section highlighted.
 */
export function MenuNav({
  categories,
  className,
}: {
  categories: Array<{ id: string; name: string }>;
  className?: string;
}) {
  const [active, setActive] = useState(categories[0]?.id ?? "");
  const listRef = useRef<HTMLUListElement>(null);

  // Highlight the section currently under the top of the screen.
  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      // How far down the screen a section must reach to count as "current":
      // just below whatever is stuck to the top at this screen width.
      const w = window.innerWidth;
      const line = w >= 1024 ? 140 : w >= 768 ? 160 : 96;
      let current = categories[0]?.id ?? "";
      for (const { id } of categories) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      // At the very bottom, the last section may never reach the line.
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) {
        const last = categories[categories.length - 1];
        const lastEl = last && document.getElementById(last.id);
        if (lastEl && lastEl.getBoundingClientRect().top < window.innerHeight) current = last.id;
      }
      setActive(current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [categories]);

  // On a phone, keep the highlighted link in view inside the strip.
  useEffect(() => {
    const list = listRef.current;
    if (!list || list.scrollWidth <= list.clientWidth) return;
    const link = list.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!link) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    list.scrollTo({
      left: link.offsetLeft - (list.clientWidth - link.offsetWidth) / 2,
      behavior: reduce ? "auto" : "smooth",
    });
  }, [active]);

  return (
    <nav aria-label="Menu sections" className={className}>
      <ul
        ref={listRef}
        className="scrollbar-none gutter-x fade-x flex overflow-x-auto lg:block lg:overflow-visible lg:px-0 lg:[mask-image:none]"
      >
        {categories.map(({ id, name }) => {
          const current = id === active;
          return (
            <li key={id} className="flex-none">
              <a
                href={`#${id}`}
                data-id={id}
                aria-current={current ? "location" : undefined}
                className={cn(
                  "relative flex h-[3.25rem] items-center whitespace-nowrap pr-6 text-[0.9375rem] transition-colors duration-200 lg:h-auto lg:min-h-10 lg:py-1.5 lg:pr-0",
                  "after:absolute after:bottom-0 after:left-0 after:right-6 after:h-0.5 after:bg-ember after:transition-opacity after:duration-200 lg:after:hidden",
                  current
                    ? "font-semibold text-soot after:opacity-100"
                    : "font-medium text-clay after:opacity-0 hover:text-soot",
                )}
              >
                <SliceMark
                  className={cn(
                    "mr-2.5 hidden h-3 text-ember transition-opacity duration-200 lg:block",
                    current ? "opacity-100" : "opacity-0",
                  )}
                />
                {name}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
