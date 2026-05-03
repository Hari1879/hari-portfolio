import { useEffect, useState } from 'react';

const EMOJIS = [
  { icon: "😄", pos: 4,  dur: 2.6, delay: 0,    size: 32 },
  { icon: "🤩", pos: 16, dur: 3.0, delay: 1.5,  size: 36 },
  { icon: "😜", pos: 28, dur: 2.8, delay: 2.1,  size: 24 },
  { icon: "😁", pos: 40, dur: 2.7, delay: 0.6,  size: 28 },
  { icon: "😍", pos: 53, dur: 2.9, delay: 1.9,  size: 26 },
  { icon: "🙃", pos: 65, dur: 2.5, delay: 0.3,  size: 30 },
  { icon: "😇", pos: 78, dur: 2.4, delay: 2.8,  size: 28 },
  { icon: "🥳", pos: 90, dur: 3.1, delay: 1.1,  size: 32 },
];

export default function FloatingEmojis() {
  return (
    <div className="fe-layer" aria-hidden="true">
      {EMOJIS.map((e, i) => (
        <span
          key={i}
          className="fe-item fe-bounce"
          style={{
            "--fe-pos":   `${e.pos}%`,
            "--fe-dur":   `${e.dur}s`,
            "--fe-delay": `${e.delay}s`,
            fontSize:     `${e.size}px`,
          }}
        >
          {e.icon}
        </span>
      ))}
    </div>
  );
}
