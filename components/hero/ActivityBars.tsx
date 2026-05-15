'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

type Props = {
  count?: number;
  seed?: number;
  accent: 'cyan' | 'violet' | 'gold';
};

const ACCENT_COLOR: Record<Props['accent'], string> = {
  cyan: 'rgba(91,234,255,0.85)',
  violet: 'rgba(167,139,250,0.85)',
  gold: 'rgba(245,192,106,0.85)',
};

const ACCENT_FAINT: Record<Props['accent'], string> = {
  cyan: 'rgba(91,234,255,0.20)',
  violet: 'rgba(167,139,250,0.20)',
  gold: 'rgba(245,192,106,0.20)',
};

// Deterministic pseudo-random so server + client render the same first frame.
function lcg(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
}

export function ActivityBars({ count = 18, seed = 1, accent }: Props) {
  const reduce = useReducedMotion();
  const baseRef = useRef<number[]>([]);
  if (baseRef.current.length !== count) {
    const rand = lcg(seed);
    baseRef.current = Array.from({ length: count }, () => 0.25 + rand() * 0.65);
  }

  const [levels, setLevels] = useState<number[]>(() => baseRef.current.slice());

  useEffect(() => {
    if (reduce) return;
    let raf = 0;
    let last = performance.now();
    // Cursor that moves left-to-right, simulating a streaming log/oscilloscope.
    let cursor = 0;
    const tick = (now: number) => {
      const dt = now - last;
      if (dt > 110) {
        last = now;
        setLevels((prev) => {
          const next = prev.slice();
          const r = Math.random();
          // Bias toward modest activity with occasional spikes.
          const value = r < 0.12 ? 0.95 : 0.25 + Math.random() * 0.55;
          next[cursor % count] = value;
          cursor += 1;
          return next;
        });
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [count, reduce]);

  return (
    <div
      className="mt-4 grid items-end gap-1.5"
      style={{ gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))`, height: 22 }}
      aria-hidden
    >
      {levels.map((lv, i) => {
        const high = lv > 0.8;
        return (
          <span
            key={i}
            className="block w-full rounded-[2px] transition-all duration-300 ease-out"
            style={{
              height: `${Math.max(8, lv * 100)}%`,
              background: high ? ACCENT_COLOR[accent] : ACCENT_FAINT[accent],
              boxShadow: high ? `0 0 8px ${ACCENT_COLOR[accent]}` : 'none',
            }}
          />
        );
      })}
    </div>
  );
}
