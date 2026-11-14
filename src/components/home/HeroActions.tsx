"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/**
 * Wraps the hero buttons and tells the page when they have scrolled off the
 * top of the screen. The phone action bar listens for that (through the
 * data-past-hero attribute on <html>) and only then slides into view, so the
 * same actions are never on screen twice.
 */
export function HeroActions({
  className,
  style,
  children,
}: {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const root = document.documentElement;
    const observer = new IntersectionObserver(([entry]) => {
      root.toggleAttribute(
        "data-past-hero",
        !entry.isIntersecting && entry.boundingClientRect.top < 0,
      );
    });
    observer.observe(el);
    return () => {
      observer.disconnect();
      root.removeAttribute("data-past-hero");
    };
  }, []);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
