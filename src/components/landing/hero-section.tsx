import Image from "next/image";
import { MoveDown } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { LandingSection } from "@/content/landing-page";
import { getHeroMediaState } from "@/components/landing/hero-media";
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
  const mediaState = getHeroMediaState(primaryAsset);
  const mediaDescription = primaryAsset
    ? t(primaryAsset.altKey)
    : t("landing.media.missingDescription");

  return (
    <section className="hero" id={section.navigation.anchor} aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow light">{t(section.textKeys.eyebrow)}</p>
        <h1 id="hero-title">{t(section.textKeys.title)}</h1>
        <p className="hero-subtitle">{t(section.textKeys.subtitle)}</p>
        <p className="hero-body">{t(section.textKeys.body)}</p>
        <ul className="hero-meta" aria-label={t("landing.media.projectDetailsLabel")}>
          <li>{t(section.textKeys.authors)}</li>
          <li>{t(section.textKeys.institution)}</li>
          <li>{t(section.textKeys.year)}</li>
        </ul>
        {hasUnresolvedDecisions ? (
          <p className="hero-review-status">{t("landing.status.editorialReviewLabel")}</p>
        ) : null}
      </div>

      {mediaState === "approved" && primaryAsset?.src ? (
        <figure className="hero-image hero-approved-image">
          <Image
            src={primaryAsset.src}
            alt={mediaDescription}
            fill
            priority
            sizes="100vw"
          />
          {primaryAsset.credit ? <figcaption>{primaryAsset.credit}</figcaption> : null}
        </figure>
      ) : (
        <MediaPlaceholder
          className="hero-image"
          description={mediaDescription}
          label={t(
            mediaState === "unavailable"
              ? "landing.media.unavailableLabel"
              : "landing.media.pendingLabel",
          )}
        />
      )}

      <div className="hero-overlay" aria-hidden="true" />

      {nextAnchor ? (
        <a className="scroll-cue" href={`#${nextAnchor}`}>
          <MoveDown aria-hidden="true" size={18} />
          {t(section.textKeys.scrollLabel)}
        </a>
      ) : null}
    </section>
  );
}
