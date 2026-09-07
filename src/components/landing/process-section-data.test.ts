import { describe, expect, it } from "vitest";
import type { LandingAsset, LandingSection } from "../../content/landing-page";
import {
  getProcessArcPrinciples,
  getProcessStages,
} from "./process-section-data";

function asset(id: string): LandingAsset {
  return {
    id,
    src: null,
    type: "diagram",
    altKey: `landing.process.assets.${id}.alt`,
    credit: null,
    status: "pending",
    required: true,
  };
}

function section(assets: LandingAsset[]): LandingSection {
  return {
    id: "process",
    name: "Design process",
    translationKey: "landing.process",
    enabled: true,
    navigation: {
      included: true,
      anchor: "process",
      labelKey: "landing.process.navLabel",
    },
    textKeys: {},
    assets,
  };
}

describe("process section data", () => {
  it("associates stage labels with stable manifest diagram identities", () => {
    const stages = getProcessStages(
      section([
        asset("process-history"),
        asset("process-diagnosis"),
        asset("process-heritage-value"),
        asset("process-intervention"),
        asset("process-arc"),
      ]),
      ["History", "Diagnosis", "Heritage", "Intervention", "Arc"],
    );

    expect(stages.map(({ id }) => id)).toEqual([
      "process-history",
      "process-diagnosis",
      "process-heritage-value",
      "process-intervention",
      "process-arc",
    ]);
    expect(stages.map(({ label }) => label)).toEqual([
      "History",
      "Diagnosis",
      "Heritage",
      "Intervention",
      "Arc",
    ]);
  });

  it("retains all required media slots for empty or malformed catalog data", () => {
    const emptyStages = getProcessStages(section([]), []);
    const malformedStages = getProcessStages(section([]), "History");

    expect(emptyStages).toHaveLength(5);
    expect(emptyStages.every(({ asset, label }) => !asset && !label)).toBe(true);
    expect(malformedStages.every(({ label }) => !label)).toBe(true);
  });

  it("keeps only complete arc principles and tolerates non-list values", () => {
    expect(
      getProcessArcPrinciples([
        { name: "Structure", description: "Curved steel geometry." },
        { name: "Missing description" },
        null,
        { name: "Memory", description: "The historic profile returns." },
      ]),
    ).toEqual([
      { name: "Structure", description: "Curved steel geometry." },
      { name: "Memory", description: "The historic profile returns." },
    ]);
    expect(getProcessArcPrinciples({})).toEqual([]);
  });
});
