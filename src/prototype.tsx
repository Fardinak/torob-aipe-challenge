// THROWAWAY: Which of three immediate offer layouts best supports cheap VPS discovery?
// Single route /prototype/vps?variant=A|B|C; selection verdict pending user review.
import React, {useEffect, useState} from 'react';
import {createRoot} from 'react-dom/client';
import catalog from '../research/vps-comparison-data.json';
import './prototype.css';
import {quotePlan, type Quote} from './prototype-pricing';

type Plan = typeof catalog.plans[number] & {quote: Quote};
type Variant = 'A' | 'B' | 'C';
type Filters = {ram: number; cpu: number; disk: number; egress: number; ingress: number};
const variants: Variant[] = ['A', 'B', 'C'];
const names = {A: 'فهرست پیشنهادها', B: 'جدول مقایسه', C: 'گروه‌بندی ارائه‌دهنده'};
const providerName = (p: string) => p === 'manageit' ? 'منیجیت' : 'ایران‌سرور';
const num = (n: number) => new Intl.NumberFormat('fa-IR').format(n);
const zero: Filters = {ram: 0, cpu: 0, disk: 0, egress: 0, ingress: 0};
const getVariant = (): Variant => {
  const key = new URLSearchParams(location.search).get('variant');
  return variants.includes(key as Variant) ? key as Variant : 'A';
};
const source = (p: Plan) => catalog.sources[p.provider as 'manageit' | 'iranserver'];
const traffic = (p: Plan) => p.provider === 'manageit' ? 'آپلود رایگان؛ دانلود هر GB: ۱٬۲۰۰ تومان' : '۱٬۰۰۰ GB ترافیک؛ جهت مصرف نامشخص';
const planName = (p: Plan) => p.provider_plan_name || `${p.cpu_count} vCPU / ${p.ram_gb} GB`;

