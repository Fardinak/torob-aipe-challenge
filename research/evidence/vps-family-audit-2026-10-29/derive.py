"""Derive hand-reviewed rows from retained source snapshots; does not edit catalog."""
import json,re,pathlib,hashlib
from bs4 import BeautifulSoup
D=pathlib.Path(__file__).parent
C=pathlib.Path('research/vps-reviewed-catalog.json');catalog=json.loads(C.read_text());plans=catalog['plans']
S={x['source_key']:x for f in D.glob('sources*.json') for x in json.loads(f.read_text())}
rows=[]
def source(k):
 s=S[k];return {'key':k,'url':s['url'],'final_url':s.get('final_url'),'snapshot':s.get('snapshot'),'capture_time':s['capture_time'],'sha256':s.get('sha256')}
def add(k,name,cpu,ram,disk,media,price,traffic,**kw):
 r={'review_id':f"family-{k}-{sum(z['source']['key']==k for z in rows)+1}",'provider':S[k]['provider'],'plan_name':name,'source':source(k),'cpu':cpu,'ram_gb':ram,'disk_gb':disk,'storage_type':media,'monthly_toman':price,'published_tariff':{'amount':price,'currency':'toman','basis':'monthly'} if price is not None else None,'billing_wording':'ماهانه','traffic_terms':traffic,'fee_ip_uncertainty_facts':['Tax and mandatory extras unspecified unless stated below.','Availability is a page claim, not a checkout verification.'],'flags':['base-price-total-cost-unresolved'],'original_labels':{'cpu':f'{cpu} cores' if cpu is not None else None,'ram':f'{ram} GB' if ram is not None else None,'disk':f'{disk} GB' if disk is not None else None},'catalog_duplicate_ids':[],'disposition':'new-reviewable'}
 r.update(kw);rows.append(r);return r
def txt(k):return (D/(k+'.txt')).read_text()
def soup(k):return BeautifulSoup((D/(k+'.html')).read_text(),'html.parser')
def duplicate(r,ids,reason='Same published SKU and configuration; do not add another identity.'):
 r['catalog_duplicate_ids']=ids if isinstance(ids,list) else [ids];r['disposition']='existing-catalog-identity';r['identity_note']=reason

def products(k):return soup(k).select('.product')
# Explicitly checked table: RAM precedes vCPU, disk is SSD.
for name,c,ram,d,p,h in [('مشتری',1,2,20,1475000,2048),('زحل',2,4,40,2650000,3680),('اورانوس',4,8,80,4600000,6388),('نپتون',8,16,160,8000000,11111),('پلوتون',16,32,320,14000000,19444),('اریس',32,64,640,24600000,34166)]:
 r=add('01-liara',name,c,ram,d,'SSD',p,'هزینه‌ی مصرف هر گیگابایت ترافیک دانلود، ۲۵۰۰ تومان و ترافیک آپلود رایگان است.',billing_wording='قیمت ماهانه / قیمت ساعتی؛ پرداخت بر اساس مصرف ساعتی',hourly_toman=h)
 r['fee_ip_uncertainty_facts']+=['ماهانه ۲۰۰ هزار تومان (ساعتی ۲۷۷ تومان) هزینه‌ی IPv4 به قیمت‌های بالا اضافه می‌شود.','All plans Iran; shared 10Gbps. Unlimited headline does not mean free download.'];r['flags']+=['ipv4-extra-200000-monthly','metered-download','hourly-with-published-monthly-reference']
 r['additional_sources']=[source(x) for x in ['48-liara','49-liara','50-liara']]
for i,(c,mb,p,t) in enumerate([(1,512,549000,150),(2,2048,749000,300),(4,4096,1449000,800)],1):
 r=add('02-iranica',f'سرور میکروتیک ایران – پلن {i}',c,mb/1000,None,None,p,f'{t} گیگ (قابل افزایش)؛ ترافیک ماهانه',disposition='gap-incomplete-resources')
 r['original_labels']['ram']=f'{mb} MB';r['flags']+=['disk-capacity-unpublished','storage-media-unpublished','price-copy-conflict'];r['fee_ip_uncertainty_facts']+=['Cards and comparison table agree at 549/749/1449 thousand toman; summary shows 497000 and FAQ says from 347000, not used.','Optional IBSNG installation 2 million; monitoring +200 thousand; management +500 thousand; periods for optional fees unclear. RouterOS v6/v7, FAQ Level 6; IP inclusion unspecified.']
