import "./ArticleBody.css";

// 글 본문 렌더러. 콘텐츠 데이터의 '블록 배열'을 받아 HTML로 그린다.
// 블록 종류(type)별 모양:
//   { type:"p",    text:"문단" }            → <p>
//   { type:"h2",   text:"소제목" }          → <h2>
//   { type:"ul",   items:["...","..."] }    → 글머리 목록
//   { type:"ol",   items:["...","..."] }    → 번호 목록
//   { type:"quote",text:"인용문" }          → <blockquote>
//   { type:"note", text:"안내/주의" }       → 강조 박스
//   { type:"table", caption, head:[..], rows:[[..],..] } → 표(첫 칸은 행 제목). 좁은 화면에선 가로 스크롤
//   { type:"faq", title, items:[{q,a},..] } → 질문·답 묶음. 검색 로봇용 FAQPage 구조화 데이터도
//                                             이 블록에서 뽑으므로(functions/_shared/content.js), 화면에
//                                             보이는 질문과 구조화 데이터가 항상 같다(구글 요구 사항).
// props: { blocks: Array<블록> }  (없거나 비면 아무 것도 안 그림)
export default function ArticleBody({ blocks }) {
  if (!Array.isArray(blocks) || blocks.length === 0) return null;

  return (
    <div className="article-body">
      {blocks.map((b, i) => {
        if (!b || !b.type) return null;
        switch (b.type) {
          case "h2":
            return (
              <h2 key={i} className="ab-h2">
                {b.text}
              </h2>
            );
          case "ul":
            return (
              <ul key={i} className="ab-ul">
                {(b.items || []).map((it, j) => (
                  <li key={j}>{it}</li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="ab-ol">
                {(b.items || []).map((it, j) => (
                  <li key={j}>{it}</li>
                ))}
              </ol>
            );
          case "quote":
            return (
              <blockquote key={i} className="ab-quote">
                {b.text}
              </blockquote>
            );
          case "table":
            return (
              <div key={i} className="ab-table-wrap">
                <table className="ab-table">
                  {b.caption && <caption>{b.caption}</caption>}
                  <thead>
                    <tr>
                      {(b.head || []).map((h, j) => (
                        <th key={j} scope="col">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {(b.rows || []).map((r, j) => (
                      <tr key={j}>
                        {(r || []).map((c, k) =>
                          k === 0 ? (
                            <th key={k} scope="row">
                              {c}
                            </th>
                          ) : (
                            <td key={k}>{c}</td>
                          )
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "faq":
            return (
              <section key={i} className="ab-faq">
                {b.title && <h2 className="ab-h2">{b.title}</h2>}
                {(b.items || []).map((it, j) => (
                  <div key={j} className="ab-faq-item">
                    <h3 className="ab-faq-q">{it.q}</h3>
                    <p className="ab-faq-a">{it.a}</p>
                  </div>
                ))}
              </section>
            );
          case "note":
            return (
              <div key={i} className="ab-note">
                {b.text}
              </div>
            );
          case "p":
          default:
            return (
              <p key={i} className="ab-p">
                {b.text}
              </p>
            );
        }
      })}
    </div>
  );
}
