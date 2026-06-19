#!/usr/bin/env python3
# ============================================================
#  겜값 — 수집 직원 (CheapShark 할인 명단 + 스팀 가격)
#  매일: ① CheapShark에서 '지금 스팀 할인 중인 게임' 명단을 좋은 순으로 받고
#       ② 그 게임들(+ 기존 추적분)의 가격을 스팀에 직접 물어
#       ③ 값이 바뀐 것만 D1 장부에 쌓고 역대 최저가도 갱신.
#  seed_appids.txt 는 이제 안 씁니다(지워도 됩니다).
# ============================================================
import os, re, json, time, datetime, urllib.request, urllib.parse

CF_ACCOUNT = os.environ["CF_ACCOUNT_ID"]
CF_DB      = os.environ["CF_DATABASE_ID"]
CF_TOKEN   = os.environ["CF_API_TOKEN"]
D1_URL = f"https://api.cloudflare.com/client/v4/accounts/{CF_ACCOUNT}/d1/database/{CF_DB}/query"

# ---- 튜닝값(원하면 숫자만 바꾸세요) ----
TARGET_DEALS = 1500   # CheapShark에서 받아올 할인 게임 수(좋은 순 위에서부터)
MAX_TOTAL    = 3000   # 하루에 스팀에 물어볼 최대 게임 수(기존 추적분 포함)
SORT_BY      = "Deal Rating"  # 'Savings'(할인율순) 또는 'Reviews'(인기순)로 바꿔도 됨

# 한국(cc=kr) 외 추가로 수집할 지역. 늘릴수록 크롤 시간↑(나라당 ≈ 게임수 × 0.7초).
#  - 한국은 기존 games/price_history 에 그대로, 여기 나라들은 region_prices/region_price_history 에 저장.
#  - 가격은 스팀 원시 정수(×100) 그대로 저장(표기는 Worker/프런트에서 /100 + 통화 포맷).
REGIONS = [
    {"cc": "us", "l": "english"},   # 영어 → 미국 달러(USD)
    {"cc": "jp", "l": "japanese"},  # 일본어 → 엔(JPY)
    {"cc": "cn", "l": "schinese"},  # 중국어 간체 → 위안(CNY)
    {"cc": "es", "l": "spanish"},   # 스페인어 → 유로(EUR, 스페인)
    {"cc": "br", "l": "brazilian"}, # 포르투갈어 → 헤알(BRL, 브라질)
]

# 지역 가격은 게임당 지역 수만큼 스팀에 더 묻는다(나라당 ≈ 0.7초).
# 전체(MAX_TOTAL)에 다 걸면 GitHub Actions 2시간 제한을 넘기므로,
# '좋은 순' 앞쪽 REGION_MAX개 게임에만 해외 가격을 모은다(한국 원화는 전부 모음).
# 크롤이 시간 안에 여유 있게 끝나면 이 숫자를 올려도 된다.
REGION_MAX = 900

# 스팀 가격 정수는 보통 1/100 단위(예: 1099=$10.99).
#  ★ 첫 실행 때 [샘플] 줄을 보고 원화가 실제보다 100배 크면 100, 딱 맞으면 1로.
PRICE_DIVISOR = 100

# 스팀 '종합 평가'(리뷰 등급/개수) 수집 튜닝값.
REVIEW_REFRESH_DAYS = 7   # 리뷰는 자주 안 바뀌니 7일에 한 번만 갱신
REVIEW_MAX = 1000         # 한 실행에서 리뷰를 새로 받을 최대 게임 수(스팀 호출 제한 보호)

# 스팀 호출 사이 대기(초). D1 일괄 선로드+batch로 호출 간격이 줄어든 만큼,
# 5분 200회 제한을 자체적으로 안전하게 지키도록 0.7→1.0으로 올림.
# 로그에 429/조회실패가 잦으면 이 숫자만 더 올리세요.
STEAM_SLEEP = 1.0
TODAY = datetime.datetime.utcnow().strftime("%Y-%m-%d")
NOW   = datetime.datetime.utcnow().strftime("%Y-%m-%d %H:%M")