# Tadserver full lists; frequency and thread count are never used as core count.
for k,media in [('03-tadserver','SSD'),('04-tadserver','SSD'),('39-tadserver','NVMe')]:
 text=txt(k);start=text.index('لیست قیمت') if 'لیست قیمت' in text else text.index('سرور مجازی ۲ گیگابایت NVMe')
 block=text[start:];pat=r'(سرور مجازی ([۰-۹0-9]+) گیگابایت (?:ایران|شاتل|NVMe))\n([۰-۹0-9]+) گیگابایت هارد\n(?:SSD|NVMe)\n([۰-۹0-9]+) گیگابایت رم\n(.*?)\n([\d,]+) تومان\nپیکربندی سفارش\nمشخصات پردازنده\nتعداد هسته\n(\d+) هسته'
 matches=list(re.finditer(pat,block,re.S));assert len(matches)==(7 if k=='39-tadserver' else 11),(k,len(matches))
 for m in matches:
  name,title_ram,disk,ram,traffic,p,c=m.groups();ram=int(ram);r=add(k,name,int(c),ram,int(disk),media,int(p.replace(',','')),traffic,original_wording=m.group(0))
  r['fee_ip_uncertainty_facts']+=['Additional download traffic can be bought; price unspecified. OS installation free; base IP inclusion unknown.','Listed delivery 2–48 hours may conflict with instant-delivery marketing.']
  r['original_labels']={'cpu':c+' هسته','ram':m.group(4)+' گیگابایت رم','disk':m.group(3)+' گیگابایت هارد '+media}
  if k=='39-tadserver':
   r['flags']+=['unlimited-subject-to-1-to-10-pattern'];r['fee_ip_uncertainty_facts']+=['ترافیک نامحدود فقط در شرایطی که الگوی مصرف ۱ به ۱۰ مطابق استاندارد دیتاسنتر رعایت شود، برقرار خواهد بود.']
   if int(title_ram)!=ram:r['flags']+=['ram-title-body-conflict'];r['disposition']='gap-conflicting-resources';r['fee_ip_uncertainty_facts']+=['Title says 16GB but body says 12GB RAM; normalized body is 12, no silent correction.']
   if ram in (4,8):r['flags']+=['featured-card-resource-conflict'];r['fee_ip_uncertainty_facts']+=['Featured block CPU/disk differs from full list; full list retained explicitly.']
  else:
   r['region']='respina' if k=='03-tadserver' else 'shatel';r['flags']+=['family-identity-gap'];r['identity_note']='Generic catalog Iran family has different order slugs. Respina and Shatel featured links both target respina-vps; full list has no definitive distinct SKU. Do not count Shatel as another identity until resolved.'
   if k=='04-tadserver':r['disposition']='gap-alias-or-distinct-datacenter';r['audit_alias_candidate']=next(z['review_id'] for z in rows if z['source']['key']=='03-tadserver' and z['plan_name'].split()[2]==name.split()[2]);r['fee_ip_uncertainty_facts']+=['64GB Shatel has 200GB disk versus 150GB Respina; alias cannot be presumed for this row.'] if ram==64 else []
# inet redirect is same six admitted rows.
for c,p,d in [(1,790000,20),(2,1320000,30),(3,1730000,40),(4,2100000,50),(6,2900000,60),(8,3800000,80)]:
 r=add('05-inet',f'ram-{c}',c,c,d,'SSD',p,'نامحدود؛ ترافیک نیم‌بها',billing_wording='قیمت یک ماهه - تومان / قیمت ماهانه (تومان)');duplicate(r,f'inet-iran-ram-{c}')
