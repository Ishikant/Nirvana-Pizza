# Nirvana Pizzeria website

The website for Nirvana Pizzeria, 3060 Teaster Lane, Pigeon Forge, Tennessee.
Built with Next.js, TypeScript and Tailwind CSS. Two pages: the home page (`/`) and the menu (`/menu`).

Everything you will normally want to change lives in four small files under `src/content/`. You do not need to touch a component to edit the menu, add a photo, or switch on online ordering.

## Run it on your computer

You need [Node.js](https://nodejs.org) 20.9 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000. The page updates as you save files.

| Command | What it does |
| --- | --- |
| `npm run dev` | Local development server |
| `npm run build` | Production build (run this before deploying to catch mistakes) |
| `npm start` | Serve the production build locally |
| `npm run lint` | Code checks |
| `npm run graphics` | Redraw the two illustrations (only needed if you change brand colors) |

## Everyday edits

### Change the menu

Open `src/content/menu.ts`. Each category is a block, each dish is one line:

```ts
{ id: "margherita-pizza", name: "Margherita Pizza", price: 16.99, description: "Pizza sauce, fresh mozzarella, oregano, basil, olive oil." },
```

- **Change a price or description:** edit the line.
- **Add a dish:** copy a line inside the right category and give it a new `id` (lowercase, hyphens, unique).
- **Remove a dish:** delete its line.
- **Sizes or quantities:** use a list of prices, as Chicken Wings does: `price: [{ label: "8 for", amount: 11.99 }, { label: "12 for", amount: 18.99 }]`.
- **Add a category:** copy a whole `{ id, name, summary, items }` block. It appears on the menu page, in the menu navigation and in the "Our food" list on the home page.
- **Labels such as "Vegetarian":** add `tags: ["Vegetarian"]` to a dish. None are set at the moment; add only the ones you want to stand behind.

The menu page, the featured dishes on the home page and the menu data that search engines read all come from this one file, so they cannot drift apart.

### Phone number, hours, address

Open `src/content/site.ts`.

- `phone`: digits only, for example `"8655550123"`. Once set, a Call button appears in the Visit section, in the bar at the bottom of phone screens, in the header on large screens and in the footer. Leave it empty and none of those appear.
- `hours`: add one entry per group of days (there is an example in the file). Hours then show in the Visit section and the footer, and are passed to search engines. Leave the list empty to show no hours.
- `address`: already filled in.

### Online ordering (DoorDash, Grubhub, Uber Eats, others)

In `src/content/site.ts`, under `ordering.providers`, paste the restaurant's page on that service into `url`:

```ts
{ id: "doordash", name: "DoorDash", url: "https://www.doordash.com/store/...", announce: true },
```

As soon as one service has a URL:

- its row in the Order section becomes a working "Order now" link,
- "Order online" appears in the header and in the bar at the bottom of phone screens.

Until then, the hero's "Order online" button leads to a short "coming soon" note that lists the services marked `announce: true`. No link is ever made up.

- To add another service, add another line to the list.
- To hide every trace of ordering until a link is ready, set `showComingSoon: false`. The hero's second button then becomes "Get directions".

### Social media

In `src/content/site.ts`, under `social`, paste full profile URLs for Instagram, Facebook or TikTok. A "Follow" block with those icons appears in the footer. Empty entries are not shown.

### Home page wording

Open `src/content/home.ts`. It holds the headline, the short paragraphs, the "Good to know" facts and the list of featured dishes (`featured.itemIds`, the first one gets the large photo). Featured dishes are picked by id; their names, prices and descriptions are pulled from the menu.

## Photos

Every photo slot shows a drawn placeholder until its photo exists. To fill one, save the photo into `public/images/` with the right name and redeploy. No code changes.

| Slot | Save as | Shape | Suggested size | What it should show |
| --- | --- | --- | --- | --- |
| Hero (home page, top) | `public/images/hero.jpg` | Square | 1600 × 1600 or larger | One whole pizza from directly above, centered |
| Featured dish, large | `public/images/menu/butter-chicken-pizza.jpg` | 4:3 landscape | 1600 × 1200 or larger | The dish |
| Featured dishes, small | `public/images/menu/chicken-curry-wrap.jpg`, `nirvana-supreme-pizza.jpg`, `tandoori-chicken-pizza.jpg` | Square | 800 × 800 or larger | The dish |
| Interior | `public/images/interior.jpg` | 4:5 upright | 1200 × 1500 or larger | The dining room |
| Atmosphere | `public/images/atmosphere.jpg` | 4:5 upright | 1000 × 1250 or larger | A detail: the oven, a table, hands at work |
| Any menu item | `public/images/menu/<item id>.jpg` | Square or 4:3 | 800 px or larger | The dish. Shows as a thumbnail on the menu page |

Good to know:

- `.jpg`, `.jpeg`, `.png`, `.webp` and `.avif` all work.
- Photos are resized and converted to modern formats automatically, so upload good originals and let the site do the rest.
- Frames crop to fill. If a crop cuts off something important, set `focus` for that slot in `src/content/photos.ts` (for example `"top"` or `"30% 50%"`).
- **The hero cut.** The hero photo is shaped into a round pie with one slice pulled away. That only works with an overhead photo of a round pizza. If your hero photo is taken from an angle, set `heroSliceCut = false` in `src/content/photos.ts` and it becomes a plain circle.
- **Placeholder captions.** While `photoGuides` is `true` in `src/content/site.ts`, each empty slot shows a small caption with the file it is waiting for. Set it to `false` before launch if any slots are still empty.
- **Share image.** `public/og.png` (1200 × 630) is the picture shown when someone shares a link to the site. Replace it with a photo-based version when you have one.

## Before you launch

1. Add the phone number and hours in `src/content/site.ts`.
2. Check the menu in `src/content/menu.ts` against the current printed menu.
3. Add photos, or set `photoGuides: false`.
4. Paste ordering and social URLs if they are ready.
5. Run `npm run build`. It should finish without errors.

## Put it online

The site is ready for [Vercel](https://vercel.com), which is made by the team behind Next.js and has a free tier that suits this site.

1. Put this folder in a GitHub repository (`git init`, commit, push).
2. In Vercel, choose **Add New → Project**, pick the repository and press **Deploy**. No settings need changing.
3. In the project's **Settings → Domains**, add `thenirvanapizzeria.com` and `www.thenirvanapizzeria.com`. Vercel shows the exact DNS records to enter at the company where the domain is registered. Once they are in, the site is live with HTTPS.

After that, every push to the repository publishes automatically. Any host that runs Next.js (Netlify, Cloudflare, a Node server with `npm run build && npm start`) works too.

If the domain ever changes, update `url` in `src/content/site.ts`. It is used for search-engine links, the sitemap and share cards.

## How the project is organized

```
src/
  content/            ← the files you edit
    site.ts             business details, ordering, social, switches
    menu.ts             the whole menu
    home.ts             home page wording and featured dishes
    photos.ts           photo slots
  app/                pages, metadata, global styles, fonts
    page.tsx            home page
    menu/page.tsx       menu page
    globals.css         design tokens (colors, type scale) and shared styles
  components/
    brand/              wordmark and the slice mark
    home/               home page sections
    menu/               menu page pieces
    layout/             header, footer, phone action bar
    graphics/           hero pie and placeholder drawings
    ui/                 button, photo slot, icons
    seo/                structured data
  lib/                small helpers (prices, links, photo lookup)
public/
  images/             your photographs
  graphics/           the two illustrations
  icons/, og.png      app icons and share image
scripts/
  build-graphics.mjs  redraws the illustrations
```

## Design system in brief

- **Colors** are defined once at the top of `src/app/globals.css`: black (`ink`), charcoal (`coal`), warm white (`paper`, `stone`) and the brand orange (`flame`). `ember` is a deeper orange used only where orange text sits on a light background, so it stays readable.
- **Type:** Bodoni Moda for headings and the wordmark, Figtree for everything you read at length. Both are open-source fonts served from the site itself (licenses are in `src/app/fonts/`).
- **Logo:** `src/components/brand/Wordmark.tsx` draws NIRVANA with the pizza slice in place of the V. If you have final logo artwork, swap it in there and it changes everywhere.
- **Motion:** one short arrival sequence in the hero (the slice slides out), gentle hover states, and nothing else. Visitors who ask their device for reduced motion get none.

## What is built in

- Local-restaurant and menu structured data for search engines, sitemap, robots file, page titles and descriptions, share cards.
- Skip link, keyboard focus styles, labelled navigation, AA color contrast.
- Responsive images with lazy loading once photos are added.
- No tracking, no cookies, no third-party scripts.
