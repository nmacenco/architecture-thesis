import { describe, expect, it } from "vitest";
import type { LandingAsset } from "../../content/landing-page";
import { getHeroMediaState } from "./hero-media";

function asset(overrides: Partial<LandingAsset> = {}): LandingAsset {
  return {
    id: "hero-primary",
    src: null,
    type: "render",
    altKey: "landing.hero.assets.primary.alt",
    credit: null,
    status: "pending",
    required: true,
    ...overrides,
  };
}

describe("hero media state", () => {
  it("renders only an approved asset with a source as final media", () => {
    expect(getHeroMediaState(asset({ status: "approved", src: "/hero.webp" }))).toBe(
      "approved",
    );
  });

  it("keeps pending and candidate assets in the pending placeholder", () => {
    expect(getHeroMediaState(asset())).toBe("pending");
    expect(getHeroMediaState(asset({ status: "candidate", src: "/candidate.webp" }))).toBe(
      "pending",
    );
  });

  it("uses the unavailable state for missing or malformed approved assets", () => {
    expect(getHeroMediaState(undefined)).toBe("unavailable");
    expect(getHeroMediaState(asset({ status: "unavailable" }))).toBe("unavailable");
    expect(getHeroMediaState(asset({ status: "approved", src: null }))).toBe("unavailable");
    expect(
      getHeroMediaState(asset({ status: "approved", src: "https://example.com/hero.webp" })),
    ).toBe("unavailable");
  });
});
