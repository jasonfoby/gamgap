// 쿠키 동의 상태를 한 곳에서 관리한다.
// - localStorage('gamgap:consent')에 'granted'(동의) | 'denied'(거부) 저장.
// - Google 동의 모드(gtag)에 광고/분석 쿠키 허용 여부를 전달한다.
//   index.html이 페이지 진입 시 기본을 '거부'로 깔아두므로(동의 모드 default),
//   사용자가 배너에서 '동의'를 누르면 여기서 'granted'로 올린다(update).
// 어떤 경우에도 throw 하지 않는다 — 동의 처리가 화면을 깨뜨리면 안 되므로.
const CONSENT_KEY = "gamgap:consent";

// 현재 저장된 동의값을 읽는다. 아직 선택 안 했으면 null(→ 배너 표시).
export function readConsent() {
  try {
    return localStorage.getItem(CONSENT_KEY);
  } catch {
    return null;
  }
}

// 동의값을 저장하고, Google 동의 모드에도 즉시 반영한다.
//   value: 'granted' | 'denied'.
export function setConsent(value) {
  const v = value === "granted" ? "granted" : "denied";
  try {
    localStorage.setItem(CONSENT_KEY, v);
  } catch {
    // 저장 실패해도 동의 모드 갱신은 시도한다.
  }
  try {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        ad_storage: v,
        ad_user_data: v,
        ad_personalization: v,
        analytics_storage: v,
      });
    }
  } catch {
    // gtag가 아직 없거나 광고 차단기로 막혀도 조용히 넘어간다.
  }
}