# IRVM generic country page explicitly carries all four sizes for five datacenters.
for region,k in [('respina','07-irvm'),('afranet','08-irvm'),('asiatech','09-irvm'),('shatel','45-irvm'),('fanap','40-irvm')]:
 for name,slug,c,ram,d,p,t in [('استارتر','starter',1,1,10,545000,15),('برنز','bronze',2,2,20,895000,30),('سیلور','silver',2,4,30,1495000,30),('گلد','gold',4,8,50,2895000,50)]:
  r=add(k,name,c,ram,d,None,p,f'ترافیک اولیه {t} گیگابایت',region=region,additional_sources=[source('06-irvm')]);r['flags']+=['card-storage-media-unspecified'];r['fee_ip_uncertainty_facts']+=['Cards advertise IPv6 and IP change; custom configurator separately shows IPv4 200000 per IP, 85000 per 100GB traffic, 230000/core, 100000/GB RAM, 2100/GB HDD. Do not infer these extras are included in ready-plan price.','35% first-purchase headline not applied to displayed numeric tariffs.']
  if region=='respina':duplicate(r,f'irvm-respina-{slug}','Same Respina ready plans. Keep existing media evidence separately; new family cards omit media while custom configurator says HDD.');r['flags']+=['configurator-media-conflict']
  else:r['disposition']='excluded-explicitly-unavailable';r['flags']+=['published-unavailable'];r['availability_wording']='ناموجود'
# Managed VPS is still compute, not a managed database.
for i,(c,mb,d,p,t) in enumerate(zip([5,5,5,6,7,8,9,10],[1024,2048,3096,4096,6144,8192,10240,12288],[30,35,40,60,70,80,90,100],[2622000,3420000,3960000,5400000,5820000,6900000,7890000,8550000],[1000,1500,1500,2000,3000,4000,5000,8000]),1):
 r=add('11-mihanwebhost',f'مدیریت شده پلن {i}',c,mb/1000,d,'SSD',p,f'{t/1000:g} ترابایت',service_variant='managed-vps',billing_wording='هزینه ماهیانه');r['original_labels']['ram']=f'{mb} مگابایت';r['fee_ip_uncertainty_facts']+=['50GB backup space free, managed VIP support, control-panel optimization and monitoring; license fees/IP inclusion unspecified.','RAM published 3096MB in plan 3 is preserved literally, not corrected to 3072.']
 if i<=3:r['disposition']='excluded-explicitly-unavailable';r['flags']+=['published-full-capacity'];r['availability_wording']='تکمیل ظرفیت'
for i,(c,ram,d,p) in enumerate([(4,4,30,999000),(6,6,100,1399000),(8,8,150,1599000),(10,10,200,1999000)],1):
 r=add('12-logicserver',f'مدیریت شده {i}',c,ram,d,'SSD',p,'1000GB ترافیک ماهانه',service_variant='managed-vps');r['flags']+=['hero-nvme-vs-plan-ssd'];r['fee_ip_uncertainty_facts']+=['1 dedicated IPv4 included. Plan cards/table explicitly SSD; hero NVMe not substituted.','Monitoring, security hardening, updates, LiteSpeed, DirectAdmin/CyberPanel, backup-system setup included; weekly/daily backups recommended at extra unspecified cost.','Annual progressive discount no numeric tariff; not synthesized.']
# Spadserver cards, including last card with reversed label/value order.
for k in ['13-spadserver','14-spadserver','37-spadserver']:
 for i,p in enumerate(products(k),1):
  t=p.get_text(' ',strip=True);name=p.select_one('h3, h4, .product-name').get_text(' ',strip=True);price=int(re.search(r'([\d,]+) تومان',t)[1].replace(',',''));ram=re.search(r'(\d+) GB RAM',t);cpu=re.search(r'(\d+) Core CPU',t);disk=re.search(r'(\d+) GB SSD',t)
  if ram:ram=int(ram[1]);cpu=int(cpu[1]);disk=int(disk[1])
  else:ram=int(re.search(r'RAM (\d+) GB',t)[1]);cpu=int(re.search(r'CPU (\d+) Core',t)[1]);disk=int(re.search(r'SSD (\d+) GB',t)[1])
  traffic='100 GB Traffic' if '100 GB Traffic' in t else ('ترافیک نامحدود' if 'ترافیک نامحدود' in t else 'unspecified')
  r=add(k,name,cpu,ram,disk,'SSD',price,traffic,original_wording=t);r['fee_ip_uncertainty_facts']+=['ستاپ رایگان; IP inclusion unspecified.'];r['product_identity']=p.get('data-pid') or p.get('id')
  if k=='13-spadserver':duplicate(r,f'spadserver-iran-spadserver-{i}')
  elif k=='14-spadserver':r['additional_sources']=[source('36-spadserver')]
  else:r['additional_sources']=[source('38-spadserver')];r['service_variant']='gitlab-on-vps';r['flags']+=['traffic-unpublished']
