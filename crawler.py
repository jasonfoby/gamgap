import os, json, time, datetime, urllib.request

CF_ACCOUNT = os.environ["CF_ACCOUNT_ID"]
CF_DB      = os.environ["CF_DATABASE_ID"]
CF_TOKEN   = os.environ["CF_API_TOKEN"]
D1_URL = f"https://api.cloudflare.com/client/v4/accounts/{CF_ACCOUNT}/d1/database/{CF_DB}/query"

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

def load_appids():
    here = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(here, "seed_appids.txt"), encoding="utf-8") as f:
        ids = []
        for line in f:
            head = line.split("#")[0].strip()
            if head:
                ids.append(int(head))
        return ids

def main():
    appids = load_appids()
    print(f"추적 게임 {len(appids)}개 · 날짜 {TODAY}")
    d1("UPDATE games SET is_low_today = 0")
    changed = 0
    for i, appid in enumerate(appids):
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
            print(f"  [샘플] {p['name']} 정가 {p['normal']} / 현재 {p['current']} (단위 확인: 100배면 PRICE_DIVISOR=100, 딱 맞으면 1)")
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
        if i and i % 50 == 0:
            print(f"  ...{i}/{len(appids)} 진행")
        time.sleep(0.7)
    print(f"끝. 가격이 바뀐 게임 {changed}개를 기록했어요.")

if __name__ == "__main__":
    main()
