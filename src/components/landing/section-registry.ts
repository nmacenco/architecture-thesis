import type { ComponentType } from "react";
import type { LandingSection, LandingSectionId } from "@/content/landing-page";
import { HeroSection } from "@/components/landing/hero-section";

type LandingSectionProps = {
  section: LandingSection;
  nextAnchor?: string;
  hasUnresolvedDecisions?: boolean;
};

type ImplementedLandingSectionId = "hero";

export const landingSectionRegistry = {
  hero: HeroSection,
} satisfies Record<
  ImplementedLandingSectionId,
  ComponentType<LandingSectionProps>
> & Partial<Record<LandingSectionId, ComponentType<LandingSectionProps>>>;
