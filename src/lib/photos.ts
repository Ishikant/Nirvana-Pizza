import fs from "node:fs";
import path from "node:path";

/**
 * Finds a photo in public/images by base name, trying each supported
 * extension. Runs on the server while pages are built, so adding a file and
 * redeploying is all it takes to fill a slot.
 */

const EXTENSIONS = ["avif", "webp", "jpg", "jpeg", "png"] as const;
const IMAGES_DIR = path.join(process.cwd(), "public", "images");

const cache = new Map<string, string | null>();

export function findPhoto(base: string): string | null {
  const cached = cache.get(base);
  if (cached !== undefined) return cached;

  let found: string | null = null;
  for (const ext of EXTENSIONS) {
    if (fs.existsSync(path.join(IMAGES_DIR, `${base}.${ext}`))) {
      found = `/images/${base}.${ext}`;
      break;
    }
  }
  cache.set(base, found);
  return found;
}

/** Photo for a menu item, looked up by the item's id. */
export function findMenuPhoto(itemId: string): string | null {
  return findPhoto(`menu/${itemId}`);
}
