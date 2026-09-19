import { useState } from "react";
import { createRoot } from "react-dom/client";
import { catalog, type Plan } from "./catalog";
import { compare, type Request, type Resource } from "./comparison";
import "@fontsource/vazirmatn/400.css";
import "@fontsource/vazirmatn/700.css";
import "./style.css";

const number = (value: number) => new Intl.NumberFormat("fa-IR").format(value);
const providerNames = { manageit: "منیجیت", iranserver: "ایران‌سرور" };
const fields: { key: Resource; label: string }[] = [
  { key: "ram", label: "حداقل رم (GB)" },
  { key: "cpu", label: "حداقل پردازنده (هسته)" },
  { key: "disk", label: "حداقل دیسک (GB)" },
];

function Traffic({ plan }: { plan: Plan }) {
  if (plan.provider === "manageit") {
    const terms = catalog.providers.manageit.traffic_original_labels;
    return (
      <>
        آپلود: {terms.upload === "free" ? "رایگان" : terms.upload}؛ دانلود هر
        GB:{" "}
        {terms.download_toman_per_gb === null
          ? "تعرفه نامشخص"
          : `${number(terms.download_toman_per_gb)} تومان`}
      </>
    );
  }
  return (
    <>
      {plan.traffic_allowance_gb_unspecified_direction === null
        ? "مقدار ترافیک نامشخص"
        : `${number(plan.traffic_allowance_gb_unspecified_direction)} GB ترافیک`}
      ؛ جهت مصرف و تعرفه اضافه نامشخص
    </>
  );
}

function BillingDetails({ plan }: { plan: Plan }) {
  const facts = catalog.providers[plan.provider];
  const optionalIp =
    catalog.providers.manageit.optional_independent_floating_ipv4_monthly_toman;
  return (
    <details>
      <summary>جزئیات هزینه و منبع</summary>
      <div className="details-body">
        <p>
          <strong>پرداخت: </strong>
          {plan.provider === "manageit"
            ? "قیمت مرجع ماهانه؛ پرداخت ساعتی بر اساس مصرف (PAYG). مقسوم‌علیه تبدیل ماه به ساعت، سقف و گرد کردن صورت‌حساب نامشخص است."
            : "قیمت اعلام‌شده ماهانه."}
        </p>
        <p>
          <strong>پردازنده: </strong>
          {facts.cpu_allocation === "shared"
            ? "اشتراکی"
            : (facts.cpu_allocation ?? "نوع تخصیص نامشخص")}
          ؛ تعداد هسته یکسان به معنی عملکرد برابر نیست.
        </p>
        <p>
          <strong>دیسک: </strong>
          {plan.provider === "manageit"
            ? plan.storage_label
            : "صفحه به‌طور عمومی NVMe را تبلیغ می‌کند؛ نوع دیسک این پلن جداگانه تأیید نشده است."}
        </p>
        {plan.provider === "manageit" && (
          <>
            <p>
              تعرفه ترافیک برای دیتاسنترهای پرواز، امید و پارسیان اعلام شده؛
              موجود بودن هر پلن در هر دیتاسنتر تأیید نشده است.
            </p>
            <p>
              IPv6 همراه پلن است. IPv4 شناور مستقل، اختیاری:{" "}
              {optionalIp === null
                ? "قیمت نامشخص"
                : `${number(optionalIp)} تومان در ماه`}
              ؛ به قیمت پایه اضافه نشده است.
            </p>
          </>
        )}
        <p>
          شمول IPv4 پایه، مالیات و کامل بودن هزینه‌های اجباری نامشخص است. قیمت
          پایه، مبلغ نهایی صورت‌حساب نیست.
        </p>
        <p className="source-wording">
          عبارت ثبت‌شده منبع:{" "}
          <bdi>
            {plan.provider === "manageit"
              ? `upload: ${catalog.providers.manageit.traffic_original_labels.upload}; download: ${catalog.providers.manageit.traffic_original_labels.download_toman_per_gb ?? "unknown"} toman/GB`
              : catalog.providers.iranserver.traffic_original_label}
          </bdi>
        </p>
        <a
          href={catalog.sources[plan.source].url}
          target="_blank"
          rel="noreferrer"
        >
          صفحه تعرفه ارائه‌دهنده ↗
        </a>
        {plan.provider === "manageit" && (
          <a
            href={catalog.sources.manageit_ip.url}
            target="_blank"
            rel="noreferrer"
          >
            منبع تعرفه IP شناور ↗
          </a>
        )}
      </div>
    </details>
  );
}

