import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { LandingSection } from "@/content/landing-page";
import {
  canPreviewConceptCandidate,
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
    "relative grid aspect-[5/4] min-w-0 -mx-5 sm:-mx-8 md:absolute md:inset-y-0 md:left-0 md:mx-0 md:w-[84%] md:aspect-auto",
  "concept-diagram":
    "relative z-[2] grid aspect-[16/10] min-w-0 -mt-8 ml-auto w-[86%] border-[0.5rem] border-[var(--bg-main)] md:absolute md:right-0 md:bottom-8 md:mt-0 md:w-[44%] md:border-[0.7rem]",
  "concept-existing":
    "relative z-[3] grid aspect-[3/2] min-w-0 mt-3 ml-4 w-[62%] border-[0.35rem] border-[var(--bg-main)] md:absolute md:top-8 md:right-0 md:mt-0 md:ml-0 md:w-[25%] md:border-[0.55rem]",
};

const mediaSizes: Record<ConceptMediaId, string> = {
  "concept-collage": "(max-width: 767px) 100vw, 78vw",
  "concept-diagram": "(max-width: 767px) 86vw, 41vw",
  "concept-existing": "(max-width: 767px) 62vw, 23vw",
};

const mediaImage: Record<ConceptMediaId, string> = {
  "concept-collage":
    "object-cover scale-[1.6] origin-[48%_62%] md:scale-[1.55] md:origin-[48%_58%]",
  "concept-diagram": "object-cover",
  "concept-existing": "object-cover",
};

export async function ConceptSection({ section }: ConceptSectionProps) {
  if (!section.enabled) return null;

  const t = await getTranslations();
  const keywords = getConceptKeywords(t.raw(section.textKeys.keywords));
  const mediaSlots = getConceptMediaSlots(section);
  const hasCandidatePreviews = mediaSlots.some(({ asset }) =>
    canPreviewConceptCandidate(asset),
  );

  return (
    <section
      className="relative isolate overflow-hidden px-5 pt-16 pb-16 sm:px-8 md:px-[8vw] md:pt-24 md:pb-24 lg:pt-28 lg:pb-28"
      data-scroll-scene
      id={section.navigation.anchor}
      aria-labelledby="concept-title"
    >
      <div
        className="absolute top-0 left-0 h-px w-full bg-[var(--border-color)]"
        aria-hidden="true"
      />
      <div
        className="absolute top-0 left-0 h-1 w-[44vw] bg-[var(--color-primary-base)]"
        aria-hidden="true"
      />

      <div className="mx-auto grid max-w-[96rem] min-w-0 gap-y-7 md:grid-cols-12 md:gap-x-5 md:gap-y-9">
        <p className="m-0 text-[0.65rem] tracking-[0.13em] text-[var(--text-secondary)] uppercase md:col-span-12">
          {t(section.textKeys.eyebrow)}
        </p>
        <h2
          className="m-0 max-w-[10ch] text-[clamp(3rem,7.4vw,7.4rem)] leading-[0.86] font-normal tracking-[-0.075em] [overflow-wrap:anywhere] md:col-span-7"
          id="concept-title"
        >
          {t(section.textKeys.title)}
        </h2>

        <p className="m-0 max-w-[41rem] text-base leading-[1.68] text-[var(--text-secondary)] sm:text-[1.08rem] md:col-span-5 md:col-start-8 md:self-end md:pb-1">
          {t(section.textKeys.body)}
        </p>

        <blockquote className="m-0 border-l-2 border-[var(--color-primary-base)] py-1 pl-5 font-[Georgia,'Times_New_Roman',serif] text-[clamp(1.7rem,3.6vw,3.7rem)] leading-[1.04] font-normal tracking-[-0.045em] md:col-span-7 md:col-start-2 md:mt-4 md:pl-7">
          {t(section.textKeys.quote)}
        </blockquote>

        {keywords.length > 0 ? (
          <ul className="m-0 flex list-none flex-wrap gap-x-4 gap-y-2 border-t border-[var(--border-color)] px-0 pt-4 pb-0 md:col-span-4 md:col-start-9 md:self-end">
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

      <div className="mx-auto mt-10 max-w-[96rem] min-w-0 md:mt-14">
        {hasCandidatePreviews ? (
          <p
            className="m-0 mb-3 flex items-center gap-2 text-[0.58rem] tracking-[0.1em] text-[var(--text-secondary)] uppercase before:block before:size-1.5 before:bg-[var(--color-primary-base)] before:content-['']"
            id="concept-media-status"
          >
            {t("landing.media.pendingLabel")}
          </p>
        ) : null}

        <div className="relative grid min-w-0 grid-cols-1 md:block md:min-h-[clamp(34rem,50vw,45rem)]">
          {mediaSlots.map(({ id, asset }) => {
            const mediaState = getLandingMediaState(asset);
            const isCandidatePreview = canPreviewConceptCandidate(asset);
            const description = asset
              ? t(asset.altKey)
              : t("landing.media.missingDescription");

            return (
              <figure
                className={`m-0 overflow-hidden bg-[var(--bg-surface)] shadow-[0_0_0_1px_var(--border-color)] ${mediaLayout[id]}`}
                aria-describedby={
                  isCandidatePreview ? "concept-media-status" : undefined
                }
                key={id}
              >
                {(mediaState === "approved" || isCandidatePreview) &&
                asset?.src ? (
                  <Image
                    className={mediaImage[id]}
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
      </div>
    </section>
  );
}
