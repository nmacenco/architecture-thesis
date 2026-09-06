import { describe, expect, it } from "vitest";
import type { LandingAsset, LandingSection } from "../../content/landing-page";
import {
  getSiteConditions,
  getSiteFacts,
  getSiteMediaSlots,
} from "./site-section-data";

function asset(id: string, required: boolean): LandingAsset {
  return {
    id,
    src: null,
    type: "photograph",
    altKey: `landing.site.assets.${id}.alt`,
    credit: null,
    status: "pending",
    required,
  };
}

function section(assets: LandingAsset[]): LandingSection {
  return {
    id: "site",
    name: "Context and site",
    translationKey: "landing.site",
    enabled: true,
    navigation: {
      included: true,
      anchor: "site",
      labelKey: "landing.site.navLabel",
    },
    textKeys: {},
    assets,
  };
}

describe("site section data", () => {
  it("keeps valid conditions while tolerating empty and malformed collections", () => {
    expect(getSiteConditions(["Transit", "", 3, "Heritage"])).toEqual([
      "Transit",
      "Heritage",
    ]);
    expect(getSiteConditions([])).toEqual([]);
    expect(getSiteConditions("Transit")).toEqual([]);
  });

  it("keeps only facts with readable labels and values", () => {
    expect(
      getSiteFacts([
        { label: "Area", value: "100 m²", verification: "pending" },
        { label: "", value: "Missing label" },
        { label: "Missing value" },
        null,
      ]),
    ).toEqual([{ label: "Area", value: "100 m²", verification: "pending" }]);
    expect(getSiteFacts([])).toEqual([]);
  });

  it("retains missing required slots and omits an absent optional aerial", () => {
    const slots = getSiteMediaSlots(section([asset("site-regional-map", true)]));

    expect(slots.map(({ id }) => id)).toEqual([
      "site-regional-map",
      "site-location-plan",
      "site-historical",
      "site-current",
    ]);
    expect(slots.find(({ id }) => id === "site-location-plan")?.asset).toBeUndefined();
  });

  it("preserves the optional aerial when its manifest slot exists", () => {
    const slots = getSiteMediaSlots(
      section([
        asset("site-regional-map", true),
        asset("site-location-plan", true),
        asset("site-aerial", false),
        asset("site-historical", true),
        asset("site-current", true),
      ]),
    );

    expect(slots.map(({ id }) => id)).toEqual([
      "site-regional-map",
      "site-location-plan",
      "site-aerial",
      "site-historical",
      "site-current",
    ]);
  });
});
