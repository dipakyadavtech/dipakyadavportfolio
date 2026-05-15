'use client';

import { motion } from 'framer-motion';
import { HERO_METRICS } from '@/lib/data';
import { stagger, fadeUp } from '@/components/animations/variants';
import { AnimatedNumber } from '@/components/ui/AnimatedNumber';

export function HeroMetrics() {
  return (
    <motion.dl
      initial="hidden"
      animate="show"
      variants={stagger(0.4, 0.08)}
      className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4"
    >
      {HERO_METRICS.map((m, i) => (
        <motion.div key={m.label} variants={fadeUp} className="border-l border-border-strong pl-4">
          <dt className="text-[11px] uppercase tracking-[0.24em] text-ink-muted">{m.label}</dt>
          <dd className="mt-1.5 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            <AnimatedNumber
              value={m.value}
              delay={0.55 + i * 0.08}
              className="num tabular-nums"
            />
          </dd>
          {m.detail ? (
            <p className="mt-1 font-mono text-[11px] text-ink-subtle">{m.detail}</p>
          ) : null}
        </motion.div>
      ))}
    </motion.dl>
  );
}
