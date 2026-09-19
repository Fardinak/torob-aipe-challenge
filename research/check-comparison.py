"""Reproduce gate arithmetic; conditional subtotals are not checkout quotes."""
import json
from pathlib import Path
from decimal import Decimal
root = Path(__file__).resolve().parent
data = json.loads((root / 'vps-comparison-data.json').read_text())
plans = data['plans']
cheapest = min(plans, key=lambda p: p['advertised_monthly_toman'])
qualified = [p for p in plans if p['ram_gb'] >= 4]
a = min((p for p in qualified if p['provider'] == 'manageit'), key=lambda p: p['advertised_monthly_toman'])
b = min((p for p in qualified if p['provider'] == 'iranserver'), key=lambda p: p['advertised_monthly_toman'])
base = a['advertised_monthly_toman']
rate = data['providers']['manageit']['traffic_original_labels']['download_toman_per_gb']
ip = data['providers']['manageit']['optional_independent_floating_ipv4_monthly_toman']
print(f"Catalog: {len(plans)} plans; cheapest advertised base: {cheapest['id']} = {cheapest['advertised_monthly_toman']:,} toman")
print(f"4 GB minimum: ManageIT {base:,}; IranServer {b['advertised_monthly_toman']:,} toman")
print(f"Conditional 1,000 billable GB: {base:,} + 1,000 × {rate:,} = {base + 1000 * rate:,}")
print(f"Conditional IranServer advantage if its allowance covers that usage: {base + 1000 * rate - b['advertised_monthly_toman']:,}")
print(f"Conditional crossover: {Decimal(b['advertised_monthly_toman'] - base) / Decimal(rate):.4f} billable GB")
print(f"Conditional 100 billable GB + optional floating IPv4: {base:,} + {100 * rate:,} + {ip:,} = {base + 100 * rate + ip:,}")
print('Strict 1,000 GB server-egress eligibility: unknown for both providers; no confirmed winner.')
