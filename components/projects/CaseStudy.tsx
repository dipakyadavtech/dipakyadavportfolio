'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { CaseStudy as CaseStudyT, Project } from '@/lib/data';

type Props = {
  open: boolean;
  data: CaseStudyT;
  accent: Project['accent'];
};

const ACCENT_TEXT: Record<Project['accent'], string> = {
  cyan: 'text-accent-cyan',
  violet: 'text-accent-violet',
  gold: 'text-accent-gold',
};

const ACCENT_RING: Record<Project['accent'], string> = {
  cyan: 'ring-accent-cyan/30',
  violet: 'ring-accent-violet/30',
  gold: 'ring-accent-gold/30',
};

export function CaseStudy({ open, data, accent }: Props) {
  return (
    <AnimatePresence initial={false}>
      {open ? (
        <motion.div
          key="case-study"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
        >
          <div className="mt-8 grid gap-8 rounded-2xl border border-border bg-white/[0.015] p-6 sm:grid-cols-[1fr_1.1fr] sm:p-7">
            <div className="space-y-6">
              {(
                [
                  { label: 'Problem', body: data.problem },
                  { label: 'Approach', body: data.approach },
                  { label: 'Outcome', body: data.outcome },
                ] as const
              ).map((b) => (
                <div key={b.label}>
                  <p
                    className={
                      'font-mono text-[10.5px] uppercase tracking-[0.24em] ' + ACCENT_TEXT[accent]
                    }
                  >
                    {b.label}
                  </p>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-ink/85">{b.body}</p>
                </div>
              ))}
            </div>

            <div>
              <p className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-ink-muted">
                Architecture
              </p>
              <ol className="mt-3 space-y-3">
                {data.architecture.map((row, i) => (
                  <li key={row.layer}>
                    <div
                      className={
                        'rounded-xl border border-border bg-bg-elevated/60 p-3.5 ring-1 ' +
                        ACCENT_RING[accent]
                      }
                    >
                      <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-subtle">
                        {String(i + 1).padStart(2, '0')} · {row.layer}
                      </p>
                      <p className="mt-1.5 font-mono text-[12.5px] leading-relaxed text-ink/90">
                        {row.nodes.map((n, j) => (
                          <span key={n}>
                            <span>{n}</span>
                            {j < row.nodes.length - 1 ? (
                              <span aria-hidden className="mx-2 text-ink-faint">
                                ·
                              </span>
                            ) : null}
                          </span>
                        ))}
                      </p>
                    </div>
                    {i < data.architecture.length - 1 ? (
                      <div className="flex justify-center py-1.5 text-ink-subtle">
                        <ArrowRight
                          size={12}
                          className="rotate-90 opacity-70"
                          aria-hidden
                        />
                      </div>
                    ) : null}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
