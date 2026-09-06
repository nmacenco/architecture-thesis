import type { LandingAsset, LandingSection } from "@/content/landing-page";

export type ReferenceItem = {
  name: string;
  place: string;
  lesson: string;
  verification?: string;
};

export const referenceMediaSlots = [
  { id: "reference-marconetti", required: true },
  { id: "reference-agueda", required: true },
  { id: "reference-san-martin", required: true },
] as const;

export type ReferenceMediaId = (typeof referenceMediaSlots)[number]["id"];

export type ReferenceCard = {
  id: ReferenceMediaId;
  asset?: LandingAsset;
  item?: ReferenceItem;
};

function getReferenceItem(value: unknown): ReferenceItem | undefined {
  if (typeof value !== "object" || value === null) return undefined;

  const candidate = value as Record<string, unknown>;
  if (
    typeof candidate.name !== "string" ||
    candidate.name.trim().length === 0 ||
    typeof candidate.place !== "string" ||
    candidate.place.trim().length === 0 ||
    typeof candidate.lesson !== "string" ||
    candidate.lesson.trim().length === 0
  ) {
    return undefined;
  }

  return candidate as ReferenceItem;
}

export function getReferenceCards(
  section: LandingSection,
  value: unknown,
): ReferenceCard[] {
  const items = Array.isArray(value) ? value : [];

  return referenceMediaSlots.map((slot, index) => ({
    id: slot.id,
    asset: section.assets.find((asset) => asset.id === slot.id),
    item: getReferenceItem(items[index]),
  }));
}