# ServerVDS exact product ids. Explicit slash allocation core counts, never host/frequency.
for k in ['19-servervds','20-servervds','21-servervds','22-servervds','23-servervds']:
 for p in products(k):
  t=p.get_text(' ',strip=True);name=p.select_one('h3,h4,.product-name,[id$="-name"]').get_text(' ',strip=True);ram=float(re.search(r'(\d+)\s*GB DDR',t)[1]);cpu=int(re.search(r'/ (\d+) Core\s*=',t)[1]);dm=re.search(r'(\d+)\s*(TB|GB|GIG)?\s+(NV[Mm][Ee]|SSD|SAS|SATA)',t);assert dm,(k,t)
  d=int(dm[1])*(1000 if dm[2]=='TB' else 1);media='NVMe' if dm[3].lower()=='nvme' else ('SSD' if dm[3]=='SSD' else None)
  amounts=re.findall(r'([\d,]+)\s*ماهانه',t);price=int(amounts[-1].replace(',',''));desc=int(re.search(r'قیمت ماهانه\s*(\d+)',t)[1])*1000
  tr='منصفانه Download / نامحدود Upload' if 'منصفانه' in t else 'Download / Upload = Unlimit'
  r=add(k,name,cpu,ram,d,media,price,tr,original_wording=t,product_identity=p['id']);r['original_labels']={'cpu':re.search(r'/ (\d+) Core\s*=.*?CPU',t)[0],'ram':re.search(r'\d+\s*GB DDR.*?Ram',t)[0],'disk':dm[0]};r['fee_ip_uncertainty_facts']+=['Additional IP '+('90000' if p['id']=='product538' else '100000')+' toman; base IP inclusion and tax unspecified.','Published displayed monthly numeric amount interpreted in context of explicit description تومان; no currency conversion performed.']
  if price!=desc:r['flags']+=['conflicting-published-prices'];r['fee_ip_uncertainty_facts'] += [f'Description tariff {desc} toman/month conflicts with displayed {price}; retain displayed base reference with conflict, not verified total.'];r['alternative_published_tariff']={'amount':desc,'currency':'toman','basis':'monthly'}
  if not media:r['flags']+=['storage-interface-only'];r['fee_ip_uncertainty_facts']+=['SAS/SATA proves interface only; media remains null.']
  if '0 موجود است' in t:r['flags']+=['published-zero-stock'];r['disposition']='excluded-explicitly-unavailable'
# Dyar eco: all five are explicitly out of stock.
for i,(c,ram,p) in enumerate([(1,1,599000),(1,2,700000),(2,2,900000),(3,4,1200000),(4,6,1600000)],1):
 r=add('24-dyar',f'سرور مجازی پیشگامان اقتصادی پلن{i}',c,ram,10,'SSD',p,'100 گیگابایت(قابل افزایش)؛ دانلود+آپلود',disposition='excluded-explicitly-unavailable',original_wording=products('24-dyar')[i-1].get_text(' ',strip=True));r['flags']+=['published-unavailable'];r['availability_wording']='خارج از دسترس';r['product_identity']=products('24-dyar')[i-1].get('id')
