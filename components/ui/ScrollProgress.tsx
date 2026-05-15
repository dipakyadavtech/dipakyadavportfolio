'use client';

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const spring = useSpring(scrollYProgress, { stiffness: 220, damping: 32, mass: 0.4 });
  const opacity = useTransform(scrollYProgress, [0, 0.02, 1], [0, 1, 1]);

  return (
    <motion.div
      aria-hidden
      style={{ scaleX: spring, opacity }}
      className="fixed inset-x-0 top-0 z-[60] h-px origin-left bg-gradient-to-r from-accent-cyan via-accent-violet to-accent-gold"
    />
  );
}
