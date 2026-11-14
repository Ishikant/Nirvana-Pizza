import { cn } from "@/lib/cn";

/**
 * The drawing behind every empty photo slot: a few rings and cuts from the
 * pizza diagram, seen through a different window each time. `variant` picks
 * which part of the pie the window looks at.
 */

const views = [
  { cx: 452, cy: 468, spokes: [292, 337] },
  { cx: -60, cy: 420, spokes: [22, 67] },
  { cx: 210, cy: 560, spokes: [330, 15] },
  { cx: 470, cy: -40, spokes: [202, 247] },
  { cx: -30, cy: -50, spokes: [112, 157] },
] as const;

const rings = [150, 232, 240, 330, 430, 540];

export function PlaceholderArt({
  variant = 0,
  tone,
  className,
}: {
  variant?: number;
  tone: "dark" | "light";
  className?: string;
}) {
  const view = views[variant % views.length];
  const line = tone === "dark" ? "stroke-paper/15" : "stroke-soot/15";
  const accent = tone === "dark" ? "stroke-flame/80" : "stroke-ember/70";

  return (
    <svg
      viewBox="0 0 400 400"
      preserveAspectRatio="xMidYMid slice"
      className={cn("absolute inset-0 h-full w-full", className)}
      aria-hidden="true"
      focusable="false"
      fill="none"
    >
      {rings.map((r, i) => (
        <circle
          key={r}
          cx={view.cx}
          cy={view.cy}
          r={r}
          className={i === 2 ? accent : line}
          strokeWidth={i === 2 ? 1.25 : 1}
          vectorEffect="non-scaling-stroke"
        />
      ))}
      {view.spokes.map((deg) => {
        const a = (deg * Math.PI) / 180;
        return (
          <line
            key={deg}
            x1={view.cx}
            y1={view.cy}
            x2={Math.round(view.cx + 900 * Math.sin(a))}
            y2={Math.round(view.cy - 900 * Math.cos(a))}
            className={line}
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        );
      })}
    </svg>
  );
}
