import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Props = {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'cyan' | 'violet' | 'gold';
};

const variants: Record<NonNullable<Props['variant']>, string> = {
  default: 'text-ink-muted border-border-strong bg-white/[0.03]',
  cyan: 'text-accent-cyan border-accent-cyan/30 bg-accent-cyan/[0.06]',
  violet: 'text-accent-violet border-accent-violet/30 bg-accent-violet/[0.06]',
  gold: 'text-accent-gold border-accent-gold/30 bg-accent-gold/[0.06]',
};

export function Badge({ children, className, variant = 'default' }: Props) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.16em]',
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
