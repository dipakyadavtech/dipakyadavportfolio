import { Reveal } from '@/components/animations/Reveal';
import { GlassCard } from '@/components/ui/GlassCard';
import type { SkillGroup as SkillGroupType } from '@/lib/data';

type Props = { group: SkillGroupType; index: number };

export function SkillGroup({ group, index }: Props) {
  return (
    <Reveal delay={index * 0.04}>
      <GlassCard interactive accent="cyan" className="h-full p-6 sm:p-7">
        <div className="flex items-baseline justify-between">
          <h3 className="text-sm font-medium tracking-tight text-ink">{group.category}</h3>
          <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-subtle">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {group.items.map((item) => (
            <li
              key={item}
              className="rounded-md border border-border bg-white/[0.025] px-2.5 py-1 font-mono text-[11.5px] text-ink/85"
            >
              {item}
            </li>
          ))}
        </ul>
      </GlassCard>
    </Reveal>
  );
}
