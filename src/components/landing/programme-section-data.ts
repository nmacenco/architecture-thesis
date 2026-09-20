import type { LandingAsset, LandingSection } from "@/content/landing-page";

export type ProgrammePremise = {
  name: string;
  description: string;
};

export type ProgrammeBuilding = {
  name: string;
  uses: string;
};

export type ProgrammeFact = {
  label: string;
  value: string;
  verification?: string;
};

export const programmeMediaSlots = [
  { id: "programme-masterplan", required: true },
  { id: "programme-axonometry", required: true },
] as const;

export type ProgrammeMediaId = (typeof programmeMediaSlots)[number]["id"];

export type ProgrammeMediaSlot = {
  id: ProgrammeMediaId;
  required: boolean;
  asset?: LandingAsset;
};

function isReadableString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export function getProgrammePremises(value: unknown): ProgrammePremise[] {
  if (!Array.isArray(value)) return [];

  return value.filter((item): item is ProgrammePremise => {
    if (typeof item !== "object" || item === null) return false;

    const candidate = item as Record<string, unknown>;
    return (
      isReadableString(candidate.name) &&
      isReadableString(candidate.description)
    );
  });
}

export function getProgrammeBuildings(value: unknown): ProgrammeBuilding[] {
  if (!Array.isArray(value)) return [];

  return value.filter((item): item is ProgrammeBuilding => {
    if (typeof item !== "object" || item === null) return false;

    const candidate = item as Record<string, unknown>;
    return isReadableString(candidate.name) && isReadableString(candidate.uses);
  });
}

export function getProgrammeFacts(value: unknown): ProgrammeFact[] {
  if (!Array.isArray(value)) return [];

  return value.filter((item): item is ProgrammeFact => {
    if (typeof item !== "object" || item === null) return false;

    const candidate = item as Record<string, unknown>;
    return isReadableString(candidate.label) && isReadableString(candidate.value);
  });
}

export function getProgrammeMediaSlots(
  section: LandingSection,
): ProgrammeMediaSlot[] {
  return programmeMediaSlots.map((slot) => ({
    ...slot,
    asset: section.assets.find((asset) => asset.id === slot.id),
  }));
}
