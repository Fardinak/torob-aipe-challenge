import { test as base, expect, type Page } from "@playwright/test";

// Apply the release health gate to every journey, including handoff tabs.
const test = base.extend<{ applicationHealth: void }>({
  applicationHealth: [
    async ({ context, baseURL }, use) => {
      const errors: string[] = [];
      const origin = new URL(baseURL!).origin;
      context.on("page", (page) => {
        page.on("pageerror", (error) => errors.push(error.message));
        page.on("console", (message) => {
          if (message.type() === "error") errors.push(message.text());
        });
      });
      context.on("requestfailed", (request) => {
        // Navigation may cancel an in-flight request during reload/Back.
        if (
          new URL(request.url()).origin === origin &&
          request.failure()?.errorText !== "net::ERR_ABORTED"
        )
          errors.push(`${request.failure()?.errorText} ${request.url()}`);
      });
      context.on("response", (response) => {
        if (
          new URL(response.url()).origin === origin &&
          response.status() >= 400
        )
          errors.push(`${response.status()} ${response.url()}`);
      });
      await use();
      expect(errors, "Application runtime, console and asset errors").toEqual(
        [],
      );
    },
    { auto: true },
  ],
});

// Pin the historical price-reversal scenario while acquisition expands the market.
async function historicalProviders(page: Page) {
  const url = new URL(page.url());
  url.searchParams.set("provider", "manageit,iranserver");
  await page.goto(url.href);
}

test("browse exact configurations, filter base budgets, inspect provider terms and preserve traffic comparison", async ({
  page,
}) => {
  test.skip(
    test.info().project.name === "mobile",
    "Desktop pricing journey; mobile discovery is covered separately.",
  );
  expect((await page.goto("./?provider=manageit,iranserver"))?.status()).toBe(
    200,
  );
  await expect(page.locator("html")).toHaveAttribute("lang", "fa");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await page.evaluate(() => document.fonts.ready);
  const configurations = page
    .getByRole("button")
    .filter({ has: page.locator("strong") });
  const offers = page.getByRole("article");
  await page.getByLabel("دسته خدمات").selectOption("vps");
  const ram = page.getByLabel("حداقل رم (GB)", { exact: true });
  const budget = page.getByLabel("سقف قیمت پایه ماهانه (تومان)");
  const egress = page.getByLabel("خروجی ماهانه (GB)", { exact: true });
  await expect(configurations).toHaveCount(12);
  await expect(configurations.first()).toContainText("از ۷۱۰٬۰۰۰");
  await expect(offers).toHaveCount(1);
  await expect(offers).toContainText("قیمت پایه اعلام‌شده");

  await page
    .getByLabel("ارائه‌دهنده", { exact: true })
    .selectOption("manageit");
  await expect(configurations).toHaveCount(6);
  await expect(offers).toContainText("منیجیت");
  const filteredURL = page.url();
  await offers.getByRole("link", { name: "کاتالوگ منیجیت" }).click();
  await expect(
    page.getByRole("heading", { name: "کاتالوگ منیجیت" }),
  ).toBeVisible();
  await expect(configurations).toHaveCount(6);
  await expect(configurations.first()).toContainText("۷۱۰٬۰۰۰");
  await configurations.last().click();
  await page.reload();
  await expect(offers).toContainText("منیجیت");
  await expect(offers).toContainText("آخرین تأیید موفق:");
  await expect(offers).toContainText("هزینه نهایی نامشخص");
  await page
    .getByRole("link", { name: "بازگشت به مقایسه", exact: true })
    .click();
  expect(page.url()).toBe(filteredURL);
  await page.getByLabel("ارائه‌دهنده", { exact: true }).selectOption("");
  await historicalProviders(page);
  await expect(configurations).toHaveCount(12);

  const preset = page.getByRole("button", {
    name: "حداقل ۴ GB رم",
    exact: true,
  });
  await preset.focus();
  await expect(preset).toBeFocused();
  expect(
    await preset.evaluate((element) => getComputedStyle(element).outlineStyle),
  ).not.toBe("none");
  await page.keyboard.press("Enter");
  await historicalProviders(page);
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
  await historicalProviders(page);
  await expect(page.getByLabel("روش مقایسه قیمت")).toHaveValue("traffic");
  await expect(configurations.first()).toContainText("از ۲٬۴۳۶٬۳۹۹");
  const manageitConfiguration = configurations.filter({
    hasText: "۲ هسته / ۴ GB رم / ۷۵ GB دیسک",
  });
  await manageitConfiguration.click();
  await expect(offers).toContainText("۱٬۴۲۰٬۰۰۰ + ۱٬۲۰۰٬۰۰۰ = ۲٬۶۲۰٬۰۰۰");
  await expect(offers).toContainText("۱٬۰۰۰ GB × ۱٬۲۰۰");
  await page.reload();
  await expect(
    page.getByLabel("خروجی ماهانه (GB)", { exact: true }),
  ).toHaveValue("1000");
  await expect(page.getByLabel("روش مقایسه قیمت")).toHaveValue("traffic");
  await expect(offers).toContainText("۱٬۴۲۰٬۰۰۰ + ۱٬۲۰۰٬۰۰۰ = ۲٬۶۲۰٬۰۰۰");
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
  await ram.fill("99999");
  await expect(configurations).toHaveCount(0);
  await page.getByRole("button", { name: "نمایش همه پیشنهادها" }).click();
  await expect(configurations).not.toHaveCount(0);
  await ram.fill("۴");
  await expect(configurations).not.toHaveCount(0);
  await page.reload();
  await expect(configurations).not.toHaveCount(0);
  await expect(ram).toHaveValue("۴");
  await expect(page.getByLabel("روش مقایسه قیمت")).toHaveValue("base");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
});

