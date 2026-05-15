# dipakyadavportfolio

Personal portfolio for **Dipak S. Yadav** — Senior Software Engineer, platform &
observability engineering. Live site: <https://thinkinbits.in>

Built as a single-page Next.js App Router site with a 3D parallax hero, animated
data-flow visualization, a working `⌘K` command palette, scroll-driven section
indicators, animated metric counters, and per-project deep-dive case studies
(Problem · Approach · Outcome + architecture flow).

## Stack

- Next.js 16 (App Router, Turbopack)
- TypeScript · React 18
- Tailwind CSS · tailwindcss-animate
- Framer Motion
- Geist Sans + Geist Mono
- Lucide icons

## Local development

```bash
npm install
npm run dev        # next dev -p 3001
npm run build      # next build
npm run start      # next start -p 3001
npm run lint       # next lint
npm run typecheck  # tsc --noEmit
```

The dev server runs on port **3001** by convention; change it in `package.json`
if you need something else.

## Project layout

```
app/                    Next.js App Router entry (layout, page, globals)
components/
  hero/                 3D scene, status badge, activity bars, event stream
  about/  experience/   Section content
  projects/             Project cards + expandable case studies
  skills/  education/   Section content
  achievements/         Animated metric grid
  contact/  footer/     Section content
  navbar/               Top nav with active-section tracking + ⌘K hint
  ui/                   Reusable primitives (GlassCard, Button, Badge,
                        SectionHeading, AnimatedNumber, ScrollProgress,
                        SectionIndicator, CommandPalette, GradientText)
  animations/           Reveal wrapper, MagneticButton, ParticleField,
                        Framer Motion variants
hooks/                  useScroll, useIntersection, useMouseParallax
lib/                    constants (site metadata), data (projects, metrics,
                        experience, skills, education), cn() utility
public/                 Static assets
```

## Notes

- Respects `prefers-reduced-motion` — all animations gate on
  `useReducedMotion()` and CSS prefers-reduced-motion media query.
- All metric numerals use `tabular-nums` so animated counters don't jitter.
- The hero IST clock and command palette are SSR-safe.

## License

All rights reserved. Code is published for reference; copy is owned by Dipak.
