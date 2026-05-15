'use client';

import { useEffect, type RefObject } from 'react';
import { useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

type Options = {
  strength?: number;
  springConfig?: { stiffness: number; damping: number; mass?: number };
};

export function useMouseParallax(
  ref: RefObject<HTMLElement | null>,
  { strength = 20, springConfig = { stiffness: 120, damping: 18, mass: 0.4 } }: Options = {},
) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, springConfig);
  const sy = useSpring(y, springConfig);

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      x.set(px * strength);
      y.set(py * strength);
    };
    const onLeave = () => {
      x.set(0);
      y.set(0);
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [ref, strength, x, y, reduce]);

  return { x: sx, y: sy };
}
