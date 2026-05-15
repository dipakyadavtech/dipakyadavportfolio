import type { ReactNode } from 'react';
import { Reveal } from '@/components/animations/Reveal';
import { cn } from '@/lib/utils';

type Props = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
};

export function SectionHeading({ eyebrow, title, description, align = 'left', className }: Props) {
  return (
    <div
      className={cn(
        'flex max-w-3xl flex-col',
        align === 'center' ? 'mx-auto items-center text-center' : 'items-start text-left',
        className,
      )}
    >
      {eyebrow ? (
        <Reveal>
          <p className="flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-ink-muted/80">
            <span className="inline-block h-px w-8 bg-gradient-to-r from-accent-cyan/60 to-transparent" />
            {eyebrow}
          </p>
        </Reveal>
      ) : null}
      <Reveal delay={0.05}>
        <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-ink sm:text-4xl md:text-5xl">
          {title}
        </h2>
      </Reveal>
      {description ? (
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-2xl text-pretty text-[15px] leading-relaxed text-ink-muted sm:text-base">
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
