import { useState } from "react";
import { coverGradient, coverInitial } from "../lib/format";

// appid로 스팀 이미지 주소를 만든다. 세로 박스아트가 없으면 가로 헤더로 폴백.
// 예: appid 1091500 → .../apps/1091500/library_600x900.jpg
const candidates = (appid) => [
  `https://cdn.cloudflare.steamstatic.com/steam/apps/${appid}/library_600x900.jpg`,
  `https://cdn.cloudflare.steamstatic.com/steam/apps/${appid}/header.jpg`,
];

// 게임 표지. 스팀 썸네일을 띄우되, 못 불러오면 이름 기반 그라데이션 + 첫 글자로 폴백.
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
        style={{ objectFit: "cover", background: coverGradient(name) }}
      />
    );
  }

  return (
    <div className="cover" style={{ background: coverGradient(name) }}>
      {coverInitial(name)}
    </div>
  );
}
