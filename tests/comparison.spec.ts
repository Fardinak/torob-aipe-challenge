import { test, expect } from "@playwright/test";

test("browse exact configurations, filter base budgets, inspect provider terms and preserve traffic comparison", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("requestfailed", (request) => errors.push(request.url()));
  page.on("response", (response) => {
    if (response.status() >= 400)
      errors.push(`${response.status()} ${response.url()}`);
  });
  expect((await page.goto("./"))?.status()).toBe(200);
  await expect(page.locator("html")).toHaveAttribute("lang", "fa");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await page.evaluate(() => document.fonts.ready);
  const configurations = page
    .getByRole("button")
    .filter({ has: page.locator("strong") });
  const offers = page.getByRole("article");
  const ram = page.getByLabel("حداقل رم (GB)", { exact: true });
  const budget = page.getByLabel("سقف قیمت پایه ماهانه (تومان)");
  const egress = page.getByLabel("خروجی ماهانه (GB)", { exact: true });
  await expect(configurations).toHaveCount(12);
  await expect(configurations.first()).toContainText("از ۷۱۰٬۰۰۰");
  await expect(offers).toHaveCount(1);
  await expect(offers).toContainText("قیمت پایه اعلام‌شده");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("button", { name: "پاک کردن فیلترها" }),
  ).toBeFocused();
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  const preset = page.getByRole("button", {
    name: "حداقل ۴ GB رم",
    exact: true,
  });
  await expect(preset).toBeFocused();
  expect(
    await preset.evaluate((element) => getComputedStyle(element).outlineStyle),
  ).not.toBe("none");
  await page.keyboard.press("Enter");
  await expect(configurations).toHaveCount(8);
  await expect(configurations.first()).toContainText("از ۱٬۴۲۰٬۰۰۰");
  await page.getByLabel("روش تطبیق منابع").selectOption("exact");
  await expect(configurations).toHaveCount(3);
  await page.getByLabel("دقیق پردازنده (هسته)", { exact: true }).fill("٢");
  await expect(configurations).toHaveCount(1);
  await budget.fill("1400000");
  await expect(configurations).toHaveCount(0);
  await expect(page.getByText("پیشنهادی با این منابع نداریم.")).toBeVisible();
  await expect(budget).toHaveValue("1400000");
  await budget.fill("۱۴۲۰۰۰۰");
  await expect(configurations).toHaveCount(1);
  await expect(configurations.first()).toContainText("هزینه نهایی نامشخص");
  await expect(offers).toContainText("هزینه‌های اجباری ناقص");
  await offers.getByText("جزئیات هزینه و منبع", { exact: true }).click();
  await expect(offers).toContainText(
    "تعداد هسته یکسان به معنی عملکرد برابر نیست",
  );
  await expect(offers).toContainText("مرجع ماهانه؛ پرداخت ساعتی PAYG");
  await expect(
    offers.getByRole("link", { name: "صفحه تعرفه ارائه‌دهنده" }),
  ).toHaveAttribute("href", "https://www.manageitcloud.com/cloud-server");
  await expect(
    offers.getByRole("link", { name: "صفحه تعرفه ارائه‌دهنده" }),
  ).toHaveAttribute("target", "_blank");
  await expect(
    offers.getByRole("link", { name: "منبع تعرفه IP شناور" }),
  ).toHaveAttribute("href", "https://www.manageitcloud.com/floating-ip");

  await page
    .getByRole("button", { name: "۴ GB رم + ۱ TB خروجی", exact: true })
    .click();
  await expect(page.getByLabel("روش مقایسه قیمت")).toHaveValue("traffic");
  await expect(configurations.first()).toContainText("از ۲٬۴۳۶٬۳۹۹");
  const manageitConfiguration = configurations.filter({
    hasText: "۲ هسته / ۴ GB رم / ۷۵ GB دیسک",
  });
  await manageitConfiguration.click();
  await expect(offers).toContainText("۱٬۴۲۰٬۰۰۰ + ۱٬۲۰۰٬۰۰۰ = ۲٬۶۲۰٬۰۰۰");
  await expect(offers).toContainText("۱٬۰۰۰ GB × ۱٬۲۰۰");
  await egress.fill("1200");
  await expect(configurations).toHaveCount(8);
  await expect(
    configurations.filter({ hasText: "خارج از رتبه‌بندی" }),
  ).toHaveCount(5);
  await expect(offers).toContainText("۱٬۴۲۰٬۰۰۰ + ۱٬۴۴۰٬۰۰۰ = ۲٬۸۶۰٬۰۰۰");
  await configurations
    .filter({ hasText: "۱ هسته / ۴ GB رم / ۴۰ GB دیسک" })
    .click();
  await expect(offers).toContainText("تعرفه ترافیک اضافه نامشخص است");
  await expect(offers).toContainText("خارج از رتبه‌بندی");
  await offers.getByText("جزئیات هزینه و منبع", { exact: true }).click();
  await expect(
    offers.getByRole("link", { name: "صفحه تعرفه ارائه‌دهنده" }),
  ).toHaveAttribute("href", "https://www.iranserver.com/vps/iran/");
  await budget.fill("1420000");
  await expect(configurations).toHaveCount(1);
  await expect(offers).toContainText("۲٬۸۶۰٬۰۰۰"); // Budget is base only, never a complete-bill guarantee.
  await page.getByLabel("روش مقایسه قیمت").selectOption("base");
  await expect(offers).toContainText("۱٬۴۲۰٬۰۰۰");
  await expect(offers).not.toContainText("ترافیک قابل پرداخت:");
  for (const field of [egress, budget, ram]) {
    for (const value of ["-1", "1.5", "abc"]) {
      await field.fill(value);
      await expect(field).toHaveAttribute("aria-invalid", "true");
      await expect(page.getByRole("alert")).toBeVisible();
      await expect(configurations).toHaveCount(0);
      await expect(offers).toHaveCount(0);
    }
    await field.fill("");
  }
  await ram.fill("128");
  await expect(configurations).toHaveCount(0);
  await page.getByRole("button", { name: "نمایش همه پیشنهادها" }).click();
  await expect(configurations).toHaveCount(12);
  await ram.fill("۴");
  await expect(configurations).toHaveCount(8);
  await page.reload();
  await expect(configurations).toHaveCount(12);
  await expect(ram).toHaveValue("");
  await expect(page.getByLabel("روش مقایسه قیمت")).toHaveValue("base");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  expect(errors).toEqual([]);
});

