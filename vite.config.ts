import { defineConfig } from "vitest/config";
import { readFileSync } from "node:fs";
import reviewed from "./research/vps-reviewed-catalog.json" with { type: "json" };

export default defineConfig({
  base: process.env.BASE_PATH ?? "/",
  plugins: [
    {
      name: "retained-catalog-evidence",
      generateBundle() {
        this.emitFile({
          type: "asset",
          fileName: "evidence/catalog.json",
          source: JSON.stringify(
            {
              ...reviewed,
              sources: Object.fromEntries(
                Object.entries(reviewed.sources).map(([id, source]) => [
                  id,
                  { ...source, published_snapshot: `${id}.txt` },
                ]),
              ),
            },
            null,
            2,
          ),
        });
        for (const [id, source] of Object.entries(reviewed.sources)) {
          // Serve captured provider HTML as text, never executable same-origin HTML.
          this.emitFile({
            type: "asset",
            fileName: `evidence/${id}.txt`,
            source: readFileSync(source.snapshot),
          });
        }
      },
    },
  ],
  test: { include: ["src/**/*.test.ts"] },
});
