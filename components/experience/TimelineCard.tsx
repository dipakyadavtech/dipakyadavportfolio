'use client';

import { motion } from 'framer-motion';
import { Reveal } from '@/components/animations/Reveal';
import type { Experience } from '@/lib/data';

type Props = { item: Experience; index: number };

export function TimelineCard({ item, index }: Props) {
  return (
    <li className="relative">
      <Reveal delay={index * 0.05}>
        <div className="relative ml-14 sm:ml-20">
          <motion.span
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 300, damping: 18, delay: index * 0.05 + 0.15 }}
            aria-hidden
            className="absolute -left-14 top-5 h-3 w-3 rounded-full bg-accent-cyan shadow-[0_0_20px_rgba(91,234,255,0.9)] sm:-left-20"
          />
          <span
            aria-hidden
            className="absolute -left-[3.25rem] top-7 hidden text-[10px] font-mono uppercase tracking-[0.24em] text-ink-subtle sm:block sm:-left-[5rem]"
          >
            {item.period.split('—')[0].trim()}
          </span>

          <div className="rounded-2xl border border-border-strong glass p-7 sm:p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <div>
                <h3 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                  {item.role}
                </h3>
                <p className="mt-1 font-mono text-[12px] uppercase tracking-[0.22em] text-accent-cyan/90">
                  {item.company}
                </p>
              </div>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-muted">
                {item.period}
                {item.location ? <span className="text-ink-subtle"> · {item.location}</span> : null}
              </p>
            </div>
            <p className="mt-5 text-[15px] leading-relaxed text-ink-muted">{item.summary}</p>
            <ul className="mt-6 grid gap-2.5">
              {item.highlights.map((h) => (
                <li
                  key={h}
                  className="flex gap-3 text-[14.5px] leading-relaxed text-ink/85"
                >
                  <span
                    aria-hidden
                    className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-accent-cyan/80"
                  />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </li>
  );
}
