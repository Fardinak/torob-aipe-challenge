import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { catalog } from "./catalog";
for (const source of Object.values(catalog.sources)) {
  const hash = createHash("sha256")
    .update(readFileSync(source.snapshot))
    .digest("hex");
  if (hash !== source.sha256)
    throw new Error(`Evidence hash mismatch: ${source.snapshot}`);
}
console.log(
  `Validated ${catalog.plans.length} catalog records and retained evidence hashes.`,
);
