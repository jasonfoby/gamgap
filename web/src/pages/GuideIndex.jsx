import { useEffect, useState } from "react";
import PageShell from "../components/PageShell";
import { Link } from "../lib/router";
import { loadGuides } from "../content/guides";
import { groupGuides } from "../content/guideCategories";
import { setPageHead } from "../lib/head";
import { ym } from "../lib/format";
import { useT } from "../lib/i18n";
import "./GuideIndex.css";

// 가이드 목록 페이지 (/guide). 현재 언어의 글을 지연 로딩해 날짜 내림차순 카드로 보여 준다.
export default function GuideIndex() {
  const { t, lang } = useT();
  const [guides, setGuides] = useState(null); // null = 로딩 중

  useEffect(() => {
    let alive = true;
    setGuides(null);
    loadGuides(lang).then((gs) => alive && setGuides(gs));
    return () => {
      alive = false;
    };
  }, [lang]);

  useEffect(() => {
    setPageHead({
      title: t("guide.indexTitle"),
      description: t("guide.indexMetaDesc"),
      path: "/guide",
    });
  }, [t]);

  return (
    <PageShell>
      <div className="guide-index">
        <header className="gi-head">
          <h1 className="gi-title">{t("guide.indexTitle")}</h1>
          <p className="gi-desc">{t("guide.indexDesc")}</p>
          <p className="gi-desc">{t("guide.indexDesc2")}</p>
        </header>

        {guides === null ? (
          <p className="gi-empty">{t("common.loading")}</p>
        ) : guides.length === 0 ? (
          <p className="gi-empty">{t("guide.empty")}</p>
        ) : (
          // 주제별로 묶어 '편집이 있는 콘텐츠 사이트'로 읽히게 한다(공용 분류: guideCategories.js).
          groupGuides(guides).map((group) => (
            <section key={group.labelKey} className="gi-group">
              <h2 className="gi-group-title">{t(group.labelKey)}</h2>
              <ul className="gi-list">
                {group.items.map((g) => (
                  <li key={g.slug} className="gi-item">
                    <Link to={`/guide/${g.slug}`} className="gi-card">
                      <h3 className="gi-card-title">{g.title}</h3>
                      {g.description && <p className="gi-card-desc">{g.description}</p>}
                      <div className="gi-card-meta">
                        {g.date && <span className="gi-date">{ym(g.date)}</span>}
                        {g.date && g.readMins && (
                          <span className="gi-sep" aria-hidden="true">
                            ·
                          </span>
                        )}
                        {g.readMins && <span className="gi-read">{t("guide.readMins", { n: g.readMins })}</span>}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))
        )}
      </div>
    </PageShell>
  );
}
