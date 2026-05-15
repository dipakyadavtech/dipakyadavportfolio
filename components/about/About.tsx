import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { Reveal } from '@/components/animations/Reveal';
import { CORE_EXPERTISE } from '@/lib/data';

export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-28 sm:py-36">
      <div className="container">
        <SectionHeading
          eyebrow="About"
          title={
            <>
              Reliability is a feature.{' '}
              <span className="text-gradient-accent">Someone has to ship it.</span>
            </>
          }
          description="I’m a platform engineer who treats production like a product — every service traced, every alert intentional, every dollar of cloud spend defensible."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <GlassCard className="h-full p-7 sm:p-9">
              <div className="space-y-5 text-[15px] leading-relaxed text-ink/85 sm:text-base">
                <p>
                  Over the past six years at Sarvaha, I’ve owned the design of multi-tenant SaaS
                  platforms for Illumio, ApexaIQ, and Tesla’s connected-car program — turning
                  Apache Kafka, Kubernetes and the LGTM stack into systems teams actually trust at
                  2am.
                </p>
                <p>
                  The work I’m proudest of isn’t the scale (though we hit{' '}
                  <span className="text-ink">50K+ events/day</span> sub-second into BigQuery).
                  It’s the silence — alerts that only fire when something real happens,
                  dashboards engineers actually open, runbooks that cut MTTR by{' '}
                  <span className="text-ink">45%</span>.
                </p>
                <p>
                  I work end-to-end across architecture, infrastructure, and the long tail of
                  operational glue that keeps distributed systems honest. Java and Spring Boot
                  for event-driven backends, Terraform and ArgoCD for GitOps, Prometheus/Loki/
                  Tempo for the parts you only notice when they’re broken.
                </p>
              </div>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.1}>
            <GlassCard strong className="h-full p-7 sm:p-8">
              <p className="text-xs uppercase tracking-[0.28em] text-ink-muted">Core expertise</p>
              <ul className="mt-5 flex flex-wrap gap-1.5">
                {CORE_EXPERTISE.map((c) => (
                  <li
                    key={c}
                    className="rounded-full border border-border bg-white/[0.025] px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-muted"
                  >
                    {c}
                  </li>
                ))}
              </ul>
              <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent" />
              <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.22em] text-ink-muted">Based</dt>
                  <dd className="mt-1 text-ink">India · remote</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.22em] text-ink-muted">
                    Experience
                  </dt>
                  <dd className="mt-1 text-ink">6+ years</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.22em] text-ink-muted">
                    Focus
                  </dt>
                  <dd className="mt-1 text-ink">Platform · SRE</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.22em] text-ink-muted">Open to</dt>
                  <dd className="mt-1 text-ink">Senior / Staff roles</dd>
                </div>
              </dl>
            </GlassCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
