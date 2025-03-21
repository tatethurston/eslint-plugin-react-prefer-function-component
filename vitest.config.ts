import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    globals: true,
    coverage: {
      include: ["packages/eslint-plugin-react-prefer-function-component/**"],
      exclude: ["**/dist/**"],
    },
  },
});
