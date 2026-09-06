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
      className="relative flex min-h-svh items-end overflow-hidden text-[var(--bg-surface)] max-[760px]:min-h-[max(100svh,42rem)]"
      id={section.navigation.anchor}
      aria-labelledby="hero-title"
    >
      <div className="relative z-[2] w-full max-w-[73rem] px-[8vw] pb-28 max-[760px]:px-5 max-[760px]:pt-28 max-[760px]:pb-[6.5rem]">
        <p className="m-0 mb-4 text-[0.65rem] tracking-[0.13em] text-white/70 uppercase">
          {t(section.textKeys.eyebrow)}
        </p>
        <h1
          className="m-0 max-w-[61rem] text-[clamp(3.5rem,8.5vw,8.4rem)] leading-[0.88] font-normal tracking-[-0.075em] max-[760px]:text-[clamp(3rem,16vw,4.4rem)] max-[760px]:[overflow-wrap:break-word]"
          id="hero-title"
        >
          {t(section.textKeys.title)}
        </h1>
        <p className="mt-6 mb-0 max-w-[42rem] font-[Georgia,'Times_New_Roman',serif] text-[clamp(1.2rem,2.3vw,2rem)] leading-[1.15]">
          {t(section.textKeys.subtitle)}
        </p>
        <p className="mt-4 mb-0 max-w-[35rem] text-[0.95rem] leading-[1.55] text-white/78 max-[760px]:text-[0.88rem]">
          {t(section.textKeys.body)}
        </p>
        <ul
          className="mt-9 mb-0 flex list-none gap-8 p-0 text-[0.7rem] tracking-[0.06em] uppercase max-[760px]:flex-col max-[760px]:gap-2"
          aria-label={t("landing.media.projectDetailsLabel")}
        >
          <li>{t(section.textKeys.authors)}</li>
          <li>{t(section.textKeys.institution)}</li>
          <li>{t(section.textKeys.year)}</li>
        </ul>
        {hasUnresolvedDecisions ? (
          <p className="mt-4 mb-0 w-fit border border-white/38 px-[0.65rem] py-[0.45rem] text-[0.6rem] tracking-[0.08em] text-white/78 uppercase">
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
        className="absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgb(0_0_0/24%),rgb(0_0_0/8%)_40%,rgb(0_0_0/78%))]"
        aria-hidden="true"
      />

      {nextAnchor ? (
        <a
          className="absolute right-10 bottom-10 z-[2] flex min-h-11 items-center gap-[0.55rem] text-[0.65rem] tracking-[0.1em] uppercase focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white max-[760px]:right-5 max-[760px]:bottom-4 max-[760px]:py-1"
          href={`#${nextAnchor}`}
        >
          <MoveDown aria-hidden="true" size={18} />
          {t(section.textKeys.scrollLabel)}
        </a>
      ) : null}
    </section>
  );
}
