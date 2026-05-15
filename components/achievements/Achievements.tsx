'use client';

import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { Reveal } from '@/components/animations/Reveal';
import { AnimatedNumber } from '@/components/ui/AnimatedNumber';
import { ACHIEVEMENTS } from '@/lib/data';

export function Achievements() {
  return (
    <section id="achievements" className="relative scroll-mt-24 py-28 sm:py-36">
      <div className="container">
        <SectionHeading
          align="center"
          eyebrow="Numbers, the boring kind"
          title={
            <>
              Six years, in <span className="text-gradient-accent">production receipts.</span>
            </>
          }
          description="Every metric below is owned, shipped, and measured against a real workload — no rounded marketing numbers."
        />

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ACHIEVEMENTS.map((m, i) => (
            <Reveal key={m.label + i} delay={i * 0.05}>
              <GlassCard interactive accent={i % 3 === 0 ? 'cyan' : i % 3 === 1 ? 'violet' : 'gold'} className="h-full p-6 sm:p-7">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className="text-gradient-primary text-4xl font-semibold tracking-tight sm:text-5xl"
                >
                  <AnimatedNumber
                    value={m.value}
                    delay={i * 0.06}
                    className="num tabular-nums"
                  />
                </motion.div>
                <p className="mt-3 text-sm font-medium tracking-tight text-ink">{m.label}</p>
                {m.detail ? (
                  <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-subtle">
                    {m.detail}
                  </p>
                ) : null}
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
