import { describe, expect, it } from "vitest";
import type { LandingAsset } from "../../content/landing-page";
import { getLandingMediaState } from "./media-state";

function asset(overrides: Partial<LandingAsset> = {}): LandingAsset {
  return {
    id: "example-media",
    src: null,
    type: "render",
    altKey: "landing.example.assets.media.alt",
    credit: null,
    status: "pending",
    required: true,
    ...overrides,
  };
}

describe("landing media state", () => {
  it("renders only approved project-relative media as final", () => {
    expect(getLandingMediaState(asset({ status: "approved", src: "/media.webp" }))).toBe(
      "approved",
    );
  });

  it("keeps pending and candidate media as placeholders", () => {
    expect(getLandingMediaState(asset())).toBe("pending");
    expect(
      getLandingMediaState(asset({ status: "candidate", src: "/candidate.webp" })),
    ).toBe("pending");
  });

  it("uses the unavailable state for absent or malformed approved media", () => {
    expect(getLandingMediaState(undefined)).toBe("unavailable");
    expect(getLandingMediaState(asset({ status: "unavailable" }))).toBe("unavailable");
    expect(getLandingMediaState(asset({ status: "approved", src: null }))).toBe(
      "unavailable",
    );
    expect(
      getLandingMediaState(
        asset({ status: "approved", src: "https://example.com/media.webp" }),
      ),
    ).toBe("unavailable");
  });
});
