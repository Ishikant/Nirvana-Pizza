/**
 * Draws the site's two illustrations and saves them as static SVG files:
 *
 *   public/graphics/pie.svg       the pizza seen from above (hero placeholder)
 *   public/graphics/contours.svg  the contour lines behind the map pin
 *
 * They are plain files so the browser can cache them and the pages stay light.
 * You only need to run this again if you change the colours below:
 *
 *   npm run graphics
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Keep these in step with the tokens in src/app/globals.css.
const COAL = "#191715";
const PAPER = "#faf6f0";
const FLAME = "#ff6a13";

const out = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "public", "graphics");
fs.mkdirSync(out, { recursive: true });

const n = (v) => String(Math.round(v * 10) / 10);

/* ------------------------------------------------------------------ pie */

// Angles run clockwise from 12 o'clock, matching the CSS that pulls the
// slice out (see .pie in globals.css). The pulled slice spans 277.5 to 322.5.
const C = 400;
const CUT_START = 277.5;
const CUT_SIZE = 45;

const at = (radius, degrees) => {
  const a = (degrees * Math.PI) / 180;
  return [C + radius * Math.sin(a), C - radius * Math.cos(a)];
};

// A small repeatable random source, so the drawing is identical every run.
function seeded(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function pie() {
  const rand = seeded(20261113);
  const pepperoni = [];
  const basil = [];
  const olives = [];
  const specks = [];

  for (let slice = 0; slice < 8; slice++) {
    const centre = CUT_START + CUT_SIZE / 2 + slice * CUT_SIZE;

    const [x1, y1] = at(118 + rand() * 34, centre + (rand() - 0.5) * 14);
    pepperoni.push({ x: x1, y: y1, r: 27 + rand() * 5 });

    const [x2, y2] = at(246 + rand() * 46, centre + (rand() - 0.5) * 24);
    pepperoni.push({ x: x2, y: y2, r: 28 + rand() * 6 });

    if (slice % 2 === 0) {
      const [bx, by] = at(196 + rand() * 30, centre + 13 + rand() * 4);
      basil.push({ x: bx, y: by, rot: rand() * 360, scale: 0.9 + rand() * 0.35 });
    } else {
      const [ox, oy] = at(190 + rand() * 30, centre - 14 - rand() * 4);
      olives.push({ x: ox, y: oy });
    }

    const [ox2, oy2] = at(300 + rand() * 20, centre + (rand() > 0.5 ? 17 : -17));
    olives.push({ x: ox2, y: oy2 });
  }

  for (let i = 0; i < 46; i++) {
    const [x, y] = at(40 + Math.sqrt(rand()) * 290, rand() * 360);
    specks.push({ x, y });
  }

  const cuts = Array.from({ length: 8 }, (_, i) => CUT_START + i * CUT_SIZE);
  const cutLine = (deg) => {
    const [x1, y1] = at(16, deg);
    const [x2, y2] = at(399, deg);
    return `M${n(x1)} ${n(y1)}L${n(x2)} ${n(y2)}`;
  };

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" fill="none">`,
    `<circle cx="400" cy="400" r="400" fill="${COAL}"/>`,
    // Crust
    `<circle cx="400" cy="400" r="397.5" stroke="${FLAME}" stroke-width="2.5"/>`,
    `<circle cx="400" cy="400" r="356" stroke="${PAPER}" stroke-opacity=".25" stroke-width="1.25"/>`,
    `<circle cx="400" cy="400" r="341" stroke="${FLAME}" stroke-opacity=".6" stroke-width="1.5" stroke-linecap="round" stroke-dasharray=".1 8"/>`,
    // The eight cuts. The two that edge the pulled slice are orange.
    `<path d="${cuts.slice(2).map(cutLine).join("")}" stroke="${PAPER}" stroke-opacity=".15" stroke-width="1.25"/>`,
    `<path d="${cuts.slice(0, 2).map(cutLine).join("")}" stroke="${FLAME}" stroke-width="2.5"/>`,
    // Seasoning
    `<g fill="${PAPER}" fill-opacity=".25">${specks.map((s) => `<circle cx="${n(s.x)}" cy="${n(s.y)}" r="1.4"/>`).join("")}</g>`,
    // Pepperoni
    `<g stroke="${PAPER}" stroke-opacity=".55" stroke-width="1.25" fill="${COAL}">${pepperoni
      .map((p) => `<circle cx="${n(p.x)}" cy="${n(p.y)}" r="${n(p.r)}"/>`)
      .join("")}</g>`,
    `<g stroke="${PAPER}" stroke-opacity=".3" stroke-width="1.25" stroke-linecap="round">${pepperoni
      .map(
        (p) =>
          `<path d="M${n(p.x - p.r * 0.55)} ${n(p.y - p.r * 0.2)}a${n(p.r * 0.62)} ${n(p.r * 0.62)} 0 0 1 ${n(p.r * 0.55)} ${n(-p.r * 0.42)}"/>`,
      )
      .join("")}</g>`,
    // Olives
    `<g stroke="${PAPER}" stroke-opacity=".4" stroke-width="1.25">${olives
      .map(
        (o) =>
          `<circle cx="${n(o.x)}" cy="${n(o.y)}" r="10" fill="${COAL}"/><circle cx="${n(o.x)}" cy="${n(o.y)}" r="4"/>`,
      )
      .join("")}</g>`,
    // Basil
    `<g stroke="${FLAME}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${basil
      .map(
        (b) =>
          `<g transform="translate(${n(b.x)} ${n(b.y)}) rotate(${Math.round(b.rot)}) scale(${b.scale.toFixed(2)})"><path d="M-30 0C-14-20 14-20 30 0 14 20-14 20-30 0Z" fill="${COAL}"/><path d="M-22 0H22M-6 0l8-8M6 0l8 8" stroke-opacity=".6"/></g>`,
      )
      .join("")}</g>`,
    `<circle cx="400" cy="400" r="4" fill="${FLAME}"/>`,
    `</svg>`,
  ].join("");
}

