import "./NotFound.css";
import PageShell from "../components/PageShell";
import { Link } from "../lib/router";

// 404 페이지 — 라우터가 알 수 없는 경로일 때 보여준다.
// PageShell 안에 큼직한 안내와 홈으로 가는 링크를 둔다.
export default function NotFound() {
  return (
    <PageShell>
      <div className="notfound">
        <div className="nf-code">404</div>
        <h1 className="nf-title">페이지를 찾을 수 없어요</h1>
        <p className="nf-desc">
          주소가 바뀌었거나 사라진 페이지예요. 아래에서 다시 시작해 보세요.
        </p>
        <Link to="/" className="nf-home">
          홈으로
        </Link>
      </div>
    </PageShell>
  );
}
