import type { LandingAsset, LandingSection } from "@/content/landing-page";

export const conceptMediaSlots = [
  { id: "concept-collage", required: true },
  { id: "concept-diagram", required: true },
  { id: "concept-existing", required: false },
] as const;

export type ConceptMediaId = (typeof conceptMediaSlots)[number]["id"];

export type ConceptMediaSlot = {
  id: ConceptMediaId;
  required: boolean;
  asset?: LandingAsset;
};

export function getConceptKeywords(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  return value.filter(
    (keyword): keyword is string =>
      typeof keyword === "string" && keyword.trim().length > 0,
  );
}

export function getConceptMediaSlots(section: LandingSection): ConceptMediaSlot[] {
  return conceptMediaSlots
    .map((slot) => ({
      ...slot,
      asset: section.assets.find((asset) => asset.id === slot.id),
    }))
    .filter((slot) => slot.required || slot.asset !== undefined);
}

export function canPreviewConceptCandidate(
  asset: LandingAsset | undefined,
): boolean {
  return Boolean(
    asset?.status === "candidate" &&
      asset.src?.startsWith("/") &&
      !asset.src.startsWith("//"),
  );
}
