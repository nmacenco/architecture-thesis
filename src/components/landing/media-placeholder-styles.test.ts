import { describe, expect, it } from "vitest";
import {
  getMediaPlaceholderClasses,
  mediaPlaceholderVariantClasses,
} from "./media-placeholder-styles";

describe("media placeholder variants", () => {
  it("gives the hero one absolute positioning mode and one background", () => {
    const heroClasses = getMediaPlaceholderClasses("hero");

    expect(heroClasses.split(" ")).toContain("absolute");
    expect(heroClasses.split(" ")).not.toContain("relative");
    expect(heroClasses.match(/bg-\[linear-gradient/g)).toHaveLength(1);
  });

  it("keeps every variant complete instead of layering conflicting overrides", () => {
    for (const variant of Object.keys(mediaPlaceholderVariantClasses) as Array<
      keyof typeof mediaPlaceholderVariantClasses
    >) {
      const classes = getMediaPlaceholderClasses(variant);

      expect(classes).toMatch(/\b(?:absolute|relative)\b/);
      expect(classes.match(/bg-\[linear-gradient/g)).toHaveLength(1);
    }
  });
});
