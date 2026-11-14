import Image from "next/image";
import { PlaceholderArt } from "@/components/graphics/PlaceholderArt";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * A photo slot. With a photo it shows the photo; without one it shows a
 * drawn placeholder (and, while photoGuides is on, a caption naming the
 * photo that belongs there). The frame keeps its shape either way, so
 * adding photography never shifts the layout.
 *
 * Give the frame its shape with an aspect class, e.g. className="aspect-[4/5]".
 */
export function Photo({
  src,
  alt,
  label,
  file,
  sizes,
  tone = "light",
  variant = 0,
  focus = "center",
  eager = false,
  showGuide = true,
  className,
}: {
  /** Public path of the photo, or null while it has not been supplied. */
  src: string | null;
  alt: string;
  /** Name of the slot, shown on the placeholder. */
  label: string;
  /** Where to save the file, shown on the placeholder. */
  file: string;
  /** Tells the browser how wide the photo is shown, so it loads the right size. */
  sizes: string;
  /** Whether the slot sits on a black or a paper background. */
  tone?: "dark" | "light";
  variant?: number;
  focus?: string;
  /** Load straight away instead of when scrolled near. Only for photos visible on arrival. */
  eager?: boolean;
  /** Set to false for frames too small to hold the placeholder caption. */
  showGuide?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden rounded-[2px]",
        tone === "dark" ? "bg-coal" : "bg-stone",
        className,
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          loading={eager ? "eager" : "lazy"}
          className="photo-img object-cover"
          style={{ objectPosition: focus }}
        />
      ) : (
        <>
          <PlaceholderArt variant={variant} tone={tone} />
          {site.photoGuides && showGuide ? (
            <p
              className={cn(
                "text-fine absolute inset-x-0 bottom-0 flex flex-col gap-0.5 p-3 sm:p-4",
                tone === "dark" ? "text-ash" : "text-clay",
              )}
            >
              <span className={cn("font-semibold", tone === "dark" ? "text-paper/85" : "text-soot/85")}>
                {label}
              </span>
              <span className="break-all">images/{file}.jpg</span>
            </p>
          ) : null}
        </>
      )}
    </div>
  );
}
