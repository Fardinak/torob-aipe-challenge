import { useState } from "react";
import { createRoot } from "react-dom/client";
import { catalog, evidenceIsStale, type Plan } from "./catalog";
import {
  compare,
  type Request,
  type InputField,
  type Quote,
  type ProviderOffer,
  type ListingItem,
} from "./comparison";
import "@fontsource/vazirmatn/400.css";
import "@fontsource/vazirmatn/700.css";
import "./style.css";

const number = (value: number) => new Intl.NumberFormat("fa-IR").format(value);

const fields: { key: InputField; label: string }[] = [
  { key: "ram", label: "حداقل رم (GB)" },
  { key: "cpu", label: "حداقل پردازنده (هسته)" },
  { key: "disk", label: "حداقل دیسک (GB)" },
  { key: "budget", label: "سقف قیمت پایه ماهانه (تومان)" },
  { key: "egress", label: "خروجی ماهانه (GB)" },
  { key: "ingress", label: "ورودی ماهانه (GB، اختیاری)" },
];

function BillingDetails({ plan }: { plan: Plan }) {
  const provider = catalog.providers[plan.provider];
  return (
    <details>
      <summary>جزئیات هزینه و منبع</summary>
      <div className="details-body">
        <p>پرداخت: {provider.billing}</p>
        <p>
          پردازنده:{" "}
          {provider.cpu_allocation === "shared"
            ? "اشتراکی"
            : (provider.cpu_allocation ?? "نوع تخصیص نامشخص")}
          ؛ تعداد هسته یکسان به معنی عملکرد برابر نیست.
        </p>
        <p>
          دیسک: {plan.storage_label}؛ وضعیت:{" "}
          {plan.evidence.facts.storage_label === "verified"
            ? "تأیید شده"
            : "نامشخص"}
        </p>
        <p>
          IPv4 پایه:{" "}
          {provider.base_ipv4_included === null
            ? "نامشخص"
            : provider.base_ipv4_included
              ? "همراه پلن"
              : "همراه پلن نیست"}
          ؛ IPv6:{" "}
          {provider.ipv6_included === null
            ? "نامشخص"
            : provider.ipv6_included
              ? "همراه پلن"
              : "همراه پلن نیست"}
          ؛ مالیات: {provider.tax_basis ?? "نامشخص"}
        </p>
        {provider.disclosures.map((note) => (
          <p key={note}>{note}</p>
        ))}
        {plan.evidence.notes.map((note) => (
          <p key={note}>{note}</p>
        ))}
        <p>
          منطقه: {plan.region ?? "نامشخص"}؛ بسته سخت‌افزار:{" "}
          {plan.hardware_package ?? "نامشخص"}؛ بسته امکانات:{" "}
          {plan.feature_package ?? "نامشخص"}؛ توپولوژی:{" "}
          {plan.topology ?? "نامشخص"}
        </p>
        <p className="source-wording">
          عبارت ثبت‌شده منبع: <bdi>{plan.traffic_terms}</bdi>
        </p>
        {plan.evidence.sources.map((id) => (
          <a
            key={id}
            href={catalog.sources[id].url}
            target="_blank"
            rel="noreferrer"
          >
            {catalog.sources[id].label} ↗
          </a>
        ))}
        {plan.verification_attempts.map((attempt, i) => (
          <p key={i}>
            بررسی <bdi>{attempt.attempted_at}</bdi>:{" "}
            {attempt.outcome === "success"
              ? "موفق"
              : "ناموفق؛ به معنی خروج از عرضه نیست"}{" "}
            — {attempt.note}
          </p>
        ))}
        <p>نسخه‌های پیشین شواهد: {number(plan.revisions.length)}</p>
        {plan.revisions.map((revision) => (
          <p key={revision.revision_id}>
            <bdi>{revision.evidence.last_verified_at ?? "نامشخص"}</bdi> —{" "}
            {number(revision.advertised_monthly_toman)} تومان؛{" "}
            {number(revision.ram_gb)} GB رم
            {evidenceIsStale(revision.evidence.last_verified_at) && (
              <small className="evidence-warning">
                شواهد تاریخی قدیمی؛ بیش از ۳۰ روز از تأیید گذشته است.
              </small>
            )}
            {revision.evidence.sources.map((id) => (
              <a
                key={id}
                href={catalog.sources[id].url}
                target="_blank"
                rel="noreferrer"
              >
                منبع نسخه پیشین ↗
              </a>
            ))}
          </p>
        ))}
      </div>
    </details>
  );
}

