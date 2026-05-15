'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NAV_LINKS, SITE } from '@/lib/constants';
import { useScroll } from '@/hooks/useScroll';
import { cn } from '@/lib/utils';

export function Navbar() {
  const scrolled = useScroll(20);
  const [active, setActive] = useState<string>('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    if (!sections.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0.1, 0.3, 0.6] },
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className={cn(
          'flex w-full max-w-6xl items-center justify-between rounded-full border px-5 py-2.5 transition-all duration-500',
          scrolled
            ? 'glass-strong border-border-strong shadow-card'
            : 'border-transparent bg-transparent',
        )}
      >
        <a href="#top" className="group flex items-center gap-2.5">
          <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-md border border-border-strong bg-white/[0.04] font-mono text-[11px] tracking-tight text-ink">
            DY
            <span className="absolute inset-0 -z-10 rounded-md bg-gradient-to-br from-accent-cyan/30 to-accent-violet/30 opacity-0 blur-md transition-opacity group-hover:opacity-100" />
          </span>
          <span className="hidden text-sm font-medium tracking-tight text-ink sm:inline">
            {SITE.shortName}
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((l) => {
            const isActive = active === l.id;
            return (
              <li key={l.id}>
                <a
                  href={l.href}
                  className={cn(
                    'relative rounded-full px-3.5 py-1.5 text-[13px] tracking-tight transition-colors',
                    isActive ? 'text-ink' : 'text-ink-muted hover:text-ink',
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full bg-white/[0.07] ring-1 ring-white/10"
                      transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                    />
                  )}
                  {l.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          <button
            type="button"
            onClick={() =>
              (window as unknown as { __openCmdK?: () => void }).__openCmdK?.()
            }
            className="group inline-flex items-center gap-2 rounded-full border border-border-strong bg-white/[0.04] px-3 py-1.5 text-[12.5px] tracking-tight text-ink-muted transition hover:border-white/20 hover:bg-white/[0.07] hover:text-ink"
            aria-label="Open command palette"
          >
            <span>Search</span>
            <kbd className="rounded border border-border-strong/80 bg-white/[0.04] px-1.5 py-0.5 font-mono text-[10px] tracking-[0.18em] text-ink-muted">
              ⌘K
            </kbd>
          </button>
          <a
            href="#contact"
            className="rounded-full border border-border-strong bg-white/[0.04] px-4 py-1.5 text-[13px] tracking-tight text-ink transition hover:border-white/20 hover:bg-white/[0.07]"
          >
            Get in touch
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-full border border-border-strong bg-white/[0.04] p-2 text-ink md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={16} /> : <Menu size={16} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute left-4 right-4 top-full mt-2 rounded-2xl border border-border-strong glass-strong p-3 md:hidden"
          >
            <ul className="flex flex-col">
              {NAV_LINKS.map((l) => (
                <li key={l.id}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-3 text-sm text-ink-muted hover:bg-white/[0.04] hover:text-ink"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="mt-1 block rounded-xl bg-white/[0.06] px-4 py-3 text-center text-sm text-ink"
                >
                  Get in touch
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
