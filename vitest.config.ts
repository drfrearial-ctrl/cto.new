import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths";

// Dedicated test config: intentionally does NOT load the TanStack Start or
// Tailwind plugins (they are only needed for the dev/build pipeline). Use
// vite-tsconfig-paths so the `~/*` alias resolves in tests.
export default defineConfig({
  plugins: [react(), tsConfigPaths({ projects: ["./tsconfig.json"] })],
  test: {
    environment: "jsdom",
    globals: false,
    include: ["src/**/*.test.{ts,tsx}"],
    setupFiles: ["./src/test/setup.ts"],
    css: false,
  },
});