def d1(sql, params=None):
    body = json.dumps({"sql": sql, "params": params or []}).encode()
    req = urllib.request.Request(
        D1_URL, data=body, method="POST",
        headers={"Authorization": f"Bearer {CF_TOKEN}", "Content-Type": "application/json"},
    )
    with urllib.request.urlopen(req, timeout=30) as r:
        out = json.loads(r.read())
    if not out.get("success"):
        raise RuntimeError(out)
    return out["result"][0]["results"]


# D1 REST의 배치 형식: {"batch":[{"sql":..,"params":[..]}, ..]} —
# 각 문장이 자기 sql과 자기 params를 들고 있어 바인딩이 명확하다(';'로 이은
# 단일 문자열 + 평평한 params 한 벌은 매핑이 정의돼 있지 않아 쓰지 않는다).
# 라운드트립을 줄이려고 한 게임/지역의 쓰기(upsert + 변동 시 history)를 한 번에 보낸다.
# 오류 처리: 배치 중 한 문장이라도 실패하면 즉시 RuntimeError로 중단한다(d1()과 동일한 fail-fast).
#  - D1 배치의 원자성(전부 성공/전부 롤백) 보장 여부는 REST 문서가 명확하지 않아 '의존하지 않는다'.
#  - 대신 한 게임의 쓰기는 [upsert, (변동 시) history] 둘뿐이고 upsert는 ON CONFLICT라,
#    실패로 멈춰도 다음 정기 실행이 '커밋된 현재가' 기준으로 다시 비교해 이어서 복구한다.
# 응답 result는 보낸 순서대로 문장당 1개씩 온다.
D1_BATCH_MAX = 50   # 한 요청에 담을 문장 수(1000/배치 가이드보다 넉넉히 아래)


def d1_batch(statements):
    """[{"sql":.., "params":[..]}, ..] 묶음을 D1 배치로 보낸다. 50개씩 끊어서.
    문장당 최대 100 파라미터·100KB 제한이 있으나, 여기 upsert는 컬럼 ~11개라 여유."""
    for start in range(0, len(statements), D1_BATCH_MAX):
        chunk = statements[start:start + D1_BATCH_MAX]
        body = json.dumps({"batch": chunk}).encode()
        req = urllib.request.Request(
            D1_URL, data=body, method="POST",
            headers={"Authorization": f"Bearer {CF_TOKEN}", "Content-Type": "application/json"},
        )
        with urllib.request.urlopen(req, timeout=30) as r:
            out = json.loads(r.read())
        # 요청 전체 성공 여부 + 문장별 성공 여부 둘 다 확인(fail-fast).
        if not out.get("success"):
            raise RuntimeError(out)
        for res in out.get("result", []):
            if not res.get("success", True):
                raise RuntimeError(out)


def cheapshark_deals(target):
    """지금 스팀에서 할인 중인 게임의 스팀 번호를 좋은 순으로 받아옴."""
    appids, seen, page = [], set(), 0
    while len(appids) < target and page < 60:   # 안전상 최대 60페이지(=3600개)
        params = urllib.parse.urlencode({
            "storeID": "1",        # 1 = 스팀
            "onSale": 1,           # 할인 중인 것만
            "sortBy": SORT_BY,
            "desc": 1,
            "pageSize": 60,        # CheapShark 한 페이지 최대치
            "pageNumber": page,
        })
        url = "https://www.cheapshark.com/api/1.0/deals?" + params
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (gamgap)"})
        try:
            with urllib.request.urlopen(req, timeout=20) as r:
                rows = json.loads(r.read())
        except Exception as e:
            print("  ! CheapShark 페이지 실패", page, e)
            break
        if not rows:
            break
        for deal in rows:
            sid = deal.get("steamAppID")
            if sid and sid not in seen:
                seen.add(sid)
                appids.append(int(sid))
        if len(rows) < 60:   # 마지막 페이지
            break
        page += 1
        time.sleep(0.3)
    return appids[:target]


# 우리가 지원하는 6개 UI 언어를 한국어(l=koreana) supported_languages 문자열에서 부분일치로 감지.
# 키 순서가 곧 langs 컬럼의 고정 출력 순서(ko,en,ja,zh,es,pt)다.
LANG_TOKENS = [
    ("ko", "한국어"),
    ("en", "영어"),
    ("ja", "일본어"),
    ("zh", "중국어"),
    ("es", "스페인어"),
    ("pt", "포르투갈어"),
]


