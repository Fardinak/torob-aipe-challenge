import { test, expect } from "@playwright/test";
test("default offers → 4 GB + 1 TB → unpriced overage → source disclosure → reset, with editable and invalid requests", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("requestfailed", (request) => errors.push(request.url()));
  page.on("response", (response) => {
    if (response.status() >= 400)
      errors.push(`${response.status()} ${response.url()}`);
  });
  const response = await page.goto("./");
  expect(response?.status()).toBe(200);
  await expect(page.locator("html")).toHaveAttribute("lang", "fa");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await page.evaluate(() => document.fonts.ready);
  const offers = page.getByRole("article");
  await expect(offers).toHaveCount(11);
  await expect(offers.first()).toContainText("۷۱۰٬۰۰۰");
  await expect(
    page.getByText("ترافیک قابل پرداخت:", { exact: false }),
  ).toHaveCount(0);
  await expect(
    page.getByText("پایه + ترافیک = جمع برآوردی:", { exact: false }),
  ).toHaveCount(0);
  const preset = page.getByRole("button", {
    name: "حداقل ۴ GB رم",
    exact: true,
  });
  // Reach a key control through the browser's real tab order.
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("button", { name: "پاک کردن فیلترها" }),
  ).toBeFocused();
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await expect(preset).toBeFocused();
  expect(
    await preset.evaluate((element) => getComputedStyle(element).outlineStyle),
  ).not.toBe("none");
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
  await expect(offers.first()).not.toContainText("ترافیک قابل پرداخت:");
  await expect(offers.first()).not.toContainText(
    "پایه + ترافیک = جمع برآوردی:",
  );
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
  await expect(
    manageit.getByRole("link", { name: "منبع تعرفه IP شناور" }),
  ).toHaveAttribute("href", "https://www.manageitcloud.com/floating-ip");
  const iranserver = unpriced.getByRole("article").first();
  await iranserver.getByText("جزئیات هزینه و منبع", { exact: true }).click();
  await expect(
    iranserver.getByRole("link", { name: "صفحه تعرفه ارائه‌دهنده" }),
  ).toHaveAttribute("href", "https://www.iranserver.com/vps/iran/");
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
  await expect(manageit).toContainText("۱٬۴۲۰٬۰۰۰");
  await expect(manageit).toContainText("قیمت پایه اعلام‌شده");
  await expect(manageit).not.toContainText("ترافیک قابل پرداخت:");
  await expect(manageit).not.toContainText("پایه + ترافیک = جمع برآوردی:");
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
  await ram.fill("16");
  await egress.fill("1200");
  await expect(ranked.getByRole("article")).toHaveCount(0);
  await expect(unpriced.getByRole("article")).toHaveCount(3);
  await expect(
    page.getByRole("heading", { name: "برای این مصرف، برآورد قیمت نداریم." }),
  ).toBeVisible();
  await expect(page.getByText("پیشنهادی با این منابع نداریم.")).toHaveCount(0);
  await page.reload();
  await expect(offers).toHaveCount(11);
  await expect(ram).toHaveValue("");
  await expect(egress).toHaveValue("");
  await expect(
    page.getByRole("link", { name: "صفحه تعرفه ارائه‌دهنده" }),
  ).toHaveCount(0);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  expect(errors).toEqual([]);
});
