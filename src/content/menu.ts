/**
 * The menu. Every page that shows food reads from this file, so a change
 * here updates the menu page, the home page and the data search engines see.
 *
 * To edit: change a name, price or description below and redeploy.
 * To add an item: copy a line inside the right category.
 * To add a category: copy a whole { id, name, items } block.
 *
 * Photos: save a picture as public/images/menu/<item id>.jpg and it appears
 * next to that item automatically (see README).
 */

export type Price =
  /** A single price in dollars. */
  | number
  /** Several sizes or quantities, e.g. wings by the piece count. */
  | Array<{ label: string; amount: number }>;

export type MenuItem = {
  /** Unique, lowercase, used for links and photo file names. */
  id: string;
  name: string;
  price: Price;
  description?: string;
  /** Optional short labels such as "Vegetarian". Only add ones you can stand behind. */
  tags?: string[];
};

export type MenuCategory = {
  id: string;
  name: string;
  /** One line shown under the category heading on the menu page. */
  note?: string;
  /** A short sampler of this category, shown on the home page. */
  summary: string;
  items: MenuItem[];
  /** Priced add-ons listed under the items. */
  addOns?: { title: string; options: Array<{ name: string; amount: number }> };
  /** Extra information listed under the items. */
  details?: Array<{ title: string; text: string }>;
};