const unpricedReasons: Record<string, string> = {
  base_price_unresolved:
    "قیمت پایه تأیید نشده یا متعارض است؛ قابل مقایسه نیست.",
  traffic_evidence_unresolved: "شواهد لازم برای محاسبه ترافیک حل‌نشده است.",
  unknown_overage: "تعرفه ترافیک اضافه نامشخص است.",
  missing_traffic_rate: "نرخ لازم برای محاسبه ترافیک مشخص نیست.",
  unknown_allowance: "سهمیه لازم برای محاسبه مشخص نیست.",
  unknown_traffic_policy: "شرایط ترافیک مشخص نیست.",
  arithmetic_out_of_range: "مصرف از محدوده محاسبه دقیق خارج است.",
};
function Offer({
  candidate,
  quote,
  cheapest = false,
}: {
  candidate: ProviderOffer;
  quote?: Quote;
  cheapest?: boolean;
}) {
  const { plan } = candidate;
  return (
    <article
      aria-label={`${catalog.providers[plan.provider].name} ${plan.provider_plan_name ?? plan.id}`}
    >
      <div className="offer-main">
        <div className="identity">
          <h3>{catalog.providers[plan.provider].name}</h3>
          <bdi className="plan-name">{plan.provider_plan_name ?? plan.id}</bdi>
          {!plan.provider_plan_name ? (
            <small>شناسه محلی پلن</small>
          ) : (
            <small>
              شناسه پایدار: <bdi>{plan.id}</bdi>
            </small>
          )}
        </div>
        <div className="resources">
          <span>
            <strong>
              {plan.evidence.facts.ram_gb === "verified"
                ? number(plan.ram_gb)
                : "نامشخص"}
            </strong>{" "}
            GB رم
          </span>
          <span>
            <strong>
              {plan.evidence.facts.cpu_count === "verified"
                ? number(plan.cpu_count)
                : "نامشخص"}
            </strong>{" "}
            هسته
          </span>
          <span>
            <strong>
              {plan.evidence.facts.disk_gb === "verified"
                ? number(plan.disk_gb)
                : "نامشخص"}
            </strong>{" "}
            GB دیسک
          </span>
        </div>
        <div className="price">
          {cheapest && <span className="badge">قیمت شروع این پیکربندی</span>}
          <strong>
            {plan.evidence.facts.advertised_monthly_toman === "verified"
              ? number(quote?.subtotalToman ?? plan.advertised_monthly_toman)
              : "قیمت نامشخص"}
          </strong>
          <span>تومان / ماه</span>
          <small>{plan.billing_display}</small>
          <small>
            آخرین تأیید موفق:{" "}
            <bdi>{plan.evidence.last_verified_at ?? "نامشخص"}</bdi>
          </small>
          {evidenceIsStale(plan.evidence.last_verified_at) && (
            <small className="evidence-warning">
              {plan.evidence.last_verified_at
                ? "شواهد قدیمی؛ بیش از ۳۰ روز از تأیید موفق گذشته است."
                : "تاریخ تأیید موفق نامشخص؛ نیازمند بازبینی."}
            </small>
          )}
          <small>
            {candidate.totalCostUnknown ? "هزینه نهایی نامشخص؛ " : ""}
            {catalog.providers[plan.provider].mandatory_fee_completeness
              ? "هزینه‌های اجباری بررسی شده"
              : "هزینه‌های اجباری ناقص"}
          </small>
          {Object.values(plan.evidence.facts).some(
            (status) => status === "conflicting" || status === "failed",
          ) && (
            <small className="evidence-warning">
              شواهد حل‌نشده؛ اطلاعات متأثر در مقایسه استفاده نمی‌شود.
            </small>
          )}
          <small>
            {quote
              ? quote.reasons.includes("base_plus_traffic")
                ? "جمع برآوردی پایه و ترافیک"
                : "قیمت پایه اعلام‌شده"
              : "بدون قیمت قابل مقایسه؛ خارج از رتبه‌بندی"}
          </small>
        </div>
      </div>
      {quote ? (
        quote.trafficChargeToman > 0 && (
          <div className="breakdown">
            <p>
              ترافیک قابل پرداخت: <bdi>{number(quote.billableGb)} GB</bdi>؛ نرخ:{" "}
              {quote.rateTomanPerGb === null
                ? "تعرفه اضافه نامشخص؛ مصرف در سهمیه"
                : `${number(quote.rateTomanPerGb)} تومان / GB`}
            </p>
            <p>
              هزینه ترافیک:{" "}
              {quote.rateTomanPerGb !== null && (
                <>
                  <bdi dir="ltr">
                    {number(quote.billableGb)} GB ×{" "}
                    {number(quote.rateTomanPerGb)} ={" "}
                    {number(quote.trafficChargeToman)}
                  </bdi>{" "}
                  تومان
                </>
              )}
              {quote.rateTomanPerGb === null &&
                `${number(quote.trafficChargeToman)} تومان (بدون مصرف اضافه)`}
            </p>
            <p>
              پایه + ترافیک = جمع برآوردی:{" "}
              <bdi dir="ltr">
                {number(quote.baseMonthlyToman)} +{" "}
                {number(quote.trafficChargeToman)} ={" "}
                {number(quote.subtotalToman)}
              </bdi>{" "}
              تومان
            </p>
          </div>
        )
      ) : (
        <div className="breakdown breakdown-warning">
          <p>
            {candidate.reasons
              .map((reason) => unpricedReasons[reason] ?? reason)
              .join(" ")}
          </p>
          {candidate.billableGb !== undefined && (
            <p>{number(candidate.billableGb)} GB بیش از سهمیه مشترک</p>
          )}
        </div>
      )}
      <p className="traffic">
        <bdi>{plan.traffic_terms}</bdi>
      </p>
      <BillingDetails plan={plan} />
    </article>
  );
}