# Milad landing covers 9 SKUs; catalog already has 7, other 2 are explicitly unavailable.
milad=[('سرور مجازی لینوکسی ایران ارزان سرور اقتصادی 1',1,1.024,30,'NVMe',585000,300,'milad-milad-eco-108'),('سرور مجازی ایران پایه 1',2,4,60,'HDD',725000,300,'milad-milad-base-111'),('سرور مجازی لینوکسی ایران اقتصادی 2',2,2,45,'HDD',610000,300,None),('سرور مجازی لینوکسی ایران اقتصادی 3',2,3,60,'NVMe',680000,300,'milad-milad-eco-110'),('سرور مجازی ایران پایه 2',2,4,120,'HDD',799000,300,None),('سرور مجازی ایران پایه 3',2,4,150,'HDD',855000,500,'milad-milad-base-113'),('سرور مجازی ایران حرفه ای 1',4,8,120,'HDD',1680000,1000,'milad-milad-pro-114'),('سرور مجازی ایران حرفه ای 2',8,16,200,'HDD',2680000,1000,'milad-milad-pro-115'),('سرور مجازی ایران حرفه ای 3',6,12,200,'HDD',2150000,800,'milad-milad-pro-116')]
for name,c,ram,d,m,p,t,ident in milad:
 r=add('33-milad',name,c,ram,d,m,p,f'{t}G',additional_sources=[source('25-milad'),source('41-milad')]);r['fee_ip_uncertainty_facts']+=['Landing explicitly says final toman price, no hidden fees, dedicated IPv4 included; store footer says RIAL but card/landing تومان prevails.']
 if ram==1.024:r['original_labels']['ram']='1024MB';r['flags']+=['decimal-mb-normalization']
 if ident:duplicate(r,ident)
 else:r['disposition']='excluded-explicitly-unavailable';r['flags']+=['published-unavailable']
# Negarnovin: three aliases share /irkvm/pN; Asiatech uses /milad/pN.
for k,family in [('28-negarnovin','irkvm'),('30-negarnovin','milad')]:
 for i,(c,ram,d,p,a,t) in enumerate(zip([2,4,6,6,8,12,12,16],[4,6,10,12,16,24,32,32],[30,40,50,60,70,80,90,100],[1700000,2000000,2400000,2800000,3200000,3500000,4000000,4800000],[19300000,21500000,26000000,30500000,34500000,38500000,41000000,51000000],[500,500,500,500,1000,1000,2000,2000]),1):
  r=add(k,f'{family} پلن {i}',c,ram,d,'NVMe',p,f'{t}G + ترافیک داخلی نامحدود',product_identity=f'https://my.negarnovin.com/store/{family}/p{i}',annual_toman=a);r['fee_ip_uncertainty_facts']+=['Dedicated fixed IPv4 included; Asiatech/Respina prose also IPv6 /64; taxes unspecified.','Annual amount is a distinct billing option for this same SKU; no extra SKU invented.'];r['original_labels']={'cpu':f'{c}Cores {c*1000}MHz','ram':f'{ram}G DDR4','disk':f'{d}G NVMe'}
  if family=='irkvm':duplicate(r,f'negarnovin-negarnovin-{129+i}');r['additional_sources']=[source('27-negarnovin'),source('29-negarnovin')]
# Sonhost market Iran section duplicates dedicated Iran page; no media shown on market, existing source has NVMe.
for i,(c,ram,d,p,t) in enumerate([(1,1,10,1150000,100),(2,2,20,1350000,200),(3,4,40,1425000,300),(3,6,60,1725000,400),(4,8,80,2145000,500)],1):
 r=add('32-sonhost',f'سرور مجازی ایران / بسته {i}',c,ram,d,None,p,f'{t} GB',billing_wording='قیمت در دوره انتخابی؛ ماهانه default selector');duplicate(r,f'sonhost-sonhost-iran-{402+i}');r['flags']+=['media-absent-on-market-use-existing-dedicated-source']
