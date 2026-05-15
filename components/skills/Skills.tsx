import { SectionHeading } from '@/components/ui/SectionHeading';
import { SkillGroup } from './SkillGroup';
import { SKILL_GROUPS } from '@/lib/data';

export function Skills() {
  return (
    <section id="skills" className="relative scroll-mt-24 py-28 sm:py-36">
      <div className="container">
        <SectionHeading
          eyebrow="Toolkit"
          title={
            <>
              The stack I ship with.{' '}
              <span className="text-gradient-accent">End-to-end.</span>
            </>
          }
          description="Languages and frameworks I reach for daily — from event-driven backends to the observability tooling that makes them honest."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SKILL_GROUPS.map((g, i) => (
            <SkillGroup key={g.category} group={g} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
