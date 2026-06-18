import { useWishlist } from "../lib/wishlist";
import { useT } from "../lib/i18n";

// 찜 토글 별 버튼. className으로 카드 오버레이(.star-overlay) 등 위치 변형을 받는다.
export default function StarButton({ appid, className = "" }) {
  const wl = useWishlist();
  const { t } = useT();
  const on = wl?.has(appid);
  const label = on ? t("star.remove") : t("star.add");
  return (
    <button
      className={"starbtn" + (on ? " on" : "") + (className ? " " + className : "")}
      aria-label={label}
      title={label}
      onClick={(e) => {
        e.stopPropagation();
        wl?.toggle(appid);
      }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill={on ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87 6.91-1.01L12 2z" />
      </svg>
    </button>
  );
}
