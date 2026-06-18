import { useEffect, useRef } from "react";

// 모달 등 "열려 있는 동안 키보드 포커스를 안에 가두는" 훅.
// active 가 true가 되면: (1) 직전 포커스 요소를 기억해 두고 (2) 컨테이너 안 첫 포커서블에 focus,
// (3) Tab/Shift+Tab 을 컨테이너 경계에서 순환시켜 바깥으로 새지 않게 한다.
// active 가 false가 되거나 언마운트되면 직전 포커스 요소로 복원한다.
//
// 사용법: const ref = useFocusTrap(true); <div className="modal" ref={ref}>…</div>
// 반환값 ref 를 가두고 싶은 컨테이너(보통 .modal)에 붙이면 된다.

// 컨테이너 안에서 실제로 탭 이동 가능한(보이는) 요소만 추린다.
const FOCUSABLE =
  'a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])';

function focusables(container) {
  if (!container) return [];
  return Array.from(container.querySelectorAll(FOCUSABLE)).filter(
    // display:none / 화면 밖 등으로 실제로 못 누르는 건 제외(offsetParent === null)
    (el) => el.offsetParent !== null || el === document.activeElement
  );
}

export function useFocusTrap(active) {
  const ref = useRef(null);

  useEffect(() => {
    if (!active) return;
    const container = ref.current;
    if (!container) return;

    // 열기 직전에 포커스가 있던 요소(닫을 때 여기로 돌려준다).
    const prevFocused = document.activeElement;

    // 열릴 때 첫 포커서블로 이동. 없으면 컨테이너 자체에 임시 포커스.
    const items = focusables(container);
    if (items.length) {
      items[0].focus();
    } else {
      if (!container.hasAttribute("tabindex")) container.setAttribute("tabindex", "-1");
      container.focus();
    }

    const onKey = (e) => {
      if (e.key !== "Tab") return;
      const list = focusables(container);
      if (!list.length) {
        // 포커서블이 없으면 컨테이너 밖으로 못 나가게 막기만 한다.
        e.preventDefault();
        return;
      }
      const first = list[0];
      const last = list[list.length - 1];
      const cur = document.activeElement;

      if (e.shiftKey) {
        // Shift+Tab: 맨 앞(또는 컨테이너 밖)에서 누르면 맨 뒤로 순환.
        if (cur === first || !container.contains(cur)) {
          e.preventDefault();
          last.focus();
        }
      } else {
        // Tab: 맨 뒤(또는 컨테이너 밖)에서 누르면 맨 앞으로 순환.
        if (cur === last || !container.contains(cur)) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKey, true);

    return () => {
      document.removeEventListener("keydown", onKey, true);
      // 닫힐 때 직전 포커스 요소로 복원(여전히 화면에 있고 focus 가능할 때만).
      if (prevFocused && typeof prevFocused.focus === "function" && document.contains(prevFocused)) {
        prevFocused.focus();
      }
    };
  }, [active]);

  return ref;
}
