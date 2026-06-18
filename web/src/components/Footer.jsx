import "./Footer.css";
import { Link } from "../lib/router";

// 사이트 하단 푸터.
// - 좌측 브랜드(금색 점 + "Lowstamp")와 한 줄 태그라인.
// - 우측 내비: 실제 페이지로 이동하는 링크들(소개·가이드·개인정보처리방침·이용약관·문의).
//   더 이상 정보 모달(onOpenInfo)을 쓰지 않고 라우터 Link 로 페이지를 연다.
// - 면책 한 줄 + 데이터 출처 + 저작권 표기.
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        {/* 좌측: 브랜드 + 태그라인 */}
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="footer-dot" />
            <span className="footer-name">Lowstamp</span>
          </div>
          <p className="footer-tagline">스팀 공식 원화가만, 키샵 없이 안전 비교</p>
        </div>

        {/* 우측: 실제 페이지로 이동하는 링크 */}
        <nav className="footer-nav" aria-label="사이트 정보">
          <Link to="/about" className="footer-link">
            소개
          </Link>
          <Link to="/guide" className="footer-link">
            가이드
          </Link>
          <Link to="/privacy" className="footer-link">
            개인정보처리방침
          </Link>
          <Link to="/terms" className="footer-link">
            이용약관
          </Link>
          <Link to="/contact" className="footer-link">
            문의
          </Link>
        </nav>
      </div>

      <div className="footer-meta">
        <p className="footer-disclaimer">
          표시 가격은 참고용이며, 결제 직전 스팀에서 최종가를 확인하세요.
        </p>
        <div className="footer-bottom">
          <span className="footer-source">데이터 출처: Steam</span>
          <span className="footer-sep" aria-hidden="true">·</span>
          <span className="footer-copy">© 2026 Lowstamp</span>
        </div>
      </div>
    </footer>
  );
}
