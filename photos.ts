/**
 * Every photo slot on the site, in one list.
 *
 * To fill a slot, save the photo into public/images/ using the file name
 * shown here (jpg, jpeg, png, webp or avif) and redeploy. No code changes.
 * Until a photo exists the slot shows a drawn placeholder instead.
 *
 * Menu item photos are not listed here. Save them as
 * public/images/menu/<menu item id>.jpg (ids are in src/content/menu.ts).
 */

export type PhotoSlot = {
  /** File name without extension, inside public/images/. */
  file: string;
  /** Short name of the slot, shown on the placeholder. */
  label: string;
  /** What the photo should show. */
  brief: string;
  /** Description for screen readers and search engines. */
  alt: string;
  /** Where the crop should stay anchored if the frame is narrower or wider than the photo. */
  focus?: string;
};

export const photoSlots = {
  hero: {
    file: "hero",
    label: "Hero photo",
    brief: "One whole pizza from directly above, centered, with a little table around it",
    alt: "A whole pizza from Nirvana Pizzeria, seen from above",
    focus: "center",
  },
  interior: {
    file: "interior",
    label: "Interior photo",
    brief: "The dining room, upright (portrait) framing",
    alt: "The dining room at Nirvana Pizzeria",
    focus: "center",
  },
  atmosphere: {
    file: "atmosphere",
    label: "Atmosphere photo",
    brief: "A detail that sets the mood: the oven, a table, hands at work",
    alt: "A moment inside Nirvana Pizzeria",
    focus: "center",
  },
} satisfies Record<string, PhotoSlot>;

/**
 * The hero photo is cut into a pie with one slice pulled out.
 * That only works for an overhead shot of a round pizza. If your hero photo
 * is taken from an angle, set this to false to show it as a plain circle.
 */
export const heroSliceCut = true;
