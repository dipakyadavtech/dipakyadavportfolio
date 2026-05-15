'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';
import { forwardRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

type ButtonProps = Omit<HTMLMotionProps<'button'>, 'children'> & {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
};

const base =
  'group relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/60 disabled:cursor-not-allowed disabled:opacity-50';

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-sm',
  lg: 'h-12 px-7 text-[15px]',
};

const variants: Record<Variant, string> = {
  primary:
    'text-bg shadow-glow [&>span.surface]:bg-gradient-to-r [&>span.surface]:from-accent-cyan [&>span.surface]:via-white [&>span.surface]:to-accent-violet',
  secondary:
    'text-ink border border-border-strong bg-white/[0.04] hover:bg-white/[0.07] hover:border-white/20',
  ghost: 'text-ink/80 hover:text-ink hover:bg-white/[0.04]',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', className, children, ...rest },
  ref,
) {
  return (
    <motion.button
      ref={ref}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 340, damping: 22 }}
      className={cn(base, sizes[size], variants[variant], className)}
      {...rest}
    >
      {variant === 'primary' && (
        <>
          <span className="surface absolute inset-0 rounded-full" aria-hidden />
          <span
            aria-hidden
            className="absolute inset-0 rounded-full bg-gradient-to-r from-accent-cyan/60 via-white/30 to-accent-violet/60 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
          />
        </>
      )}
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </motion.button>
  );
});
