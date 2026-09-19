import { catalogSchema, type Plan } from "./catalog";
export type Resource = "ram" | "cpu" | "disk";
export type Request = Partial<Record<Resource, string | number>>;
export type Quote = { plan: Plan; baseMonthlyToman: number; reasons: string[] };
export type Comparison = {
  ranked: Quote[];
  unpriced: { plan: Plan; reasons: string[] }[];
  excluded: { plan: Plan; reasons: string[] }[];
  errors: Partial<Record<Resource | "catalog", string>>;
};
const resources = { ram: "ram_gb", cpu: "cpu_count", disk: "disk_gb" } as const;
export function compare(inputCatalog: unknown, request: Request): Comparison {
  const result: Comparison = {
    ranked: [],
    unpriced: [],
    excluded: [],
    errors: {},
  };
  const parsed = catalogSchema.safeParse(inputCatalog);
  if (!parsed.success) {
    result.errors.catalog = "داده‌های فهرست معتبر نیست؛ مقایسه در دسترس نیست.";
    return result;
  }
  const catalog = parsed.data;
  const minimums: Record<Resource, number> = { ram: 0, cpu: 0, disk: 0 };
  for (const key of Object.keys(resources) as Resource[]) {
    const raw = request[key];
    const text = String(raw ?? "")
      .trim()
      .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 1776))
      .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 1632));
    const value = Number(text);
    if (
      (text !== "" && !/^\d+$/.test(text)) ||
      !Number.isSafeInteger(value) ||
      value < 0
    )
      result.errors[key] = "عدد صحیح صفر یا بیشتر وارد کنید.";
    else minimums[key] = value;
  }
  if (Object.keys(result.errors).length) return result;
  for (const plan of catalog.plans) {
    const reasons = (Object.keys(resources) as Resource[])
      .filter((key) => plan[resources[key]] < minimums[key])
      .map((key) => `${key}_below_minimum`);
    if (reasons.length) result.excluded.push({ plan, reasons });
    else
      result.ranked.push({
        plan,
        baseMonthlyToman: plan.advertised_monthly_toman,
        reasons: ["advertised_base_price"],
      });
  }
  result.ranked.sort(
    (a, b) =>
      a.baseMonthlyToman - b.baseMonthlyToman ||
      (a.plan.id < b.plan.id ? -1 : a.plan.id > b.plan.id ? 1 : 0),
  );
  return result;
}
