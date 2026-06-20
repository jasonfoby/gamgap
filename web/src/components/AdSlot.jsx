import { useEffect, useRef } from "react";
import { PUBLISHER, SLOTS } from "../lib/ads";
import { useT } from "../lib/i18n";
import "./AdSlot.css";

// 광고 한 자리(애드센스 ad unit)를 그리는 컴포넌트.
// - slot: SLOTS 표의 키(예: "gameTop"). 그 키로 숫자 슬롯 ID를 찾는다.
// - slotId: 키 대신 숫자 슬롯 ID를 직접 넘길 수도 있다.
//
// 슬롯 ID가 비었거나 없으면 아무것도 그리지 않는다(return null) — 승인/ID가
// 생기기 전엔 빈 광고 박스가 화면에 나타나지 않도록.
// ID가 있으면 애드센스 규정에 맞춰 작은 "광고" 라벨과 함께 <ins> 광고 자리를 그리고,
// 마운트될 때 한 번만 adsbygoogle에 푸시해 실제 광고를 채운다.
export default function AdSlot({ slot, slotId }) {
  const { t } = useT();
  const id = slotId || (slot ? SLOTS[slot] : "");
  const pushed = useRef(false); // 같은 마운트에서 두 번 푸시 방지

  useEffect(() => {
    if (!id || pushed.current) return;
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* adsbygoogle 로더가 아직 없거나 차단된 환경 — 조용히 무시 */
    }
  }, [id]);

  // 슬롯 ID가 없으면 빈 박스 대신 아무것도 렌더하지 않는다.
  if (!id) return null;

  return (
    <div className="adslot">
      <div className="adslot-label">{t("ad.label")}</div>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={PUBLISHER}
        data-ad-slot={id}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}
