import Image from "next/image";
import { MoveDown } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { LandingSection } from "@/content/landing-page";
import { getLandingMediaState } from "@/components/landing/media-state";
import { MediaPlaceholder } from "@/components/landing/media-placeholder";

type HeroSectionProps = {
  section: LandingSection;
  nextAnchor?: string;
  hasUnresolvedDecisions?: boolean;
};

export async function HeroSection({
  section,
  nextAnchor,
  hasUnresolvedDecisions = false,
}: HeroSectionProps) {
  if (!section.enabled) return null;

  const t = await getTranslations();
  const primaryAsset = section.assets.find((asset) => asset.id === "hero-primary");
  const mediaState = getLandingMediaState(primaryAsset);
  const mediaDescription = primaryAsset
    ? t(primaryAsset.altKey)
    : t("landing.media.missingDescription");

  return (
    <section
      className="relative isolate flex min-h-[max(100svh,48rem)] items-end overflow-hidden text-[var(--bg-surface)] md:min-h-[max(100svh,52rem)]"
      id={section.navigation.anchor}
      aria-labelledby="hero-title"
    >
      <div className="relative z-[2] mx-auto grid w-full max-w-[96rem] min-w-0 grid-cols-1 gap-y-6 px-5 pt-32 pb-28 sm:px-8 md:grid-cols-12 md:gap-x-5 md:gap-y-8 md:px-[8vw] md:pt-40 md:pb-24">
        <p className="m-0 text-[0.65rem] tracking-[0.13em] text-white/90 uppercase md:col-span-12">
          {t(section.textKeys.eyebrow)}
        </p>
        <h1
          className="m-0 max-w-[12ch] text-[clamp(3.15rem,15.5vw,4.75rem)] leading-[0.86] font-normal tracking-[-0.075em] [overflow-wrap:anywhere] [text-shadow:0_2px_28px_rgb(0_0_0/55%)] md:col-span-11 md:text-[clamp(5rem,8.5vw,8.4rem)]"
          id="hero-title"
        >
          {t(section.textKeys.title)}
        </h1>

        <div className="min-w-0 border-l border-white/55 pl-4 md:col-span-5 md:col-start-8 md:row-start-3 md:pl-6">
          <p className="m-0 max-w-[42rem] font-[Georgia,'Times_New_Roman',serif] text-[clamp(1.2rem,2.3vw,2rem)] leading-[1.15]">
            {t(section.textKeys.subtitle)}
          </p>
          <p className="mt-4 mb-0 max-w-[35rem] text-[0.88rem] leading-[1.6] text-white/90 md:text-[0.95rem]">
            {t(section.textKeys.body)}
          </p>
        </div>

        <ul
          className="m-0 grid min-w-0 list-none gap-2 border-t border-white/50 p-0 pt-4 text-[0.68rem] leading-[1.5] tracking-[0.06em] uppercase sm:grid-cols-3 sm:gap-5 md:col-span-7 md:row-start-3 md:self-end"
          aria-label={t("landing.media.projectDetailsLabel")}
        >
          <li className="min-w-0 [overflow-wrap:anywhere]">
            {t(section.textKeys.authors)}
          </li>
          <li className="min-w-0 [overflow-wrap:anywhere]">
            {t(section.textKeys.institution)}
          </li>
          <li className="min-w-0 [overflow-wrap:anywhere]">
            {t(section.textKeys.year)}
          </li>
        </ul>
        {hasUnresolvedDecisions ? (
          <p className="m-0 w-fit border border-white/55 bg-black/35 px-[0.65rem] py-[0.45rem] text-[0.6rem] tracking-[0.08em] text-white/90 uppercase md:col-span-7">
            {t("landing.status.editorialReviewLabel")}
          </p>
        ) : null}
      </div>

      {mediaState === "approved" && primaryAsset?.src ? (
        <figure className="absolute inset-0 m-0 min-h-full bg-[linear-gradient(120deg,var(--color-terracotta-dark),var(--color-primary-base)_35%,var(--color-secondary-base)_72%,var(--text-primary))]">
          <Image
            className="object-cover"
            src={primaryAsset.src}
            alt={mediaDescription}
            fill
            priority
            sizes="100vw"
          />
          {primaryAsset.credit ? (
            <figcaption className="absolute right-4 bottom-4 z-[3] text-[0.61rem] tracking-[0.09em] uppercase">
              {primaryAsset.credit}
            </figcaption>
          ) : null}
        </figure>
      ) : (
        <MediaPlaceholder
          description={mediaDescription}
          label={t(
            mediaState === "unavailable"
              ? "landing.media.unavailableLabel"
              : "landing.media.pendingLabel",
          )}
          variant="hero"
        />
      )}

      <div
        className="absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgb(20_9_5/60%)_0%,rgb(20_9_5/42%)_45%,rgb(20_9_5/92%)_100%)] md:bg-[linear-gradient(180deg,rgb(20_9_5/52%)_0%,rgb(20_9_5/18%)_38%,rgb(20_9_5/90%)_100%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 z-[1] hidden bg-[linear-gradient(90deg,rgb(20_9_5/62%)_0%,rgb(20_9_5/32%)_55%,transparent_82%)] md:block"
        aria-hidden="true"
      />

      {nextAnchor ? (
        <a
          className="absolute right-5 bottom-4 z-[2] flex min-h-11 items-center gap-[0.55rem] py-1 text-[0.65rem] tracking-[0.1em] uppercase focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:right-[8vw] md:bottom-8"
          href={`#${nextAnchor}`}
        >
          <MoveDown aria-hidden="true" size={18} />
          {t(section.textKeys.scrollLabel)}
        </a>
      ) : null}
    </section>
  );
}
