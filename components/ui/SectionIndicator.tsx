'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { NAV_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function SectionIndicator() {
  const [active, setActive] = useState<string>('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(
      Boolean,
    ) as HTMLElement[];
    if (!sections.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0.05, 0.3, 0.6] },
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  if (!mounted) return null;

  return (
    <motion.aside
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
      aria-hidden
      className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
    >
      <ul className="flex flex-col items-end gap-3">
        {NAV_LINKS.map((l) => {
          const isActive = active === l.id;
          return (
            <li key={l.id}>
              <a
                href={l.href}
                className="group flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.22em]"
              >
                <span
                  className={cn(
                    'transition-all duration-300',
                    isActive
                      ? 'text-ink opacity-100'
                      : 'translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 text-ink-muted',
                  )}
                >
                  {l.label.toLowerCase()}
                </span>
                <span className="relative grid h-3 w-3 place-items-center">
                  <span
                    className={cn(
                      'h-px transition-all duration-500',
                      isActive ? 'w-3 bg-accent-cyan' : 'w-2 bg-white/25 group-hover:bg-white/50',
                    )}
                  />
                  {isActive ? (
                    <motion.span
                      layoutId="section-dot"
                      transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                      className="absolute -right-0.5 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-accent-cyan shadow-[0_0_10px_rgba(91,234,255,0.8)]"
                    />
                  ) : null}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </motion.aside>
  );
}
