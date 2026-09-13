import { describe, expect, it } from "vitest";
import type { LandingAsset, LandingSection } from "../../content/landing-page";
import {
  canPreviewConceptCandidate,
  getConceptKeywords,
  getConceptMediaSlots,
} from "./concept-section-data";

function asset(id: string, required: boolean): LandingAsset {
  return {
    id,
    src: null,
    type: "diagram",
    altKey: `landing.concept.assets.${id}.alt`,
    credit: null,
    status: "pending",
    required,
  };
}

function section(assets: LandingAsset[]): LandingSection {
  return {
    id: "concept",
    name: "Concept",
    translationKey: "landing.concept",
    enabled: true,
    navigation: {
      included: true,
      anchor: "concept",
      labelKey: "landing.concept.navLabel",
    },
    textKeys: {},
    assets,
  };
}

describe("concept section data", () => {
  it("keeps valid stable keyword values and tolerates empty or malformed catalogs", () => {
    expect(getConceptKeywords(["Memory", "", 3, "Heritage"])).toEqual([
      "Memory",
      "Heritage",
    ]);
    expect(getConceptKeywords([])).toEqual([]);
    expect(getConceptKeywords("Memory")).toEqual([]);
  });

  it("retains missing required slots and omits an absent optional photograph", () => {
    const slots = getConceptMediaSlots(
      section([asset("concept-collage", true)]),
    );

    expect(slots.map(({ id }) => id)).toEqual([
      "concept-collage",
      "concept-diagram",
    ]);
    expect(slots.find(({ id }) => id === "concept-diagram")?.asset).toBeUndefined();
  });

  it("preserves the optional photograph when its manifest slot exists", () => {
    const slots = getConceptMediaSlots(
      section([
        asset("concept-collage", true),
        asset("concept-diagram", true),
        asset("concept-existing", false),
      ]),
    );

    expect(slots.map(({ id }) => id)).toEqual([
      "concept-collage",
      "concept-diagram",
      "concept-existing",
    ]);
  });

  it("previews only candidate media with a project-relative source", () => {
    expect(canPreviewConceptCandidate(asset("concept-collage", true))).toBe(false);
    expect(
      canPreviewConceptCandidate({
        ...asset("concept-collage", true),
        status: "candidate",
        src: "/images/concept/collage.svg",
      }),
    ).toBe(true);
    expect(
      canPreviewConceptCandidate({
        ...asset("concept-collage", true),
        status: "candidate",
        src: "https://example.com/collage.svg",
      }),
    ).toBe(false);
  });
});
