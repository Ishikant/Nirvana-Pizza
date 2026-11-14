import { menu, type MenuCategory, type MenuItem } from "@/content/menu";

export type LocatedItem = { item: MenuItem; category: MenuCategory };

export function findMenuItem(id: string): LocatedItem | null {
  for (const category of menu) {
    const item = category.items.find((i) => i.id === id);
    if (item) return { item, category };
  }
  return null;
}

export function menuItemHref(located: LocatedItem): string {
  return `/menu#${located.category.id}`;
}
