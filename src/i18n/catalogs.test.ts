import { describe, expect, it } from "vitest";
import english from "../../messages/en.json";
import spanish from "../../messages/es.json";

function getLeafKeys(value: unknown, prefix = ""): string[] {
  if (Array.isArray(value) || typeof value !== "object" || value === null) return [prefix];

  return Object.entries(value)
    .flatMap(([key, child]) => getLeafKeys(child, prefix ? `${prefix}.${key}` : key))
    .sort();
}

describe("translation catalogs", () => {
  it("provides the same message structure in Spanish and English", () => {
    expect(getLeafKeys(spanish)).toEqual(getLeafKeys(english));
  });
});
