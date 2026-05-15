'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { MagneticButton } from '@/components/animations/MagneticButton';
import { GradientText } from '@/components/ui/GradientText';
import { Scene3D } from './Scene3D';
import { HeroMetrics } from './HeroMetrics';
import { StatusBadge } from './StatusBadge';
import { HERO_TECH_BADGES } from '@/lib/data';
import { SITE } from '@/lib/constants';

const headline = ['I build the platforms', 'production runs on.'];

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] items-center pb-20 pt-32 sm:pt-36"
    >
      <div className="container relative grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-center">
        <div className="relative z-10">
          <StatusBadge />

          <h1 className="mt-7 text-balance text-5xl font-semibold leading-[1.02] tracking-tight text-ink sm:text-6xl md:text-7xl">
            {headline.map((line, li) => (
              <span key={li} className="block">
                {line.split(' ').map((word, wi) => (
                  <motion.span
                    key={`${li}-${wi}`}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28, filter: 'blur(10px)' }}
                    animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{
                      duration: 0.9,
                      delay: 0.2 + li * 0.18 + wi * 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={
                      'mr-3 inline-block ' +
                      (li === 1
                        ? 'text-gradient-accent'
                        : 'text-gradient-primary')
                    }
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-7 max-w-xl text-pretty text-base leading-relaxed text-ink-muted sm:text-lg"
          >
            {SITE.pitch}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.15 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <MagneticButton>
              <a href="#projects">
                <Button variant="primary" size="lg">
                  View work
                  <ArrowDown size={16} className="transition-transform group-hover:translate-y-0.5" />
                </Button>
              </a>
            </MagneticButton>
            <MagneticButton>
              <a href="#contact">
                <Button variant="secondary" size="lg">
                  Get in touch
                  <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Button>
              </a>
            </MagneticButton>
            <button
              type="button"
              onClick={() => (window as unknown as { __openCmdK?: () => void }).__openCmdK?.()}
              className="ml-1 hidden items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-muted transition-colors hover:text-ink sm:inline-flex"
            >
              <kbd className="rounded border border-border-strong bg-white/[0.04] px-1.5 py-0.5 text-[10px] tracking-[0.18em] text-ink-muted">
                ⌘K
              </kbd>
              <span>command palette</span>
            </button>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.4 }}
            className="mt-10 flex flex-wrap gap-2 text-[12px] text-ink-muted"
          >
            {HERO_TECH_BADGES.map((b) => (
              <li
                key={b}
                className="rounded-full border border-border bg-white/[0.02] px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.16em]"
              >
                {b}
              </li>
            ))}
          </motion.ul>

          <div className="mt-14">
            <HeroMetrics />
          </div>
        </div>

        <div className="relative">
          <Scene3D />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-ink-muted"
      >
        scroll
      </motion.div>
    </section>
  );
}
