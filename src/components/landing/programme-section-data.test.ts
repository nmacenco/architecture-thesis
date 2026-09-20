import { describe, expect, it } from "vitest";
import type { LandingAsset, LandingSection } from "../../content/landing-page";
import {
  getProgrammeBuildings,
  getProgrammeFacts,
  getProgrammeMediaSlots,
  getProgrammePremises,
} from "./programme-section-data";

function asset(id: string): LandingAsset {
  return {
    id,
    src: null,
    type: "diagram",
    altKey: `landing.programme.assets.${id}.alt`,
    credit: null,
    status: "pending",
    required: true,
  };
}

function section(assets: LandingAsset[]): LandingSection {
  return {
    id: "programme",
    name: "Architectural programme",
    translationKey: "landing.programme",
    enabled: true,
    navigation: {
      included: false,
      anchor: "programme",
      labelKey: "landing.programme.navLabel",
    },
    textKeys: {},
    assets,
  };
}

describe("programme section data", () => {
  it("keeps only complete premises, buildings, and facts", () => {
    expect(
      getProgrammePremises([
        { name: "Environmental", description: "Public space." },
        { name: "Missing description" },
        null,
      ]),
    ).toEqual([{ name: "Environmental", description: "Public space." }]);

    expect(
      getProgrammeBuildings([
        { name: "Theatre", uses: "Three halls." },
        { name: "", uses: "Invalid." },
      ]),
    ).toEqual([{ name: "Theatre", uses: "Three halls." }]);

    expect(
      getProgrammeFacts([
        { label: "Interior", value: "100 m²", verification: "pending" },
        { label: "Missing value" },
      ]),
    ).toEqual([
      { label: "Interior", value: "100 m²", verification: "pending" },
    ]);
  });

  it("tolerates empty and malformed localized collections", () => {
    expect(getProgrammePremises("Premises")).toEqual([]);
    expect(getProgrammeBuildings({})).toEqual([]);
    expect(getProgrammeFacts(null)).toEqual([]);
  });

  it("retains both required drawing identities when assets are missing", () => {
    const slots = getProgrammeMediaSlots(
      section([asset("programme-masterplan")]),
    );

    expect(slots.map(({ id }) => id)).toEqual([
      "programme-masterplan",
      "programme-axonometry",
    ]);
    expect(slots[0].asset?.id).toBe("programme-masterplan");
    expect(slots[1].asset).toBeUndefined();
  });
});
