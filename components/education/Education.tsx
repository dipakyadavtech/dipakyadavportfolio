import { GraduationCap } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/animations/Reveal';
import { GlassCard } from '@/components/ui/GlassCard';
import { EDUCATION } from '@/lib/data';

export function Education() {
  return (
    <section id="education" className="relative scroll-mt-24 py-28 sm:py-36">
      <div className="container">
        <SectionHeading
          eyebrow="Education"
          title={
            <>
              Where the foundations were{' '}
              <span className="text-gradient-accent">laid.</span>
            </>
          }
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {EDUCATION.map((e, i) => (
            <Reveal key={e.degree} delay={i * 0.05}>
              <GlassCard interactive accent="violet" className="flex items-start gap-5 p-7 sm:p-8">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-border-strong bg-white/[0.04] text-accent-violet">
                  <GraduationCap size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight text-ink">{e.degree}</h3>
                  <p className="mt-1 text-[14px] text-ink-muted">{e.institution}</p>
                  {e.detail ? (
                    <p className="mt-2 font-mono text-[11.5px] uppercase tracking-[0.18em] text-ink-subtle">
                      {e.detail}
                    </p>
                  ) : null}
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
