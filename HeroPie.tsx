import Image from "next/image";
import { heroSliceCut, photoSlots } from "@/content/photos";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

/** The drawn pizza shown until the hero photograph is supplied. */
const PIE_ART = "/graphics/pie.svg";

/**
 * The hero image: a round pizza with one slice pulled away.
 * Until the hero photo is supplied it shows the drawn pizza. Once
 * public/images/hero.jpg exists, the photo is cut into the same shape.
 */
export function HeroPie({ src, className }: { src: string | null; className?: string }) {
  const slot = photoSlots.hero;
  const cut = src ? heroSliceCut : true;

  // The same picture is drawn twice: once for the pie, once for the slice.
  // The browser downloads it only once.
  const layer = (isCopy: boolean) =>
    src ? (
      <Image
        src={src}
        alt={isCopy ? "" : slot.alt}
        fill
        sizes="(min-width: 64rem) 54vw, 130vw"
        loading="eager"
        fetchPriority={isCopy ? "auto" : "high"}
        className="object-cover"
        style={{ objectPosition: slot.focus }}
      />
    ) : (
      <Image
        src={PIE_ART}
        alt=""
        width={800}
        height={800}
        unoptimized
        loading="eager"
        fetchPriority={isCopy ? "auto" : "high"}
        className="h-full w-full"
      />
    );

  return (
    <div className={cn("pie", cut && "pie--cut", className)}>
      <div className="pie-body">{layer(false)}</div>
      {cut ? (
        <div className="pie-slice" aria-hidden="true">
          {layer(true)}
        </div>
      ) : null}

      {!src && site.photoGuides ? (
        <p className="text-fine absolute left-[58%] top-[30%] flex w-[11.5rem] max-w-[38%] -translate-x-1/2 flex-col gap-0.5 rounded-[2px] bg-ink/80 p-3 text-ash">
          <span className="font-semibold text-paper/85">{slot.label}</span>
          <span>images/{slot.file}.jpg</span>
          <span>Overhead, centered, square</span>
        </p>
      ) : null}
    </div>
  );
}
