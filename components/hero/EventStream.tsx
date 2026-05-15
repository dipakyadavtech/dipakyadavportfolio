'use client';

import { motion, useReducedMotion } from 'framer-motion';

type Props = {
  count?: number;
};

const DURATION = 3.2; // seconds for a dot to travel top → bottom

export function EventStream({ count = 4 }: Props) {
  const reduce = useReducedMotion();

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-[6%] bottom-[6%] w-px -translate-x-1/2"
      style={{ transformStyle: 'preserve-3d', transform: 'translateZ(40px)' }}
    >
      {/* Static rail */}
      <div
        className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2"
        style={{
          background:
            'linear-gradient(180deg, rgba(91,234,255,0) 0%, rgba(91,234,255,0.35) 14%, rgba(167,139,250,0.35) 52%, rgba(245,192,106,0.35) 84%, rgba(245,192,106,0) 100%)',
        }}
      />
      {/* Animated dots */}
      {Array.from({ length: count }).map((_, i) => {
        const delay = (DURATION / count) * i;
        return (
          <motion.span
            key={i}
            initial={reduce ? { opacity: 0 } : { top: '-4%', opacity: 0 }}
            animate={
              reduce
                ? { opacity: 0 }
                : {
                    top: ['-4%', '104%'],
                    opacity: [0, 1, 1, 1, 0],
                  }
            }
            transition={{
              duration: DURATION,
              repeat: reduce ? 0 : Infinity,
              repeatDelay: 0,
              ease: 'linear',
              delay,
              times: [0, 0.08, 0.5, 0.92, 1],
            }}
            className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-accent-cyan shadow-[0_0_12px_rgba(91,234,255,0.95)]"
          />
        );
      })}
    </div>
  );
}
