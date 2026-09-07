import type { LandingAsset, LandingSection } from "@/content/landing-page";

export type SiteFact = {
  label: string;
  value: string;
  verification?: string;
};

export const siteMediaSlots = [
  { id: "site-regional-map", required: true, group: "context" },
  { id: "site-location-plan", required: true, group: "context" },
  { id: "site-aerial", required: false, group: "photographs" },
  { id: "site-historical", required: true, group: "photographs" },
  { id: "site-current", required: true, group: "photographs" },
] as const;

export type SiteMediaId = (typeof siteMediaSlots)[number]["id"];
export type SiteMediaGroup = (typeof siteMediaSlots)[number]["group"];

export type SiteMediaSlot = {
  id: SiteMediaId;
  required: boolean;
  group: SiteMediaGroup;
  asset?: LandingAsset;
};

export function getSiteConditions(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  return value.filter(
    (condition): condition is string =>
      typeof condition === "string" && condition.trim().length > 0,
  );
}

export function getSiteFacts(value: unknown): SiteFact[] {
  if (!Array.isArray(value)) return [];

  return value.filter((fact): fact is SiteFact => {
    if (typeof fact !== "object" || fact === null) return false;

    const candidate = fact as Record<string, unknown>;
    return (
      typeof candidate.label === "string" &&
      candidate.label.trim().length > 0 &&
      typeof candidate.value === "string" &&
      candidate.value.trim().length > 0
    );
  });
}

export function getSiteMediaSlots(section: LandingSection): SiteMediaSlot[] {
  return siteMediaSlots
    .map((slot) => ({
      ...slot,
      asset: section.assets.find((asset) => asset.id === slot.id),
    }))
    .filter((slot) => slot.required || slot.asset !== undefined);
}
