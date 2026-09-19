import { expect, test } from "vitest";
import catalog from "../research/vps-comparison-data.json";
import { compare } from "./comparison";

test("ranks the complete reviewed sample by exact monthly base prices", () => {
  const result = compare(catalog, {});
  expect(result.errors).toEqual({});
  expect(result.ranked.map((q) => [q.plan.id, q.baseMonthlyToman])).toEqual([
    ["manageit-1c-1g-25g", 710000],
    ["manageit-1c-2g-50g", 975000],
    ["manageit-2c-2g-75g", 1325000],
    ["manageit-2c-4g-75g", 1420000],
    ["NGP-small40", 1823999],
    ["manageit-4c-4g-75g", 2030000],
    ["NGP-medium40", 2803199],
    ["manageit-6c-12g-150g", 3950000],
    ["NGP-large80", 4823039],
    ["NGP-xlarge120", 8801279],
    ["NGP-2xlarge160", 16696319],
  ]);
  expect(result.unpriced).toEqual([]);
  expect(result.excluded).toEqual([]);
});

test("applies only explicit resource minimums, inclusively, and explains exclusions", () => {
  const result = compare(catalog, { ram: "4", cpu: "", disk: "" });
  expect(result.ranked).toHaveLength(8);
  expect(result.ranked[0]).toMatchObject({
    plan: { id: "manageit-2c-4g-75g" },
    baseMonthlyToman: 1420000,
  });
  expect(result.ranked.some((q) => q.plan.id === "NGP-small40")).toBe(true);
  expect(result.excluded).toHaveLength(3);
  expect(result.excluded[0].reasons).toEqual(["ram_below_minimum"]);
  expect(
    compare(catalog, { cpu: 8, disk: 160 }).ranked.map((q) => q.plan.id),
  ).toEqual(["NGP-2xlarge160"]);
  expect(compare(catalog, { ram: 128 }).ranked).toEqual([]);
});

test.each([
  -1,
  1.5,
  Infinity,
  NaN,
  "oops",
  "1.5",
  "-1",
  "Infinity",
  "1e3",
  "0x10",
])("rejects invalid resource input %s without stale quotes", (value) => {
  for (const resource of ["ram", "cpu", "disk"]) {
    const result = compare(catalog, { [resource]: value });
    expect(result.errors).toHaveProperty(resource);
    expect(result.ranked).toEqual([]);
  }
});
test("accepts explicit zero and Persian and Arabic whole numbers", () => {
  expect(compare(catalog, { ram: 0 }).ranked).toHaveLength(11);
  expect(compare(catalog, { ram: "۴", cpu: "١" }).ranked).toHaveLength(8);
});

test("uses stable identifiers to break equal-price ties regardless of catalog order", () => {
  const sample = structuredClone(catalog);
  sample.plans = [sample.plans[1], sample.plans[0]];
  sample.plans.forEach((p) => {
    p.advertised_monthly_toman = 710000;
  });
  expect(compare(sample, {}).ranked.map((q) => q.plan.id)).toEqual([
    "manageit-1c-1g-25g",
    "manageit-1c-2g-50g",
  ]);
});
test.each([
  (c: any) => {
    c.plans.push(c.plans[0]);
  },
  (c: any) => {
    c.plans[0].advertised_monthly_toman = -1;
  },
  (c: any) => {
    c.plans[0].advertised_monthly_toman = Infinity;
  },
  (c: any) => {
    delete c.plans[0].ram_gb;
  },
  (c: any) => {
    c.plans[0].source = "missing";
  },
  (c: any) => {
    c.providers.manageit.traffic_original_labels.download_toman_per_gb = -1;
  },
])("blocks malformed catalog instead of inventing offers", (mutate) => {
  const sample = structuredClone(catalog);
  mutate(sample);
  const result = compare(sample, {});
  expect(result.errors.catalog).toBeTruthy();
  expect(result.ranked).toEqual([]);
});
