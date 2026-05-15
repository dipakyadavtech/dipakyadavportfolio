'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';
import { fadeUp } from './variants';
import { cn } from '@/lib/utils';

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variants?: Variants;
  as?: 'div' | 'section' | 'li' | 'article' | 'header';
  once?: boolean;
  margin?: string;
};

export function Reveal({
  children,
  className,
  delay = 0,
  variants = fadeUp,
  as = 'div',
  once = true,
  margin = '-80px',
}: RevealProps) {
  const reduce = useReducedMotion();
  const Comp = motion[as];

  if (reduce) {
    return <Comp className={cn(className)}>{children}</Comp>;
  }

  return (
    <Comp
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: margin as `-${number}px` }}
      variants={variants}
      transition={{ delay }}
      className={cn(className)}
    >
      {children}
    </Comp>
  );
}
