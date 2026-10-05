#!/usr/bin/env python3
"""게임 가격 페이지 색인 목록(web/src/lib/indexableGamesList.js)을 만든다.

애드센스 3차 심사 기간에는 같은 틀의 게임 가격 페이지를 검색에 많이 내보내지 않으려고,
리뷰가 많은 인기 게임 N개(기본 150)만 색인 대상으로 둔다(영어·한국어판만 — web/src/lib/indexableGames.js).
스팀이 '성적 내용' 표시(1·3·4번)를 붙인 게임은 인기와 상관없이 뺀다(애드센스는 선정적인 화면의 광고를 제한).

순서
 1) 우리 API /api/appids (리뷰 2,000개↑ 또는 메타크리틱 게임) 목록을 받는다.
 2) 게임마다 /api/game/<appid> 로 리뷰 수를 받아 많은 순으로 줄 세운다.
 3) 위에서부터 스팀 공개 주소로 성적 표시를 조회해 걸리지 않는 게임을 N개 채운다.
 4) 결과를 web/src/lib/indexableGamesList.js 로 쓴다.

쓰는 법:  python scripts/build_indexable_games.py            (약 6~8분, 스팀 5분 200회 제한 안쪽)
          python scripts/build_indexable_games.py --top 100
우리 D1 에는 게임당 읽기 몇십 건이 들 뿐이라 부담이 없다(전체 약 400회).
"""
import argparse
import datetime
import json
import pathlib
import sys
import time
import urllib.error
import urllib.request

API = "https://gamgap-api.ibanisac.workers.dev"
# Cloudflare 가 파이썬 기본 이름표(User-Agent)를 막으므로 직접 붙인다.
UA = {"User-Agent": "Mozilla/5.0 (compatible; LowstampBuild/1.0)"}
SEXUAL = {1, 3, 4}  # 1 약간의 노출·성적 내용 / 3 성인 전용 성적 내용 / 4 잦은 노출·성적 내용
OUT = pathlib.Path(__file__).resolve().parent.parent / "web" / "src" / "lib" / "indexableGamesList.js"


def get_json(url, tries=4):
    for i in range(tries):
        try:
            req = urllib.request.Request(url, headers=UA)
            with urllib.request.urlopen(req, timeout=25) as r:
                return json.load(r)
        except urllib.error.HTTPError as e:
            if e.code == 429:
                time.sleep(75)  # 스팀 호출 제한: 잠시 쉬었다 다시
                continue
            if i == tries - 1:
                raise
            time.sleep(3)
        except Exception:
            if i == tries - 1:
                raise
            time.sleep(3)


def descriptor_ids(appid):
    """스팀이 붙인 내용 표시 번호 집합. 조회가 안 되면 None(안전하게 제외)."""
    d = get_json(
        f"https://store.steampowered.com/api/appdetails?appids={appid}"
        "&filters=content_descriptors&cc=us&l=english"
    )
    node = (d or {}).get(str(appid), {})
    if not node.get("success"):
        return None
    return set(((node.get("data") or {}).get("content_descriptors") or {}).get("ids") or [])


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--top", type=int, default=150)
    args = ap.parse_args()

    ids = get_json(f"{API}/api/appids")
    print(f"색인 후보 {len(ids)}개 — 리뷰 수 조회 중…", flush=True)
    rows = []
    for n, appid in enumerate(ids, 1):
        g = get_json(f"{API}/api/game/{appid}") or {}
        rows.append((int(appid), g.get("name", "?"), int(g.get("reviewTotal") or 0)))
        time.sleep(0.12)
        if n % 100 == 0:
            print(f"  {n}/{len(ids)}", flush=True)
    rows.sort(key=lambda r: -r[2])

    keep, excluded = [], []
    for appid, name, reviews in rows:
        if len(keep) >= args.top:
            break
        ids_here = descriptor_ids(appid)
        time.sleep(1.6)
        if ids_here is None or (ids_here & SEXUAL):
            excluded.append((appid, name))
            continue
        keep.append((appid, name, reviews))
    print(f"선정 {len(keep)}개(최소 리뷰 {keep[-1][2]}), 성적 표시로 제외 {len(excluded)}개", flush=True)

    today = datetime.date.today().isoformat()
    lines = [
        f"// 자동 생성 파일 — scripts/build_indexable_games.py 로 만든다({today}). 손으로 고치지 말고 스크립트를 다시 돌릴 것.",
        "// 게임 가격 페이지 중 검색에 내보낼 인기 게임(리뷰 많은 순)과, 스팀 성적 표시 때문에 뺀 게임.",
        "// 사용처·해제 방법은 indexableGames.js 머리말 참고.",
        "",
        "export const INDEXABLE_GAME_IDS = [",
    ]
    for i in range(0, len(keep), 8):
        lines.append("  " + ", ".join(str(a) for a, _, _ in keep[i:i + 8]) + ",")
    lines += ["];", "", "// 인기 순위 안에서 스팀 성적 표시(1·3·4번)로 뺀 게임(참고용).", "export const EXCLUDED_SEXUAL_DESCRIPTOR = ["]
    for appid, name in excluded:
        safe = name.replace("*", "＊").replace("\n", " ")
        lines.append(f"  {appid}, // {safe}")
    lines += ["];", ""]
    OUT.write_text("\n".join(lines), encoding="utf-8")
    print(f"썼음: {OUT}", flush=True)


if __name__ == "__main__":
    sys.exit(main())