function Configuration({
  item,
  selected,
  onSelect,
}: {
  item: ListingItem;
  selected: boolean;
  onSelect: () => void;
}) {
  const { configuration } = item;
  const startingOffer = item.offers.find(
    (offer) => offer.plan.id === item.startingOfferId,
  );
  return (
    <button
      className="configuration"
      aria-pressed={selected}
      onClick={onSelect}
    >
      <strong>
        {configuration.cpu === null ? "نامشخص" : number(configuration.cpu)} هسته
        / {configuration.ram === null ? "نامشخص" : number(configuration.ram)} GB
        رم /{" "}
        {configuration.disk === null ? "نامشخص" : number(configuration.disk)} GB
        دیسک
      </strong>
      <span>
        {configuration.storageType ?? "نوع دیسک نامشخص"}؛{" "}
        {number(item.offers.length)} پیشنهاد
      </span>
      {!item.exactIdentity && (
        <small>هویت دقیق تأیید نشده؛ پیشنهاد مستقل</small>
      )}
      <span>
        {item.startingPriceToman === null
          ? "بدون قیمت قابل مقایسه؛ خارج از رتبه‌بندی"
          : `از ${number(item.startingPriceToman)} تومان / مرجع ماهانه`}
      </span>
      {startingOffer?.totalCostUnknown && (
        <small className="evidence-warning">هزینه نهایی نامشخص</small>
      )}
      {startingOffer && (
        <small>
          آخرین تأیید موفق:{" "}
          <bdi>{startingOffer.plan.evidence.last_verified_at ?? "نامشخص"}</bdi>
        </small>
      )}
      {startingOffer &&
        evidenceIsStale(startingOffer.plan.evidence.last_verified_at) && (
          <small className="evidence-warning">
            شواهد قدیمی؛ نیازمند بازبینی
          </small>
        )}
    </button>
  );
}