test("evidence warnings accompany starting prices and unknown identity stays separate", async ({
  page,
}) => {
  test.skip(test.info().project.name === "mobile");
  await page.clock.setFixedTime(new Date("2026-11-28T00:00:00Z"));
  await page.goto("./?provider=manageit,iranserver");
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
  test.skip(test.info().project.name === "mobile");
  await page.goto("./?view=results");
  await page.getByLabel("دسته خدمات").selectOption("database");
  await expect(
    page.getByLabel("خروجی ماهانه (GB)", { exact: true }),
  ).toHaveCount(0);
  await expect(page.locator(".configuration")).not.toHaveCount(0);
  await page.getByLabel("موتور دیتابیس").selectOption("PostgreSQL");
  await page.getByLabel("نسخه دیتابیس").selectOption("18.4");
  await page.getByLabel("روش تطبیق منابع").selectOption("exact");
  await page.getByLabel("دقیق رم (GB)", { exact: true }).fill("4");
  await page.getByLabel("دقیق پردازنده (هسته)", { exact: true }).fill("2");
  await page.getByLabel("دقیق دیسک (GB)", { exact: true }).fill("40");
  await expect(page.locator(".configuration")).toHaveCount(3);
  await page
    .locator(".configuration")
    .filter({ hasText: "۴٬۱۲۵٬۰۰۰" })
    .filter({ hasText: "۴ GB رم" })
    .click();
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

test("search, recover and restore the same discovery detail with browser navigation", async ({
  page,
  isMobile,
}) => {
  await page.goto("./?view=results");
  const search = page.getByLabel("جستجوی محصول، دسته یا موتور");
  await expect(page.locator(".configuration")).not.toHaveCount(0);
  if (isMobile) {
    const last = page.locator(".configuration").last();
    await last.scrollIntoViewIfNeeded();
    const listY = await page.evaluate(() => scrollY);
    await last.click();
    await expect(
      page.getByRole("heading", { name: "پیشنهادهای ارائه‌دهندگان" }),
    ).toBeFocused();
    await expect(page.locator(".configuration-list")).not.toBeVisible();
    await page.getByRole("button", { name: "بازگشت به فهرست" }).click();
    await expect(page.locator(".configuration-list")).toBeVisible();
    await expect
      .poll(async () => Math.abs((await page.evaluate(() => scrollY)) - listY))
      .toBeLessThan(4);
    await page.getByRole("button", { name: "فیلترها", exact: true }).click();
    await page.keyboard.press("Escape");
    await expect(
      page.getByRole("button", { name: "فیلترها", exact: true }),
    ).toBeFocused();
  }
  await search.fill("PostgreSQL");
  await expect(page.locator(".configuration")).not.toHaveCount(0);
  await page
    .locator(".configuration")
    .filter({ hasText: "۴٬۱۲۵٬۰۰۰" })
    .filter({ hasText: "۴ GB رم" })
    .click();
  await expect(page.getByRole("article")).toContainText("زحل");
  const shared = page.url();
  await page.reload();
  await expect(page.getByRole("article")).toContainText("زحل");
  if (isMobile)
    await page.getByRole("button", { name: "بازگشت به فهرست" }).click();
  await search.fill("Liara");
  await expect(page.locator(".empty")).toBeVisible();
  await page.goBack();
  await expect(search).toHaveValue("PostgreSQL");
  await page.goForward();
  await expect(search).toHaveValue("Liara");
  await page.goto(shared);
  await expect(page.getByRole("article")).toContainText("زحل");
  if (isMobile)
    await page.getByRole("button", { name: "بازگشت به فهرست" }).click();
  await page.getByLabel("خروجی ماهانه (GB)", { exact: true }).fill("invalid");
  if (isMobile)
    await page.getByRole("button", { name: "فیلترها", exact: true }).click();
  await page.getByLabel("دسته خدمات").selectOption("database");
  await expect(page.getByRole("alert")).toHaveCount(0);
  await page.getByLabel("موتور دیتابیس").selectOption("PostgreSQL");
  await page.getByLabel("نسخه دیتابیس").selectOption("18.4");
  await page.getByLabel("روش تطبیق منابع").selectOption("exact");
  await page.getByLabel("دقیق رم (GB)", { exact: true }).fill("4");
  await page.getByLabel("دقیق پردازنده (هسته)", { exact: true }).fill("2");
  await page.getByLabel("دقیق دیسک (GB)", { exact: true }).fill("40");
  await page.getByLabel("ترتیب در هر دسته و موتور").selectOption("price-desc");
  if (isMobile) await page.getByRole("button", { name: "نمایش نتایج" }).click();
  await expect(page.locator(".configuration")).toHaveCount(3);
  await page
    .locator(".configuration")
    .filter({ hasText: "۴٬۱۲۵٬۰۰۰" })
    .filter({ hasText: "۴ GB رم" })
    .click();
  await page.reload();
  await expect(page.getByRole("article")).toContainText("۴٬۱۲۵٬۰۰۰");
  expect(page.url()).toContain("version=18.4");
  expect(page.url()).toContain("sort=price-desc");
  const discoveryURL = page.url();
  await page
    .getByRole("article")
    .getByRole("link", { name: "کاتالوگ لیارا" })
    .click();
  await expect(page.locator(".configuration")).toHaveCount(195);
  await expect(
    page.getByText("شامل همه محصولات آن شرکت نیست", { exact: false }),
  ).toBeVisible();
  await expect(page.locator(".configuration-list")).toContainText("PostgreSQL");
  await expect(page.locator(".configuration-list")).toContainText("Redis");
  await expect(
    page
      .locator(".configuration")
      .filter({ hasText: "PostgreSQL" })
      .filter({ hasText: "۴٬۱۲۵٬۰۰۰" })
      .filter({ hasText: "۴ GB رم" }),
  ).toContainText("۴٬۱۲۵٬۰۰۰");
  await expect(
    page
      .locator(".configuration")
      .filter({ hasText: "PostgreSQL" })
      .filter({ hasText: "۴٬۱۲۵٬۰۰۰" })
      .filter({ hasText: "۴ GB رم" }),
  ).toContainText("تعارض شواهد");
  await page
    .locator(".configuration")
    .filter({ hasText: "Redis" })
    .last()
    .click();
  await page.reload();
  await expect(page.getByRole("article")).toContainText("Redis");
  await expect(page.getByRole("article")).toContainText("هزینه نهایی نامشخص");
  await page.goBack();
  await page.goBack();
  expect(page.url()).toBe(discoveryURL);
  await expect(page.getByRole("article")).toContainText("۴٬۱۲۵٬۰۰۰");
  await page.goForward();
  await expect(page.locator(".configuration")).toHaveCount(195);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  for (const id of ["constructor", "manageit,liara"]) {
    const invalidCatalog = new URL(page.url());
    invalidCatalog.searchParams.set("catalog", id);
    await page.goto(invalidCatalog.href);
    await expect(
      page.getByRole("heading", { name: "ارائه‌دهنده یافت نشد" }),
    ).toBeVisible();
    await expect(page.locator(".configuration")).toHaveCount(0);
    await expect(page.getByRole("article")).toHaveCount(0);
  }
});

test("collapse VPS usage while retaining scenario, zero-charge arithmetic and history", async ({
  page,
  isMobile,
}) => {
  await page.goto("./?category=vps&ram=4&provider=manageit,iranserver");
  const usage = page.getByRole("group", { name: "مصرف و روش قیمت VPS" });
  await expect(usage).toBeVisible();
  await expect(page.locator(".configuration").first()).toContainText(
    "از ۱٬۴۲۰٬۰۰۰",
  );
  await page.getByLabel("خروجی ماهانه (GB)", { exact: true }).fill("۱۰۰۰");
  await expect(page.getByLabel("روش مقایسه قیمت")).toHaveValue("base");
  await page.getByLabel("روش مقایسه قیمت").selectOption("traffic");
  await expect(page.locator(".configuration").first()).toContainText(
    "از ۲٬۴۳۶٬۳۹۹",
  );
  await usage.getByText("مصرف و روش قیمت VPS", { exact: true }).click();
  await expect(
    page.getByLabel("خروجی ماهانه (GB)", { exact: true }),
  ).not.toBeVisible();
  const scenario = page.getByRole("region", { name: "سناریوی فعال VPS" });
  await expect(scenario).toContainText("۱۰۰۰ GB");
  await expect(scenario).toContainText("جمع برآوردی پایه و ترافیک");
  await expect(scenario).toContainText("سقف بودجه فقط قیمت پایه");
  await expect(scenario).toContainText("ورودی رایگان");
  await page.locator(".configuration").first().click();
  await expect(page.getByRole("article")).toContainText(
    "ترافیک قابل پرداخت: ۰ GB",
  );
  await expect(page.getByRole("article")).toContainText(
    "۲٬۴۳۶٬۳۹۹ + ۰ = ۲٬۴۳۶٬۳۹۹",
  );
  const shared = page.url();
  await page.reload();
  await expect(page.getByRole("article")).toContainText(
    "۲٬۴۳۶٬۳۹۹ + ۰ = ۲٬۴۳۶٬۳۹۹",
  );
  if (isMobile)
    await page.getByRole("button", { name: "بازگشت به فهرست" }).click();
  await page.getByLabel("روش مقایسه قیمت").selectOption("base");
  await expect(page.locator(".configuration").first()).toContainText(
    "از ۱٬۴۲۰٬۰۰۰",
  );
  await page.goBack();
  await expect(page.getByLabel("روش مقایسه قیمت")).toHaveValue("traffic");
  await expect(page.locator(".configuration").first()).toContainText(
    "از ۲٬۴۳۶٬۳۹۹",
  );
  await page.goForward();
  await expect(page.locator(".configuration").first()).toContainText(
    "از ۱٬۴۲۰٬۰۰۰",
  );
  await page.goto(shared);
  await expect(page.getByRole("article")).toContainText(
    "۲٬۴۳۶٬۳۹۹ + ۰ = ۲٬۴۳۶٬۳۹۹",
  );
});

test("handoff retains the chosen provider, cancellation and immediate departure", async ({
  page,
  context,
}) => {
  await page.goto("./?category=vps&ram=4&priceMode=traffic&egress=1200");
  await page
    .locator(".configuration")
    .filter({ hasText: "۱ هسته / ۴ GB رم / ۴۰ GB دیسک" })
    .click();
  const offer = page.getByRole("article", {
    name: "ایران‌سرور NGP-small40",
    exact: true,
  });
  const link = offer.getByRole("link", { name: "ادامه به ایران‌سرور" });
  await link.focus();
  const popup = page.waitForEvent("popup");
  await page.keyboard.press("Enter");
  const handoff = await popup;
  const now = new Date("2026-12-01T12:00:00Z");
  await handoff.clock.install({ time: now });
  await handoff.clock.pauseAt(now);
  expect(new URL(handoff.url()).pathname).toBe(new URL(page.url()).pathname);
  expect(handoff.url()).toContain("handoff=NGP-small40");
  await expect(handoff.getByRole("heading", { level: 1 })).toContainText(
    "ایران‌سرور",
  );
  await expect(handoff.getByRole("article")).toContainText("NGP-small40");
  await expect(handoff.getByRole("article")).toContainText(
    "تعرفه ترافیک اضافه نامشخص است",
  );
  await expect(
    handoff.getByText("در حال خروج از این سایت هستید", { exact: false }),
  ).toBeVisible();
  await expect(
    handoff.getByText("مقصد عمومی محصول یا تعرفه است", { exact: false }),
  ).toBeVisible();
  await expect(
    handoff.getByRole("link", { name: "منبع مقصد" }),
  ).toHaveAttribute("href", "https://www.iranserver.com/vps/iran/");
  await expect(handoff.getByRole("status")).toContainText("۵ ثانیه");
  const cancel = handoff.getByRole("button", { name: "لغو", exact: true });
  await cancel.focus();
  await handoff.keyboard.press("Enter");
  await handoff.clock.fastForward(6000);
  await expect(handoff.getByRole("status")).toContainText(
    "انتقال خودکار لغو شد",
  );
  expect(new URL(handoff.url()).searchParams.get("handoff")).toBe(
    "NGP-small40",
  );
  expect(
    await handoff.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await context.route("https://www.iranserver.com/vps/iran/", (route) =>
    route.fulfill({
      contentType: "text/html",
      body: "<title>Selected provider</title>",
    }),
  );
  await handoff.getByRole("button", { name: "ادامه اکنون" }).click();
  await expect(handoff).toHaveURL("https://www.iranserver.com/vps/iran/");
  await handoff.close();
});

test("database handoff counts down five seconds with evidence warnings and fails closed for missing offers", async ({
  page,
  context,
}) => {
  await page.goto("./?catalog=liara");
  await page
    .locator(".configuration")
    .filter({ hasText: "PostgreSQL" })
    .filter({ hasText: "۴ GB" })
    .filter({ hasText: "۴٬۱۲۵٬۰۰۰" })
    .click();
  const href = await page
    .getByRole("article")
    .getByRole("link", { name: "ادامه به لیارا" })
    .getAttribute("href");
  const handoff = await context.newPage();
  const now = new Date("2026-12-01T12:00:00Z");
  await handoff.clock.install({ time: now });
  await handoff.clock.pauseAt(now);
  await context.route("https://liara.ir/pricing/", (route) =>
    route.fulfill({
      contentType: "text/html",
      body: "<title>Selected database provider</title>",
    }),
  );
  await handoff.goto(new URL(href!, page.url()).href);
  await expect(handoff.getByRole("article")).toContainText(
    "PostgreSQL / زحل / پایه",
  );
  await expect(handoff.getByRole("article")).toContainText("۴ GB رم");
  await expect(handoff.getByRole("article")).toContainText(
    "هزینه نهایی نامشخص",
  );
  await expect(handoff.getByRole("article")).toContainText(
    "تعارض شواهد پشتیبان‌گیری",
  );
  await expect(handoff.getByRole("article")).toContainText("شواهد قدیمی");
  await expect(
    handoff.getByText("امکان راه‌اندازی فعلی را تأیید نمی‌کند", {
      exact: false,
    }),
  ).toBeVisible();
  await expect(handoff.getByRole("status")).toContainText("۵ ثانیه");
  await handoff.clock.fastForward(4000);
  await expect(handoff.getByRole("status")).toContainText("۱ ثانیه");
  expect(new URL(handoff.url()).searchParams.get("handoff")).toBe(
    "liara-pg-2c-4g-40g-base",
  );
  await handoff.clock.fastForward(1000);
  await expect(handoff).toHaveURL("https://liara.ir/pricing/");
  for (const id of ["missing", "constructor"]) {
    await handoff.goto(
      new URL(`./?handoff=${id}&destination=https://example.com/`, page.url())
        .href,
    );
    await expect(
      handoff.getByRole("heading", { name: "پیشنهاد انتخاب‌شده یافت نشد" }),
    ).toBeVisible();
    await handoff.clock.fastForward(6000);
    expect(new URL(handoff.url()).searchParams.get("handoff")).toBe(id);
    await expect(
      handoff.getByRole("button", { name: "ادامه اکنون" }),
    ).toHaveCount(0);
  }
  await handoff.close();
});

test("inspect a sourced exact VPS overlap and download its published evidence", async ({
  page,
  isMobile,
}) => {
  await page.goto(
    "./?category=vps&resourceMode=exact&cpu=1&ram=1&disk=10&provider=irvm,mehranhost",
  );
  const item = page.locator(".configuration").filter({ hasText: "NVMe" });
  await expect(item).toContainText("۲ پیشنهاد");
  await expect(item).toContainText("۵۴۵٬۰۰۰");
  await item.click();
  const irvm = page.getByRole("article", {
    name: "ایران وی ام استارتر",
    exact: true,
  });
  const mehran = page.getByRole("article", {
    name: "مهران هاست کوچک‌ترین پیکربندی",
    exact: true,
  });
  await expect(irvm).toContainText("۵۴۵٬۰۰۰");
  await expect(mehran).toContainText("۶۸۰٬۳۶۰");
  await expect(mehran).toContainText("۷۳۰ ساعت");
  await expect(irvm).toContainText("هزینه نهایی نامشخص");
  await expect(mehran).toContainText("آخرین تأیید موفق: 2026-10-29");
  await irvm.getByText("جزئیات هزینه و منبع", { exact: true }).click();
  const snapshot = irvm
    .getByRole("link", { name: "دریافت شاهد نگهداری‌شده" })
    .first();
  const response = await page.request.get(
    (await snapshot.getAttribute("href"))!,
  );
  expect(response.ok()).toBe(true);
  expect(response.headers()["content-type"]).toContain("text/plain");
  expect(await response.text()).toContain("استارتر");
  const published = await page.request.get("./evidence/catalog.json");
  expect(published.ok()).toBe(true);
  expect(
    (await published.json()).plans.some(
      (plan: { id: string }) => plan.id === "irvm-respina-starter",
    ),
  ).toBe(true);
  if (isMobile) {
    await page.getByRole("button", { name: "بازگشت به فهرست" }).click();
    await page.getByRole("button", { name: "فیلترها", exact: true }).click();
  }
  await page
    .getByLabel("ارائه‌دهنده", { exact: true })
    .selectOption("mehranhost");
  if (isMobile) await page.getByRole("button", { name: "نمایش نتایج" }).click();
  await expect(item).toContainText("۱ پیشنهاد");
  await expect(item).toContainText("۶۸۰٬۳۶۰");
  await item.click();
  await expect(irvm).toHaveCount(0);
  await expect(mehran).toBeVisible();

  await page.goto("./?category=vps&provider=vpsoto");
  await page.locator(".configuration").first().click();
  await expect(page.getByRole("article")).toContainText("دلار آمریکا / ماه");
  await expect(page.getByRole("article")).toContainText(
    "مرجع ماهانه به تومان در دسترس نیست؛ تبدیل قیمت انجام نشده است.",
  );
  if (isMobile) {
    await page.getByRole("button", { name: "بازگشت به فهرست" }).click();
    await page.getByRole("button", { name: "فیلترها", exact: true }).click();
  }
  await page.getByLabel("سقف قیمت پایه ماهانه (تومان)").fill("1000000");
  if (isMobile) await page.getByRole("button", { name: "نمایش نتایج" }).click();
  await expect(page.locator(".configuration")).toHaveCount(0);
});

test("search homepage opens results and browser Back restores home", async ({
  page,
}) => {
  await page.goto("./");
  await expect(
    page.getByRole("heading", {
      name: "زیرساخت را پیدا کن، پیشنهادها را بسنج.",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("navigation", { name: "کاتالوگ ارائه‌دهندگان" }),
  ).toHaveCount(0);
  await page.getByLabel("جستجوی محصول، دسته یا موتور").fill("PostgreSQL");
  await page.getByRole("button", { name: "جستجو", exact: true }).click();
  await expect(page.locator(".configuration")).not.toHaveCount(0);
  await page.reload();
  await expect(page.locator(".configuration")).not.toHaveCount(0);
  await page.goBack();
  await expect(
    page.getByRole("heading", {
      name: "زیرساخت را پیدا کن، پیشنهادها را بسنج.",
    }),
  ).toBeVisible();
  await page.getByRole("button", { name: "سرور مجازی", exact: true }).click();
  await expect(page.locator(".configuration")).not.toHaveCount(0);
});

test("multi-engine database discovery retains version, backup and billing distinctions", async ({
  page,
  isMobile,
}) => {
  await page.goto(
    "./?category=database&engine=MySQL&version=8.4&resourceMode=exact&cpu=4&ram=8&disk=80",
  );
  await expect(page.locator(".configuration")).toHaveCount(1);
  await page.locator(".configuration").click();
  await expect(page.getByRole("article")).toContainText("وب‌لاینز");
  await expect(page.getByRole("article")).toContainText("۶٬۰۲۴٬۹۶۰");
  if (isMobile) {
    await page.getByRole("button", { name: "بازگشت به فهرست" }).click();
    await page.getByRole("button", { name: "فیلترها", exact: true }).click();
  }
  await page
    .getByLabel("ارائه‌دهنده", { exact: true })
    .selectOption("weblines");
  await page.getByLabel("موتور دیتابیس").selectOption("Redis");
  await expect(page.getByLabel("نسخه دیتابیس")).toHaveValue("");
  await page.getByLabel("نسخه دیتابیس").selectOption("7.2");
  if (isMobile) await page.getByRole("button", { name: "نمایش نتایج" }).click();
  await expect(page.locator(".configuration")).toHaveCount(1);
  await page.locator(".configuration").click();
  await page.getByText("جزئیات هزینه و منبع", { exact: true }).click();
  await expect(page.getByRole("article")).toContainText(
    "Redis در حال حاضر پشتیبان مدیریت‌شده ندارد.",
  );

  // A native annual price remains inspectable without becoming a monthly bargain.
  await page.goto(
    "./?category=database&engine=CouchDB&provider=chabokan&detail=offer%3Achabokan-couchdb-irn10-0.15-0.15-1-year",
  );
  await expect(page.getByRole("article")).toContainText("۱٬۸۱۸٬۵۷۶");
  await expect(page.getByRole("article")).toContainText("تومان / سال");
  await expect(page.getByRole("article")).toContainText("خارج از رتبه‌بندی");
  await expect(page.getByRole("article")).toContainText(
    "مرجع ماهانه به تومان در دسترس نیست",
  );
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
