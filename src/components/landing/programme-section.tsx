import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { MediaPlaceholder } from "@/components/landing/media-placeholder";
import { getLandingMediaState } from "@/components/landing/media-state";
import {
  getProgrammeBuildings,
  getProgrammeFacts,
  getProgrammeMediaSlots,
  getProgrammePremises,
  type ProgrammeMediaId,
} from "@/components/landing/programme-section-data";
import type { LandingSection } from "@/content/landing-page";

type ProgrammeSectionProps = {
  section: LandingSection;
  hasUnresolvedDecisions?: boolean;
};

const mediaLayout: Record<ProgrammeMediaId, string> = {
  "programme-masterplan": "md:col-span-12",
  "programme-axonometry": "md:col-span-10 md:col-start-3",
};

const mediaSizes: Record<ProgrammeMediaId, string> = {
  "programme-masterplan": "(max-width: 767px) 100vw, 84vw",
  "programme-axonometry": "(max-width: 767px) 100vw, 70vw",
};

export async function ProgrammeSection({
  section,
  hasUnresolvedDecisions = false,
}: ProgrammeSectionProps) {
  if (!section.enabled) return null;

  const t = await getTranslations();
  const premises = getProgrammePremises(t.raw(section.textKeys.premises));
  const buildings = getProgrammeBuildings(t.raw(section.textKeys.buildings));
  const facts = getProgrammeFacts(t.raw(section.textKeys.facts));
  const mediaSlots = getProgrammeMediaSlots(section);

  return (
    <section
      className="overflow-hidden border-t border-[var(--border-color)] bg-[var(--bg-surface)] px-5 py-20 sm:px-8 md:px-[8vw] md:py-28 lg:py-40"
      data-scroll-scene
      id={section.navigation.anchor}
      aria-labelledby="programme-title"
    >
      <div className="grid gap-8 md:grid-cols-12 md:gap-x-8 lg:gap-x-[6vw]">
        <div className="min-w-0 md:col-span-7">
          <p className="m-0 mb-4 text-[0.65rem] tracking-[0.13em] text-[var(--text-secondary)] uppercase">
            {t(section.textKeys.eyebrow)}
          </p>
          <h2
            className="m-0 text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.94] font-normal tracking-[-0.065em] [overflow-wrap:anywhere]"
            id="programme-title"
          >
            {t(section.textKeys.title)}
          </h2>
        </div>

        <p className="m-0 min-w-0 text-base leading-[1.7] text-[var(--text-secondary)] sm:text-[1.08rem] md:col-span-5 md:self-end md:pb-2">
          {t(section.textKeys.body)}
        </p>
      </div>

      {premises.length > 0 ? (
        <ul className="mt-14 grid list-none gap-px bg-[var(--border-color)] p-px sm:grid-cols-2 md:mt-20 lg:mt-28 lg:grid-cols-4">
          {premises.map((premise, index) => (
            <li
              className="min-w-0 bg-[var(--bg-main)] p-5 sm:p-6 lg:min-h-60 lg:p-8"
              key={`${premise.name}-${premise.description}`}
            >
              <span className="text-[0.61rem] tracking-[0.1em] text-[var(--color-primary-base)] uppercase">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-10 mb-0 text-[clamp(1.5rem,2.4vw,2rem)] leading-none font-normal tracking-[-0.04em] [overflow-wrap:anywhere]">
                {premise.name}
              </h3>
              <p className="mt-4 mb-0 text-sm leading-[1.6] text-[var(--text-secondary)] [overflow-wrap:anywhere]">
                {premise.description}
              </p>
            </li>
          ))}
        </ul>
      ) : null}

      {buildings.length > 0 || facts.length > 0 ? (
        <div className="mt-20 grid gap-14 md:mt-28 md:grid-cols-12 md:gap-x-8 lg:mt-40 lg:gap-x-[6vw]">
          {buildings.length > 0 ? (
            <ol className="m-0 list-none p-0 md:col-span-8">
              {buildings.map((building, index) => (
                <li
                  className="grid min-w-0 grid-cols-[2.25rem_minmax(0,1fr)] gap-x-3 border-t border-[var(--border-color)] py-5 sm:grid-cols-[3rem_minmax(9rem,0.65fr)_minmax(0,1fr)] sm:gap-x-5"
                  key={`${building.name}-${building.uses}`}
                >
                  <span className="pt-1 text-[0.61rem] tracking-[0.1em] text-[var(--color-primary-base)] uppercase">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="m-0 text-[clamp(1.25rem,2.2vw,1.8rem)] leading-tight font-normal tracking-[-0.035em] [overflow-wrap:anywhere]">
                    {building.name}
                  </h3>
                  <p className="col-start-2 mt-2 mb-0 text-sm leading-[1.6] text-[var(--text-secondary)] [overflow-wrap:anywhere] sm:col-start-3 sm:mt-0">
                    {building.uses}
                  </p>
                </li>
              ))}
            </ol>
          ) : null}

          {facts.length > 0 ? (
            <aside className="min-w-0 border-l-2 border-[var(--color-primary-base)] pl-5 md:col-span-4 md:self-start lg:pl-8">
              {hasUnresolvedDecisions ? (
                <p className="m-0 mb-8 w-fit border border-[var(--color-primary-base)] px-3 py-2 text-[0.61rem] tracking-[0.08em] text-[var(--text-secondary)] uppercase">
                  {t("landing.status.editorialReviewLabel")}
                </p>
              ) : null}
              <dl className="m-0 grid gap-10">
                {facts.map((fact) => (
                  <div className="min-w-0" key={`${fact.label}-${fact.value}`}>
                    <dt className="text-[0.62rem] leading-[1.45] tracking-[0.08em] text-[var(--text-secondary)] uppercase [overflow-wrap:anywhere]">
                      {fact.label}
                    </dt>
                    <dd className="mt-2 ml-0 font-[Georgia,'Times_New_Roman',serif] text-[clamp(2.25rem,5vw,4.5rem)] leading-none tracking-[-0.055em] [overflow-wrap:anywhere]">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </aside>
          ) : null}
        </div>
      ) : null}

      <div className="mt-20 grid grid-cols-1 gap-6 md:mt-28 md:grid-cols-12 lg:mt-40 lg:gap-10">
        {mediaSlots.map(({ id, asset }, index) => {
          const mediaState = getLandingMediaState(asset);
          const description = asset
            ? t(asset.altKey)
            : t("landing.media.missingDescription");

          return (
            <figure
              className={`relative m-0 grid aspect-video min-w-0 overflow-hidden border border-[var(--border-color)] bg-[var(--bg-main)] ${mediaLayout[id]}`}
              key={id}
            >
              {mediaState === "approved" && asset?.src ? (
                <Image
                  className="object-contain"
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
              <span
                className="absolute top-3 left-3 z-[1] bg-[var(--bg-surface)]/92 px-2 py-1 text-[0.61rem] tracking-[0.09em] text-[var(--text-secondary)] uppercase"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              {mediaState === "approved" && asset?.credit ? (
                <figcaption className="absolute right-3 bottom-3 z-[1] bg-[var(--bg-surface)]/92 px-2 py-1 text-[0.61rem] tracking-[0.09em] uppercase">
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
