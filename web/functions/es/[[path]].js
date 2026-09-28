// /es/… 언어 고정 주소. 처리는 functions/_shared/langRoute.js 참고.
import { langHandler } from "../_shared/langRoute.js";

export const onRequest = langHandler("es");
