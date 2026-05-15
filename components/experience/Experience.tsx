import { SectionHeading } from '@/components/ui/SectionHeading';
import { TimelineCard } from './TimelineCard';
import { EXPERIENCES } from '@/lib/data';

export function Experience() {
  return (
    <section id="experience" className="relative scroll-mt-24 py-28 sm:py-36">
      <div className="container">
        <SectionHeading
          eyebrow="Experience"
          title={<>Six years. <span className="text-gradient-accent">One mission.</span></>}
          description="Senior platform engineer at Sarvaha Systems — embedded with enterprise clients to design, ship, and operate the distributed systems they bet their products on."
        />

        <ol className="relative mt-16">
          <span
            aria-hidden
            className="absolute left-3 top-0 h-full w-px bg-gradient-to-b from-accent-cyan/0 via-accent-cyan/40 to-accent-cyan/0 sm:left-5"
          />
          <div className="space-y-12">
            {EXPERIENCES.map((e, i) => (
              <TimelineCard key={e.company + i} item={e} index={i} />
            ))}
          </div>
        </ol>
      </div>
    </section>
  );
}
