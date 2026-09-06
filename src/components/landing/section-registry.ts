import type { ComponentType } from "react";
import type { LandingSection, LandingSectionId } from "@/content/landing-page";
import { ConceptSection } from "@/components/landing/concept-section";
import { HeroSection } from "@/components/landing/hero-section";

type LandingSectionProps = {
  section: LandingSection;
  nextAnchor?: string;
  hasUnresolvedDecisions?: boolean;
};

type ImplementedLandingSectionId = "hero" | "concept";

export const landingSectionRegistry = {
  hero: HeroSection,
  concept: ConceptSection,
} satisfies Record<
  ImplementedLandingSectionId,
  ComponentType<LandingSectionProps>
> & Partial<Record<LandingSectionId, ComponentType<LandingSectionProps>>>;
