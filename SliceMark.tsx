import { cn } from "@/lib/cn";

/**
 * The Nirvana slice: a crust and a wedge. It stands in for the V in the
 * wordmark and doubles as the map pin and list marker.
 * `detailed` adds three cut-out toppings for sizes large enough to show them.
 */

const BODY = "M13 37 Q60 20 107 37 L60 130 Z";
const TOPPINGS =
  " M44 50 a8 8 0 1 0 .01 0 Z M70 62 a9 9 0 1 0 .01 0 Z M56 84 a6.5 6.5 0 1 0 .01 0 Z";

export function SliceMark({
  className,
  detailed = false,
}: {
  className?: string;
  detailed?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 120 132"
      className={cn("shrink-0", className)}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M7 21 Q60 1 113 21" fill="none" stroke="currentColor" strokeWidth="13" />
      <path d={detailed ? BODY + TOPPINGS : BODY} fill="currentColor" fillRule="evenodd" />
    </svg>
  );
}
