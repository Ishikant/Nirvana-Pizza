import { Photo } from "@/components/ui/Photo";
import { experience } from "@/content/home";
import { photoSlots } from "@/content/photos";
import { findPhoto } from "@/lib/photos";

/** A short welcome, a few practical facts, and room for two photographs. */
export function Experience() {
  const { interior, atmosphere } = photoSlots;

  return (
    <section
      id="experience"
      className="on-paper section-y bg-paper text-soot"
      aria-labelledby="experience-heading"
    >
      <div className="shell grid items-center gap-x-16 gap-y-14 lg:grid-cols-12">
        <div className="order-2 grid grid-cols-12 items-start gap-3 pb-[9%] sm:gap-5 lg:order-1 lg:col-span-6">
          <Photo
            src={findPhoto(interior.file)}
            alt={interior.alt}
            label={interior.label}
            file={interior.file}
            focus={interior.focus}
            sizes="(min-width: 64rem) 28vw, 58vw"
            variant={2}
            className="col-span-7 aspect-[4/5]"
          />
          <Photo
            src={findPhoto(atmosphere.file)}
            alt={atmosphere.alt}
            label={atmosphere.label}
            file={atmosphere.file}
            focus={atmosphere.focus}
            sizes="(min-width: 64rem) 20vw, 42vw"
            variant={3}
            className="col-span-5 mt-[36%] aspect-[4/5]"
          />
        </div>

        <div className="order-1 lg:order-2 lg:col-span-5 lg:col-start-8">
          <h2 id="experience-heading" className="text-title">
            {experience.heading}
          </h2>
          {experience.paragraphs.map((text, i) => (
            <p
              key={i}
              className={i === 0 ? "text-lead mt-6 max-w-[44ch]" : "text-lead mt-4 max-w-[44ch] text-clay"}
            >
              {text}
            </p>
          ))}

          <h3 className="text-fine mt-10 font-semibold text-clay">{experience.goodToKnowTitle}</h3>
          <dl className="mt-3 border-t border-rule">
            {experience.goodToKnow.map((fact) => (
              <div
                key={fact.label}
                className="text-small grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-4 border-b border-rule py-3.5"
              >
                <dt className="font-semibold">{fact.label}</dt>
                <dd className="text-clay">{fact.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
