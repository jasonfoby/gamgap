// 의존성 없는 초경량 클라이언트 라우터.
// React Router 같은 외부 라이브러리 없이 history API만으로 SPA 내비게이션을 처리한다.
// - useRoute(): 현재 경로(pathname)를 구독하는 훅.
// - navigate(to): 코드에서 경로를 바꿀 때.
// - Link: 일반 <a>처럼 보이되 클릭 시 전체 새로고침 없이 이동하는 컴포넌트.
import { useEffect, useState } from "react";

// 라우터 내부에서 쓰는 커스텀 이벤트 이름.
// navigate()가 history.pushState로 주소만 바꾸면 popstate가 안 뜨므로,
// 이 이벤트를 직접 쏘아 구독 중인 useRoute들에게 "주소 바뀜"을 알린다.
const NAV_EVENT = "gamgap:navigate";

// 현재 브라우저 경로(window.location.pathname, 예: "/guide")를 state로 구독한다.
// - 뒤로/앞으로 가기(popstate)와 navigate()가 쏘는 NAV_EVENT 둘 다 듣는다.
// - 반환값은 현재 pathname 문자열.
export function useRoute() {
  const [path, setPath] = useState(
    typeof window !== "undefined" ? window.location.pathname : "/"
  );

  useEffect(() => {
    const onChange = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onChange);
    window.addEventListener(NAV_EVENT, onChange);
    return () => {
      window.removeEventListener("popstate", onChange);
      window.removeEventListener(NAV_EVENT, onChange);
    };
  }, []);

  return path;
}

// 코드에서 경로를 옮긴다. 예: navigate("/privacy")
// - 이미 같은 경로면 아무 것도 하지 않는다(불필요한 히스토리 쌓임/리렌더 방지).
// - 그 외엔 pushState로 주소를 바꾸고 NAV_EVENT를 쏜 뒤 스크롤을 맨 위로 올린다.
export function navigate(to) {
  if (typeof window === "undefined") return;
  if (window.location.pathname === to) return;
  window.history.pushState(null, "", to);
  window.dispatchEvent(new Event(NAV_EVENT));
  window.scrollTo(0, 0);
}

// 새로고침 없는 내부 링크. 일반 <a href={to}>로 렌더되므로(우클릭/SEO/접근성 OK),
// 좌클릭만 가로채 navigate(to)로 이동한다.
// - 수정키(Ctrl/Cmd/Shift/Alt) 클릭이나 새 탭(target="_blank")은 브라우저 기본 동작에 맡긴다.
// - className 및 나머지 props(rest)는 그대로 <a>에 전달.
export function Link({ to, children, className, onClick, ...rest }) {
  const handleClick = (e) => {
    if (onClick) onClick(e);
    // 수정키 동반 클릭(새 탭으로 열기 등)이나 가운데 클릭은 기본 동작 유지.
    if (
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      (rest.target && rest.target !== "_self")
    ) {
      return;
    }
    e.preventDefault();
    navigate(to);
  };

  return (
    <a href={to} className={className} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