function App() {
  const [request, setRequest] = useState<Request>({});
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const comparison = compare(catalog, request);
  const invalid = Object.keys(comparison.errors).length > 0;
  const selected =
    comparison.items.find((item) => item.id === selectedId) ??
    comparison.items[0];
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
            <strong>
              {number(
                catalog.plans.filter((p) => p.lifecycle === "active").length,
              )}{" "}
              رکورد / {number(Object.keys(catalog.providers).length)}{" "}
              ارائه‌دهنده
            </strong>
            <p>نمونه VPS با وضعیت شواهد هر پیشنهاد</p>
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
            <button
              onClick={() =>
                setRequest({ ram: "4", egress: "1000", priceMode: "traffic" })
              }
            >
              ۴ GB رم + ۱ TB خروجی
            </button>
          </div>
          <div className="fields mode-fields">
            <div>
              <label htmlFor="resource-mode">روش تطبیق منابع</label>
              <select
                id="resource-mode"
                value={request.resourceMode ?? "minimum"}
                onChange={(e) =>
                  setRequest({
                    ...request,
                    resourceMode:
                      e.target.value === "exact" ? "exact" : "minimum",
                  })
                }
              >
                <option value="minimum">حداقل منابع</option>
                <option value="exact">منابع دقیق</option>
              </select>
            </div>
            <div>
              <label htmlFor="price-mode">روش مقایسه قیمت</label>
              <select
                id="price-mode"
                value={comparison.priceMode}
                onChange={(e) =>
                  setRequest({
                    ...request,
                    priceMode:
                      e.target.value === "traffic" ? "traffic" : "base",
                  })
                }
              >
                <option value="base">قیمت پایه اعلام‌شده</option>
                <option value="traffic">جمع برآوردی پایه و ترافیک</option>
              </select>
            </div>
          </div>
          <div className="fields">
            {fields.map(({ key, label }) => (
              <div key={key}>
                <label htmlFor={key}>
                  {request.resourceMode === "exact"
                    ? label.replace("حداقل", "دقیق")
                    : label}
                </label>
                <input
                  id={key}
                  inputMode="numeric"
                  type="text"
                  value={request[key] ?? ""}
                  placeholder={
                    key === "egress" || key === "ingress" ? "۰" : "بدون محدودیت"
                  }
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
            منابع خالی یعنی بدون محدودیت؛ مصرف خالی یعنی صفر. ۱ TB برابر ۱٬۰۰۰
            GB است. عدد صحیح صفر یا بیشتر؛ واحد GB همان واحد اعلام‌شده
            ارائه‌دهنده است. سقف بودجه فقط قیمت پایه است؛ هزینه‌های اجباری
            نامشخص ممکن است به آن اضافه شوند.
          </p>
        </section>
        <section aria-labelledby="results-title" className="results">
          <div className="section-heading">
            <h2 id="results-title">پیشنهادها</h2>
            <span className="muted">
              {comparison.priceMode === "base"
                ? "قیمت پایه: کم به زیاد"
                : "جمع پایه و ترافیک: کم به زیاد"}
            </span>
          </div>
          <p role="status">
            {invalid
              ? "برای دیدن نتایج، ورودی را اصلاح کنید."
              : `${number(comparison.items.length)} پیکربندی / ${number(comparison.ranked.length)} پیشنهاد قیمت‌گذاری‌شده مطابق درخواست شما`}
          </p>
          <p className="muted">
            {comparison.priceMode === "base"
              ? "قیمت پایه اعلام‌شده؛ مرجع ماهانه به تومان، بدون تضمین هزینه نهایی. مصرف ترافیک در این حالت روی ترتیب اثر ندارد."
              : "جمع برآوردی ماهانه = قیمت پایه + هزینه ترافیک، به تومان؛ بدون مالیات و هزینه‌های حل‌نشده."}
          </p>
          <p className="muted">
            منابع یکسان به معنی عملکرد برابر نیست. نوع دیسک یا منابع نامشخص،
            برابری دو پیشنهاد را ثابت نمی‌کند.
          </p>
          {comparison.priceMode === "traffic" && (
            <p className="muted">
              قاعده ثابت محصول: دانلود منیجیت خروجی سرور و آپلود آن ورودی رایگان
              است. سهمیه با جهت نامشخص را مشترک بین ورودی و خروجی حساب می‌کنیم؛
              این تفسیر محصول است، نه تأیید جهت مصرف توسط ارائه‌دهنده.
            </p>
          )}
          {invalid ? (
            <div className="empty" role="alert">
              {comparison.errors.catalog ??
                "ورودی نامعتبر است. نتایج تا اصلاح ورودی نمایش داده نمی‌شوند."}
            </div>
          ) : comparison.items.length === 0 ? (
            <div className="empty">
              <h3>پیشنهادی با این منابع نداریم.</h3>
              <p>
                فیلترها حفظ شده‌اند. منابع یا بودجه را تغییر دهید یا همه
                پیشنهادها را ببینید.
              </p>
              <button onClick={() => setRequest({})}>
                نمایش همه پیشنهادها
              </button>
            </div>
          ) : (
            <>
              {comparison.ranked.length === 0 && (
                <p>برای این مصرف، برآورد قیمت نداریم.</p>
              )}
              <div className="discovery">
                <div className="configuration-list" aria-label="پیکربندی‌ها">
                  {comparison.items.map((item) => (
                    <Configuration
                      key={item.id}
                      item={item}
                      selected={selected?.id === item.id}
                      onSelect={() => setSelectedId(item.id)}
                    />
                  ))}
                </div>
                {selected && (
                  <section
                    className="offer-detail"
                    aria-labelledby="detail-title"
                  >
                    <h2 id="detail-title">پیشنهادهای ارائه‌دهندگان</h2>
                    <p>
                      {number(selected.offers.length)} پیشنهاد؛ قیمت‌ها و شرایط
                      مستقل هر ارائه‌دهنده
                    </p>
                    {selected.offers.map((candidate) => (
                      <Offer
                        key={candidate.plan.id}
                        candidate={candidate}
                        quote={candidate.quote}
                        cheapest={
                          candidate.plan.id === selected.startingOfferId
                        }
                      />
                    ))}
                  </section>
                )}
              </div>
            </>
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
