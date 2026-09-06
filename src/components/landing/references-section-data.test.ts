import { describe, expect, it } from "vitest";
import type { LandingAsset, LandingSection } from "../../content/landing-page";
import { getReferenceCards } from "./references-section-data";

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
