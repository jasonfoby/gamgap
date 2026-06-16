import { createContext, useCallback, useContext, useEffect, useState } from "react";

// 찜 목록은 서버 없이 브라우저에 저장한다(localStorage). 값은 appid 배열.
const KEY = "gamgap:wishlist";

function read() {
  try {
    const raw = localStorage.getItem(KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr.map(Number).filter(Boolean) : [];
  } catch {
    return [];
  }
}

// 찜 상태 훅. ids(찜한 appid 배열), toggle(켜고 끄기), has(찜 여부).
export function useWishlistState() {
  const [ids, setIds] = useState(read);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(ids));
    } catch {
      /* 저장 실패(시크릿 모드 등)는 조용히 무시 */
    }
  }, [ids]);

  const toggle = useCallback((appid) => {
    const id = Number(appid);
    setIds((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [id, ...cur]));
  }, []);

  const has = useCallback((appid) => ids.includes(Number(appid)), [ids]);

  return { ids, toggle, has };
}

// 별 버튼·찜 화면이 prop drilling 없이 찜 상태를 쓰도록 컨텍스트로 공유.
const WishlistContext = createContext(null);
export const WishlistProvider = WishlistContext.Provider;
export const useWishlist = () => useContext(WishlistContext);
