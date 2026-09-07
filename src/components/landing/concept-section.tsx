import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { LandingSection } from "@/content/landing-page";
import {
  getConceptKeywords,
  getConceptMediaSlots,
  type ConceptMediaId,
} from "@/components/landing/concept-section-data";
import { getLandingMediaState } from "@/components/landing/media-state";
import { MediaPlaceholder } from "@/components/landing/media-placeholder";

type ConceptSectionProps = {
  section: LandingSection;
};

const mediaLayout: Record<ConceptMediaId, string> = {
  "concept-collage":
    "grid aspect-[4/5] min-w-0 -mx-5 sm:-mx-8 md:col-span-8 md:row-span-2 md:mx-0",
  "concept-diagram":
    "z-[1] grid aspect-[4/3] min-w-0 -mt-8 ml-auto w-[88%] border-[0.75rem] border-[var(--bg-main)] md:col-span-4 md:mt-12 md:-ml-[25%] md:w-[125%] md:self-start md:border-[clamp(0.75rem,1.5vw,1.5rem)]",
  "concept-existing":
    "grid aspect-[3/2] min-w-0 mt-5 w-[68%] md:col-span-3 md:col-start-10 md:mt-0 md:w-full md:self-end",
};

const mediaSizes: Record<ConceptMediaId, string> = {
  "concept-collage": "(max-width: 767px) 100vw, 58vw",
  "concept-diagram": "(max-width: 767px) 100vw, 42vw",
  "concept-existing": "(max-width: 767px) 100vw, 42vw",
};

export async function ConceptSection({ section }: ConceptSectionProps) {
  if (!section.enabled) return null;

  const t = await getTranslations();
  const keywords = getConceptKeywords(t.raw(section.textKeys.keywords));
  const mediaSlots = getConceptMediaSlots(section);

  return (
    <section
      className="overflow-hidden px-5 pt-24 pb-20 sm:px-8 md:px-[8vw] md:pt-36 md:pb-28 lg:pt-48 lg:pb-40"
      data-scroll-scene
      id={section.navigation.anchor}
      aria-labelledby="concept-title"
    >
      <div className="grid min-w-0 gap-y-8 md:grid-cols-12 md:gap-x-5 md:gap-y-12">
        <p className="m-0 text-[0.65rem] tracking-[0.13em] text-[var(--text-secondary)] uppercase md:col-span-12">
          {t(section.textKeys.eyebrow)}
        </p>
        <h2
          className="m-0 max-w-[12ch] text-[clamp(3.25rem,8.5vw,8.5rem)] leading-[0.86] font-normal tracking-[-0.075em] [overflow-wrap:anywhere] md:col-span-10"
          id="concept-title"
        >
          {t(section.textKeys.title)}
        </h2>

        <p className="m-0 max-w-[41rem] text-base leading-[1.72] text-[var(--text-secondary)] sm:text-[1.08rem] md:col-span-6 md:col-start-7 md:mt-4">
          {t(section.textKeys.body)}
        </p>

        <blockquote className="m-0 border-l-2 border-[var(--color-primary-base)] py-1 pl-5 font-[Georgia,'Times_New_Roman',serif] text-[clamp(1.75rem,4.4vw,4.4rem)] leading-[1.04] font-normal tracking-[-0.045em] md:col-span-9 md:col-start-2 md:mt-10 md:pl-8">
          {t(section.textKeys.quote)}
        </blockquote>

        {keywords.length > 0 ? (
          <ul className="m-0 flex list-none flex-wrap gap-x-4 gap-y-2 border-t border-[var(--border-color)] px-0 pt-4 pb-0 md:col-span-8 md:col-start-5 md:mt-4 md:justify-end">
            {keywords.map((keyword) => (
              <li
                className="max-w-full text-[0.65rem] leading-[1.5] tracking-[0.09em] text-[var(--text-secondary)] uppercase [overflow-wrap:anywhere]"
                key={keyword}
              >
                {keyword}
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className="mt-14 grid grid-cols-1 md:mt-24 md:grid-cols-12 md:gap-x-5 lg:mt-32">
        {mediaSlots.map(({ id, asset }) => {
          const mediaState = getLandingMediaState(asset);
          const description = asset
            ? t(asset.altKey)
            : t("landing.media.missingDescription");

          return (
            <figure className={`relative m-0 overflow-hidden ${mediaLayout[id]}`} key={id}>
              {mediaState === "approved" && asset?.src ? (
                <Image
                  className="object-cover"
                  src={asset.src}
                  alt={description}
                  fill
                  sizes={mediaSizes[id]}
                />
              ) : (
                <MediaPlaceholder
                  className="h-full w-full"
                  description={description}
                  label={t(
                    mediaState === "unavailable"
                      ? "landing.media.unavailableLabel"
                      : "landing.media.pendingLabel",
                  )}
                />
              )}
              {mediaState === "approved" && asset?.credit ? (
                <figcaption className="absolute right-3 bottom-3 z-[1] bg-[var(--bg-surface)]/90 px-2 py-1 text-[0.61rem] tracking-[0.09em] uppercase">
                  {asset.credit}
                </figcaption>
              ) : null}
            </figure>
          );
        })}
      </div>
    </section>
  );
}
