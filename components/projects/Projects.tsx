import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProjectCard } from './ProjectCard';
import { PROJECTS } from '@/lib/data';

export function Projects() {
  const [featured, ...rest] = PROJECTS;

  return (
    <section id="projects" className="relative scroll-mt-24 py-28 sm:py-36">
      <div className="container">
        <SectionHeading
          eyebrow="Selected work"
          title={
            <>
              Production case studies.{' '}
              <span className="text-gradient-accent">Real impact, real metrics.</span>
            </>
          }
          description="Six engagements over six years — observability, streaming pipelines, event-driven backends, and the multi-tenant platforms underneath them."
        />

        <div className="mt-16 grid gap-6">
          <ProjectCard project={featured} index={0} featured />
          <div className="grid gap-6 lg:grid-cols-2">
            {rest.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i + 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
