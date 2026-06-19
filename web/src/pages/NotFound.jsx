import "./NotFound.css";
import PageShell from "../components/PageShell";
import { Link } from "../lib/router";
import { useT } from "../lib/i18n";

// 404 페이지 — 라우터가 알 수 없는 경로일 때 보여준다.
// PageShell 안에 큼직한 안내와 홈으로 가는 링크를 둔다.
export default function NotFound() {
  const { t } = useT();
  return (
    <PageShell>
      <div className="notfound">
        <div className="nf-code">404</div>
        <h1 className="nf-title">{t("nf.title")}</h1>
        <p className="nf-desc">{t("nf.desc")}</p>
        <Link to="/" className="nf-home">
          {t("nf.home")}
        </Link>
      </div>
    </PageShell>
  );
}
