import { describe, expect, it } from "vitest";
import manifest from "../../content/landing-page.json";
import english from "../../messages/en.json";
import spanish from "../../messages/es.json";
import {
  getLandingSection,
  getNextEnabledSection,
  getUnresolvedDecisionsForSection,
} from "./landing-page";

const expectedSectionIds = [
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
];

const expectedAssetIds = [
  "hero-primary",
  "concept-collage",
  "concept-diagram",
  "concept-existing",
  "site-regional-map",
  "site-location-plan",
  "site-aerial",
  "site-historical",
  "site-current",
  "reference-marconetti",
  "reference-agueda",
  "reference-san-martin",
  "process-history",
  "process-diagnosis",
  "process-heritage-value",
  "process-intervention",
  "process-arc",
  "programme-masterplan",
  "programme-axonometry",
  "journey-circulation",
  "proposal-public-space",
  "proposal-silos",
  "proposal-theatre-exterior",
  "proposal-hall",
  "proposal-italian-hall",
  "proposal-circular-hall",
  "proposal-experimental-hall",
  "proposal-plans",
  "proposal-sections",
  "proposal-elevations",
  "material-structure",
  "material-envelope",
  "material-sustainability",
  "material-acoustics",
  "model-general",
  "model-detail",
  "reflection-final",
];

const allowedAssetStatuses = new Set(["pending", "candidate", "approved", "unavailable"]);

function getValue(source: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((value, key) => {
    if (typeof value !== "object" || value === null || !(key in value)) return undefined;
    return (value as Record<string, unknown>)[key];
  }, source);
}

describe("landing-page content manifest", () => {
  it("resolves implemented sections and their next enabled neighbors", () => {
    expect(getLandingSection("hero").translationKey).toBe("landing.hero");
    expect(getLandingSection("concept").translationKey).toBe("landing.concept");
    expect(getNextEnabledSection("hero")?.id).toBe("concept");
    expect(getNextEnabledSection("concept")?.id).toBe("site");
    expect(getNextEnabledSection("materiality")?.id).toBe("reflection");
    expect(getNextEnabledSection("credits")).toBeUndefined();
    expect(getUnresolvedDecisionsForSection("hero").map(({ id }) => id)).toEqual([
      "official-title",
      "author-names",
      "institution-degree",
      "presentation-year",
    ]);
  });

  it("keeps the approved section order and optional model state", () => {
    expect(manifest.status).toBe("editorial-review");
    expect(manifest.localization).toEqual({ es: "editorial-review", en: "pending" });
    expect(manifest.sections.map(({ id }) => id)).toEqual(expectedSectionIds);
    expect(manifest.sections.find(({ id }) => id === "physical-model")?.enabled).toBe(false);
    expect(manifest.sections.filter(({ enabled }) => enabled)).toHaveLength(11);
  });

  it("uses unique section IDs, navigation anchors, and asset IDs", () => {
    const sectionIds = manifest.sections.map(({ id }) => id);
    const anchors = manifest.sections.map(({ navigation }) => navigation.anchor);
    const assetIds = manifest.sections.flatMap(({ assets }) => assets.map(({ id }) => id));

    expect(new Set(sectionIds).size).toBe(sectionIds.length);
    expect(new Set(anchors).size).toBe(anchors.length);
    expect(assetIds).toEqual(expectedAssetIds);
    expect(new Set(assetIds).size).toBe(assetIds.length);
  });

  it("keeps asset status, source, and translation metadata consistent", () => {
    for (const section of manifest.sections) {
      expect(section.navigation.labelKey.startsWith(`${section.translationKey}.`)).toBe(true);
      expect(Object.values(section.textKeys).every((key) => key.startsWith(`${section.translationKey}.`))).toBe(true);

      for (const asset of section.assets) {
        expect(allowedAssetStatuses.has(asset.status)).toBe(true);
        expect(asset.altKey.startsWith(`${section.translationKey}.assets.`)).toBe(true);

        if (asset.status === "pending" || asset.status === "unavailable") {
          expect(asset.src).toBeNull();
        } else {
          expect(typeof asset.src).toBe("string");
        }
      }
    }
  });

  it("resolves every manifest content key in both locale catalogs", () => {
    for (const section of manifest.sections) {
      const keys = [
        section.navigation.labelKey,
        ...Object.values(section.textKeys),
        ...section.assets.map(({ altKey }) => altKey),
      ];

      for (const key of keys) {
        const spanishValue = getValue(spanish, key);

        expect(spanishValue, `Missing Spanish key: ${key}`).toBeDefined();
        expect(getValue(english, key), `Missing English key: ${key}`).toBeDefined();

        if (typeof spanishValue === "string") {
          expect(spanishValue.trim(), `Empty Spanish value: ${key}`).not.toBe("");
        }

        if (Array.isArray(spanishValue)) {
          expect(spanishValue, `Empty Spanish collection: ${key}`).not.toHaveLength(0);
        }
      }
    }
  });

  it("records unresolved decisions against known sections", () => {
    const sectionIds = new Set(manifest.sections.map(({ id }) => id));
    const decisionIds = manifest.unresolvedDecisions.map(({ id }) => id);

    expect(new Set(decisionIds).size).toBe(decisionIds.length);
    expect(manifest.unresolvedDecisions).not.toHaveLength(0);

    for (const decision of manifest.unresolvedDecisions) {
      expect(decision.status).toBe("unresolved");
      expect(decision.question.length).toBeGreaterThan(0);
      expect(decision.sections.every((id) => sectionIds.has(id))).toBe(true);
    }
  });
});
