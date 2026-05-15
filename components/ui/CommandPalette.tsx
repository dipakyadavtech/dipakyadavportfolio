'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowUpRight,
  ChevronRight,
  CornerDownLeft,
  Copy,
  Link as LinkIcon,
  Linkedin,
  Mail,
  MoveDown,
  MoveUp,
  Phone,
  Search,
} from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { NAV_LINKS, SITE, SOCIAL_LINKS } from '@/lib/constants';

type Cmd = {
  id: string;
  label: string;
  group: 'jump' | 'contact' | 'action';
  hint?: string;
  icon: typeof Search;
  run: () => void;
  keywords?: string[];
};

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [cursor, setCursor] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery('');
    setCursor(0);
  }, []);

  const flashToast = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 1800);
  }, []);

  const copy = useCallback(
    (text: string, label: string) => {
      navigator.clipboard?.writeText(text).then(
        () => flashToast(`${label} copied`),
        () => flashToast(`couldn’t copy ${label.toLowerCase()}`),
      );
    },
    [flashToast],
  );

  const goto = useCallback((hash: string) => {
    const el = document.querySelector(hash);
    if (el) (el as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'start' });
    else window.location.hash = hash;
  }, []);

  const commands: Cmd[] = useMemo(() => {
    const jumps: Cmd[] = NAV_LINKS.map((l) => ({
      id: `jump-${l.id}`,
      label: `Jump to ${l.label}`,
      group: 'jump',
      hint: l.href,
      icon: ChevronRight,
      run: () => {
        goto(l.href);
        close();
      },
      keywords: [l.id, l.label, 'go', 'navigate', 'section'],
    }));

    const top: Cmd = {
      id: 'jump-top',
      label: 'Back to top',
      group: 'jump',
      hint: '#top',
      icon: ChevronRight,
      run: () => {
        goto('#top');
        close();
      },
      keywords: ['top', 'hero', 'home', 'start'],
    };

    const contact: Cmd[] = [
      {
        id: 'copy-email',
        label: `Copy email · ${SITE.email}`,
        group: 'contact',
        hint: 'clipboard',
        icon: Copy,
        run: () => {
          copy(SITE.email, 'Email');
        },
        keywords: ['email', 'mail', 'gmail', 'copy', 'reach'],
      },
      {
        id: 'open-email',
        label: 'Open email client',
        group: 'contact',
        hint: 'mailto:',
        icon: Mail,
        run: () => {
          window.location.href = SOCIAL_LINKS.email;
        },
        keywords: ['email', 'mailto', 'compose', 'write'],
      },
      {
        id: 'copy-phone',
        label: `Copy phone · ${SITE.phone}`,
        group: 'contact',
        hint: 'clipboard',
        icon: Phone,
        run: () => {
          copy(SITE.phone, 'Phone');
        },
        keywords: ['phone', 'call', 'mobile', 'number'],
      },
      {
        id: 'open-linkedin',
        label: 'Open LinkedIn profile',
        group: 'contact',
        hint: 'external',
        icon: Linkedin,
        run: () => {
          window.open(SOCIAL_LINKS.linkedin, '_blank', 'noreferrer');
        },
        keywords: ['linkedin', 'profile', 'professional', 'network'],
      },
    ];

    const actions: Cmd[] = [
      {
        id: 'copy-url',
        label: 'Copy link to this page',
        group: 'action',
        hint: 'share',
        icon: LinkIcon,
        run: () => {
          copy(window.location.href, 'Link');
        },
        keywords: ['share', 'url', 'link', 'copy'],
      },
    ];

    return [...jumps, top, ...contact, ...actions];
  }, [close, copy, goto]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => {
      const hay = [c.label, c.group, c.hint ?? '', ...(c.keywords ?? [])]
        .join(' ')
        .toLowerCase();
      return q.split(/\s+/).every((tok) => hay.includes(tok));
    });
  }, [commands, query]);

  // Cursor must stay within filtered list when query changes.
  useEffect(() => {
    setCursor((c) => Math.min(c, Math.max(filtered.length - 1, 0)));
  }, [filtered.length]);

  // Global keyboard listener for ⌘K / ctrl-K and Escape.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if ((e.metaKey || e.ctrlKey) && k === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      if (e.key === 'Escape' && open) {
        e.preventDefault();
        close();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close]);

  useEffect(() => {
    if (open) {
      // Defer focus so the AnimatePresence enter finishes first.
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  // Expose a global so the navbar / status row can trigger open without prop drilling.
  useEffect(() => {
    (window as unknown as { __openCmdK?: () => void }).__openCmdK = () => setOpen(true);
    return () => {
      delete (window as unknown as { __openCmdK?: () => void }).__openCmdK;
    };
  }, []);

  const groups = useMemo(() => {
    const byGroup: Record<Cmd['group'], Cmd[]> = { jump: [], contact: [], action: [] };
    filtered.forEach((c) => byGroup[c.group].push(c));
    return [
      { id: 'jump' as const, label: 'Jump to', items: byGroup.jump },
      { id: 'contact' as const, label: 'Contact', items: byGroup.contact },
      { id: 'action' as const, label: 'Actions', items: byGroup.action },
    ].filter((g) => g.items.length > 0);
  }, [filtered]);

  // Translate cursor index to absolute item.
  const activeCmd = filtered[cursor];

  return (
    <>
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-start justify-center bg-bg/70 px-4 pt-[18vh] backdrop-blur-md sm:pt-[14vh]"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) close();
            }}
          >
            <motion.div
              initial={{ y: 12, opacity: 0, scale: 0.985 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 6, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 280, damping: 28 }}
              className="glass-strong w-full max-w-xl overflow-hidden rounded-2xl border border-border-strong shadow-[0_40px_120px_-20px_rgba(0,0,0,0.7)]"
              role="dialog"
              aria-label="Command palette"
            >
              <div className="flex items-center gap-3 border-b border-border px-4 py-3">
                <Search size={15} className="text-ink-muted" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setCursor(0);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowDown') {
                      e.preventDefault();
                      setCursor((c) => Math.min(c + 1, filtered.length - 1));
                    } else if (e.key === 'ArrowUp') {
                      e.preventDefault();
                      setCursor((c) => Math.max(c - 1, 0));
                    } else if (e.key === 'Enter') {
                      e.preventDefault();
                      activeCmd?.run();
                    }
                  }}
                  placeholder="Jump, copy email, open linkedin…"
                  className="flex-1 bg-transparent text-[15px] text-ink placeholder:text-ink-subtle focus:outline-none"
                  aria-label="Filter commands"
                />
                <kbd className="hidden rounded border border-border-strong bg-white/[0.04] px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted sm:inline-block">
                  esc
                </kbd>
              </div>

              <div className="max-h-[60vh] overflow-y-auto py-2">
                {groups.length === 0 ? (
                  <p className="px-4 py-6 text-center text-sm text-ink-muted">
                    No matches for &ldquo;{query}&rdquo;.
                  </p>
                ) : (
                  groups.map((g) => (
                    <div key={g.id} className="px-2 pb-2">
                      <p className="px-3 py-2 font-mono text-[10px] uppercase tracking-[0.24em] text-ink-subtle">
                        {g.label}
                      </p>
                      <ul>
                        {g.items.map((c) => {
                          const idx = filtered.indexOf(c);
                          const isActive = idx === cursor;
                          const Icon = c.icon;
                          return (
                            <li key={c.id}>
                              <button
                                type="button"
                                onMouseMove={() => setCursor(idx)}
                                onClick={() => c.run()}
                                className={
                                  'group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ' +
                                  (isActive
                                    ? 'bg-white/[0.06] text-ink ring-1 ring-white/[0.08]'
                                    : 'text-ink/85 hover:bg-white/[0.04]')
                                }
                              >
                                <span
                                  className={
                                    'grid h-7 w-7 place-items-center rounded-lg border border-border-strong bg-white/[0.04] ' +
                                    (isActive ? 'text-accent-cyan' : 'text-ink-muted')
                                  }
                                >
                                  <Icon size={13} />
                                </span>
                                <span className="flex-1 truncate text-[14px]">{c.label}</span>
                                {c.hint ? (
                                  <span className="hidden font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-subtle sm:inline">
                                    {c.hint}
                                  </span>
                                ) : null}
                                {isActive ? (
                                  <CornerDownLeft size={13} className="text-ink-muted" />
                                ) : null}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))
                )}
              </div>

              <div className="flex items-center justify-between border-t border-border bg-white/[0.02] px-4 py-2.5 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-subtle">
                <span className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1">
                    <MoveUp size={11} />
                    <MoveDown size={11} />
                    navigate
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <CornerDownLeft size={11} /> run
                  </span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan shadow-[0_0_10px_rgba(91,234,255,0.8)]" />
                  command palette
                </span>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {toast ? (
          <motion.div
            key={toast}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-6 left-1/2 z-[110] -translate-x-1/2"
          >
            <div className="glass-strong inline-flex items-center gap-2 rounded-full border border-border-strong px-4 py-2 text-[13px] text-ink">
              <ArrowUpRight size={13} className="text-accent-cyan" />
              {toast}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
