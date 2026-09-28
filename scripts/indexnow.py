# -*- coding: utf-8 -*-
"""IndexNow 알림 — 바뀐 페이지 주소를 검색엔진(빙·네이버·얀덱스 등)에 바로 알린다.

IndexNow 는 '우리 사이트 여기가 바뀌었어요' 하고 검색엔진에 먼저 연락하는 공용 규칙이다.
한 곳(api.indexnow.org)에 보내면 참여 검색엔진들이 서로 나눠 받는다. 구글은 참여하지 않는다.

키는 비밀이 아니다(사이트에 공개 파일로 둬야 소유 확인이 된다): web/public/<KEY>.txt

사용법
  python scripts/indexnow.py --changed <이전커밋> <새커밋>   # 두 커밋 사이 바뀐 가이드·페이지 글
  python scripts/indexnow.py --urls https://lowstamp.com/ko/guide/x ...
  python scripts/indexnow.py --sitemap                       # 사이트맵 전체(새 주소를 한꺼번에 알릴 때만)
"""
import json, re, subprocess, sys, urllib.request, urllib.error

HOST = "lowstamp.com"
SITE = "https://" + HOST
KEY = "315725e33ea95956107968f9ce2ba373"
ENDPOINT = "https://api.indexnow.org/indexnow"
# 파이썬 기본 이름(Python-urllib)은 Cloudflare 가 막는다(403) — 이름표를 달아 보낸다.
UA = {"User-Agent": "LowstampIndexNow/1.0 (+https://lowstamp.com)"}
PREFIX_LANGS = ["ko", "ja", "zh", "es", "pt"]  # 영어는 접두어 없는 기존 주소(functions/_shared/langPath.js 와 같게)


def variants(base):
    """기본 경로 하나 → 6개 언어 주소. 예: /guide/x → /guide/x, /ko/guide/x, ..."""
    out = [SITE + base]
    for l in PREFIX_LANGS:
        out.append(SITE + (f"/{l}/" if base == "/" else f"/{l}{base}"))
    return out


def changed_urls(before, after):
    if not before or set(before) == {"0"}:
        before = after + "~1"
    try:
        names = subprocess.check_output(["git", "diff", "--name-only", "--diff-filter=AM", before, after], text=True).split()
    except subprocess.CalledProcessError:
        names = subprocess.check_output(["git", "diff", "--name-only", "--diff-filter=AM", after + "~1", after], text=True).split()
    bases = set()
    for n in names:
        m = re.match(r"web/src/content/guides/[a-z]{2}/([a-z0-9-]+)\.js$", n)
        if m:
            bases.add("/guide/" + m.group(1))
            bases.add("/guide")  # 목록 페이지에도 제목·설명이 보이므로
            continue
        m = re.match(r"web/src/content/pages/[a-z]{2}/([a-z0-9-]+)\.js$", n)
        if m:
            bases.add("/" + m.group(1))
    urls = []
    for b in sorted(bases):
        urls += variants(b)
    return urls


def sitemap_urls():
    with urllib.request.urlopen(urllib.request.Request(SITE + "/sitemap.xml", headers=UA), timeout=30) as r:
        return re.findall(r"<loc>([^<]+)</loc>", r.read().decode("utf-8"))


def submit(urls):
    urls = [u for u in dict.fromkeys(urls) if u.startswith(SITE + "/")]
    if not urls:
        print("알릴 주소 없음")
        return 0
    for i in range(0, len(urls), 10000):  # 한 번에 1만 개까지
        chunk = urls[i:i + 10000]
        body = json.dumps({"host": HOST, "key": KEY, "keyLocation": f"{SITE}/{KEY}.txt", "urlList": chunk}).encode("utf-8")
        req = urllib.request.Request(ENDPOINT, data=body, headers={"Content-Type": "application/json; charset=utf-8", **UA})
        try:
            with urllib.request.urlopen(req, timeout=30) as r:
                print(f"IndexNow {r.status}: {len(chunk)}개 알림")
        except urllib.error.HTTPError as e:
            # 200·202 = 접수, 403 = 키 확인 실패, 422 = 주소가 이 사이트 것이 아님, 429 = 너무 자주 보냄
            print(f"IndexNow 실패 {e.code}: {e.read().decode('utf-8', 'replace')[:300]}")
            return 1
    for u in urls[:20]:
        print("  " + u)
    if len(urls) > 20:
        print(f"  … 외 {len(urls) - 20}개")
    return 0


if __name__ == "__main__":
    a = sys.argv[1:]
    if a[:1] == ["--changed"] and len(a) >= 3:
        sys.exit(submit(changed_urls(a[1], a[2])))
    if a[:1] == ["--urls"]:
        sys.exit(submit(a[1:]))
    if a[:1] == ["--sitemap"]:
        sys.exit(submit(sitemap_urls()))
    print(__doc__)
    sys.exit(2)
