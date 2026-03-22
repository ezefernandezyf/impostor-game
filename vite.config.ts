import { defineConfig } from "vitest/config";
import tailwindcss from '@tailwindcss/vite'
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [tailwindcss(), react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    globals: true,
    css: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov"],
      exclude: ["eslint.config.js", "vite.config.ts", "src/main.tsx", "src/**/index.ts", "src/domain/game/types.ts"],
    },
  },
});