function Price({plan}: {plan: Plan}) {
  return <div className="price"><strong>{num(plan.quote.subtotal ?? plan.advertised_monthly_toman)}</strong><span>تومان / ماه</span><small>{plan.quote.subtotal === null ? 'فقط قیمت پایه؛ هزینه مصرف نامشخص' : plan.quote.sharedUsageGb > 0 ? 'برآورد پایه + ترافیک' : 'قیمت پایه اعلام‌شده'}</small></div>;
}
function TrafficCost({plan}: {plan: Plan}) {
  const q = plan.quote;
  if (!q.sharedUsageGb) return null;
  return <div className={'traffic-cost ' + (q.status === 'unknown' ? 'unpriced' : '')}>
    {q.reason === 'download_assumed_egress' && <><span>پایه: {num(plan.advertised_monthly_toman)} تومان</span><strong>+ {num(q.billableGb)} GB × ۱٬۲۰۰ = {num(q.trafficCost!)} تومان ترافیک</strong><small>فرض محاسبه: دانلود منیجیت = خروجی سرور؛ آپلود رایگان</small></>}
    {q.reason === 'within_assumed_shared_allowance' && <><strong>هزینه اضافه ترافیک: ۰ تومان</strong><small>مصرف مجموع: {num(q.sharedUsageGb)} از {num(plan.traffic_allowance_gb_unspecified_direction!)} GB؛ با فرض سقف مشترک ورودی و خروجی</small></>}
    {q.reason === 'overage_unverified' && <><strong>{num(q.billableGb)} GB بیشتر از ترافیک همراه پلن</strong><small>امکان و تعرفه خرید ترافیک اضافه مشخص نیست؛ از رتبه‌بندی هزینه کنار گذاشته شده است.</small></>}
    {q.reason === 'direction_unresolved' && <small>برای برآورد هزینه منیجیت، فرض جهت دانلود را فعال کنید.</small>}
  </div>;
}
function Evidence({plan}: {plan: Plan}) {
  return <details className="evidence"><summary>جزئیات هزینه و منبع <span>＋</span></summary><div className="evidence-body">
    <p><b>ترافیک: </b>{traffic(plan)}. جهت ترافیک در منبع تأیید نشده؛ فرض‌های محاسبه، اطلاعات تأییدشده ارائه‌دهنده نیستند.</p>
    <p><b>پرداخت: </b>{plan.provider === 'manageit' ? 'قیمت مرجع ماهانه؛ صورت‌حساب ساعتی PAYG. تبدیل ماه به ساعت و سقف پرداخت مشخص نیست.' : 'قیمت اعلام‌شده ماهانه؛ پردازنده اشتراکی است.'}</p>
    <p><b>IP و هزینه‌های دیگر: </b>{plan.provider === 'manageit' ? 'IPv6 رایگان. IPv4 شناورِ اختیاری: ماهانه ۱۹۵٬۰۰۰ تومان؛ این هزینه را اجباری فرض نکرده‌ایم.' : 'شمول هزینه IPv4 در این پلن تأیید نشده است.'} مالیات و کامل بودن هزینه‌های اجباری نامشخص است.</p>
    <p>قیمت نهایی، موجودی و برابری عملکرد پردازنده‌ها تأیید نشده‌اند.{plan.provider === 'manageit' && ' تعرفه دانلود برای دیتاسنترهای پرواز، امید و پارسیان است؛ تخصیص این پلن به دیتاسنتر باید بررسی شود.'}</p>
    <a href={source(plan).url} target="_blank" rel="noreferrer">مشاهده صفحه تعرفه ارائه‌دهنده ↗</a>
    {plan.provider === 'manageit' && <a href={catalog.sources.manageit_ip.url} target="_blank" rel="noreferrer">منبع تعرفه IP شناور ↗</a>}
  </div></details>;
}
function Offer({plan, first, uncertain}: {plan: Plan; first: boolean; uncertain: boolean}) {
  return <article className="offer">
    <div className="offer-main"><div className={'provider-mark ' + plan.provider}>{plan.provider === 'manageit' ? 'M' : 'IR'}</div>
      <div className="offer-identity"><div className="provider-line"><h3>{providerName(plan.provider)}</h3>{first && <span className="badge">کمترین {plan.quote.sharedUsageGb > 0 ? 'برآورد' : 'قیمت پایه'}</span>}</div><span className="plan-name" dir="ltr">{planName(plan)}</span></div>
      <div className="specs"><span><b>{num(plan.ram_gb)}</b> GB رم</span><span><b>{num(plan.cpu_count)}</b> هسته</span><span><b>{num(plan.disk_gb)}</b> GB دیسک</span></div><Price plan={plan}/>
    </div>
    <div className="offer-note"><span>{traffic(plan)}</span><span className={uncertain ? 'uncertain' : 'muted'}>{uncertain ? (plan.quote.status === 'unknown' ? 'هزینه مصرف نامشخص' : 'برآورد بر اساس فرض‌های ترافیک') : 'هزینه نهایی تأیید نشده'}</span></div>
    <TrafficCost plan={plan}/><Evidence plan={plan}/>
  </article>;
}
type ViewProps = {plans: Plan[]; uncertain: boolean};
export function VariantA({plans, uncertain}: ViewProps) {
  return <div className="offer-list">{plans.map((p,i) => <Offer key={p.id} plan={p} first={i===0 && p.quote.status === 'eligible'} uncertain={uncertain}/>)}</div>;
}
export function VariantB({plans, uncertain}: ViewProps) {
  return <div className="table-wrap"><table><caption className="sr-only">مقایسه قیمت پایه و منابع سرورها</caption><thead><tr><th>ارائه‌دهنده / پلن</th><th>رم</th><th>CPU</th><th>دیسک</th><th>ترافیک اعلام‌شده</th><th>{uncertain ? 'برآورد ماهانه' : 'قیمت پایه ماهانه'}</th></tr></thead><tbody>{plans.map((p,i) => <React.Fragment key={p.id}><tr className={i===0 ? 'lowest' : ''}><th scope="row"><b>{providerName(p.provider)}</b><small dir="ltr">{planName(p)}</small>{i===0 && <span className="badge">کمترین {p.quote.sharedUsageGb > 0 ? 'برآورد' : 'قیمت پایه'}</span>}</th><td>{num(p.ram_gb)} GB</td><td>{num(p.cpu_count)}</td><td>{num(p.disk_gb)} GB</td><td className="traffic-cell">{traffic(p)}{uncertain && <small className="uncertain">جهت نامشخص؛ فرض محاسبه اعمال شده</small>}</td><td><Price plan={p}/></td></tr><tr className="details-row"><td colSpan={6}><TrafficCost plan={p}/><Evidence plan={p}/></td></tr></React.Fragment>)}</tbody></table></div>;
}
export function VariantC({plans, uncertain}: ViewProps) {
  const providers = [...new Set(plans.map(p=>p.provider))].sort((a,b)=>(plans.find(p=>p.provider===a)!.quote.subtotal ?? Infinity)-(plans.find(p=>p.provider===b)!.quote.subtotal ?? Infinity));
  return <div className="provider-groups">{providers.map(provider => {
    const offers = plans.filter(p=>p.provider===provider);
    return <section className="provider-group" key={provider}><header><div className={'provider-mark '+provider}>{provider==='manageit'?'M':'IR'}</div><div><h3>{providerName(provider)}</h3><p>{num(offers.length)} پیشنهاد در این نمونه</p></div><span>از {num(offers[0].quote.subtotal ?? offers[0].advertised_monthly_toman)} تومان</span></header>
      <div className="group-offers">{offers.map(p=><div className="group-offer" key={p.id}><div className="group-primary"><div><strong>{num(p.ram_gb)} GB رم</strong><p>{num(p.cpu_count)} هسته · {num(p.disk_gb)} GB دیسک</p><small dir="ltr">{planName(p)}</small></div><Price plan={p}/></div><p className="group-traffic">{traffic(p)}</p>{uncertain && <p className="uncertain">برآورد بر اساس فرض‌های ترافیک</p>}<TrafficCost plan={p}/><Evidence plan={p}/></div>)}</div>
    </section>;
  })}</div>;
}
function PrototypeSwitcher({variant, change}: {variant: Variant; change: (v: Variant)=>void}) {
  const cycle = (step: number) => change(variants[(variants.indexOf(variant)+step+3)%3]);
  useEffect(()=>{
    const handle = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).closest('input,textarea,select,[contenteditable]')) return;
      if(e.key==='ArrowLeft' || e.key==='ArrowRight') {e.preventDefault(); cycle(e.key==='ArrowRight'?1:-1);}
    };
    window.addEventListener('keydown',handle); return ()=>window.removeEventListener('keydown',handle);
  },[variant]);
  return <nav className="prototype-switcher" aria-label="انتخاب طرح آزمایشی" dir="ltr"><button aria-label="طرح قبلی" onClick={()=>cycle(-1)}>←</button><div><small>THROWAWAY PROTOTYPE</small><span>{variant} · {names[variant]}</span></div><button aria-label="طرح بعدی" onClick={()=>cycle(1)}>→</button></nav>;
}
function App() {
  const [variant,setVariant] = useState<Variant>(getVariant);
  const [filters,setFilters] = useState<Filters>(zero);
  const [downloadIsEgress,setDownloadIsEgress] = useState(true);
  useEffect(()=>{const h=()=>setVariant(getVariant());window.addEventListener('popstate',h);return()=>window.removeEventListener('popstate',h);},[]);
  const change = (v: Variant) => {const url=new URL(location.href);url.searchParams.set('variant',v);history.replaceState(null,'',url);setVariant(v);};
  const candidates: Plan[] = catalog.plans.filter(p=>p.ram_gb>=filters.ram && p.cpu_count>=filters.cpu && p.disk_gb>=filters.disk).map(p=>({...p,quote:quotePlan(p,filters,downloadIsEgress)}));
  const plans = candidates.filter(p=>p.quote.status==='eligible').sort((a,b)=>a.quote.subtotal!-b.quote.subtotal!);
  const unknown = candidates.filter(p=>p.quote.status==='unknown').sort((a,b)=>a.advertised_monthly_toman-b.advertised_monthly_toman);
  const excluded = candidates.filter(p=>p.quote.status==='excluded');
  const uncertain = filters.egress + filters.ingress > 0;
  const state = {variant,filters,downloadIsEgress,undeclaredDirection:'shared_ingress_egress',sort:variant==='C'?'subtotal within provider; groups by cheapest subtotal':'subtotal ascending',ranked:plans.map(p=>({id:p.id,...p.quote})),unpriced:unknown.map(p=>({id:p.id,...p.quote})),excluded:excluded.map(p=>({id:p.id,...p.quote})),availability:'unknown',completeBill:'unknown',persistence:false};
  const set = (key: keyof Filters, value: string) => setFilters({...filters,[key]:Math.max(0,Number.isFinite(Number(value))?Number(value):0)});
  const view = {plans,uncertain};
  useEffect(()=>{console.info('VPS prototype state',state);},[variant,filters,downloadIsEgress]);
  return <div className={'app variant-'+variant}>
    <header className="site-header"><a className="brand" href="/prototype/vps"><span className="brand-icon">≋</span>سروربین<span className="brand-tag">انتخاب روشن‌تر</span></a><span className="prototype-label">نمونه تعاملی · داده محدود</span></header>
    <main><section className="intro"><div><p className="eyebrow">مقایسه سرورهای مجازی / ایران</p><h1>سرور مناسب،<br className="mobile-break"/> با قیمت روشن‌تر.</h1><p className="intro-copy">پیشنهادها را یک‌جا ببینید. نیازتان را مشخص کنید و هزینه‌های نامشخص را قبل از خرید بشناسید.</p></div><div className="coverage"><strong>۱۱<span>پلن</span> / ۲<span>ارائه‌دهنده</span></strong><span>نمونه‌ای محدود از پیشنهادهای بازار</span><small>جست‌وجوی کامل بازار یا قیمت لحظه‌ای نیست</small></div></section>
    <section className="requirements" aria-label="نیازهای سرور"><div className="section-heading"><h2>چه منابعی نیاز دارید؟</h2><button className="text-button" onClick={()=>setFilters(zero)}>پاک کردن فیلترها</button></div><div className="presets"><button className={Object.values(filters).every(v=>v===0)?'selected':''} onClick={()=>setFilters(zero)}>ارزان‌ترین، بدون محدودیت</button><button className={filters.ram===4&&filters.egress===0&&filters.cpu===0&&filters.disk===0&&filters.ingress===0?'selected':''} onClick={()=>setFilters({...zero,ram:4})}>حداقل ۴ GB رم</button><button className={filters.ram===4&&filters.egress===1000&&filters.cpu===0&&filters.disk===0&&filters.ingress===0?'selected':''} onClick={()=>setFilters({...zero,ram:4,egress:1000})}>۴ GB رم + ۱ TB خروجی</button></div>
      <div className="filter-grid">{([{key:'ram',label:'حداقل رم',unit:'GB',step:1},{key:'cpu',label:'حداقل پردازنده',unit:'هسته',step:1},{key:'disk',label:'حداقل دیسک',unit:'GB',step:1},{key:'egress',label:'مصرف خروجی ماهانه',unit:'GB',step:1},{key:'ingress',label:'مصرف ورودی ماهانه',unit:'GB',step:1}] as const).map(f=><label key={f.key} htmlFor={f.key}>{f.label}<div className="number-field"><input id={f.key} type="number" min="0" step={f.step} value={filters[f.key]||''} placeholder={f.key==='egress'||f.key==='ingress'?'۰': 'بدون محدودیت'} onChange={e=>set(f.key,e.target.value)}/><span>{f.unit}</span></div></label>)}</div><p className="filter-help">۱ TB = ۱٬۰۰۰ GB. خروجی: داده ارسالی سرور؛ ورودی: داده دریافتی سرور. ورودی خالی، صفر فرض می‌شود.</p>
      <div className="traffic-assumptions"><label><input type="checkbox" checked={downloadIsEgress} onChange={e=>setDownloadIsEgress(e.target.checked)}/> فرض محاسبه: دانلود منیجیت = خروجی سرور</label><p>ترافیک با جهت نامشخص، برای فیلتر کردن سقف مشترک ورودی + خروجی فرض می‌شود. مالیات و هزینه‌های اجباری نامشخص در برآورد نیستند.</p></div>
    </section>
    {uncertain && <section className="scenario-summary" role="status">برآورد برای {num(filters.egress)} GB خروجی + {num(filters.ingress)} GB ورودی در ماه · {num(plans.length)} پیشنهاد قابل محاسبه{unknown.length > 0 && ` · ${num(unknown.length)} پیشنهاد با هزینه نامشخص، خارج از رتبه‌بندی`}{excluded.length > 0 && ` · ${num(excluded.length)} پیشنهاد به علت سقف ترافیک حذف شد`}</section>}
    <section className="results" aria-label="پیشنهادها"><div className="results-heading"><div><h2>{uncertain?'پیشنهادها با هزینه ترافیک': 'پیشنهادهای قابل مقایسه'} <span>{num(plans.length)}</span></h2><p>{uncertain?'قیمت پایه + ترافیک بر اساس فرض‌های بالا؛ مبلغ نهایی خرید نیست.':'قیمت پایه را مقایسه کنید؛ جزئیات هزینه را در هر پیشنهاد ببینید.'}</p></div><span className="sort-label">↑ {uncertain?'برآورد هزینه':'قیمت پایه'}: کم به زیاد{variant==='C'?' · در هر گروه':''}</span></div>
      {plans.length===0 ? <div className="empty"><h3>پیشنهاد قابل محاسبه‌ای با این نیازها نداریم.</h3><p>فیلترها حفظ شده‌اند. برای دیدن گزینه‌های بیشتر، منابع یا مصرف را تغییر دهید؛ موارد نامشخص در بخش جداگانه‌اند.</p><button onClick={()=>setFilters(zero)}>نمایش همه ۱۱ پیشنهاد</button></div> : variant==='A'?<VariantA {...view}/>:variant==='B'?<VariantB {...view}/>:<VariantC {...view}/>}
    </section>
    {unknown.length > 0 && <section className="unpriced-results" aria-label="پیشنهادهای با هزینه نامشخص"><h2>نیازمند بررسی تعرفه <span>({num(unknown.length)})</span></h2><p>این پیشنهادها در نتایج رتبه‌بندی‌شده نیستند؛ قیمت پایه به‌تنهایی هزینه مصرف شما را نشان نمی‌دهد.</p><VariantA plans={unknown} uncertain={true}/></section>}
    <footer className="page-footer"><strong>شفافیت، قبل از انتخاب.</strong><p>این نمونه قیمت نهایی، موجودی یا عملکرد یکسان سرورها را تضمین نمی‌کند. برای خرید، تعرفه و شرایط جاری ارائه‌دهنده را بررسی کنید.</p><a href="https://www.manageitcloud.com/cloud-server" target="_blank" rel="noreferrer">منبع منیجیت ↗</a><a href="https://www.iranserver.com/vps/iran/" target="_blank" rel="noreferrer">منبع ایران‌سرور ↗</a></footer>
    {import.meta.env.DEV && <details className="state-panel"><summary>Prototype state · {variant} · {plans.length} ranked · {unknown.length} unpriced · {excluded.length} excluded</summary><pre dir="ltr">{JSON.stringify(state,null,2)}</pre></details>}

    </main>{import.meta.env.DEV && <PrototypeSwitcher variant={variant} change={change}/>}
  </div>;
}
createRoot(document.getElementById('root')!).render(<App/>);