# Webdade two standard/pro hardware families. Table traffic conflicts with PAYG prose.
for name,c,ram,d,m,p in [('ستاره',2,2,40,'NVMe',700000),('سبلان',4,4,60,'NVMe',1150000),('دماوند',8,8,80,'NVMe',2150000),('اورست',8,16,200,'NVMe',3600000),('فیروزه',1,1,25,None,1900000),('نگین',2,2,50,None,3500000),('یاقوت',3,4,80,None,5650000),('الماس',4,8,120,None,9250000)]:
 r=add('34-webdade',name,c,ram,d,m,p,'Table 100GB@10Gbps; prose PAYG: هر ترابایت ترافیک دانلود ۱ میلیون تومان؛ آپلود رایگان',hardware_family='G9' if m else 'G11');r['flags']+=['traffic-inclusion-conflict'];r['fee_ip_uncertainty_facts']+=['Traffic package removal from 18 Tir 1405; wallet charged by actual usage. Table 100GB inclusion unresolved; do not assume allowance.','G11 desktop 10Gbps vs mobile 50Gbps conflict. Dedicated Iran IP advertised, explicit base IP fee not found.']
 if not m:r['original_labels']['disk']=f'{d} گیگ SAS';r['flags']+=['storage-interface-only']
for i,(c,ram,d,p,port) in enumerate([(4,4,40,1450000,400),(6,6,60,2050000,600),(8,8,70,2850000,1000),(8,8,70,4850000,10000)],1):
 r=add('56-webdade',f'Bourse-{i}',c,ram,d,'NVMe',p,'Traffic quota/overage unspecified on source',service_variant='bourse-windows',port_mbps=port);r['flags']+=['resources-published-as-from','traffic-unpublished'];r['fee_ip_uncertainty_facts']+=['CPU/RAM published از (from); retain base configuration, configurable upgrades separate. Iran Tehran; installed Windows; dedicated port.']
r=add('57-webdade','Mikrotik-IR',1,1,None,None,1077100,'100GB; overage Iran 1000 toman/GB PAYG, no ratio',disposition='gap-incomplete-resources');r['flags']+=['disk-unpublished','resources-published-as-from'];r['fee_ip_uncertainty_facts']+=['One IPv4 and one IPv6 free; original RouterOS Level 6 valid while service active; nightly backups free; 3/6/12 month discounts advertised.']
# MT aliases: mobinone URL redirects to Fanava; same actual product ids, not MobinOne identities.
for k,region in [('35-mtserver','fanava'),('42-mtserver','respina'),('43-mtserver','asiatech'),('44-mtserver','game')]:
 for i,p in enumerate(products(k),1):
  t=p.get_text(' ',strip=True);c=int(re.search(r'پردازنده - (\d+) هسته',t)[1]);ram=int(re.search(r'رم - (\d+) گیگابایت',t)[1]);d=int(re.search(r'هارد - (\d+) گیگابایت',t)[1]);price=int(re.search(r'([\d,]+)تومان',t)[1].replace(',',''));name=p.select_one('h3,h4,.product-name,[id$="-name"]').get_text(' ',strip=True)
  tr=re.search(r'ترافیک (?:\d+ گیگ(?:ابایت)?|نامحدود)',t)[0]
  r=add(k,name,c,ram,d,'SSD' if region=='game' else 'NVMe',price,tr,region=region,product_identity=p.get('id'),original_wording=t);r['fee_ip_uncertainty_facts']+=['Base IP/tax inclusion unspecified. امکان استفاده مصرف یک به یک; additional traffic possible, rate not stated.']
  if region=='fanava':duplicate(r,f'mtserver-mt-15-group-5-{i}','Requested /store/mobinone redirects to /store/fanava; product212–215 equal already admitted Fanava family, not existing marketing MobinOne rows.')
  elif region=='respina' and i==4:duplicate(r,'mtserver-mt-16-group-6-4')
  if 'ناموجود' in t:r['disposition']='excluded-explicitly-unavailable';r['flags']+=['published-unavailable']
