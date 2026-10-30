import concurrent.futures, datetime, hashlib, json, pathlib, re, sys
import urllib.request, urllib.parse, urllib.error, subprocess
from html.parser import HTMLParser
class Parser(HTMLParser):
    def __init__(self): super().__init__(); self.text=[]; self.links=[]; self.skip=0
    def handle_starttag(self,tag,attrs):
        if tag in ['script','style','noscript']: self.skip+=1
        if tag=='a':
            href=dict(attrs).get('href')
            if href: self.links.append({'text':'','url':href})
    def handle_endtag(self,tag):
        if tag in ['script','style','noscript']: self.skip=max(0,self.skip-1)
    def handle_data(self,data):
        if not self.skip and data.strip(): self.text.append(data.strip())
ROOT=pathlib.Path(__file__).parent
def capture(url):
    key=re.sub(r'[^a-zA-Z0-9.-]+','_',url.removeprefix('https://').removeprefix('http://')).strip('_')[:180]
    meta={'url':url,'attempted_at':datetime.datetime.now(datetime.timezone.utc).isoformat()}
    try:
        res=subprocess.run(['curl','-L','--max-time','40','-sS','-D',str(ROOT/(key+'.headers.txt')),'-o',str(ROOT/(key+'.html')),'-w','%{http_code}\n%{url_effective}',url],capture_output=True)
        parts=res.stdout.decode().splitlines(); status=int(parts[0]) if parts else 0
        raw=(ROOT/(key+'.html')).read_bytes() if (ROOT/(key+'.html')).exists() else b''
        (ROOT/(key+'.html')).write_bytes(raw)
        soup=Parser(); soup.feed(raw.decode('utf-8',errors='replace'))
        links=[{'text':a['text'],'url':urllib.parse.urljoin(url,a['url'])} for a in soup.links]
        (ROOT/(key+'.txt')).write_text('\n'.join(soup.text))
        (ROOT/(key+'.links.json')).write_text(json.dumps(links,ensure_ascii=False,indent=2))
        meta.update(status=status,final_url=parts[1] if len(parts)>1 else url,curl_exit=res.returncode,error=res.stderr.decode(),sha256=hashlib.sha256(raw).hexdigest(),bytes=len(raw),snapshot=key+'.html',text=key+'.txt')
    except Exception as e: meta['error']=repr(e)
    (ROOT/(key+'.meta.json')).write_text(json.dumps(meta,ensure_ascii=False,indent=2))
    return {k:v for k,v in meta.items() if k!='headers'}
if __name__=='__main__':
    with concurrent.futures.ThreadPoolExecutor(max_workers=10) as pool:
        for result in pool.map(capture,sys.argv[1:]): print(json.dumps(result,ensure_ascii=False))
