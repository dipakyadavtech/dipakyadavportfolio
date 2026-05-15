import { Linkedin, Mail } from 'lucide-react';
import { SITE, SOCIAL_LINKS, NAV_LINKS } from '@/lib/constants';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative z-10 border-t border-border pt-16 pb-10">
      <div className="container">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="flex items-center gap-2.5">
              <span className="grid h-7 w-7 place-items-center rounded-md border border-border-strong bg-white/[0.04] font-mono text-[11px] tracking-tight text-ink">
                DY
              </span>
              <span className="text-sm font-medium tracking-tight text-ink">{SITE.shortName}</span>
            </p>
            <p className="mt-4 max-w-sm text-pretty text-[13.5px] leading-relaxed text-ink-muted">
              {SITE.role} · {SITE.focus}.
            </p>
          </div>

          <nav>
            <p className="text-[11px] uppercase tracking-[0.24em] text-ink-subtle">Sitemap</p>
            <ul className="mt-4 flex flex-col gap-2.5 text-[13.5px]">
              {NAV_LINKS.map((l) => (
                <li key={l.id}>
                  <a className="text-ink-muted transition hover:text-ink" href={l.href}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-[11px] uppercase tracking-[0.24em] text-ink-subtle">Reach out</p>
            <ul className="mt-4 flex flex-col gap-2.5 text-[13.5px]">
              <li>
                <a
                  className="inline-flex items-center gap-2 text-ink-muted transition hover:text-ink"
                  href={SOCIAL_LINKS.email}
                >
                  <Mail size={13} /> {SITE.email}
                </a>
              </li>
              <li>
                <a
                  className="inline-flex items-center gap-2 text-ink-muted transition hover:text-ink"
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Linkedin size={13} /> /in/dipakyadav28
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-2 border-t border-border pt-6 text-[12px] text-ink-subtle sm:flex-row sm:items-center">
          <p>© {year} {SITE.shortName}. Crafted with care.</p>
          <p className="font-mono uppercase tracking-[0.22em]">v1.0 · production</p>
        </div>
      </div>
    </footer>
  );
}
