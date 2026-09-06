import type { ComponentType } from "react";
import type { LandingSection, LandingSectionId } from "@/content/landing-page";
import { ConceptSection } from "@/components/landing/concept-section";
import { HeroSection } from "@/components/landing/hero-section";
import { ReferencesSection } from "@/components/landing/references-section";
import { SiteSection } from "@/components/landing/site-section";

type LandingSectionProps = {
  section: LandingSection;
  nextAnchor?: string;
  hasUnresolvedDecisions?: boolean;
};

type ImplementedLandingSectionId = "hero" | "concept" | "site" | "references";

export const landingSectionRegistry = {
  hero: HeroSection,
  concept: ConceptSection,
  site: SiteSection,
  references: ReferencesSection,
} satisfies Record<
  ImplementedLandingSectionId,
  ComponentType<LandingSectionProps>
> & Partial<Record<LandingSectionId, ComponentType<LandingSectionProps>>>;
