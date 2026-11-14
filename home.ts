/**
 * Words and selections for the home page.
 * Dish names, prices and descriptions are never typed here: featured dishes
 * are picked by id and pulled from the menu, so they cannot drift out of date.
 */

export const hero = {
  locationLine: "Pigeon Forge, Tennessee",
  headline: "Pizza that’s been places.",
  intro:
    "Classic pies, butter chicken and tandoori pizzas, curry wraps, wings and pasta, on Teaster Lane in Pigeon Forge.",
};

export const food = {
  heading: "It starts with pizza and keeps going.",
  body: "House pizzas anchor the menu. Around them you will find butter chicken and tandoori pies, the Dodos Island curry wraps, wings in five sauces, samosas, sandwiches, pasta and dessert.",
};

export const featured = {
  heading: "Where to start.",
  body: "A few dishes that show the range of the kitchen.",
  /** Menu item ids. The first one gets the large photo. */
  itemIds: [
    "butter-chicken-pizza",
    "chicken-curry-wrap",
    "nirvana-supreme-pizza",
    "tandoori-chicken-pizza",
  ],
};

export const experience = {
  heading: "Come as you are.",
  paragraphs: [
    "Nirvana is a pizzeria with a wider map than most. The kitchen that makes your Margherita also makes butter chicken pizza, samosas with homemade chutney, and the curry wraps on the Dodos Island side of the menu.",
    "So the table that can never agree on dinner usually can here.",
  ],
  /** Short practical facts. Keep these in step with the menu. */
  goodToKnowTitle: "Good to know",
  goodToKnow: [
    { label: "Gluten-free dough", text: "Available on any pizza." },
    { label: "Kids menu", text: "Six-inch cheese and pepperoni pizzas." },
    { label: "To drink", text: "Draft and bottled beer, Coke products and iced tea." },
  ],
};

export const ordering = {
  heading: "Order online",
  liveBody: "Pickup and delivery through the services below.",
  comingSoonBody:
    "Online ordering is on the way. Until it arrives, come in and see us on Teaster Lane.",
};

export const visit = {
  heading: "Find us on Teaster Lane.",
  body: "In Pigeon Forge, just off the Parkway.",
};
