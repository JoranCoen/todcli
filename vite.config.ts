import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  build: {
    ssr: true,
    target: "node20",
    outDir: "dist",
    lib: {
      entry: "src/cli.tsx",
      formats: ["es"],
    },
    rollupOptions: {
      external: [
        "react",
        "ink",
        "ink-select-input",
        "node:fs",
        "node:path",
        "node:util",
      ],
      output: {
        entryFileNames: "cli.js",
      },
    },
  },
});

