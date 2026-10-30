import { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { catalog, evidenceIsStale, type Plan } from "./catalog";
import {
  compare,
  type Request,
  type InputField,
  type Quote,
  type ProviderOffer,
  type ListingItem,
  type Comparison,
} from "./comparison";
import "@fontsource/vazirmatn/400.css";
import "@fontsource/vazirmatn/700.css";
import "./style.css";
import { useDiscoveryState } from "./discovery-state";

const statusLabel = {
  verified: "تأیید شده",
  unknown: "نامشخص",
  conflicting: "متعارض",
  failed: "بررسی ناموفق",
};
const number = (value: number) => new Intl.NumberFormat("fa-IR").format(value);

const fields: { key: InputField; label: string }[] = [
  { key: "ram", label: "حداقل رم (GB)" },
  { key: "cpu", label: "حداقل پردازنده (هسته)" },
  { key: "disk", label: "حداقل دیسک (GB)" },
  { key: "budget", label: "سقف قیمت پایه ماهانه (تومان)" },
  { key: "egress", label: "خروجی ماهانه (GB)" },
  { key: "ingress", label: "ورودی ماهانه (GB، اختیاری)" },
];

function AmountInput({
  field: { key, label },
  request,
  comparison,
  setRequest,
}: {
  field: (typeof fields)[number];
  request: Request;
  comparison: Comparison;
  setRequest: (request: Request) => void;
}) {
  return (
    <div>
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
          comparison.errors[key]
            ? `${key}-error`
            : key === "egress" || key === "ingress"
              ? "usage-help"
              : "input-help"
        }
        onChange={(e) => setRequest({ ...request, [key]: e.target.value })}
      />
      {comparison.errors[key] && (
        <p className="field-error" id={`${key}-error`}>
          {comparison.errors[key]}
        </p>
      )}
    </div>
  );
}

function BillingDetails({ plan }: { plan: Plan }) {
  const provider = catalog.providers[plan.provider];
  return (
    <details>
      <summary>جزئیات هزینه و منبع</summary>
      <div className="details-body">
        <p>پرداخت: {provider.billing}</p>
        {plan.database && (
          <>
            <p>
              موتور: {plan.database.engine}؛ نسخه‌ها (
              {statusLabel[plan.database.version_status]}):{" "}
              {plan.database.versions.join("، ")}
            </p>
            <p>
              توپولوژی ({statusLabel[plan.database.topology_status]}):{" "}
              {plan.topology ?? "نامشخص"}
            </p>
            {(
              [
                ["management", "مدیریت"],
                ["backup", "پشتیبان‌گیری"],
                ["location", "موقعیت"],
                ["feature_package", "بسته امکانات"],
                ["mandatory_charges", "هزینه‌های اجباری"],
              ] as const
            ).map(([key, label]) => (
              <p key={key}>
                {label} ({statusLabel[plan.database![key].status]}):{" "}
                {plan.database![key].detail}
              </p>
            ))}
            <p>
              مقصد عمومی تعرفه است؛ لینک خرید این پیکربندی یا تضمین موجودی نیست.
            </p>
            <a
              href={catalog.sources[plan.source].url}
              target="_blank"
              rel="noreferrer"
            >
              بررسی در سایت ارائه‌دهنده ↗
            </a>
          </>
        )}
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
          <p key={id}>
            <a href={catalog.sources[id].url} target="_blank" rel="noreferrer">
              {catalog.sources[id].label} ↗
            </a>{" "}
            <a href={`${import.meta.env.BASE_URL}evidence/${id}.txt`} download>
              دریافت شاهد نگهداری‌شده
            </a>
          </p>
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
            {revision.advertised_monthly_toman === null
              ? "مرجع ماهانه نامشخص"
              : `${number(revision.advertised_monthly_toman)} تومان`}
            ؛ {number(revision.ram_gb)} GB رم
            {evidenceIsStale(revision.evidence.last_verified_at) && (
              <small className="evidence-warning">
                شواهد تاریخی قدیمی؛ بیش از ۳۰ روز از تأیید گذشته است.
              </small>
            )}
            {revision.evidence.sources.map((id) => (
              <a
                key={id}
                href={`${import.meta.env.BASE_URL}evidence/${id}.txt`}
                download
              >
                شاهد نسخه پیشین
              </a>
            ))}
          </p>
        ))}
      </div>
    </details>
  );
}

