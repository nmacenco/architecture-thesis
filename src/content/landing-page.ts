import manifest from "../../content/landing-page.json";

export const landingSectionIds = [
  "hero",
  "concept",
  "site",
  "references",
  "process",
  "programme",
  "experience",
  "proposal",
  "materiality",
  "physical-model",
  "reflection",
  "credits",
] as const;

export type LandingSectionId = (typeof landingSectionIds)[number];
export type LandingAssetStatus = "pending" | "candidate" | "approved" | "unavailable";

export type LandingAsset = {
  id: string;
  src: string | null;
  type: string;
  altKey: string;
  credit: string | null;
  status: LandingAssetStatus;
  required: boolean;
};

export type LandingSection = {
  id: LandingSectionId;
  name: string;
  translationKey: string;
  enabled: boolean;
  navigation: {
    included: boolean;
    anchor: string;
    labelKey: string;
  };
  textKeys: Record<string, string>;
  assets: LandingAsset[];
};

export type LandingUnresolvedDecision = {
  id: string;
  sections: LandingSectionId[];
  status: "unresolved";
  question: string;
};

export const landingPageManifest = manifest;

export function getLandingSection(id: LandingSectionId): LandingSection {
  const section = manifest.sections.find((candidate) => candidate.id === id);

  if (!section) {
    throw new Error(`Missing landing-page section: ${id}`);
  }

  return section as unknown as LandingSection;
}

export function getNextEnabledSection(id: LandingSectionId): LandingSection | undefined {
  const currentIndex = manifest.sections.findIndex((section) => section.id === id);

  if (currentIndex === -1) {
    throw new Error(`Missing landing-page section: ${id}`);
  }

  return manifest.sections.slice(currentIndex + 1).find((section) => section.enabled) as unknown as
    | LandingSection
    | undefined;
}

export function getUnresolvedDecisionsForSection(
  id: LandingSectionId,
): LandingUnresolvedDecision[] {
  return manifest.unresolvedDecisions.filter((decision) => decision.sections.includes(id)) as unknown as
    LandingUnresolvedDecision[];
}
