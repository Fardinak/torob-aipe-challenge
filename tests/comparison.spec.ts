import { test, expect } from "@playwright/test";
test("default offers → 4 GB filter → source disclosure → reset, with editable and invalid requests", async ({
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
  const disclosure = offers
    .first()
    .getByText("جزئیات هزینه و منبع", { exact: true });
  await disclosure.focus();
  await page.keyboard.press("Enter");
  const source = offers
    .first()
    .getByRole("link", { name: "صفحه تعرفه ارائه‌دهنده" });
  await expect(source).toBeVisible();
  await expect(source).toHaveAttribute(
    "href",
    "https://www.manageitcloud.com/cloud-server",
  );
  await expect(source).toHaveAttribute("target", "_blank");
  await expect(offers.first()).toContainText("۱۹۵٬۰۰۰");
  await page.getByRole("button", { name: "پاک کردن فیلترها" }).click();
  await expect(offers).toHaveCount(11);
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
