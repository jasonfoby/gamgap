#!/usr/bin/env python3
# ============================================================
#  겜값 — 수집 직원 (CheapShark 할인 명단 + 스팀 가격)
#  매일: ① CheapShark에서 '지금 스팀 할인 중인 게임' 명단을 좋은 순으로 받고
#       ② 그 게임들(+ 기존 추적분)의 가격을 스팀에 직접 물어
#       ③ 값이 바뀐 것만 D1 장부에 쌓고 역대 최저가도 갱신.
#  seed_appids.txt 는 이제 안 씁니다(지워도 됩니다).
# ============================================================
import os, json, time, datetime, urllib.request, urllib.parse

CF_ACCOUNT = os.environ["CF_ACCOUNT_ID"]
CF_DB      = os.environ["CF_DATABASE_ID"]
CF_TOKEN   = os.environ["CF_API_TOKEN"]
D1_URL = f"https://api.cloudflare.com/client/v4/accounts/{CF_ACCOUNT}/d1/database/{CF_DB}/query"

# ---- 튜닝값(원하면 숫자만 바꾸세요) ----
TARGET_DEALS = 1500   # CheapShark에서 받아올 할인 게임 수(좋은 순 위에서부터)
MAX_TOTAL    = 3000   # 하루에 스팀에 물어볼 최대 게임 수(기존 추적분 포함)
SORT_BY      = "Deal Rating"  # 'Savings'(할인율순) 또는 'Reviews'(인기순)로 바꿔도 됨

# 스팀 가격 정수는 보통 1/100 단위(예: 1099=$10.99).
#  ★ 첫 실행 때 [샘플] 줄을 보고 원화가 실제보다 100배 크면 100, 딱 맞으면 1로.
PRICE_DIVISOR = 100
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
    return {
        "name":     d.get("name", f"appid-{appid}"),
        "normal":   po["initial"] // PRICE_DIVISOR,
        "current":  po["final"]   // PRICE_DIVISOR,
        "discount": po.get("discount_percent", 0),
    }


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

    d1("UPDATE games SET is_low_today = 0")  # 하루 시작: '오늘 최저' 초기화

    changed = 0
    for i, appid in enumerate(to_check):
        try:
            p = steam_fetch(appid)
        except Exception as e:
            print("  ! 조회 실패", appid, e)
            time.sleep(1.0)
            continue
        if not p:
            time.sleep(0.7)
            continue

        if i == 0:
            print(f"  [샘플] {p['name']} 정가 {p['normal']} / 현재 {p['current']} "
                  f"(단위 확인: 100배면 PRICE_DIVISOR=100, 딱 맞으면 1)")

        row = d1("SELECT current_price, all_time_low FROM games WHERE appid=?", [appid])
        prev_price = row[0]["current_price"] if row else None
        prev_low   = row[0]["all_time_low"]  if row else None

        new_low = p["current"] if prev_low is None else min(prev_low, p["current"])
        low_date = TODAY if (prev_low is None or p["current"] < prev_low) else ""
        is_low_today = 1 if p["current"] <= new_low else 0

        d1(
            """INSERT INTO games
                 (appid,name,normal_price,current_price,discount_percent,
                  all_time_low,all_time_low_date,is_low_today,last_checked)
               VALUES (?,?,?,?,?,?,?,?,?)
               ON CONFLICT(appid) DO UPDATE SET
                 name=excluded.name,
                 normal_price=excluded.normal_price,
                 current_price=excluded.current_price,
                 discount_percent=excluded.discount_percent,
                 all_time_low=excluded.all_time_low,
                 all_time_low_date=COALESCE(NULLIF(excluded.all_time_low_date,''), games.all_time_low_date),
                 is_low_today=excluded.is_low_today,
                 last_checked=excluded.last_checked""",
            [appid, p["name"], p["normal"], p["current"], p["discount"],
             new_low, low_date, is_low_today, NOW],
        )

        if prev_price is None or prev_price != p["current"]:
            d1("INSERT INTO price_history (appid,price,discount_percent,recorded_at) VALUES (?,?,?,?)",
               [appid, p["current"], p["discount"], TODAY])
            changed += 1

        if i and i % 100 == 0:
            print(f"  ...{i}/{len(to_check)} 진행")
        time.sleep(0.7)  # 스팀 호출 제한(5분 200회) 안 넘기게 천천히

    print(f"끝. 가격이 바뀐 게임 {changed}개를 기록했어요.")


if __name__ == "__main__":
    main()
