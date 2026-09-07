import type { LandingAsset, LandingSection } from "@/content/landing-page";

export type ProcessArcPrinciple = {
  name: string;
  description: string;
};

export const processMediaSlots = [
  { id: "process-history", required: true },
  { id: "process-diagnosis", required: true },
  { id: "process-heritage-value", required: true },
  { id: "process-intervention", required: true },
  { id: "process-arc", required: true },
] as const;

export type ProcessMediaId = (typeof processMediaSlots)[number]["id"];

export type ProcessStage = {
  id: ProcessMediaId;
  asset?: LandingAsset;
  label?: string;
};

export function getProcessStages(
  section: LandingSection,
  value: unknown,
): ProcessStage[] {
  const labels = Array.isArray(value) ? value : [];

  return processMediaSlots.map((slot, index) => {
    const label = labels[index];

    return {
      id: slot.id,
      asset: section.assets.find((asset) => asset.id === slot.id),
      label:
        typeof label === "string" && label.trim().length > 0
          ? label
          : undefined,
    };
  });
}

export function getProcessArcPrinciples(value: unknown): ProcessArcPrinciple[] {
  if (!Array.isArray(value)) return [];

  return value.flatMap((item) => {
    if (typeof item !== "object" || item === null) return [];

    const candidate = item as Record<string, unknown>;
    if (
      typeof candidate.name !== "string" ||
      candidate.name.trim().length === 0 ||
      typeof candidate.description !== "string" ||
      candidate.description.trim().length === 0
    ) {
      return [];
    }

    return [{ name: candidate.name, description: candidate.description }];
  });
}
