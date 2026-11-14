import { SliceMark } from "@/components/brand/SliceMark";
import { cn } from "@/lib/cn";

/**
 * NIRVANA with the pizza slice in place of the V.
 * Size it with a font-size class; everything inside scales with it.
 * Decorative by default: put the accessible name on the surrounding link.
 */
export function Wordmark({
  className,
  detailed = false,
}: {
  className?: string;
  detailed?: boolean;
}) {
  return (
    <span className={cn("wordmark", className)} aria-hidden="true">
      NIR
      <SliceMark className="wordmark-slice" detailed={detailed} />
      ANA
    </span>
  );
}

/** The full lockup: wordmark with PIZZERIA spaced to the same width beneath. */
export function Lockup({
  className,
  detailed = false,
}: {
  className?: string;
  detailed?: boolean;
}) {
  return (
    <span className={cn("lockup", className)} aria-hidden="true">
      <Wordmark detailed={detailed} />
      <span className="lockup-sub">
        {"Pizzeria".split("").map((letter, i) => (
          <span key={i}>{letter}</span>
        ))}
      </span>
    </span>
  );
}
