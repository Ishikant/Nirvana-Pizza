/**
 * Site-wide business details.
 *
 * This is the one place to edit the phone number, hours, ordering links
 * and social links. Anything left empty is simply not shown on the site,
 * so there are never broken links or dead buttons.
 */

export type HoursEntry = {
  /** Shown to guests, e.g. "Monday to Thursday". */
  label: string;
  /** schema.org day names for search engines, e.g. ["Monday", "Tuesday"]. */
  days: Array<
    "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday"
  >;
  /** 24-hour times, e.g. "11:00" and "21:00". */
  opens: string;
  closes: string;
};

export type OrderingProvider = {
  id: string;
  name: string;
  /** Paste the restaurant's page on this service. Empty = not live yet. */
  url: string;
  /**
   * When there is no URL yet, show this service as "coming soon" in the
   * Order section. Set to false to keep it off the site until it has a URL.
   */
  announce: boolean;
};

export const site: SiteConfig = {
  name: "Nirvana Pizzeria",
  shortName: "Nirvana",
  /** Production URL, used for canonical links, the sitemap and share cards. */
  url: "https://thenirvanapizzeria.com",

  /** Used in search results and link previews. */
  description:
    "Nirvana Pizzeria in Pigeon Forge, Tennessee. House pizzas, butter chicken and tandoori pizzas, curry wraps, wings, pasta and more at 3060 Teaster Lane.",

  address: {
    street: "3060 Teaster Lane",
    city: "Pigeon Forge",
    region: "TN",
    regionName: "Tennessee",
    postalCode: "37863",
    country: "US",
  },

  /**
   * Digits only, with area code, e.g. "8655550123".
   * Leave empty to hide every Call button and phone link.
   */
  phone: "",

  /** Leave empty to hide. */
  email: "",

  /**
   * Opening hours. Leave the list empty to hide hours everywhere.
   * Example:
   *   { label: "Monday to Thursday", days: ["Monday", "Tuesday", "Wednesday", "Thursday"], opens: "11:00", closes: "21:00" },
   *   { label: "Friday and Saturday", days: ["Friday", "Saturday"], opens: "11:00", closes: "22:00" },
   */
  hours: [
    {
      label: "Sunday to Thursday",
      days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "11:00",
      closes: "21:00",
    },
    {
      label: "Friday and Saturday",
      days: ["Friday", "Saturday"],
      opens: "11:00",
      closes: "22:00",
    },
  ],

  ordering: {
    /**
     * While no service has a URL yet, the "Order online" button leads to a
     * short "coming soon" note listing the announced services below.
     * Set to false to hide all ordering UI until at least one URL is filled in.
     */
    showComingSoon: true,
    providers: [
      { id: "doordash", name: "DoorDash", url: "", announce: true },
      { id: "grubhub", name: "Grubhub", url: "", announce: true },
      { id: "ubereats", name: "Uber Eats", url: "", announce: false },
    ],
  },

  /** Full profile URLs. Empty entries are not rendered. */
  social: {
    instagram: "",
    facebook: "",
    tiktok: "",
  },

  /**
   * Shows a small caption on every empty photo slot naming the photo that
   * belongs there. Turn off before launch if any slots are still empty.
   */
  photoGuides: true,
};

type SiteConfig = {
  name: string;
  shortName: string;
  url: string;
  description: string;
  address: {
    street: string;
    city: string;
    region: string;
    regionName: string;
    postalCode: string;
    country: string;
  };
  phone: string;
  email: string;
  hours: HoursEntry[];
  ordering: { showComingSoon: boolean; providers: OrderingProvider[] };
  social: { instagram: string; facebook: string; tiktok: string };
  photoGuides: boolean;
};
