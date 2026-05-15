'use client';

import { animate, useInView, useMotionValue, useReducedMotion, useTransform } from 'framer-motion';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

type Parsed = {
  prefix: string;
  number: number;
  decimals: number;
  scaleSuffix: string;
  percent: boolean;
  plus: boolean;
};

function parse(value: string): Parsed | null {
  const match = value.match(/^(\$?)(\d+(?:\.\d+)?)([KMB]?)(%?)(\+?)$/);
  if (!match) return null;
  const [, prefix, num, scale, percent, plus] = match;
  const decimals = num.includes('.') ? num.split('.')[1].length : 0;
  return {
    prefix,
    number: parseFloat(num),
    decimals,
    scaleSuffix: scale,
    percent: percent === '%',
    plus: plus === '+',
  };
}

type Props = {
  value: string;
  className?: string;
  duration?: number;
  delay?: number;
};

export function AnimatedNumber({ value, className, duration = 1.8, delay = 0 }: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });
  const mv = useMotionValue(0);
  const parsed = parse(value);

  // Format on the fly so the display stays in sync with the motion value.
  const display = useTransform(mv, (latest) => {
    if (!parsed) return value;
    const v = parsed.decimals > 0 ? latest.toFixed(parsed.decimals) : Math.round(latest).toString();
    return `${parsed.prefix}${v}${parsed.scaleSuffix}${parsed.percent ? '%' : ''}${parsed.plus ? '+' : ''}`;
  });

  useEffect(() => {
    if (!parsed) return;
    if (reduce) {
      mv.set(parsed.number);
      return;
    }
    if (!inView) return;
    const controls = animate(mv, parsed.number, {
      duration,
      delay,
      ease: [0.22, 1, 0.36, 1],
    });
    return controls.stop;
  }, [inView, reduce, parsed, mv, duration, delay]);

  if (!parsed) {
    return <span className={className}>{value}</span>;
  }

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  );
}