test("evidence warnings accompany starting prices and unknown identity stays separate", async ({
  page,
}) => {
  await page.clock.setFixedTime(new Date("2026-11-28T00:00:00Z"));
  await page.goto("./");
  const first = page.locator(".configuration").first();
  await expect(first).toContainText("آخرین تأیید موفق: 2026-10-29");
  await expect(first).not.toContainText("شواهد قدیمی");
  await page.clock.setFixedTime(new Date("2026-11-29T00:00:00Z"));
  await page.reload();
  await expect(first).toContainText("شواهد قدیمی");
  await expect(first).toContainText("۷۱۰٬۰۰۰");
  await expect(page.getByRole("article")).toContainText("شواهد قدیمی");
  const historical = page
    .locator(".configuration")
    .filter({ hasText: "۴ هسته / نامشخص GB رم / ۸۰ GB دیسک" });
  await expect(historical).toContainText("هویت دقیق تأیید نشده");
  await historical.click();
  const offer = page.getByRole("article", {
    name: "ایران‌سرور NGP-large80",
    exact: true,
  });
  await expect(offer).toContainText("قیمت نامشخص");
  await expect(offer).toContainText("آخرین تأیید موفق: 2026-09-19");
  await offer.getByText("جزئیات هزینه و منبع", { exact: true }).click();
  await expect(offer).toContainText("ناموفق؛ به معنی خروج از عرضه نیست");
});

test("browse managed databases, choose engine/version and inspect reviewed service facts", async ({
  page,
}) => {
  await page.goto("./");
  await page.getByLabel("دسته خدمات").selectOption("database");
  await expect(
    page.getByLabel("خروجی ماهانه (GB)", { exact: true }),
  ).toHaveCount(0);
  await expect(page.locator(".configuration")).toHaveCount(4);
  await page.getByLabel("موتور دیتابیس").selectOption("PostgreSQL");
  await page.getByLabel("نسخه دیتابیس").selectOption("18.4");
  await page.getByLabel("حداقل رم (GB)", { exact: true }).fill("4");
  await expect(page.locator(".configuration")).toHaveCount(1);
  await expect(page.getByRole("article")).toContainText("PostgreSQL");
  await expect(page.getByRole("article")).toContainText("۴٬۱۲۵٬۰۰۰");
  await expect(page.getByRole("article")).toContainText(
    "تعارض شواهد پشتیبان‌گیری",
  );
  await page.getByText("جزئیات هزینه و منبع", { exact: true }).click();
  await expect(page.getByRole("article")).toContainText("مسئولیت مانیتورینگ");
  await expect(
    page.getByRole("link", { name: "نسخه‌های PostgreSQL" }),
  ).toHaveAttribute(
    "href",
    "https://docs.liara.ir/dbaas/postgresql/choose-version/",
  );
  await expect(
    page.getByRole("link", { name: "بررسی در سایت ارائه‌دهنده" }),
  ).toHaveAttribute("href", "https://liara.ir/pricing/");
  await page.getByLabel("روش تطبیق منابع").selectOption("exact");
  await page.getByLabel("دقیق رم (GB)", { exact: true }).fill("8");
  await expect(page.locator(".configuration")).toHaveCount(0);
  await page.getByLabel("دقیق رم (GB)", { exact: true }).fill("4");
  await page.getByLabel("موتور دیتابیس").selectOption("Redis");
  await expect(page.getByLabel("نسخه دیتابیس")).toHaveValue("");
  await page.getByLabel("نسخه دیتابیس").selectOption("8.0");
  await expect(page.getByRole("article")).toContainText("Redis");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