/* ------------------------------------------------------------- contours */

function contourRing(level) {
  // Each level is a wobbly ellipse around a ridge that drifts as it widens.
  const cx = 560 - level * 14;
  const cy = 190 + level * 16;
  const base = 46 + level * 58;
  const tilt = (-24 * Math.PI) / 180;
  const steps = 44;
  const pts = [];

  for (let i = 0; i < steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    const wobble =
      1 +
      0.11 * Math.sin(2 * t + 0.6 + level * 0.21) +
      0.06 * Math.sin(3 * t + 1.9 - level * 0.17) +
      0.035 * Math.sin(5 * t + 0.3 + level * 0.4);
    const x = base * 1.7 * wobble * Math.cos(t);
    const y = base * wobble * Math.sin(t);
    pts.push([
      Math.round(cx + x * Math.cos(tilt) - y * Math.sin(tilt)),
      Math.round(cy + x * Math.sin(tilt) + y * Math.cos(tilt)),
    ]);
  }

  // A smooth closed curve through the midpoints of neighbouring points.
  const mid = (a, b) => `${Math.round((a[0] + b[0]) / 2)} ${Math.round((a[1] + b[1]) / 2)}`;
  let d = `M${mid(pts[steps - 1], pts[0])}`;
  for (let i = 0; i < steps; i++) {
    d += `Q${pts[i][0]} ${pts[i][1]} ${mid(pts[i], pts[(i + 1) % steps])}`;
  }
  return `${d}Z`;
}

function contours() {
  const rings = Array.from({ length: 11 }, (_, i) => contourRing(i));
  const major = rings.filter((_, i) => i % 4 === 1).join("");
  const minor = rings.filter((_, i) => i % 4 !== 1).join("");
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" fill="none" stroke="${PAPER}">`,
    `<path d="${minor}" stroke-opacity=".1" vector-effect="non-scaling-stroke"/>`,
    `<path d="${major}" stroke-opacity=".2" vector-effect="non-scaling-stroke"/>`,
    `</svg>`,
  ].join("");
}

fs.writeFileSync(path.join(out, "pie.svg"), pie() + "\n");
fs.writeFileSync(path.join(out, "contours.svg"), contours() + "\n");
console.log("Wrote public/graphics/pie.svg and public/graphics/contours.svg");