export const menu: MenuCategory[] = [
  {
    id: "appetizers",
    name: "Appetizers",
    summary: "Garlic knots, wings, samosas, fried calamari",
    items: [
      { id: "garlic-knots", name: "Garlic Knots (6)", price: 6.99, description: "Tossed in olive oil, Parmesan and garlic with marinara sauce." },
      { id: "cheesy-garlic-bread", name: "Cheesy Garlic Bread", price: 7.99, description: "Six pieces served with marinara sauce." },
      {
        id: "chicken-wings",
        name: "Chicken Wings",
        price: [
          { label: "8 for", amount: 11.99 },
          { label: "12 for", amount: 18.99 },
        ],
        description: "BBQ, Hot Honey, Creamy Garlic Parmesan, Sweet Chili or Mango Habanero.",
      },
      { id: "fried-pickles", name: "Fried Pickles", price: 10.99, description: "Fried long crinkle-cut pickles with ranch." },
      { id: "onion-rings", name: "Onion Rings", price: 9.99, description: "Crunchy fried, with Choron sauce." },
      { id: "vegetable-samosas", name: "Vegetable Samosas (4)", price: 8.99, description: "Served with creamy fresh jalapeño sauce and homemade chutney." },
      { id: "chicken-samosas", name: "Chicken Samosas (4)", price: 11.99, description: "Served with creamy fresh jalapeño sauce and homemade chutney." },
      { id: "nachos", name: "Nachos", price: 10.99, description: "Pork, black beans, BBQ sauce, queso, pico de gallo, sour cream and jalapeños." },
      { id: "cheese-sticks", name: "Cheese Sticks", price: 10.99, description: "Five crunchy homemade sticks with marinara sauce." },
      { id: "fried-calamari", name: "Fried Calamari", price: 12.99, description: "Deep fried, with tartar sauce and jalapeño ranch." },
      { id: "mini-pretzels", name: "Mini Pretzels", price: 11.99, description: "Deep-fried pretzels with queso and grain mustard aioli." },
    ],
  },
  {
    id: "pizzas",
    name: "Pizzas",
    note: "Gluten-free dough available on any pizza.",
    summary: "Margherita, Double Pepperoni, Philly Steak, Nirvana Supreme",
    items: [
      { id: "mediterranean-pizza", name: "Mediterranean Pizza", price: 18.99, description: "Artichokes, sun-dried tomatoes, Kalamata olives, cherry tomatoes, mozzarella." },
      { id: "meat-lovers-pizza", name: "Meat Lovers Pizza", price: 19.99, description: "Chorizo, pepperoni, ham, beef, bacon." },
      { id: "chicken-bacon-ranch-pizza", name: "Chicken Bacon Ranch Pizza", price: 20.99, description: "Chicken, bacon, red onions, green onions, jalapeños, mozzarella & cheddar, cilantro." },
      { id: "le-jardinier-pizza", name: "Le Jardinier Pizza", price: 17.99, description: "Plant-based meat, green peppers, banana peppers, chickpeas, olives, ricotta." },
      { id: "pizza-blanche-neige", name: "Pizza Blanche Neige", price: 16.99, description: "Mozzarella, Parmesan, ricotta, fresh cream sauce, olive oil, fresh basil." },
      { id: "margherita-pizza", name: "Margherita Pizza", price: 16.99, description: "Pizza sauce, fresh mozzarella, oregano, basil, olive oil." },
      { id: "philly-steak-pizza", name: "Philly Steak Pizza", price: 20.99, description: "Philly steak, green peppers, onions, mushrooms, mozzarella, shredded provolone." },
      { id: "salmon-spinach-alfredo-pizza", name: "Salmon Spinach Alfredo Pizza", price: 18.99, description: "Alfredo sauce, salmon, spinach, capers, mozzarella, olive oil." },
      { id: "double-pepperoni-pizza", name: "Double Pepperoni Pizza", price: 18.99, description: "A handful of pepperoni, drizzled in hot honey." },
      { id: "nirvana-supreme-pizza", name: "Nirvana Supreme Pizza", price: 20.99, description: "Vodka cream sauce, bell peppers, red onions, banana peppers, Philly chicken, mozzarella, drizzled in mint, ginger, garlic & chilli sauce." },
      { id: "four-cheese-pizza", name: "Four Cheese Pizza", price: 14.99, description: "Pizza sauce, mozzarella, cheddar, ricotta, Parmesan, drizzled in olive oil." },
    ],
  },
  {
    id: "around-the-globe",
    name: "Around the Globe",
    note: "Gluten-free dough available.",
    summary: "Butter chicken and tandoori chicken pizzas",
    items: [
      { id: "butter-chicken-pizza", name: "Butter Chicken Pizza", price: 19.99, description: "Butter chicken sauce, jalapeños, red onions, chicken and cilantro." },
      { id: "tandoori-chicken-pizza", name: "Tandoori Chicken Pizza", price: 18.99, description: "Tandoori sauce, tandoori chicken, red onions, jalapeños, green peppers, cilantro, shredded mozzarella, drizzled with white sauce." },
    ],
  },
  {
    id: "dodos-island-features",
    name: "Dodos Island Features",
    summary: "Chicken curry and butter bean curry wraps",
    items: [
      { id: "chicken-curry-wrap", name: "Chicken Curry Wrap", price: 16.99, description: "Two homemade chicken curry wraps with fried rice crackers, cucumber salad, tomato chutney and jalapeño sauce." },
      { id: "butter-bean-curry-wrap", name: "Butter Bean Curry Wrap", price: 15.99, description: "Two roti wraps with butter bean curry and rougaille, served with fried rice crackers, cucumber salad, tomato chutney and jalapeño sauce." },
    ],
  },
  {
    id: "sandwiches",
    name: "Sandwiches",
    note: "All served with French fries.",
    summary: "Cuban, chicken schnitzel, Philly steak, BBQ jackfruit",
    items: [
      { id: "cuban-sandwich", name: "Cuban Sandwich", price: 13.99, description: "Cuban bread, ham, Swiss cheese, pork, mustard sauce." },
      { id: "chicken-schnitzel-sandwich", name: "Chicken Schnitzel Sandwich", price: 13.99, description: "Flattened, breaded chicken breast with lettuce, tomato and chipotle aioli on a brioche bun." },
      { id: "philly-steak-sandwich", name: "Philly Steak Sandwich", price: 15.99, description: "Philly beef, bell peppers, onions, provolone and spicy brown mustard on artisan bread." },
      { id: "bbq-jackfruit-sandwich", name: "BBQ Jackfruit Sandwich", price: 15.99, description: "Jackfruit cooked with BBQ sauce and red cabbage slaw on a brioche bun." },
    ],
  },
  {
    id: "salads",
    name: "Salads",
    summary: "Caesar, antipasto, Nirvana Signature",
    items: [
      { id: "salad-du-jour", name: "Salad Du Jour", price: 8.99, description: "Mixed greens, iceberg and romaine, cucumber, onion and diced tomatoes with dressing of choice." },
      { id: "nirvana-signature-salad", name: "Nirvana Signature Salad", price: 11.99, description: "Mixed greens, red beets, feta, red onions, tomato, strawberry and walnuts with dressing of choice." },
      { id: "antipasto-salad", name: "Antipasto Salad", price: 12.99, description: "Mixed greens, provolone, ham, Kalamata olives, salami, pepperoni, red onions, cherry tomatoes with dressing of choice." },
      { id: "caesar-salad", name: "Caesar Salad", price: 9.99, description: "Romaine with shaved and shredded Parmesan and Caesar dressing." },
    ],
    addOns: {
      title: "Add to any salad",
      options: [
        { name: "Grilled or fried chicken", amount: 6.99 },
        { name: "Grilled salmon", amount: 9.99 },
      ],
    },
    details: [
      {
        title: "Dressings",
        text: "Homemade ranch, Thousand Island, Italian, raspberry vinaigrette or bleu cheese.",
      },
    ],
  },
  {
    id: "pasta",
    name: "Pasta",
    summary: "Chicken Parmesan and chicken Alfredo",
    items: [
      { id: "chicken-parmesan", name: "Chicken Parmesan", price: 12.99, description: "On a bed of spaghetti with marinara sauce, topped with mozzarella." },
      { id: "chicken-alfredo", name: "Chicken Alfredo", price: 11.99, description: "On a bed of ziti, topped with diced tomatoes and green onions. Served with garlic bread." },
    ],
  },
  {
    id: "entrees",
    name: "Entrées",
    summary: "Blackened salmon, grilled chicken, chicken tenders",
    items: [
      { id: "grilled-blackened-salmon-darne", name: "Grilled Blackened Salmon Darne", price: 17.99, description: "On saffron pilaf rice with sautéed squash and cherry tomatoes, drizzled with Tuscan cream sauce." },
      { id: "grilled-marinated-chicken-breast", name: "Grilled Marinated Chicken Breast", price: 15.99, description: "Plain or blackened, on saffron pilaf rice with steamed broccoli, drizzled with chipotle aioli." },
      { id: "chicken-tenders", name: "Chicken Tenders", price: 12.99, description: "Homemade tenders with two sides: French fries, broccoli, squash or rice." },
    ],
  },
  {
    id: "kids-menu",
    name: "Kids Menu",
    summary: "Six-inch cheese and pepperoni pizzas",
    items: [
      { id: "kids-pepperoni-pizza", name: "6″ Pepperoni Pizza", price: 8.99 },
      { id: "kids-cheese-pizza", name: "6″ Cheese Pizza", price: 6.99 },
    ],
  },
  {
    id: "desserts",
    name: "Desserts",
    summary: "Cannoli, tiramisu, strawberry mousse cake",
    items: [
      { id: "cannoli", name: "Cannoli", price: 7.99, description: "Filled with crème pâtissière." },
      { id: "strawberry-mousse-cake", name: "Strawberry Mousse Cake", price: 8.99 },
      { id: "tiramisu", name: "Tiramisu", price: 8.99, description: "Served with cream and garnished with strawberries." },
    ],
  },
  {
    id: "drinks",
    name: "Drinks",
    summary: "Draft and bottled beer, Coke products, iced tea",
    items: [
      { id: "draft-beer", name: "Draft Beer", price: 5.0 },
      { id: "bottle-beer", name: "Bottle Beer", price: 3.5 },
      { id: "coke-products", name: "Coke Products", price: 3.0 },
      { id: "iced-tea", name: "Iced Tea", price: 2.5 },
    ],
  },
];