def extract_meta(d):
    """가격을 묻는 같은 appdetails 응답(d=data 노드)에서 '언어 중립' 메타데이터를 뽑는다.
    추가 네트워크 호출 없음. 없는 키는 .get 기본값으로 안전하게 처리."""
    # 개발사(첫 번째만)
    developer = (d.get("developers") or [""])[0] or ""

    # 출시연도: release_date.date 문자열에서 첫 4자리 숫자(예: "2020년 12월 10일" → 2020)
    rd = (d.get("release_date") or {}).get("date", "") or ""
    ym = re.search(r"\d{4}", rd)
    release_year = int(ym.group()) if ym else 0

    # 메타크리틱 점수(없으면 0)
    metacritic = int((d.get("metacritic") or {}).get("score") or 0)

    # 컨트롤러 지원: full(완전) / partial(부분) / "" (없음)
    controller = ""
    if d.get("controller_support") == "full":
        controller = "full"
    else:
        for c in d.get("categories", []) or []:
            desc = str(c.get("description", ""))
            if c.get("id") == 18 or ("부분" in desc and "컨트롤러" in desc) or ("Partial Controller" in desc):
                controller = "partial"
                break

    # 플랫폼: platforms dict에서 true인 것만 win/mac/linux로 매핑
    plat = d.get("platforms") or {}
    platforms = ",".join(
        code for key, code in (("windows", "win"), ("mac", "mac"), ("linux", "linux"))
        if plat.get(key)
    )

    # DLC 개수
    dlc_count = len(d.get("dlc", []) or [])

    # 지원 언어: 한국어 명칭(l=koreana)을 부분일치로 우리 6개 감지 → 고정 순서로 코드 결합
    sl = d.get("supported_languages", "") or ""
    langs = ",".join(code for code, token in LANG_TOKENS if token in sl)

    # 총 지원 언어 수: HTML 태그 제거 + "<br>" 뒤(주석) 잘라내고 쉼표로 split해 비지 않은 항목 수
    head = re.split(r"<br\s*/?>", sl, maxsplit=1)[0]
    head = re.sub(r"<[^>]+>", "", head)
    lang_count = sum(1 for part in head.split(",") if part.strip()) if head.strip() else 0

    return {
        "developer":    developer,
        "release_year": release_year,
        "metacritic":   metacritic,
        "controller":   controller,
        "platforms":    platforms,
        "dlc_count":    dlc_count,
        "langs":        langs,
        "lang_count":   lang_count,
    }


def steam_fetch(appid):
    url = f"https://store.steampowered.com/api/appdetails?appids={appid}&cc=kr&l=koreana"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (gamgap)"})
    with urllib.request.urlopen(req, timeout=20) as r:
        data = json.loads(r.read())
    node = data.get(str(appid), {})
    if not node.get("success"):
        return None
    d = node.get("data", {})
    po = d.get("price_overview")
    if not po:
        return None
    # 장르: appdetails가 주는 한국어 장르명을 쉼표로 이어 저장(예: "액션,RPG,어드벤처").
    # 가격을 묻는 김에 같은 응답에서 뽑으므로 추가 호출이 없다.
    genres = ",".join(
        g.get("description", "").strip()
        for g in d.get("genres", []) if g.get("description")
    )
    out = {
        "name":     d.get("name", f"appid-{appid}"),
        "normal":   po["initial"] // PRICE_DIVISOR,
        "current":  po["final"]   // PRICE_DIVISOR,
        "discount": po.get("discount_percent", 0),
        "genres":   genres,
    }
    # 같은 응답에서 '언어 중립' 메타데이터도 함께 뽑아 합친다(추가 호출 없음).
    out.update(extract_meta(d))
    return out


