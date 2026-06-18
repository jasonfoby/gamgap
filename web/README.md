# Lowstamp 웹 (프런트엔드)

루트의 `index.html`(단일 HTML 화면)을 그대로 옮긴 Vite + React 앱입니다.
백엔드(Worker `gamgap-api`, D1 `gamgap`, 크롤러)는 건드리지 않고 화면만 다시 만들었습니다.

## 개발

```bash
cd web
npm install
npm run dev      # 로컬 개발 서버
npm run build    # dist/ 로 정적 빌드
npm run preview  # 빌드 결과 미리보기
```

API 주소는 `src/api.js`의 `API_BASE` 상수에 있습니다
(`https://gamgap-api.ibanisac.workers.dev`).

## Cloudflare Pages 배포 설정

- 프레임워크 프리셋: **Vite**
- 빌드 명령: `npm run build`
- 빌드 출력 디렉터리: `dist`
- **루트 디렉터리(고급): `web`** ← 앱이 하위 폴더에 있으므로 반드시 지정
