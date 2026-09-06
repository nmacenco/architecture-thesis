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
    "grid aspect-[4/5] min-w-0 md:col-span-7 md:row-span-2",
  "concept-diagram":
    "grid aspect-[4/3] min-w-0 md:col-span-5 md:self-end",
  "concept-existing":
    "grid aspect-[3/2] min-w-0 md:col-span-5 md:self-start",
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
      className="overflow-hidden border-t border-[var(--border-color)] px-5 py-20 sm:px-8 md:px-[8vw] md:py-28 lg:py-40"
      data-scroll-scene
      id={section.navigation.anchor}
      aria-labelledby="concept-title"
    >
      <div className="grid gap-10 md:grid-cols-12 md:gap-x-8 lg:gap-x-[6vw]">
        <div className="min-w-0 md:col-span-5">
          <p className="m-0 mb-4 text-[0.65rem] tracking-[0.13em] text-[var(--text-secondary)] uppercase">
            {t(section.textKeys.eyebrow)}
          </p>
          <h2
            className="m-0 text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.94] font-normal tracking-[-0.065em] [overflow-wrap:anywhere]"
            id="concept-title"
          >
            {t(section.textKeys.title)}
          </h2>
        </div>

        <div className="min-w-0 md:col-span-7 md:pt-8 lg:pt-14">
          <p className="m-0 max-w-[44rem] text-base leading-[1.7] text-[var(--text-secondary)] sm:text-[1.08rem]">
            {t(section.textKeys.body)}
          </p>
        </div>

        <blockquote className="m-0 border-l-2 border-[var(--color-primary-base)] py-1 pl-5 text-[clamp(1.7rem,4vw,3.8rem)] leading-[1.08] font-normal tracking-[-0.04em] md:col-span-9 md:col-start-3 md:mt-10 md:pl-8">
          {t(section.textKeys.quote)}
        </blockquote>

        {keywords.length > 0 ? (
          <ul className="m-0 flex list-none flex-wrap gap-2 p-0 md:col-span-10 md:col-start-3">
            {keywords.map((keyword) => (
              <li
                className="max-w-full border border-[var(--border-color)] px-3 py-2 text-[0.65rem] tracking-[0.08em] text-[var(--text-secondary)] uppercase [overflow-wrap:anywhere]"
                key={keyword}
              >
                {keyword}
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className="mt-14 grid grid-cols-1 gap-4 md:mt-20 md:grid-cols-12 md:gap-5 lg:mt-28">
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
