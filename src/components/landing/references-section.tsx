import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { MediaPlaceholder } from "@/components/landing/media-placeholder";
import { getLandingMediaState } from "@/components/landing/media-state";
import { getReferenceCards } from "@/components/landing/references-section-data";
import type { LandingSection } from "@/content/landing-page";

type ReferencesSectionProps = {
  section: LandingSection;
  hasUnresolvedDecisions?: boolean;
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
      className="overflow-hidden border-t border-[var(--border-color)] px-5 py-20 sm:px-8 md:px-[8vw] md:py-28 lg:py-40"
      data-scroll-scene
      id={section.navigation.anchor}
      aria-labelledby="references-title"
    >
      <div className="grid gap-8 md:grid-cols-12 md:gap-x-8 lg:gap-x-[6vw]">
        <div className="min-w-0 md:col-span-5">
          <p className="m-0 mb-4 text-[0.65rem] tracking-[0.13em] text-[var(--text-secondary)] uppercase">
            {t(section.textKeys.eyebrow)}
          </p>
          <h2
            className="m-0 text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.94] font-normal tracking-[-0.065em] [overflow-wrap:anywhere]"
            id="references-title"
          >
            {t(section.textKeys.title)}
          </h2>
        </div>

        <div className="min-w-0 md:col-span-7 md:pt-8 lg:pt-14">
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

      <ul className="mt-14 grid list-none grid-cols-1 gap-5 p-0 md:mt-20 md:grid-cols-2 lg:mt-28 lg:grid-cols-3">
        {cards.map(({ id, asset, item }) => {
          const mediaState = getLandingMediaState(asset);
          const description = asset
            ? t(asset.altKey)
            : t("landing.media.missingDescription");

          return (
            <li className="min-w-0" key={id}>
              <article
                className="h-full min-w-0 bg-[var(--bg-surface)] p-4 sm:p-5"
                aria-label={item ? undefined : description}
                aria-labelledby={item ? `${id}-title` : undefined}
              >
                <figure className="relative m-0 grid aspect-[4/3] overflow-hidden">
                  {mediaState === "approved" && asset?.src ? (
                    <Image
                      className="object-cover"
                      src={asset.src}
                      alt={description}
                      fill
                      sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
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

                {item ? (
                  <div className="min-w-0 pt-5">
                    <p className="m-0 text-[0.65rem] tracking-[0.08em] text-[var(--text-secondary)] uppercase [overflow-wrap:anywhere]">
                      {item.place}
                    </p>
                    <h3
                      className="mt-2 mb-0 text-[clamp(1.65rem,3vw,2.25rem)] leading-[1.05] font-normal tracking-[-0.035em] [overflow-wrap:anywhere]"
                      id={`${id}-title`}
                    >
                      {item.name}
                    </h3>
                    <p className="mt-5 mb-0 border-t border-[var(--border-color)] pt-4 text-sm leading-[1.6] text-[var(--text-secondary)] [overflow-wrap:anywhere]">
                      {item.lesson}
                    </p>
                  </div>
                ) : null}
              </article>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
