import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { MediaPlaceholder } from "@/components/landing/media-placeholder";
import { getLandingMediaState } from "@/components/landing/media-state";
import {
  getProcessArcPrinciples,
  getProcessStages,
} from "@/components/landing/process-section-data";
import type { LandingSection } from "@/content/landing-page";

type ProcessSectionProps = {
  section: LandingSection;
};

export async function ProcessSection({ section }: ProcessSectionProps) {
  if (!section.enabled) return null;

  const t = await getTranslations();
  const stages = getProcessStages(section, t.raw(section.textKeys.steps));
  const principles = getProcessArcPrinciples(
    t.raw(section.textKeys.arcPrinciples),
  );

  return (
    <section
      className="overflow-hidden border-t border-[var(--border-color)] px-5 py-20 sm:px-8 md:px-[8vw] md:py-28 lg:py-40"
      data-scroll-scene
      id={section.navigation.anchor}
      aria-labelledby="process-title"
    >
      <div className="grid gap-8 md:grid-cols-12 md:gap-x-8 lg:gap-x-[6vw]">
        <div className="min-w-0 md:col-span-5">
          <p className="m-0 mb-4 text-[0.65rem] tracking-[0.13em] text-[var(--text-secondary)] uppercase">
            {t(section.textKeys.eyebrow)}
          </p>
          <h2
            className="m-0 text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.94] font-normal tracking-[-0.065em] [overflow-wrap:anywhere]"
            id="process-title"
          >
            {t(section.textKeys.title)}
          </h2>
        </div>

        <p className="m-0 min-w-0 text-base leading-[1.7] text-[var(--text-secondary)] md:col-span-7 md:pt-8 sm:text-[1.08rem] lg:pt-14">
          {t(section.textKeys.body)}
        </p>
      </div>

      <ol className="mt-14 grid list-none grid-cols-1 gap-10 p-0 md:mt-20 md:grid-cols-2 md:gap-x-8 md:gap-y-16 lg:mt-28 lg:gap-x-[6vw]">
        {stages.map(({ id, asset, label }, index) => {
          const mediaState = getLandingMediaState(asset);
          const description = asset
            ? t(asset.altKey)
            : t("landing.media.missingDescription");

          return (
            <li
              className={`min-w-0 ${index % 2 === 1 ? "md:translate-y-16" : ""}`}
              key={id}
            >
              <div className="min-w-0">
                <div className="mb-4 flex items-end justify-between gap-4 border-b border-[var(--border-color)] pb-3">
                  <span className="text-[0.65rem] tracking-[0.12em] text-[var(--color-primary-base)] uppercase">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {label ? (
                    <h3 className="m-0 text-right text-[clamp(1.35rem,3vw,2rem)] leading-[1.05] font-normal tracking-[-0.035em] [overflow-wrap:anywhere]">
                      {label}
                    </h3>
                  ) : null}
                </div>

                <figure className="relative m-0 grid aspect-[4/3] overflow-hidden bg-[var(--bg-surface)] lg:aspect-video">
                  {mediaState === "approved" && asset?.src ? (
                    <Image
                      className="object-contain"
                      src={asset.src}
                      alt={description}
                      fill
                      sizes="(max-width: 767px) 100vw, 50vw"
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
              </div>
            </li>
          );
        })}
      </ol>

      {principles.length > 0 ? (
        <ol className="mt-24 grid list-none grid-cols-1 gap-px bg-[var(--border-color)] p-px md:mt-36 md:grid-cols-3">
          {principles.map((principle, index) => (
            <li
              className="min-w-0 bg-[var(--bg-main)] p-6 sm:p-8 lg:p-10"
              key={`${principle.name}-${principle.description}`}
            >
              <span className="text-[0.61rem] tracking-[0.1em] text-[var(--color-primary-base)] uppercase">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-8 mb-0 text-[clamp(1.65rem,3vw,2.35rem)] leading-none font-normal tracking-[-0.04em] [overflow-wrap:anywhere]">
                {principle.name}
              </h3>
              <p className="mt-4 mb-0 text-sm leading-[1.65] text-[var(--text-secondary)] [overflow-wrap:anywhere]">
                {principle.description}
              </p>
            </li>
          ))}
        </ol>
      ) : null}
    </section>
  );
}
