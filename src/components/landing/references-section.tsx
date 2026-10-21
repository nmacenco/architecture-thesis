import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { MediaPlaceholder } from "@/components/landing/media-placeholder";
import { getLandingMediaState } from "@/components/landing/media-state";
import {
  canPreviewReferenceCandidate,
  getReferenceCards,
  type ReferenceMediaId,
} from "@/components/landing/references-section-data";
import type { LandingSection } from "@/content/landing-page";

type ReferencesSectionProps = {
  section: LandingSection;
  hasUnresolvedDecisions?: boolean;
};

const imageRatios: Record<ReferenceMediaId, string> = {
  "reference-marconetti": "aspect-[1582/690]",
  "reference-agueda": "aspect-[3/2]",
  "reference-san-martin": "aspect-[4/3]",
};

export async function ReferencesSection({
  section,
  hasUnresolvedDecisions = false,
}: ReferencesSectionProps) {
  if (!section.enabled) return null;

  const t = await getTranslations();
  const cards = getReferenceCards(section, t.raw(section.textKeys.items));

  return (
    <section
      className="overflow-hidden px-5 pb-20 sm:px-8 md:px-[8vw] md:pb-28 lg:pb-36"
      data-scroll-scene
      id={section.navigation.anchor}
      aria-labelledby="references-title"
    >
      <div className="grid gap-6 border-t border-[var(--border-color)] pt-6 md:grid-cols-12 md:gap-x-8 md:pt-8 lg:gap-x-[6vw]">
        <div className="min-w-0 md:col-span-7">
          <p className="m-0 mb-4 text-[0.65rem] tracking-[0.13em] text-[var(--text-secondary)] uppercase">
            {t(section.textKeys.eyebrow)}
          </p>
          <h2
            className="m-0 max-w-[13ch] text-[clamp(2.75rem,6vw,5.5rem)] leading-[0.98] font-normal tracking-[-0.055em] [overflow-wrap:anywhere]"
            id="references-title"
          >
            {t(section.textKeys.title)}
          </h2>
        </div>

        <div className="min-w-0 md:col-span-5 md:pt-8">
          <p className="m-0 max-w-[44rem] text-base leading-[1.7] text-[var(--text-secondary)] sm:text-[1.08rem]">
            {t(section.textKeys.body)}
          </p>
          {hasUnresolvedDecisions ? (
            <p className="mt-6 mb-0 w-fit border border-[var(--color-primary-base)] px-3 py-2 text-[0.61rem] tracking-[0.08em] text-[var(--text-secondary)] uppercase">
              {t("landing.status.editorialReviewLabel")}
            </p>
          ) : null}
        </div>
      </div>

      <ol className="mt-12 list-none border-t border-[var(--border-color)] p-0 md:mt-20">
        {cards.map(({ id, asset, item }, index) => {
          const mediaState = getLandingMediaState(asset);
          const isCandidatePreview = canPreviewReferenceCandidate(asset);
          const description = asset
            ? t(asset.altKey)
            : t("landing.media.missingDescription");

          return (
            <li className="min-w-0 border-b border-[var(--border-color)] py-7 md:py-10" key={id}>
              <article
                className="grid min-w-0 gap-5 md:grid-cols-12 md:items-start md:gap-x-8 lg:gap-x-[6vw]"
                aria-label={item ? undefined : description}
                aria-labelledby={item ? `${id}-title` : undefined}
              >
                <span className="text-[0.65rem] tracking-[0.12em] text-[var(--color-primary-base)] md:col-span-1" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <figure className={`relative m-0 grid min-w-0 overflow-hidden bg-[var(--bg-surface)] md:col-span-5 ${imageRatios[id]}`}>
                  {(mediaState === "approved" || isCandidatePreview) && asset?.src ? (
                    <Image
                      className="object-cover"
                      src={asset.src}
                      alt={description}
                      aria-describedby={isCandidatePreview ? `${id}-status` : undefined}
                      fill
                      sizes="(max-width: 767px) 100vw, 42vw"
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
                  {isCandidatePreview ? (
                    <figcaption
                      className="absolute right-3 bottom-3 z-[1] bg-[var(--bg-surface)]/95 px-2 py-1 text-[0.61rem] tracking-[0.09em] text-[var(--text-primary)] uppercase"
                      id={`${id}-status`}
                    >
                      {t("landing.media.pendingLabel")}
                    </figcaption>
                  ) : null}
                  {mediaState === "approved" && asset?.credit ? (
                    <figcaption className="absolute right-3 bottom-3 z-[1] bg-[var(--bg-surface)]/90 px-2 py-1 text-[0.61rem] tracking-[0.09em] uppercase">
                      {asset.credit}
                    </figcaption>
                  ) : null}
                </figure>

                {item ? (
                  <div className="min-w-0 md:col-span-6 md:pt-2">
                    <p className="m-0 text-[0.65rem] tracking-[0.08em] text-[var(--text-secondary)] uppercase [overflow-wrap:anywhere]">
                      {item.place}
                    </p>
                    <h3
                      className="mt-2 mb-0 text-[clamp(1.65rem,3vw,2.25rem)] leading-[1.05] font-normal tracking-[-0.035em] [overflow-wrap:anywhere]"
                      id={`${id}-title`}
                    >
                      {item.name}
                    </h3>
                    <p className="mt-5 mb-0 max-w-[34rem] text-base leading-[1.6] text-[var(--text-secondary)] [overflow-wrap:anywhere]">
                      {item.lesson}
                    </p>
                  </div>
                ) : null}
              </article>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
