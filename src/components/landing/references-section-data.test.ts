import { describe, expect, it } from "vitest";
import type { LandingAsset, LandingSection } from "../../content/landing-page";
import {
  canPreviewReferenceCandidate,
  getReferenceCards,
} from "./references-section-data";

function asset(id: string): LandingAsset {
  return {
    id,
    src: null,
    type: "photograph",
    altKey: `landing.references.assets.${id}.alt`,
    credit: null,
    status: "pending",
    required: true,
  };
}

function section(assets: LandingAsset[]): LandingSection {
  return {
    id: "references",
    name: "References",
    translationKey: "landing.references",
    enabled: true,
    navigation: {
      included: false,
      anchor: "references",
      labelKey: "landing.references.navLabel",
    },
    textKeys: {},
    assets,
  };
}

const validItems = [
  { name: "First", place: "One", lesson: "Lesson one", verification: "pending" },
  { name: "Second", place: "Two", lesson: "Lesson two", verification: "pending" },
  { name: "Third", place: "Three", lesson: "Lesson three", verification: "pending" },
];

describe("references section data", () => {
  it("previews only candidate images with project-relative paths", () => {
    const candidate = { ...asset("reference-marconetti"), status: "candidate" as const };

    expect(canPreviewReferenceCandidate({ ...candidate, src: "/images/references/example.jpg" })).toBe(true);
    expect(canPreviewReferenceCandidate({ ...candidate, src: "//example.com/image.jpg" })).toBe(false);
    expect(canPreviewReferenceCandidate({ ...candidate, src: "https://example.com/image.jpg" })).toBe(false);
    expect(canPreviewReferenceCandidate({ ...candidate, src: null })).toBe(false);
    expect(canPreviewReferenceCandidate({ ...candidate, status: "pending" })).toBe(false);
    expect(canPreviewReferenceCandidate(undefined)).toBe(false);
  });

  it("pairs catalog entries with stable manifest asset identities", () => {
    const cards = getReferenceCards(
      section([
        asset("reference-marconetti"),
        asset("reference-agueda"),
        asset("reference-san-martin"),
      ]),
      validItems,
    );

    expect(cards.map(({ id }) => id)).toEqual([
      "reference-marconetti",
      "reference-agueda",
      "reference-san-martin",
    ]);
    expect(cards.map(({ item }) => item?.name)).toEqual(["First", "Second", "Third"]);
  });

  it("preserves required media slots when the reserved catalog is empty", () => {
    const cards = getReferenceCards(section([]), []);

    expect(cards).toHaveLength(3);
    expect(cards.every(({ asset, item }) => asset === undefined && item === undefined)).toBe(
      true,
    );
  });

  it("does not shift later associations when an item is malformed", () => {
    const cards = getReferenceCards(section([]), [
      validItems[0],
      { name: "Missing lesson", place: "Two" },
      validItems[2],
    ]);

    expect(cards[0].item?.name).toBe("First");
    expect(cards[1].item).toBeUndefined();
    expect(cards[2].item?.name).toBe("Third");
  });
});