function App() {
  const [request, setRequest] = useState<Request>({});
  const comparison = compare(catalog, request);
  const invalid = Object.keys(comparison.errors).length > 0;
  return (
    <>
      <header className="site-header">
        <span className="brand">≋ سروربین</span>
        <span>مقایسه سرور مجازی</span>
      </header>
      <main>
        <section className="intro">
          <div>
            <p className="eyebrow">سرورهای مجازی / ایران</p>
            <h1>
              منابع مورد نیاز شما،
              <br />
              قیمت‌های روشن‌تر.
            </h1>
            <p>
              پیشنهادها را یک‌جا ببینید و جزئیات هزینه را پیش از انتخاب بررسی
              کنید.
            </p>
          </div>
          <aside className="coverage">
            <strong>۱۱ پلن / ۲ ارائه‌دهنده</strong>
            <p>۶ پلن منیجیت و ۵ پلن ایران‌سرور</p>
            <small>نمونه محدود بازار؛ قیمت و موجودی لحظه‌ای نیست.</small>
          </aside>
        </section>
        <section className="requirements" aria-labelledby="requirements-title">
          <div className="section-heading">
            <h2 id="requirements-title">چه منابعی نیاز دارید؟</h2>
            <button className="reset" onClick={() => setRequest({})}>
              پاک کردن فیلترها
            </button>
          </div>
          <div className="presets">
            <button onClick={() => setRequest({})}>بدون محدودیت</button>
            <button onClick={() => setRequest({ ram: "4" })}>
              حداقل ۴ GB رم
            </button>
          </div>
          <div className="fields">
            {fields.map(({ key, label }) => (
              <div key={key}>
                <label htmlFor={key}>{label}</label>
                <input
                  id={key}
                  inputMode="numeric"
                  type="text"
                  value={request[key] ?? ""}
                  placeholder="بدون محدودیت"
                  aria-invalid={Boolean(comparison.errors[key])}
                  aria-describedby={
                    comparison.errors[key] ? `${key}-error` : "input-help"
                  }
                  onChange={(e) =>
                    setRequest({ ...request, [key]: e.target.value })
                  }
                />
                {comparison.errors[key] && (
                  <p className="field-error" id={`${key}-error`}>
                    {comparison.errors[key]}
                  </p>
                )}
              </div>
            ))}
          </div>
          <p id="input-help" className="muted">
            فیلد خالی یعنی بدون محدودیت. عدد صحیح صفر یا بیشتر؛ واحد GB همان
            واحد اعلام‌شده ارائه‌دهنده است.
          </p>
        </section>
        <section aria-labelledby="results-title" className="results">
          <div className="section-heading">
            <h2 id="results-title">پیشنهادها</h2>
            <span className="muted">قیمت پایه: کم به زیاد</span>
          </div>
          <p role="status">
            {invalid
              ? "برای دیدن نتایج، ورودی را اصلاح کنید."
              : `${number(comparison.ranked.length)} پیشنهاد مطابق منابع شما`}
          </p>
          <p className="muted">
            مقایسه با مصرف ترافیک صفر؛ قیمت‌های پایه ماهانه به تومان هستند.
          </p>
          {invalid ? (
            <div className="empty" role="alert">
              {comparison.errors.catalog ??
                "ورودی نامعتبر است. نتایج تا اصلاح ورودی نمایش داده نمی‌شوند."}
            </div>
          ) : comparison.ranked.length === 0 ? (
            <div className="empty">
              <h3>پیشنهادی با این منابع نداریم.</h3>
              <p>
                فیلترها حفظ شده‌اند. منابع را تغییر دهید یا همه پیشنهادها را
                ببینید.
              </p>
              <button onClick={() => setRequest({})}>
                نمایش همه پیشنهادها
              </button>
            </div>
          ) : (
            comparison.ranked.map(({ plan, baseMonthlyToman }, index) => (
              <article
                key={plan.id}
                aria-label={`${providerNames[plan.provider]} ${plan.provider_plan_name ?? plan.id}`}
              >
                <div className="offer-main">
                  <div className="identity">
                    <h3>{providerNames[plan.provider]}</h3>
                    <bdi className="plan-name">
                      {plan.provider_plan_name ?? plan.id}
                    </bdi>
                    {!plan.provider_plan_name && <small>شناسه محلی پلن</small>}
                  </div>
                  <div className="resources">
                    <span>
                      <strong>{number(plan.ram_gb)}</strong> GB رم
                    </span>
                    <span>
                      <strong>{number(plan.cpu_count)}</strong> هسته
                    </span>
                    <span>
                      <strong>{number(plan.disk_gb)}</strong> GB دیسک
                    </span>
                  </div>
                  <div className="price">
                    {index === 0 && (
                      <span className="badge">کمترین قیمت پایه در نتایج</span>
                    )}
                    <strong>{number(baseMonthlyToman)}</strong>
                    <span>تومان / ماه</span>
                    <small>قیمت پایه اعلام‌شده</small>
                  </div>
                </div>
                <p className="traffic">
                  <Traffic plan={plan} />
                </p>
                <BillingDetails plan={plan} />
              </article>
            ))
          )}
        </section>
        <footer>
          پوشش این فهرست محدود است؛ پیش از خرید، شرایط جاری، موجودی و هزینه
          نهایی را از ارائه‌دهنده بررسی کنید.
        </footer>
      </main>
    </>
  );
}
createRoot(document.getElementById("root")!).render(<App />);