def steam_fetch_region(appid, cc, lang):
    """한국 외 지역(cc)의 가격을 스팀에서 받는다. 가격은 원시 정수(×100) 그대로 반환."""
    url = f"https://store.steampowered.com/api/appdetails?appids={appid}&cc={cc}&l={lang}"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (gamgap)"})
    with urllib.request.urlopen(req, timeout=20) as r:
        data = json.loads(r.read())
    node = data.get(str(appid), {})
    if not node.get("success"):
        return None
    d = node.get("data", {})
    po = d.get("price_overview")
    if not po:
        return None
    return {
        "name":     d.get("name", ""),          # 해당 지역 언어 게임명(예: 영어명)
        "currency": po.get("currency", ""),      # 'USD' 등
        "normal":   po["initial"],               # 원시 ×100 (÷100 안 함)
        "current":  po["final"],
        "discount": po.get("discount_percent", 0),
    }


def steam_fetch_reviews(appid):
    """스팀 '종합 평가' 요약만 받는다(appdetails와는 별개 엔드포인트).
    num_per_page=0 으로 리뷰 본문은 안 받아 페이로드를 최소화한다.
    review_score_desc 는 영어 표준 문구로 저장(프런트가 i18n 라벨로 매핑).
    유효한 평가가 있을 때만 {"desc":..,"total":..} 반환, 아니면 None.
    호출 실패는 호출부 try/except가 처리(여기선 raise되게 둠)."""
    url = (f"https://store.steampowered.com/appreviews/{appid}"
           "?json=1&language=all&purchase_type=all&num_per_page=0&l=english")
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (gamgap)"})
    with urllib.request.urlopen(req, timeout=20) as r:
        data = json.loads(r.read())
    if data.get("success") != 1:
        return None
    qs = data.get("query_summary") or {}
    desc = (qs.get("review_score_desc") or "").strip()
    total = int(qs.get("total_reviews") or 0)
    if total <= 0 or desc in ("", "No user reviews"):
        return None
    return {"desc": desc, "total": total}


