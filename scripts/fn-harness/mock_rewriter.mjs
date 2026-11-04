// 서버 함수 시험용 간이 HTMLRewriter. npm 'htmlrewriter' 가 한글 일부에서 멈춰서(도구 문제) 직접 만든 것.
// 우리 함수가 쓰는 동작만 흉내 낸다: setAttribute / setInnerContent / append, 선택자 'tag', 'tag[attr="v"]', '#id'.
// 입력은 SyncResponse(문자열을 바로 들고 있는 Response)여야 한다.
export class SyncResponse extends Response {
  constructor(html, init) {
    super(html, init);
    this._html = html;
  }
}

function openTagRegex(sel) {
  let m;
  if ((m = sel.match(/^#([\w-]+)$/))) return new RegExp(`<([a-zA-Z0-9]+)\\b[^>]*\\bid="${m[1]}"[^>]*>`);
  if ((m = sel.match(/^([a-zA-Z0-9]+)\[([\w:-]+)="([^"]*)"\]$/)))
    return new RegExp(`<${m[1]}\\b[^>]*\\b${m[2].replace(/[-:]/g, "\\$&")}="${m[3].replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"[^>]*>`);
  if ((m = sel.match(/^([a-zA-Z0-9]+)$/))) return new RegExp(`<${m[1]}\\b[^>]*>`);
  throw new Error("지원하지 않는 선택자: " + sel);
}

function setAttr(tag, name, value) {
  const esc = String(value).replace(/"/g, "&quot;");
  const re = new RegExp(`(\\b${name.replace(/[-:]/g, "\\$&")}=")[^"]*(")`);
  if (re.test(tag)) return tag.replace(re, `$1${esc}$2`);
  return tag.replace(/>$/, ` ${name}="${esc}">`);
}

export class MockRewriter {
  constructor() { this.hs = []; }
  on(sel, h) { this.hs.push([sel, h]); return this; }
  transform(resp) {
    let html = resp._html;
    for (const [sel, h] of this.hs) {
      const re = openTagRegex(sel);
      const m = html.match(re);
      if (!m) continue;
      const tagName = m[1] || sel.replace(/\[.*$/, "");
      let openTag = m[0];
      const start = m.index;
      let before = html.slice(0, start);
      let after = html.slice(start + openTag.length);
      const ops = { inner: null, append: [] };
      const el = {
        setAttribute(n, v) { openTag = setAttr(openTag, n, v); },
        setInnerContent(c) { ops.inner = String(c); },
        append(c) { ops.append.push(String(c)); },
      };
      h.element && h.element(el);
      if (ops.inner !== null) {
        const close = new RegExp(`</${tagName}>`);
        const cm = after.match(close);
        const endIdx = cm ? cm.index : 0;
        after = ops.inner + after.slice(endIdx);
      }
      if (ops.append.length) {
        const close = new RegExp(`</${tagName}>`);
        const cm = after.match(close);
        if (cm) after = after.slice(0, cm.index) + ops.append.join("") + after.slice(cm.index);
      }
      html = before + openTag + after;
    }
    return new SyncResponse(html, { headers: resp.headers, status: resp.status });
  }
}
