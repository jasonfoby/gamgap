import { useEffect, useRef, useState } from "react";
import { PUBLISHER, SLOTS } from "../lib/ads";
import { useT } from "../lib/i18n";
import "./AdSlot.css";

// 광고 한 자리(애드센스 ad unit)를 그리는 컴포넌트.
// - slot: SLOTS 표의 키(예: "gameTop"). 그 키로 숫자 슬롯 ID를 찾는다.
// - slotId: 키 대신 숫자 슬롯 ID를 직접 넘길 수도 있다.
// - format: 광고 모양. 기본 "auto"(반응형). "horizontal"이면 낮은 높이의 가로 띠 배너.
//
// 슬롯 ID가 비었거나 없으면 아무것도 그리지 않는다(return null) — 승인/ID가
// 생기기 전엔 빈 광고 박스가 화면에 나타나지 않도록.
// ID가 있으면 "광고" 라벨과 함께 <ins> 광고 자리를 그리고, 마운트 때 한 번 push 한다.
// 그런데 송출할 광고가 없거나(unfilled) 광고 차단기로 막히면 빈 띠가 남으므로,
// 그 경우 자리를 접어(return null) 화면을 깔끔하게 유지한다.
export default function AdSlot({ slot, slotId, format = "auto" }) {
  const { t } = useT();
  const id = slotId || (slot ? SLOTS[slot] : "");
  const insRef = useRef(null);
  const pushed = useRef(false); // 같은 마운트에서 두 번 push 방지
  const [collapsed, setCollapsed] = useState(false); // 광고 없음/차단 시 자리 접기

  useEffect(() => {
    if (!id || pushed.current) return;
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* adsbygoogle 로더가 아직 없거나 차단된 환경 — 조용히 무시 */
    }
    const el = insRef.current;
    if (!el) return;
    // 애드센스가 채우면 data-ad-status="filled", 송출 광고 없으면 "unfilled"로 표시한다.
    const onStatus = () => {
      if (el.getAttribute("data-ad-status") === "unfilled") setCollapsed(true);
    };
    const obs = new MutationObserver(onStatus);
    obs.observe(el, { attributes: true, attributeFilter: ["data-ad-status"] });
    // 폴백: 4초 뒤에도 채워지지 않았고(높이 0) 표시도 없으면(차단 등) 자리를 접는다.
    const timer = setTimeout(() => {
      if (el.getAttribute("data-ad-status") !== "filled" && el.offsetHeight === 0) {
        setCollapsed(true);
      }
    }, 4000);
    return () => {
      obs.disconnect();
      clearTimeout(timer);
    };
  }, [id]);

  // 슬롯 ID가 없거나, 광고가 없어/차단돼 접혔으면 아무것도 렌더하지 않는다.
  if (!id || collapsed) return null;

  return (
    <div className="adslot">
      <div className="adslot-label">{t("ad.label")}</div>
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={PUBLISHER}
        data-ad-slot={id}
        data-ad-format={format}
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}
