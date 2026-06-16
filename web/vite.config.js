import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite + React 설정. Cloudflare Pages: 빌드 명령 `npm run build`, 출력 `dist`.
export default defineConfig({
  plugins: [react()],
});