const unpricedReasons: Record<string, string> = {
  monthly_reference_unavailable:
    "مرجع ماهانه به تومان در دسترس نیست؛ تبدیل قیمت انجام نشده است.",
  base_price_unresolved:
    "قیمت پایه تأیید نشده یا متعارض است؛ قابل مقایسه نیست.",
  traffic_evidence_unresolved: "شواهد لازم برای محاسبه ترافیک حل‌نشده است.",
  unknown_overage: "تعرفه ترافیک اضافه نامشخص است.",
  missing_traffic_rate: "نرخ لازم برای محاسبه ترافیک مشخص نیست.",
  unknown_allowance: "سهمیه لازم برای محاسبه مشخص نیست.",
  unknown_traffic_policy:
    "برآورد ترافیک با شواهد و سیاست محاسبه فعلی در دسترس نیست.",
  arithmetic_out_of_range: "مصرف از محدوده محاسبه دقیق خارج است.",
};
function catalogHref(provider: string | null) {
  const url = new URL(location.href);
  url.searchParams.delete("detail");
  if (provider) url.searchParams.set("catalog", provider);
  else url.searchParams.delete("catalog");
  url.searchParams.delete("handoff");
  return `${url.pathname}${url.search}`;
}

function handoffHref(offerId: string) {
  const url = new URL(location.href);
  url.searchParams.set("handoff", offerId);
  return `${url.pathname}${url.search}`;
}

