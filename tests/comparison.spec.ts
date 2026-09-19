import { test, expect } from "@playwright/test";
test("default offers → 4 GB + 1 TB → unpriced overage → source disclosure → reset, with editable and invalid requests", async ({
  page,
}) => {
  await page.goto("/");
  const offers = page.getByRole("article");
  await expect(offers).toHaveCount(11);
  await expect(offers.first()).toContainText("۷۱۰٬۰۰۰");
  const preset = page.getByRole("button", {
    name: "حداقل ۴ GB رم",
    exact: true,
  });
  await preset.focus();
  await page.keyboard.press("Enter");
  await expect(offers).toHaveCount(8);
  await expect(offers.first()).toContainText("۱٬۴۲۰٬۰۰۰");
  const trafficPreset = page.getByRole("button", {
    name: "۴ GB رم + ۱ TB خروجی",
    exact: true,
  });
  await trafficPreset.focus();
  await page.keyboard.press("Enter");
  await expect(offers).toHaveCount(8);
  await expect(offers.first()).toContainText("NGP-small40");
  await expect(offers.first()).toContainText("۱٬۸۲۳٬۹۹۹");
  const manageit = page.getByRole("article", {
    name: "منیجیت manageit-2c-4g-75g",
    exact: true,
  });
  await expect(manageit).toContainText("۱٬۴۲۰٬۰۰۰ + ۱٬۲۰۰٬۰۰۰ = ۲٬۶۲۰٬۰۰۰");
  await expect(manageit).toContainText("۱٬۰۰۰ GB × ۱٬۲۰۰");
  await expect(
    page.getByLabel("حداقل پردازنده (هسته)", { exact: true }),
  ).toHaveValue("");
  await expect(page.getByLabel("حداقل دیسک (GB)", { exact: true })).toHaveValue(
    "",
  );
  const egress = page.getByLabel("خروجی ماهانه (GB)", { exact: true });
  const ingress = page.getByLabel("ورودی ماهانه (GB، اختیاری)", {
    exact: true,
  });
  await egress.focus();
  await page.keyboard.press("ControlOrMeta+A");
  await page.keyboard.type("1200");
  const ranked = page.getByRole("region", { name: "پیشنهادها", exact: true });
  const unpriced = page.getByRole("region", {
    name: "پیشنهادهای بدون برآورد ترافیک",
    exact: true,
  });
  await expect(ranked.getByRole("article")).toHaveCount(3);
  await expect(unpriced.getByRole("article")).toHaveCount(5);
  await expect(manageit).toContainText("۱٬۴۲۰٬۰۰۰ + ۱٬۴۴۰٬۰۰۰ = ۲٬۸۶۰٬۰۰۰");
  await expect(unpriced).toContainText("قیمت پایه ناقص؛ خارج از رتبه‌بندی");
  await expect(unpriced).toContainText("۲۰۰ GB");
  const disclosure = manageit.getByText("جزئیات هزینه و منبع", { exact: true });
  await disclosure.focus();
  await page.keyboard.press("Enter");
  const source = manageit.getByRole("link", { name: "صفحه تعرفه ارائه‌دهنده" });
  await expect(source).toBeVisible();
  await expect(source).toHaveAttribute(
    "href",
    "https://www.manageitcloud.com/cloud-server",
  );
  await expect(source).toHaveAttribute("target", "_blank");
  await expect(manageit).toContainText("۱۹۵٬۰۰۰");
  await expect(manageit).toContainText("upload: free; download: 1200 toman/GB");
  await expect(page.getByRole("checkbox")).toHaveCount(0);
  await expect(page.locator("body")).not.toContainText(
    /2026-|۱۴۰۵|snapshot_saved_at/,
  );
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  for (const field of [egress, ingress]) {
    await field.fill("-1");
    await expect(field).toHaveAttribute("aria-invalid", "true");
    await expect(offers).toHaveCount(0);
    await field.fill("");
  }
  await ingress.fill("1200");
  await expect(manageit).toContainText("۱٬۴۲۰٬۰۰۰ + ۰ = ۱٬۴۲۰٬۰۰۰");
  await page.getByRole("button", { name: "پاک کردن فیلترها" }).click();
  await expect(offers).toHaveCount(11);
  await expect(egress).toHaveValue("");
  await expect(ingress).toHaveValue("");
  const ram = page.getByLabel("حداقل رم (GB)", { exact: true });
  await ram.fill("128");
  await expect(offers).toHaveCount(0);
  await expect(page.getByText("پیشنهادی با این منابع نداریم.")).toBeVisible();
  await expect(ram).toHaveValue("128");
  await page.getByRole("button", { name: "نمایش همه پیشنهادها" }).click();
  for (const value of ["-1", "1.5", "Infinity", "abc"]) {
    await ram.fill(value);
    await expect(ram).toHaveAttribute("aria-invalid", "true");
    await expect(page.getByRole("alert")).toBeVisible();
    await expect(offers).toHaveCount(0);
  }
  await ram.fill("۴");
  await expect(offers).toHaveCount(8);
  await ram.fill("");
  await expect(offers).toHaveCount(11);
  await page.getByLabel("حداقل پردازنده (هسته)", { exact: true }).fill("8");
  await expect(offers).toHaveCount(2);
  await page.getByLabel("حداقل دیسک (GB)", { exact: true }).fill("160");
  await expect(offers).toHaveCount(1);
  await page.getByRole("button", { name: "بدون محدودیت", exact: true }).click();
  await expect(offers).toHaveCount(11);
  await ram.fill("8");
  await page.reload();
  await expect(offers).toHaveCount(11);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
});
