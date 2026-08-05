import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    coverage: {
      provider: "v8",
      include: ["src/i18n/routing.ts"],
      reporter: ["text", "html"],
    },
  },
});
