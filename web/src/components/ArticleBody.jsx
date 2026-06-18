import "./ArticleBody.css";

// 글 본문 렌더러. 콘텐츠 데이터의 '블록 배열'을 받아 HTML로 그린다.
// 블록 종류(type)별 모양:
//   { type:"p",    text:"문단" }            → <p>
//   { type:"h2",   text:"소제목" }          → <h2>
//   { type:"ul",   items:["...","..."] }    → 글머리 목록
//   { type:"ol",   items:["...","..."] }    → 번호 목록
//   { type:"quote",text:"인용문" }          → <blockquote>
//   { type:"note", text:"안내/주의" }       → 금색 보더의 강조 박스
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
