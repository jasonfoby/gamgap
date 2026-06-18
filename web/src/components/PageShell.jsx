import "./PageShell.css";
import { Link } from "../lib/router";
import Footer from "./Footer";

// 콘텐츠 페이지(개인정보처리방침·가이드·소개 등) 공통 틀.
// - 상단 sticky 헤더: 로고 'Lowstamp'(금색 점 + 글자) → 홈, 우측에 가이드/홈 링크.
// - 가운데 본문(<main className="page">): 최대폭 760px의 가독형 영역.
// - 하단 Footer(기존 컴포넌트 재사용).
// props: { children }  — 본문에 들어갈 내용.
export default function PageShell({ children }) {
  return (
    <div className="pageshell">
      <header className="ps-header">
        <div className="ps-bar">
          <Link to="/" className="ps-logo" aria-label="Lowstamp 홈">
            <span className="ps-dot" />
            Lowstamp
          </Link>
          <nav className="ps-nav" aria-label="페이지 이동">
            <Link to="/guide" className="ps-nav-link">
              가이드
            </Link>
            <Link to="/" className="ps-nav-link">
              홈
            </Link>
          </nav>
        </div>
      </header>

      <main className="page">{children}</main>

      <Footer />
    </div>
  );
}
