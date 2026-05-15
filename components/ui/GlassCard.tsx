'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Props = Omit<HTMLMotionProps<'div'>, 'children'> & {
  children: ReactNode;
  className?: string;
  strong?: boolean;
  accent?: 'cyan' | 'violet' | 'gold' | 'none';
  interactive?: boolean;
};

const accentGlow: Record<NonNullable<Props['accent']>, string> = {
  cyan: 'before:bg-[radial-gradient(400px_circle_at_var(--mx,50%)_var(--my,50%),rgba(91,234,255,0.15),transparent_55%)]',
  violet:
    'before:bg-[radial-gradient(400px_circle_at_var(--mx,50%)_var(--my,50%),rgba(167,139,250,0.18),transparent_55%)]',
  gold: 'before:bg-[radial-gradient(400px_circle_at_var(--mx,50%)_var(--my,50%),rgba(245,192,106,0.15),transparent_55%)]',
  none: '',
};

export function GlassCard({
  children,
  className,
  strong = false,
  accent = 'none',
  interactive = false,
  ...rest
}: Props) {
  return (
    <motion.div
      whileHover={interactive ? { y: -4 } : undefined}
      transition={{ type: 'spring', stiffness: 240, damping: 20 }}
      onMouseMove={(e) => {
        if (!interactive) return;
        const rect = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width) * 100}%`);
        e.currentTarget.style.setProperty('--my', `${((e.clientY - rect.top) / rect.height) * 100}%`);
      }}
      className={cn(
        'group relative overflow-hidden rounded-2xl',
        strong ? 'glass-strong' : 'glass',
        'before:pointer-events-none before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-500',
        interactive && accentGlow[accent],
        interactive && 'hover:before:opacity-100',
        className,
      )}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