function Offer({
  candidate,
  quote,
  cheapest = false,
  showHandoff = true,
}: {
  candidate: ProviderOffer;
  quote?: Quote;
  cheapest?: boolean;
  showHandoff?: boolean;
}) {
  const { plan } = candidate;
  return (
    <article
      aria-label={`${catalog.providers[plan.provider].name} ${plan.provider_plan_name ?? plan.id}`}
    >
      <div className="offer-main">
        <div className="identity">
          <h3>{catalog.providers[plan.provider].name}</h3>
          <a href={catalogHref(plan.provider)}>
            کاتالوگ {catalog.providers[plan.provider].name}
          </a>
          {plan.database && <p>{plan.database.engine} — دیتابیس مدیریت‌شده</p>}
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
            {plan.evidence.facts.advertised_monthly_toman === "verified" &&
            plan.advertised_monthly_toman !== null
              ? number(quote?.subtotalToman ?? plan.advertised_monthly_toman)
              : plan.published_tariff &&
                  plan.evidence.facts.published_tariff === "verified"
                ? number(plan.published_tariff.amount)
                : "قیمت نامشخص"}
          </strong>
          <span>
            {plan.advertised_monthly_toman === null && plan.published_tariff
              ? `${plan.published_tariff.currency === "USD" ? "دلار آمریکا" : "تومان"} / ${{ hour: "ساعت", day: "روز", month: "ماه" }[plan.published_tariff.basis]}`
              : "تومان / ماه"}
          </span>
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
          {plan.database?.backup.status === "conflicting" && (
            <small className="evidence-warning">
              تعارض شواهد پشتیبان‌گیری؛ شمول بکاپ تأیید نشده است.
            </small>
          )}
          <small>
            {candidate.totalCostUnknown ? "هزینه نهایی نامشخص؛ " : ""}
            {!candidate.totalCostUnknown
              ? "هزینه‌های اجباری بررسی شده"
              : "هزینه‌های اجباری ناقص"}
          </small>
          {(Object.values(plan.evidence.facts).some(
            (status) => status === "conflicting" || status === "failed",
          ) ||
            (plan.database &&
              [
                plan.database.version_status,
                plan.database.topology_status,
                ...[
                  plan.database.management,
                  plan.database.backup,
                  plan.database.location,
                  plan.database.feature_package,
                  plan.database.mandatory_charges,
                ].map((fact) => fact.status),
              ].some(
                (status) => status === "conflicting" || status === "failed",
              ))) && (
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
        quote.reasons.includes("base_plus_traffic") && (
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
      {showHandoff && (
        <p className="handoff-actions">
          <a href={handoffHref(plan.id)} target="_blank" rel="noreferrer">
            ادامه به {catalog.providers[plan.provider].name}
          </a>
          <small>در برگه جدید؛ پیش از خروج امکان لغو دارید.</small>
        </p>
      )}
    </article>
  );
}

function Handoff({ candidate }: { candidate?: ProviderOffer }) {
  const [remaining, setRemaining] = useState(5);
  const [cancelled, setCancelled] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  // The retained offer's primary evidence is a general product/tariff page in
  // the current catalog. Never substitute the listing's cheapest offer URL.
  const destination = candidate && catalog.sources[candidate.plan.source].url;
  const stopTimer = () => clearInterval(timer.current);
  useEffect(() => {
    if (!destination) return;
    const deadline = Date.now() + 5000;
    timer.current = setInterval(() => {
      const seconds = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
      setRemaining(seconds);
      if (seconds === 0) {
        clearInterval(timer.current);
        location.assign(destination);
      }
    }, 250);
    return () => clearInterval(timer.current);
  }, [destination]);
  const returnURL = new URL(location.href);
  returnURL.searchParams.delete("handoff");
  const back = `${returnURL.pathname}${returnURL.search}`;
  if (!candidate || !destination)
    return (
      <main className="handoff-page">
        <h1>پیشنهاد انتخاب‌شده یافت نشد</h1>
        <p>انتقال انجام نمی‌شود؛ پیشنهاد را دوباره در مقایسه انتخاب کنید.</p>
        <a href={back}>بازگشت به مقایسه</a>
      </main>
    );
  return (
    <main className="handoff-page">
      <h1>ادامه به {catalog.providers[candidate.plan.provider].name}</h1>
      <p>
        در حال خروج از این سایت هستید؛ پیکربندی انتخاب‌شده را در مقصد بررسی
        کنید.
      </p>
      <p>مقصد عمومی محصول یا تعرفه است؛ لینک خرید مستقیم این پیکربندی نیست.</p>
      <p>
        انتشار پیشنهاد یا کار کردن لینک، موجودی یا امکان راه‌اندازی فعلی را
        تأیید نمی‌کند.
      </p>
      <p>
        <a href={destination} target="_blank" rel="noreferrer">
          منبع مقصد
        </a>
      </p>
      <p className="handoff-destination">
        <bdi>{destination}</bdi>
      </p>
      <div className="handoff-controls">
        <p role="status">
          {cancelled
            ? "انتقال خودکار لغو شد."
            : `انتقال خودکار تا ${number(remaining)} ثانیه دیگر`}
        </p>
        <button
          type="button"
          onClick={() => {
            stopTimer();
            setCancelled(true);
          }}
        >
          لغو
        </button>
        <button
          type="button"
          onClick={() => {
            stopTimer();
            location.assign(destination);
          }}
        >
          ادامه اکنون
        </button>
        <a href={back} onClick={stopTimer}>
          بازگشت به مقایسه
        </a>
      </div>
      <Offer
        candidate={candidate}
        quote={candidate.quote}
        showHandoff={false}
      />
    </main>
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
      id={`configuration-${item.id}`}
      aria-pressed={selected}
      onClick={onSelect}
    >
      {item.engine && (
        <span>
          {item.engine}؛ توپولوژی: {item.topology ?? "نامشخص"}
        </span>
      )}
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
      <small>
        {startingOffer?.quote?.reasons.includes("base_plus_traffic")
          ? "جمع برآوردی پایه و ترافیک"
          : "قیمت پایه اعلام‌شده"}
      </small>
      {item.offers.some(
        ({ plan }) =>
          Object.values(plan.evidence.facts).includes("conflicting") ||
          plan.database?.backup.status === "conflicting",
      ) && (
        <small className="evidence-warning">
          تعارض شواهد؛ جزئیات را بررسی کنید.
        </small>
      )}
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

function SearchHome({ onSearch }: { onSearch: (request: Request) => void }) {
  const [query, setQuery] = useState("");
  return (
    <main className="search-home">
      <span className="brand">≋ سروربین</span>
      <h1>زیرساخت را پیدا کن، پیشنهادها را بسنج.</h1>
      <p>جستجوی محصول و موتور دیتابیس؛ ارائه‌دهنده را در نتایج فیلتر کنید.</p>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSearch({ query });
        }}
      >
        <label htmlFor="home-search">جستجوی محصول، دسته یا موتور</label>
        <div className="home-search-box">
          <input
            id="home-search"
            type="search"
            placeholder="VPS، PostgreSQL، Redis…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <button type="submit">جستجو</button>
        </div>
      </form>
      <nav className="home-categories" aria-label="دسته‌های خدمات">
        <button onClick={() => onSearch({ category: "vps" })}>
          سرور مجازی
        </button>
        <button onClick={() => onSearch({ category: "database" })}>
          دیتابیس مدیریت‌شده
        </button>
      </nav>
      <small>مقایسه قیمت‌های منتشرشده؛ قیمت و موجودی لحظه‌ای نیست.</small>
    </main>
  );
}

function App() {
  const {
    home,
    request,
    selectedId,
    catalogId,
    setRequest,
    select,
    backToList,
  } = useDiscoveryState();
  const [mobile, setMobile] = useState(
    () => matchMedia("(max-width: 720px)").matches,
  );
  const drawer = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const media = matchMedia("(max-width: 720px)");
    const update = () => {
      drawer.current?.close();
      setMobile(media.matches);
    };
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (mobile && selectedId) {
      window.scrollTo(0, 0);
      document.getElementById("detail-title")?.focus();
    }
  }, [mobile, selectedId]);
  const databaseCategory = request.category === "database";
  const engines = [
    ...new Set(
      catalog.plans
        .filter((p) => p.category === "database" && p.lifecycle === "active")
        .map((p) => p.database!.engine),
    ),
  ].sort();
  const versions = [
    ...new Set(
      catalog.plans
        .filter(
          (p) =>
            p.lifecycle === "active" &&
            p.database?.engine === request.engine &&
            p.database?.version_status === "verified",
        )
        .flatMap((p) => p.database!.versions),
    ),
  ];
  const providerProfile =
    catalogId && Object.hasOwn(catalog.providers, catalogId)
      ? catalog.providers[catalogId]
      : undefined;
  const comparison = compare(
    catalog,
    catalogId
      ? {
          category: "all",
          provider: catalogId,
          priceMode: "base",
          sort: request.sort,
        }
      : request,
  );
  const invalid =
    Boolean(catalogId && !providerProfile) ||
    Object.keys(comparison.errors).length > 0;
  const selected = selectedId
    ? comparison.items.find((item) => item.id === selectedId)
    : comparison.items[0];
  const handoffId = new URLSearchParams(location.search).get("handoff");
  if (handoffId !== null)
    return (
      <Handoff
        candidate={
          invalid
            ? undefined
            : comparison.items
                .flatMap((item) => item.offers)
                .find((offer) => offer.plan.id === handoffId)
        }
      />
    );
  if (home) return <SearchHome onSearch={setRequest} />;

  return (
    <>
      <header className="site-header">
        <a className="brand" href={import.meta.env.BASE_URL}>
          ≋ سروربین
        </a>
        <span>مقایسه زیرساخت</span>
      </header>
      <main className={mobile && selectedId && selected ? "show-detail" : ""}>
        {catalogId ? (
          <section
            className="provider-profile"
            aria-label="کاتالوگ ارائه‌دهنده"
          >
            <h1>
              {providerProfile
                ? `کاتالوگ ${providerProfile.name}`
                : "ارائه‌دهنده یافت نشد"}
            </h1>
            <p>
              این کاتالوگ همه پیشنهادهای پذیرفته‌شده این ارائه‌دهنده در دسته‌های
              انتشار را با قیمت پایه خودش نشان می‌دهد؛ شامل همه محصولات آن شرکت
              نیست.
            </p>
            <p>
              فیلترهای جستجو در این نما اعمال نمی‌شوند؛ هنگام بازگشت حفظ
              می‌شوند.
            </p>
            {providerProfile?.disclosures.map((note) => (
              <p key={note}>{note}</p>
            ))}
            <a href={catalogHref(null)}>بازگشت به مقایسه</a>
          </section>
        ) : (
          <>
            <section className="intro">
              <div>
                <p className="eyebrow">
                  سرور مجازی و دیتابیس مدیریت‌شده / ایران
                </p>
                <h1>
                  منابع مورد نیاز شما،
                  <br />
                  قیمت‌های روشن‌تر.
                </h1>
                <p>
                  پیشنهادها را یک‌جا ببینید و جزئیات هزینه را پیش از انتخاب
                  بررسی کنید.
                </p>
              </div>
              <aside className="coverage">
                <strong>
                  {number(
                    catalog.plans.filter((p) => p.lifecycle === "active")
                      .length,
                  )}{" "}
                  رکورد / {number(Object.keys(catalog.providers).length)}{" "}
                  ارائه‌دهنده
                </strong>
                <p>فهرست بررسی‌شده با وضعیت شواهد هر پیشنهاد</p>
                <small>پوشش بررسی‌شده بازار؛ قیمت و موجودی لحظه‌ای نیست.</small>
              </aside>
            </section>
            <section className="search-entry" aria-label="جستجو">
              <label htmlFor="search">جستجوی محصول، دسته یا موتور</label>
              <input
                id="search"
                type="search"
                placeholder="VPS، PostgreSQL، Redis…"
                value={request.query ?? ""}
                onChange={(event) =>
                  setRequest({ ...request, query: event.target.value })
                }
              />
              <p>
                نام محصول یا موتور را جستجو کنید؛ نام ارائه‌دهنده در فیلتر
                جداگانه است.
              </p>
              <div className="presets">
                <button onClick={() => setRequest({ category: "vps" })}>
                  مرور سرور مجازی
                </button>
                <button onClick={() => setRequest({ category: "database" })}>
                  مرور دیتابیس مدیریت‌شده
                </button>
              </div>
            </section>
            <button
              className="mobile-only"
              onClick={() => drawer.current?.showModal()}
            >
              فیلترها
            </button>
            <dialog
              ref={drawer}
              open={!mobile}
              className="filter-drawer"
              aria-label="فیلترهای جستجو"
            >
              <button
                className="mobile-only"
                onClick={() => drawer.current?.close()}
              >
                نمایش نتایج
              </button>
              <section
                className="requirements"
                aria-labelledby="requirements-title"
              >
                <div className="section-heading">
                  <h2 id="requirements-title">چه منابعی نیاز دارید؟</h2>
                  <button className="reset" onClick={() => setRequest({})}>
                    پاک کردن فیلترها
                  </button>
                </div>
                <div className="presets">
                  <button onClick={() => setRequest({})}>بدون محدودیت</button>
                  <button
                    onClick={() =>
                      setRequest({ category: request.category, ram: "4" })
                    }
                  >
                    حداقل ۴ GB رم
                  </button>
                  {!databaseCategory && (
                    <button
                      onClick={() =>
                        setRequest({
                          category: "vps",
                          ram: "4",
                          egress: "1000",
                          priceMode: "traffic",
                        })
                      }
                    >
                      ۴ GB رم + ۱ TB خروجی
                    </button>
                  )}
                </div>
                <div className="fields mode-fields">
                  <div>
                    <label htmlFor="sort">ترتیب در هر دسته و موتور</label>
                    <select
                      id="sort"
                      value={request.sort ?? "price-asc"}
                      onChange={(e) =>
                        setRequest({
                          ...request,
                          sort: e.target.value as Request["sort"],
                        })
                      }
                    >
                      <option value="price-asc">قیمت: کم به زیاد</option>
                      <option value="price-desc">قیمت: زیاد به کم</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="provider">ارائه‌دهنده</label>
                    <select
                      id="provider"
                      multiple
                      value={request.provider?.split(",").filter(Boolean) ?? []}
                      onChange={(e) =>
                        setRequest({
                          ...request,
                          provider: Array.from(
                            e.target.selectedOptions,
                            (option) => option.value,
                          )
                            .filter(Boolean)
                            .join(","),
                        })
                      }
                    >
                      <option value="">همه ارائه‌دهندگان</option>
                      {Object.entries(catalog.providers).map(
                        ([id, provider]) => (
                          <option key={id} value={id}>
                            {provider.name}
                          </option>
                        ),
                      )}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="category">دسته خدمات</label>
                    <select
                      id="category"
                      value={request.category ?? "all"}
                      onChange={(e) => {
                        setRequest({
                          ...request,
                          category: e.target.value as Request["category"],
                          ...(e.target.value === "database"
                            ? {
                                egress: "",
                                ingress: "",
                                priceMode: "base" as const,
                              }
                            : {}),
                          engine: "",
                          version: "",
                        });
                      }}
                    >
                      <option value="all">همه دسته‌ها؛ مقایسه جداگانه</option>
                      <option value="vps">سرور مجازی</option>
                      <option value="database">دیتابیس مدیریت‌شده</option>
                    </select>
                  </div>
                  {databaseCategory && (
                    <>
                      <div>
                        <label htmlFor="engine">موتور دیتابیس</label>
                        <select
                          id="engine"
                          value={request.engine ?? ""}
                          onChange={(e) =>
                            setRequest({
                              ...request,
                              engine: e.target.value,
                              version: "",
                            })
                          }
                        >
                          <option value="">همه موتورها؛ مقایسه جداگانه</option>
                          {engines.map((engine) => (
                            <option key={engine}>{engine}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="version">نسخه دیتابیس</label>
                        <select
                          id="version"
                          disabled={!request.engine}
                          value={request.version ?? ""}
                          onChange={(e) =>
                            setRequest({ ...request, version: e.target.value })
                          }
                        >
                          <option value="">بدون محدودیت نسخه</option>
                          {versions.map((version) => (
                            <option key={version}>{version}</option>
                          ))}
                        </select>
                      </div>
                    </>
                  )}
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
                </div>
                <div className="fields">
                  {fields
                    .filter(({ key }) => key !== "egress" && key !== "ingress")
                    .map((field) => (
                      <AmountInput
                        key={field.key}
                        field={field}
                        request={request}
                        comparison={comparison}
                        setRequest={setRequest}
                      />
                    ))}
                </div>
                <p id="input-help" className="muted">
                  منابع خالی یعنی بدون محدودیت. مصرف VPS خالی یعنی صفر. ۱ TB
                  برابر ۱٬۰۰۰ GB است. عدد صحیح صفر یا بیشتر؛ واحد GB همان واحد
                  اعلام‌شده ارائه‌دهنده است. سقف بودجه فقط قیمت پایه است؛
                  هزینه‌های اجباری نامشخص ممکن است به آن اضافه شوند.
                </p>
              </section>
            </dialog>
            {!databaseCategory && (
              <section className="usage-controls" aria-label="سناریوی فعال VPS">
                <details open aria-label="مصرف و روش قیمت VPS">
                  <summary>مصرف و روش قیمت VPS</summary>
                  <div className="fields">
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
                        <option value="traffic">
                          جمع برآوردی پایه و ترافیک
                        </option>
                      </select>
                    </div>

                    {fields
                      .filter(
                        ({ key }) => key === "egress" || key === "ingress",
                      )
                      .map((field) => (
                        <AmountInput
                          key={field.key}
                          field={field}
                          request={request}
                          comparison={comparison}
                          setRequest={setRequest}
                        />
                      ))}
                  </div>
                </details>
                <p>
                  حالت فعال:{" "}
                  {comparison.priceMode === "traffic"
                    ? "جمع برآوردی پایه و ترافیک"
                    : "قیمت پایه اعلام‌شده"}
                  ؛ خروجی: <bdi>{request.egress || "۰"} GB</bdi>؛ ورودی:{" "}
                  <bdi>{request.ingress || "۰"} GB</bdi>.
                </p>
                <p id="usage-help">
                  مصرف خالی یعنی صفر؛ ۱ TB = ۱٬۰۰۰ GB. سقف بودجه فقط قیمت پایه
                  است؛ هزینه نهایی ممکن است بیشتر باشد.
                </p>
                {comparison.priceMode === "traffic" && (
                  <p>
                    قاعده محصول فقط برای پیشنهادهای دارای این تفسیر: دانلود
                    منیجیت خروجی سرور و آپلود آن ورودی رایگان است. سهمیه با جهت
                    نامشخص، طبق تفسیر ثبت‌شده همان پیشنهاد، مشترک بین ورودی و
                    خروجی محاسبه می‌شود؛ جهت منبع همچنان نامشخص است. این قواعد
                    برای دیتابیس یا ارائه‌دهنده جدید تعمیم داده نمی‌شوند.
                  </p>
                )}
                {(comparison.errors.egress || comparison.errors.ingress) && (
                  <p className="field-error">
                    مصرف نامعتبر است؛ ورودی را اصلاح کنید. برآوردی نمایش داده
                    نمی‌شود.
                  </p>
                )}
              </section>
            )}
          </>
        )}
        <section aria-labelledby="results-title" className="results">
          <div className="section-heading">
            <h2 id="results-title">پیشنهادها</h2>
            <span className="muted">
              {databaseCategory
                ? "موتور؛ سپس قیمت پایه در همان موتور"
                : comparison.priceMode === "base"
                  ? request.sort === "price-desc"
                    ? "قیمت پایه: زیاد به کم"
                    : "قیمت پایه: کم به زیاد"
                  : request.sort === "price-desc"
                    ? "جمع پایه و ترافیک: زیاد به کم"
                    : "جمع پایه و ترافیک: کم به زیاد"}
            </span>
          </div>
          {!catalogId && (
            <div className="active-filters" aria-label="فیلترهای فعال">
              {Object.entries(request)
                .filter(([, value]) => value !== "" && value !== "all")
                .map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => {
                      const next = { ...request };
                      delete next[key as keyof Request];
                      if (key === "category" || key === "engine") {
                        delete next.version;
                        delete next.engine;
                      }
                      setRequest({ category: "all", ...next });
                    }}
                  >
                    حذف{" "}
                    {
                      (
                        {
                          query: "جستجو",
                          category: "دسته",
                          engine: "موتور",
                          version: "نسخه",
                          ram: "رم GB",
                          cpu: "هسته",
                          disk: "دیسک GB",
                          budget: "بودجه تومان",
                          sort: "ترتیب",
                          provider: "ارائه‌دهنده",
                          priceMode: "روش قیمت",
                          resourceMode: "روش منابع",
                          egress: "خروجی GB",
                          ingress: "ورودی GB",
                        } as Record<string, string>
                      )[key]
                    }
                    :{" "}
                    {key === "provider"
                      ? String(value)
                          .split(",")
                          .map((id) => catalog.providers[id]?.name ?? id)
                          .join("، ")
                      : value}{" "}
                    ×
                  </button>
                ))}
            </div>
          )}
          {(databaseCategory || catalogId) && (
            <p>
              قیمت‌ها فقط در یک موتور مقایسه می‌شوند؛ ترتیب موتورها الفبایی است.
              یکسان بودن منابع به معنی مدیریت یا پشتیبان‌گیری یکسان نیست.
            </p>
          )}
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
              {!catalogId && (
                <button onClick={() => setRequest({})}>
                  نمایش همه پیشنهادها
                </button>
              )}
            </div>
          ) : (
            <>
              {comparison.ranked.length === 0 && (
                <p>برای این مصرف، برآورد قیمت نداریم.</p>
              )}
              <div
                className={`discovery ${selectedId && selected ? "detail-selected" : ""}`}
              >
                <div className="configuration-list" aria-label="پیکربندی‌ها">
                  {comparison.items.map((item, index) => (
                    <div key={item.id}>
                      {(index === 0 ||
                        item.engine !== comparison.items[index - 1].engine) && (
                        <h3>
                          {item.engine
                            ? `دیتابیس مدیریت‌شده / ${item.engine}`
                            : "سرور مجازی / VPS"}
                        </h3>
                      )}
                      <Configuration
                        key={item.id}
                        item={item}
                        selected={selected?.id === item.id}
                        onSelect={() => select(item.id)}
                      />
                    </div>
                  ))}
                </div>
                {selectedId && !selected && (
                  <p role="status">
                    جزئیات انتخاب‌شده با فیلترهای فعلی موجود نیست؛ از فهرست
                    انتخاب کنید.
                  </p>
                )}
                {selected && (
                  <section
                    className="offer-detail"
                    aria-labelledby="detail-title"
                  >
                    <button className="mobile-only" onClick={backToList}>
                      بازگشت به فهرست
                    </button>
                    <h2 id="detail-title" tabIndex={-1}>
                      پیشنهادهای ارائه‌دهندگان
                    </h2>
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
