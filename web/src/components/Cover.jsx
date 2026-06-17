import { useState } from "react";
import { coverGradient, coverInitial } from "../lib/format";

// appid로 스팀 이미지 주소를 만든다. 가로 배너(header)를 우선 쓰되, 없으면 캡슐 → 라이브러리 히어로 순으로 폴백.
// 신규/양산형 게임 중엔 header.jpg가 아직 없고 library_hero.jpg만 있는 경우가 있어 마지막 후보로 둔다.
// 셋 다 실패하면 이름 기반 그라데이션 + 첫 글자로 폴백한다.
const candidates = (appid) => [
  `https://cdn.cloudflare.steamstatic.com/steam/apps/${appid}/header.jpg`,
  `https://cdn.cloudflare.steamstatic.com/steam/apps/${appid}/capsule_616x353.jpg`,
  `https://cdn.cloudflare.steamstatic.com/steam/apps/${appid}/library_hero.jpg`,
];

// 게임 표지. 크기/모양은 쓰는 곳(.card-img / .mhead)의 CSS가 정한다.
export default function Cover({ appid, name }) {
  const [idx, setIdx] = useState(0); // 시도 중인 후보 이미지 인덱스
  const urls = appid ? candidates(appid) : [];

  if (idx < urls.length) {
    return (
      <img
        className="cover"
        src={urls[idx]}
        alt={name}
        loading="lazy"
        onError={() => setIdx((i) => i + 1)}
        style={{ background: coverGradient(name) }}
      />
    );
  }

  return (
    <div className="cover" style={{ background: coverGradient(name) }}>
      {coverInitial(name)}
    </div>
  );
}