def main():
    deal_ids = cheapshark_deals(TARGET_DEALS)
    print(f"CheapShark 할인 게임 {len(deal_ids)}개 수신")

    # 기존에 추적하던 게임도 함께 갱신(오래 안 본 것부터 우선)
    existing = [r["appid"] for r in d1("SELECT appid FROM games ORDER BY last_checked ASC")]

    # 할인 게임 먼저, 그다음 기존 게임으로 채우되 최대 MAX_TOTAL개
    to_check, seen = [], set()
    for aid in deal_ids + existing:
        if aid not in seen:
            seen.add(aid)
            to_check.append(aid)
        if len(to_check) >= MAX_TOTAL:
            break
    print(f"오늘 가격 확인할 게임 {len(to_check)}개 (할인 {len(deal_ids)} + 기존 {len(existing)})")

    # ---- 일괄 선로드(bulk preload): 게임별 SELECT를 매번 보내는 대신
    # 한국 games / region_prices 의 직전 상태를 단 두 번의 쿼리로 메모리에 올린다.
    # 이 dict들은 '이번 실행 시작 전(committed)' 값이며 루프 중에는 갱신하지 않으므로,
    # 각 게임의 change-only/ATL 계산이 자기 자신의 이번-실행 쓰기를 보지 않는다
    # (read-before-write 의존성 유지). 없는 키는 None → 신규로 취급(기존 [] 케이스와 동일).
    games_prev = {}   # appid -> {"current_price":.., "all_time_low":.., "reviews_checked":..}
    for r in d1("SELECT appid, current_price, all_time_low, reviews_checked FROM games"):
        games_prev[r["appid"]] = r
    region_prev = {}  # (appid, cc) -> {"current_price":.., "all_time_low":..}
    for r in d1("SELECT appid, cc, current_price, all_time_low FROM region_prices"):
        region_prev[(r["appid"], r["cc"])] = r

    d1("UPDATE games SET is_low_today = 0")  # 하루 시작: '오늘 최저' 초기화
    for reg in REGIONS:
        d1("UPDATE region_prices SET is_low_today = 0 WHERE cc=?", [reg["cc"]])

    # 리뷰는 7일에 한 번만(REVIEW_REFRESH_DAYS), 한 실행에서 REVIEW_MAX개까지만 새로 받아
    # 스팀 호출 제한을 보호한다. cutoff보다 오래됐거나(또는 한 번도 안 받은) 게임만 갱신 대상.
    cutoff_date = (datetime.datetime.utcnow()
                   - datetime.timedelta(days=REVIEW_REFRESH_DAYS)).strftime("%Y-%m-%d")
    reviews_fetched_count = 0

    changed = 0
    for i, appid in enumerate(to_check):
        try:
            p = steam_fetch(appid)
        except Exception as e:
            print("  ! 조회 실패", appid, e)
            time.sleep(1.0)
            continue
        if not p:
            time.sleep(STEAM_SLEEP)
            continue

        if i == 0:
            print(f"  [샘플] {p['name']} 정가 {p['normal']} / 현재 {p['current']} "
                  f"(단위 확인: 100배면 PRICE_DIVISOR=100, 딱 맞으면 1)")

        # 선로드 dict에서 직전 상태를 읽음(없으면 None → 신규, 기존 [] 케이스와 동일)
        prev = games_prev.get(appid)
        prev_price = prev["current_price"] if prev else None
        prev_low   = prev["all_time_low"]  if prev else None

        new_low = p["current"] if prev_low is None else min(prev_low, p["current"])
        low_date = TODAY if (prev_low is None or p["current"] < prev_low) else ""
        is_low_today = 1 if p["current"] <= new_low else 0

        # ---- 스팀 '종합 평가'(리뷰 등급/개수)를 드물게 갱신 ----
        # 한 번도 안 받았거나(last 없음) cutoff보다 오래된 게임만, 그리고 이번 실행에서
        # REVIEW_MAX개까지만 새로 받는다. 받으면 rdesc/rtotal/rchecked 채움, 아니면 빈값
        #  → 아래 ON CONFLICT가 빈값을 '갱신 안 함'(기존 값 보존)으로 처리한다.
        last = prev.get("reviews_checked") if prev else None
        stale = (not last) or (last <= cutoff_date)
        fetch_reviews = stale and (reviews_fetched_count < REVIEW_MAX)
        rdesc, rtotal, rchecked = "", 0, ""
        if fetch_reviews:
            # 상한은 '시도' 기준으로 센다 — 리뷰 없는 게임(흔함)도 호출은 1회 일어나므로,
            # 성공만 세면 상한이 안 걸려 첫 실행에 수천 번 호출될 수 있다.
            reviews_fetched_count += 1
            try:
                rv = steam_fetch_reviews(appid)
            except Exception as e:
                print("  ! 리뷰 조회 실패", appid, e)
                rv = None
            if rv:
                rdesc, rtotal, rchecked = rv["desc"], rv["total"], TODAY
            time.sleep(STEAM_SLEEP)  # 리뷰는 추가 스팀 호출 → 천천히

        # 이 게임의 쓰기(upsert + 변동 시 history)를 한 배치로 묶어 라운드트립을 줄인다.
        batch = [{
            "sql":
            """INSERT INTO games
                 (appid,name,normal_price,current_price,discount_percent,
                  all_time_low,all_time_low_date,is_low_today,last_checked,genres,
                  developer,release_year,metacritic,controller,platforms,dlc_count,langs,lang_count,
                  review_desc,review_total,reviews_checked)
               VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
               ON CONFLICT(appid) DO UPDATE SET
                 name=excluded.name,
                 normal_price=excluded.normal_price,
                 current_price=excluded.current_price,
                 discount_percent=excluded.discount_percent,
                 all_time_low=excluded.all_time_low,
                 all_time_low_date=COALESCE(NULLIF(excluded.all_time_low_date,''), games.all_time_low_date),
                 is_low_today=excluded.is_low_today,
                 last_checked=excluded.last_checked,
                 genres=COALESCE(NULLIF(excluded.genres,''), games.genres),
                 developer=excluded.developer,
                 release_year=excluded.release_year,
                 metacritic=excluded.metacritic,
                 controller=excluded.controller,
                 platforms=excluded.platforms,
                 dlc_count=excluded.dlc_count,
                 langs=excluded.langs,
                 lang_count=excluded.lang_count,
                 review_desc    = COALESCE(NULLIF(excluded.review_desc,''), games.review_desc),
                 reviews_checked= COALESCE(NULLIF(excluded.reviews_checked,''), games.reviews_checked),
                 review_total   = CASE WHEN excluded.reviews_checked <> '' THEN excluded.review_total ELSE games.review_total END""",
            "params":
            [appid, p["name"], p["normal"], p["current"], p["discount"],
             new_low, low_date, is_low_today, NOW, p["genres"],
             p["developer"], p["release_year"], p["metacritic"], p["controller"],
             p["platforms"], p["dlc_count"], p["langs"], p["lang_count"],
             rdesc, rtotal, rchecked],
        }]

        # change-only: 가격이 바뀌었거나 신규일 때만 history 적재(+ changed 카운트)
        if prev_price is None or prev_price != p["current"]:
            batch.append({
                "sql": "INSERT INTO price_history (appid,price,discount_percent,recorded_at) VALUES (?,?,?,?)",
                "params": [appid, p["current"], p["discount"], TODAY],
            })
            changed += 1

        d1_batch(batch)

        # ---- 한국 외 지역(미국·일본 등) 가격 수집 → region_prices/region_price_history ----
        # 좋은 순 앞쪽 REGION_MAX개 게임에만 모아 크롤 시간을 제한 안에 둔다.
        # 실패해도 한국 수집 흐름은 멈추지 않게 try/except.
        for reg in (REGIONS if i < REGION_MAX else []):
            cc = reg["cc"]
            try:
                rp = steam_fetch_region(appid, cc, reg["l"])
            except Exception as e:
                print(f"  ! [{cc}] 조회 실패", appid, e)
                time.sleep(STEAM_SLEEP)
                continue
            if not rp:
                time.sleep(STEAM_SLEEP)
                continue

            # 선로드 dict에서 (appid,cc) 직전 상태를 읽음(없으면 None → 신규)
            rprev = region_prev.get((appid, cc))
            r_prev_price = rprev["current_price"] if rprev else None
            r_prev_low   = rprev["all_time_low"]  if rprev else None
            r_new_low = rp["current"] if r_prev_low is None else min(r_prev_low, rp["current"])
            r_low_date = TODAY if (r_prev_low is None or rp["current"] < r_prev_low) else ""
            r_is_low_today = 1 if rp["current"] <= r_new_low else 0

            # 이 지역의 쓰기(upsert + 변동 시 history)를 한 배치로 묶어 보낸다.
            rbatch = [{
                "sql":
                """INSERT INTO region_prices
                     (appid,cc,name,currency,normal_price,current_price,discount_percent,
                      all_time_low,all_time_low_date,is_low_today,last_checked)
                   VALUES (?,?,?,?,?,?,?,?,?,?,?)
                   ON CONFLICT(appid,cc) DO UPDATE SET
                     name=COALESCE(NULLIF(excluded.name,''), region_prices.name),
                     currency=excluded.currency,
                     normal_price=excluded.normal_price,
                     current_price=excluded.current_price,
                     discount_percent=excluded.discount_percent,
                     all_time_low=excluded.all_time_low,
                     all_time_low_date=COALESCE(NULLIF(excluded.all_time_low_date,''), region_prices.all_time_low_date),
                     is_low_today=excluded.is_low_today,
                     last_checked=excluded.last_checked""",
                "params":
                [appid, cc, rp["name"], rp["currency"], rp["normal"], rp["current"], rp["discount"],
                 r_new_low, r_low_date, r_is_low_today, NOW],
            }]
            if r_prev_price is None or r_prev_price != rp["current"]:
                rbatch.append({
                    "sql": "INSERT INTO region_price_history (appid,cc,price,discount_percent,recorded_at) VALUES (?,?,?,?,?)",
                    "params": [appid, cc, rp["current"], rp["discount"], TODAY],
                })
            d1_batch(rbatch)
            time.sleep(STEAM_SLEEP)  # 스팀 호출 제한 — 지역 호출도 천천히

        if i and i % 100 == 0:
            print(f"  ...{i}/{len(to_check)} 진행")
        time.sleep(STEAM_SLEEP)  # 스팀 호출 제한(5분 200회) 안 넘기게 천천히

    print(f"끝. 가격이 바뀐 게임 {changed}개를 기록했어요.")


if __name__ == "__main__":
    main()
