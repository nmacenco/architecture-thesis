import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { MediaPlaceholder } from "@/components/landing/media-placeholder";
import { getLandingMediaState } from "@/components/landing/media-state";
import {
  getSiteConditions,
  getSiteFacts,
  getSiteMediaSlots,
  type SiteMediaId,
  type SiteMediaSlot,
} from "@/components/landing/site-section-data";
import { SiteMap } from "@/components/site-map";
import type { LandingSection } from "@/content/landing-page";

type SiteSectionProps = {
  section: LandingSection;
  hasUnresolvedDecisions?: boolean;
};

const mediaLayout: Record<SiteMediaId, string> = {
  "site-regional-map": "md:col-span-7",
  "site-location-plan": "md:col-span-5",
  "site-aerial": "md:col-span-12 lg:col-span-5",
  "site-historical": "md:col-span-6 lg:col-span-7",
  "site-current": "md:col-span-6 lg:col-span-7 lg:col-start-6",
};

const mediaSizes: Record<SiteMediaId, string> = {
  "site-regional-map": "(max-width: 767px) 100vw, 58vw",
  "site-location-plan": "(max-width: 767px) 100vw, 42vw",
  "site-aerial": "(max-width: 767px) 100vw, (max-width: 1023px) 100vw, 42vw",
  "site-historical": "(max-width: 767px) 100vw, 58vw",
  "site-current": "(max-width: 767px) 100vw, 58vw",
};

export async function SiteSection({
  section,
  hasUnresolvedDecisions = false,
}: SiteSectionProps) {
  if (!section.enabled) return null;

  const t = await getTranslations();
  const conditions = getSiteConditions(t.raw(section.textKeys.conditions));
  const facts = getSiteFacts(t.raw(section.textKeys.facts));
  const mediaSlots = getSiteMediaSlots(section);
  const contextMedia = mediaSlots.filter(({ group }) => group === "context");
  const photographs = mediaSlots.filter(({ group }) => group === "photographs");

  const renderMedia = ({ id, asset }: SiteMediaSlot) => {
    const mediaState = getLandingMediaState(asset);
    const description = asset
      ? t(asset.altKey)
      : t("landing.media.missingDescription");
    const ratio = id === "site-regional-map" || id === "site-location-plan"
      ? "aspect-[4/3]"
      : "aspect-[3/2]";
    const className = `grid min-w-0 ${ratio} ${mediaLayout[id]}`;

    if (id === "site-regional-map" && mediaState === "pending") {
      return (
        <SiteMap
          className={className}
          description={description}
          key={id}
          label={t("landing.media.pendingLabel")}
        />
      );
    }

    return (
      <figure className={`relative m-0 overflow-hidden ${className}`} key={id}>
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
  };

  return (
    <section
      className="overflow-hidden border-t border-[var(--border-color)] bg-[var(--bg-surface)] px-5 py-20 sm:px-8 md:px-[8vw] md:py-28 lg:py-40"
      data-scroll-scene
      id={section.navigation.anchor}
      aria-labelledby="site-title"
    >
      <div className="grid gap-10 md:grid-cols-12 md:gap-x-8 lg:gap-x-[6vw]">
        <div className="min-w-0 md:col-span-5">
          <p className="m-0 mb-4 text-[0.65rem] tracking-[0.13em] text-[var(--text-secondary)] uppercase">
            {t(section.textKeys.eyebrow)}
          </p>
          <h2
            className="m-0 text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.94] font-normal tracking-[-0.065em] [overflow-wrap:anywhere]"
            id="site-title"
          >
            {t(section.textKeys.title)}
          </h2>
        </div>

        <div className="min-w-0 md:col-span-7 md:pt-8 lg:pt-14">
          <p className="m-0 max-w-[44rem] text-base leading-[1.7] text-[var(--text-secondary)] sm:text-[1.08rem]">
            {t(section.textKeys.body)}
          </p>
        </div>

        {conditions.length > 0 ? (
          <ul className="m-0 grid list-none gap-3 p-0 md:col-span-7 md:col-start-6 md:mt-6 md:grid-cols-2">
            {conditions.map((condition) => (
              <li
                className="min-w-0 border-t border-[var(--border-color)] pt-3 text-sm leading-[1.55] text-[var(--text-secondary)] [overflow-wrap:anywhere]"
                key={condition}
              >
                {condition}
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className="mt-14 grid grid-cols-1 gap-4 md:mt-20 md:grid-cols-12 md:items-end md:gap-5 lg:mt-28">
        {contextMedia.map(renderMedia)}
      </div>

      {facts.length > 0 ? (
        <div className="mt-12 border-t border-[var(--border-color)] pt-5 md:mt-16">
          {hasUnresolvedDecisions ? (
            <p className="m-0 mb-6 w-fit border border-[var(--color-primary-base)] px-3 py-2 text-[0.61rem] tracking-[0.08em] text-[var(--text-secondary)] uppercase">
              {t("landing.status.editorialReviewLabel")}
            </p>
          ) : null}
          <dl className="m-0 grid gap-x-5 gap-y-7 sm:grid-cols-2 lg:grid-cols-5">
            {facts.map((fact) => (
              <div className="min-w-0" key={fact.label}>
                <dt className="text-[0.62rem] leading-[1.45] tracking-[0.08em] text-[var(--text-secondary)] uppercase [overflow-wrap:anywhere]">
                  {fact.label}
                </dt>
                <dd className="mt-2 ml-0 font-[Georgia,'Times_New_Roman',serif] text-[clamp(1.35rem,2.4vw,2rem)] leading-tight [overflow-wrap:anywhere]">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      ) : null}

      {photographs.length > 0 ? (
        <div className="mt-14 grid grid-cols-1 gap-4 md:mt-20 md:grid-cols-12 md:gap-5 lg:mt-28">
          {photographs.map(renderMedia)}
        </div>
      ) : null}
    </section>
  );
}