# Minimal provider row lacking resources must be visible as a gap rather than invented configuration.
r=add('51-servervds','VPS enterprise',None,None,None,None,None,'unspecified',disposition='gap-no-resource-identity',published_tariff={'amount':10,'currency':None,'basis':'monthly'});r['flags']+=['currency-unidentified','all-resources-unpublished'];r['original_wording']=products('51-servervds')[0].get_text(' ',strip=True)
# Additional Azardata Iran families reached from linked landing pages.
for k,config,variant in [('63-azardata',[(3,6,60,2599000),(4,8,80,3450000),(6,16,160,6799000),(8,32,320,11598000)],'gitlab-on-vps'),('67-azardata',[(1,2,20,1299000),(2,4,30,1799000),(4,8,80,2999000),(8,16,160,5825000)],'managed-vps'),('66-azardata',[(1,2,300,1290000),(2,4,500,1799000),(3,6,800,2599000),(4,8,1000,4650000),(6,12,2000,7799000),(8,16,4000,12399000)],'storage-vps')]:
 for i,(c,ram,d,p) in enumerate(config,1):
  r=add(k,f'{variant} پلن {i}',c,ram,d,None if variant=='storage-vps' else 'NVMe',p,'ترافیک نامحدود منصفانه',service_variant=variant)
  r['fee_ip_uncertainty_facts']+=['Dedicated IP included; fair-use threshold and tax unspecified; port 1Gb/s.']
  if variant=='storage-vps':
   r['flags']+=['storage-interface-only','published-full-capacity'];r['original_labels']['disk']=f'{d}GB SAS' if d<1000 else f'{d//1000}TB SAS';r['disposition']='excluded-explicitly-unavailable';r['availability_wording']='ظرفیت تکمیل'
# Missing disk capacity unit on legacy VDS cards cannot silently become GB.
for r in rows:
 if r['provider']=='servervds' and r.get('original_wording') and r.get('disk_gb') is not None:
  dm=re.search(r'(\d+)\s*(TB|GB|GIG)?\s+(NV[Mm][Ee]|SSD|SAS|SATA)',r['original_wording'])
  if dm and not dm[2]:
   r['disk_gb']=None;r['flags']+=['disk-capacity-unit-unpublished'];r['fee_ip_uncertainty_facts']+=['Numeric disk label lacks GB/TB; raw label retained, no invented unit.']
   if r['disposition']=='new-reviewable':r['disposition']='gap-incomplete-resources'
# Reviewed follow-on aliases and remaining offers.
for r in rows:
 if r['source']['key']=='01-liara':r['additional_sources'] += [source('79-liara'),source('80-liara')]
 if r['source']['key']=='28-negarnovin':r['additional_sources'] += [source(k) for k in ['71-negarnovin','72-negarnovin','86-negarnovin']]
 if r['source']['key']=='34-webdade':
  if r['storage_type']=='NVMe':r['additional_sources']=[source('74-webdade')]
  r['fee_ip_uncertainty_facts']+=['Linked general VPS page explicitly states no VAT added and final public base price; metered traffic remains separate.']
 if r['source']['key']=='57-webdade':r['additional_sources']=[source('74-webdade')];r['fee_ip_uncertainty_facts']+=['Public store category returned no products; it does not resolve missing disk size.']
for i,(c,ram,d,p,t,pid) in enumerate([(2,3,50,800000,200,49),(3,4,60,750000,300,50),(4,6,70,999000,400,134),(5,8,80,1100000,500,156),(8,10,90,1450000,600,157)],3):
 r=add('69-iranica',f'گیم سرور پلن {i}',c,ram,d,None,p,f'{t} گیگابایت ترافیک ماهانه',product_identity=f'pid={pid}',disposition='gap-iran-location-unconfirmed')
 r['flags']+=['iran-location-not-attested-for-game-family','media-unpublished'];r['fee_ip_uncertainty_facts']+=['Max 4 IP means maximum count, not four included. Location absent from game plan evidence; do not borrow Iran label from navigation.','Same resources as some Iran VPS rows do not mean same SKU: linked product IDs differ.']
