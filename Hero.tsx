import type { CSSProperties } from "react";
import { HeroPie } from "@/components/graphics/HeroPie";
import { HeroActions } from "@/components/home/HeroActions";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { DisplayText } from "@/components/ui/DisplayText";
import { hero } from "@/content/home";
import { photoSlots } from "@/content/photos";
import { site } from "@/content/site";
import { directionsUrl, orderingState } from "@/lib/links";
import { findPhoto } from "@/lib/photos";

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

export function Hero() {
  const photo = findPhoto(photoSlots.hero.file);
  const ordering = orderingState();

  return (
    <section className="relative overflow-clip bg-ink text-paper" aria-labelledby="hero-heading">
      <div className="shell relative flow-root">
        <div className="relative z-10 pt-11 sm:pt-16 lg:flex lg:min-h-[min(calc(100svh-4.75rem),50rem)] lg:w-[52%] lg:flex-col lg:justify-center lg:py-24">
          <p className="rise text-small flex items-center gap-3 text-ash">
            <span className="h-px w-8 bg-flame" aria-hidden="true" />
            {hero.locationLine}
          </p>

          <h1 id="hero-heading" className="rise text-hero mt-5 lg:mt-7" style={delay(70)}>
            <DisplayText>{hero.headline}</DisplayText>
          </h1>

          <p
            className="rise text-lead mt-5 max-w-[34ch] text-paper/75 lg:mt-7"
            style={delay(160)}
          >
            {hero.intro}
          </p>

          <HeroActions className="rise mt-8 flex flex-wrap gap-3" style={delay(250)}>
            <ButtonLink href="/menu">View menu</ButtonLink>
            {ordering === "off" ? (
              <ButtonLink href={directionsUrl} external variant="light">
                Get directions
              </ButtonLink>
            ) : (
              <ButtonLink href="/#order" variant="light">
                Order online
              </ButtonLink>
            )}
          </HeroActions>

          <p className="rise text-small mt-7 text-ash" style={delay(340)}>
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline inline-flex min-h-11 items-center"
            >
              {site.address.street}, {site.address.city}
            </a>
          </p>
        </div>

        <HeroPie
          src={photo}
          className="-mb-[40%] ml-[4%] mt-6 w-[132%] max-w-[42rem] sm:-mb-[30%] sm:ml-[26%] sm:w-full lg:absolute lg:-right-[9%] lg:top-1/2 lg:m-0 lg:w-[min(54%,45rem)] lg:max-w-none lg:-translate-y-1/2"
        />
      </div>
    </section>
  );
}
