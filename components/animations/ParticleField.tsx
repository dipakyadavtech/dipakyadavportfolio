'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

type Props = { density?: number; className?: string };

export function ParticleField({ density = 0.00005, className }: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (reduce) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = (canvas.width = window.innerWidth * dpr);
    let h = (canvas.height = window.innerHeight * dpr);
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.scale(dpr, dpr);

    const count = Math.min(80, Math.floor(window.innerWidth * window.innerHeight * density));
    type P = { x: number; y: number; r: number; vx: number; vy: number; a: number; hue: number };
    const stars: P[] = Array.from({ length: count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: 0.4 + Math.random() * 1.2,
      vx: (Math.random() - 0.5) * 0.1,
      vy: (Math.random() - 0.5) * 0.1,
      a: 0.08 + Math.random() * 0.22,
      hue: Math.random() < 0.5 ? 188 : 260,
    }));

    let raf = 0;
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < -2) s.x = window.innerWidth + 2;
        if (s.x > window.innerWidth + 2) s.x = -2;
        if (s.y < -2) s.y = window.innerHeight + 2;
        if (s.y > window.innerHeight + 2) s.y = -2;

        const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 4);
        g.addColorStop(0, `hsla(${s.hue}, 90%, 78%, ${s.a})`);
        g.addColorStop(1, `hsla(${s.hue}, 90%, 78%, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * 4, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onResize = () => {
      w = canvas.width = window.innerWidth * dpr;
      h = canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, [reduce, density]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={'pointer-events-none fixed inset-0 -z-10 ' + (className ?? '')}
    />
  );
}