auction=[(5,8,35,2500000,3,66606),(5,8,40,2550000,3,66605),(6,8,60,2800000,3,66603),(6,8,90,2950000,3,89493),(6,10,70,3156000,3,89495),(7,10,60,3500000,4,66602),(5,12,40,3800000,5,66607),(7,10,90,4000000,6,89492),(6,12,60,4200000,8,66604),(6,12,80,4300000,8,89494)]
for c,ram,d,p,t,pid in auction:
 r=add('77-mihanwebhost',f'حراج سرور مجازی / pid={pid}',c,ram,d,'SSD',p,f'{t} ترابایت',billing_wording='هزینه ماهیانه؛ تخفیف مادام العمر و تمدید با همان هزینه',product_identity=f'pid={pid}',service_variant='auction-vps')
 r['flags']+=['name-is-review-label-provider-unnamed'];r['fee_ip_uncertainty_facts']+=['Country column image alt/title ایران; own Iranian datacenter specified in details.','50GB external backup space included; backup operation customer responsibility. Migration beyond one site may cost extra after assessment. IP/license/tax inclusion unspecified.']
# Public computed default quotes already in catalog: preserve native basis, never invent month.
for basis,amount,ident in [('hour',1204,'webdade-iran-default-1c-1g-20g-hour'),('day',28886,'webdade-iran-default-1c-1g-20g-day')]:
 r=add('75-webdade','پروژه ابری ایران / default',1,1,20,None,None,'Only inbound server traffic charged; outbound free; Iran 1000 toman/GB',published_tariff={'amount':amount,'currency':'toman','basis':basis},billing_wording='۱٬۲۰۴ یک ساعت / ۲۸٬۸۸۶ یک روز؛ مبلغ‌ها به تومان',additional_sources=[source('83-webdade')]);duplicate(r,ident);r['flags']+=['native-hourly-unranked-no-monthly-reference'];r['fee_ip_uncertainty_facts']+=['One IPv4 in displayed calculation. Resource rates hourly: 400/core, 409.6/GB RAM, 6/GB disk, 274/IPv4; rounded display retained as published.','50,000 credit for Iran, 50,000 for foreign project; expires after seven days, not a recurring discount.']
r=add('07-irvm','منابع دلخواه / پیکربندی پیش‌فرض',1,1,10,'HDD',636000,'ترافیک ماهانه ۱۰۰ گیگابایت',region='respina',service_variant='custom-preset',billing_wording='۶۳۶,۰۰۰ تومان / ماه؛ قیمت تخمینی و مبلغ نهایی هنگام ثبت سفارش')
r['flags']+=['estimated-public-configurator-reference','not-a-final-quote'];r['fee_ip_uncertainty_facts']+=['Preset shows 1 IPv4 and 0 IPv6; included component rates sum to published 636000: CPU 230000 + RAM 100000 + disk 21000 + traffic 85000 + IPv4 200000.','Configurator permits hourly or periodic billing; only numeric published monthly estimate is retained. No cart action taken.']
# Record resource matches as candidates only; matching resources are not evidence of SKU identity.
for r in rows:
 r['catalog_resource_match_candidates']=[p['id'] for p in plans if p['provider']==r['provider'] and p.get('cpu_count')==r['cpu'] and p.get('ram_gb')==r['ram_gb'] and p.get('disk_gb')==r['disk_gb']]
 r['monthly_reference_toman']=r['monthly_toman']
 if r['disposition'].startswith('gap') or r['disposition'].startswith('excluded'):
  r['admission_recommendation']='retain evidence; do not automatically admit/rank'
 elif r['catalog_duplicate_ids']:r['admission_recommendation']='map/update evidence of existing identity; no new offer'
 else:r['admission_recommendation']='root review for admission, preserving all flags and billing wording'
# Write after manually checking source-specific fields; no catalog mutation.
out={'status':'reviewed-linked-family-audit-for-root-admission','catalog_baseline_count':len(plans),'catalog_baseline_sha256':hashlib.sha256(C.read_bytes()).hexdigest(),'units':'MB/1000 decimal; TB*1000. Published GB retained; no GB/GiB equivalence. SATA/SAS interface alone -> null media.','monthly_price_rule':'Only published monthly numeric references; no hourly/native-USD conversion. Null fields remain unknown. Duplicate rows retained for mapping, not admission.','offers':rows}
(D/'normalized-offers.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n')
print('rows',len(rows));from collections import Counter
print(Counter(x['disposition'] for x in rows));print(Counter(x['provider'] for x in rows))
