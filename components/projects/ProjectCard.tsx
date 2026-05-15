'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Reveal } from '@/components/animations/Reveal';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { CaseStudy } from './CaseStudy';
import type { Project } from '@/lib/data';
import { cn } from '@/lib/utils';

type Props = { project: Project; index: number; featured?: boolean };

const accentDot: Record<Project['accent'], string> = {
  cyan: 'bg-accent-cyan shadow-[0_0_18px_rgba(91,234,255,0.7)]',
  violet: 'bg-accent-violet shadow-[0_0_18px_rgba(167,139,250,0.7)]',
  gold: 'bg-accent-gold shadow-[0_0_18px_rgba(245,192,106,0.7)]',
};

const accentRail: Record<Project['accent'], string> = {
  cyan: 'from-accent-cyan/0 via-accent-cyan/60 to-accent-cyan/0',
  violet: 'from-accent-violet/0 via-accent-violet/60 to-accent-violet/0',
  gold: 'from-accent-gold/0 via-accent-gold/60 to-accent-gold/0',
};

const accentText: Record<Project['accent'], string> = {
  cyan: 'text-accent-cyan',
  violet: 'text-accent-violet',
  gold: 'text-accent-gold',
};

export function ProjectCard({ project, index, featured = false }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Reveal delay={index * 0.06} className="h-full">
      <GlassCard
        interactive={!open}
        accent={project.accent}
        className={
          'flex h-full flex-col p-7 sm:p-8 ' +
          (featured ? 'lg:p-10' : '')
        }
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className={`inline-block h-2 w-2 rounded-full ${accentDot[project.accent]}`} />
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-muted">
              {project.domain}
            </p>
          </div>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-subtle">
            {String(index + 1).padStart(2, '0')}
          </p>
        </div>

        <div className="mt-5 flex items-start justify-between gap-5">
          <div>
            <h3
              className={
                'font-semibold tracking-tight text-ink ' +
                (featured ? 'text-2xl sm:text-[28px]' : 'text-xl sm:text-2xl')
              }
            >
              {project.name}
            </h3>
            <p className="mt-1 text-[13px] text-ink-muted">{project.client}</p>
          </div>
          <motion.span
            whileHover={{ x: 2, y: -2 }}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border-strong bg-white/[0.04] text-ink"
          >
            <ArrowUpRight size={14} />
          </motion.span>
        </div>

        <p className="mt-5 text-pretty text-[15px] leading-relaxed text-ink/85">
          <span className="text-ink">{project.tagline}</span>{' '}
          <span className="text-ink-muted">{project.description}</span>
        </p>

        <span
          className={`mt-7 block h-px w-full bg-gradient-to-r ${accentRail[project.accent]}`}
        />

        <ul className="mt-6 grid gap-2.5">
          {project.impact.map((i) => (
            <li key={i} className="flex gap-3 text-[14px] leading-relaxed text-ink/85">
              <span
                aria-hidden
                className={`mt-2 inline-block h-1 w-1 shrink-0 rounded-full ${accentDot[project.accent]}`}
              />
              <span>{i}</span>
            </li>
          ))}
        </ul>

        <div className="mt-7 flex flex-wrap gap-1.5">
          {project.stack.map((t) => (
            <Badge key={t} variant="default">
              {t}
            </Badge>
          ))}
        </div>

        {project.caseStudy ? (
          <>
            <CaseStudy open={open} data={project.caseStudy} accent={project.accent} />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              className="group/btn mt-7 inline-flex items-center gap-2 self-start font-mono text-[11.5px] uppercase tracking-[0.24em] text-ink-muted transition-colors hover:text-ink"
            >
              <span>{open ? 'collapse' : 'deep dive'}</span>
              <ChevronDown
                size={14}
                className={cn(
                  'transition-transform duration-300',
                  open ? '-rotate-180' : 'rotate-0',
                  accentText[project.accent],
                )}
              />
            </button>
          </>
        ) : null}
      </GlassCard>
    </Reveal>
  );
}
