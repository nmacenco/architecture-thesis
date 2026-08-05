import { describe, expect, it } from "vitest";
import { routing } from "./routing";

describe("routing", () => {
  it("keeps Spanish as the default public locale", () => {
    expect(routing.defaultLocale).toBe("es");
    expect(routing.locales).toEqual(["es", "en"]);
    expect(routing.localePrefix).toBe("always");
  });
});
