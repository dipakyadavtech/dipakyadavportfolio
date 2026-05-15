'use client';

import { motion, useReducedMotion, useTransform, type MotionValue } from 'framer-motion';
import { useRef } from 'react';
import { useMouseParallax } from '@/hooks/useMouseParallax';
import { ActivityBars } from './ActivityBars';
import { EventStream } from './EventStream';

type Accent = 'cyan' | 'violet' | 'gold';
type Layer = {
  label: string;
  sub: string;
  z: number;
  tilt: number;
  accent: Accent;
  gradient: string;
  metric: string;
};

const LAYERS: Layer[] = [
  {
    label: 'Apache Kafka',
    sub: '50K+ events/day · sub-second',
    z: 120,
    tilt: -6,
    accent: 'cyan',
    gradient: 'from-accent-cyan/30 to-accent-violet/30',
    metric: 'p99 · 412ms',
  },
  {
    label: 'Kubernetes · GitOps',
    sub: 'Terraform · ArgoCD · Helm',
    z: 60,
    tilt: 3,
    accent: 'violet',
    gradient: 'from-accent-violet/30 to-accent-cyan/20',
    metric: '20+ tenants · 0 downtime',
  },
  {
    label: 'LGTM Observability',
    sub: 'Prometheus · Loki · Tempo · Grafana',
    z: 0,
    tilt: -2,
    accent: 'gold',
    gradient: 'from-accent-gold/30 to-accent-violet/20',
    metric: 'MTTR · -45%',
  },
];

function ParallaxLayer({
  layer,
  mx,
  my,
  index,
}: {
  layer: Layer;
  mx: MotionValue<number>;
  my: MotionValue<number>;
  index: number;
}) {
  const depth = (layer.z + 60) / 30;
  const x = useTransform(mx, (v) => v * depth);
  const y = useTransform(my, (v) => v * depth);
  const rotX = useTransform(my, (v) => v * 0.6 + layer.tilt);
  const rotY = useTransform(mx, (v) => -v * 0.6);

  return (
    <motion.div
      style={{
        x,
        y,
        rotateX: rotX,
        rotateY: rotY,
        translateZ: layer.z,
        zIndex: 10 + index,
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.2 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="absolute left-1/2 top-1/2 w-[78%] max-w-md -translate-x-1/2 -translate-y-1/2"
    >
      <div
        className={`relative rounded-2xl border border-white/15 bg-gradient-to-br ${layer.gradient} p-[1px] shadow-card`}
      >
        <div className="rounded-[15px] bg-bg-elevated/85 px-6 py-5 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.24em] text-ink-muted">
                layer {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-1 text-lg font-semibold tracking-tight text-ink">{layer.label}</h3>
            </div>
            <span className="h-2 w-2 rounded-full bg-accent-cyan shadow-[0_0_12px_rgba(91,234,255,0.8)] animate-pulse-glow" />
          </div>
          <div className="mt-3 flex items-baseline justify-between gap-3 font-mono text-[11px] text-ink-muted">
            <span>{layer.sub}</span>
            <span className="text-ink/70">{layer.metric}</span>
          </div>
          <ActivityBars accent={layer.accent} seed={index * 17 + 3} />
        </div>
      </div>
    </motion.div>
  );
}

export function Scene3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { x, y } = useMouseParallax(containerRef, { strength: 30 });
  const gridX = useTransform(x, (v) => (reduce ? 0 : v * 0.4));
  const gridY = useTransform(y, (v) => (reduce ? 0 : v * 0.4));

  return (
    <div
      ref={containerRef}
      className="relative aspect-[5/4] w-full"
      style={{ perspective: '1400px', perspectiveOrigin: '50% 50%' }}
    >
      <div
        className="absolute inset-0"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Backdrop grid */}
        <motion.div
          aria-hidden
          style={{
            transformStyle: 'preserve-3d',
            translateZ: -120,
            x: gridX,
            y: gridY,
          }}
          className="absolute inset-6 rounded-3xl border border-white/5 bg-grid-fade bg-[size:32px_32px] opacity-50 mask-fade-b"
        />

        {/* Glow halo */}
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(91,234,255,0.25),transparent_60%)] blur-2xl"
        />

        {/* Live event stream — flowing dots connecting the layers */}
        <EventStream />

        {LAYERS.map((l, i) => (
          <ParallaxLayer key={l.label} layer={l} mx={x} my={y} index={i} />
        ))}

        {/* Floating mono labels */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.65 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute right-3 top-3 font-mono text-[10px] uppercase tracking-[0.28em] text-ink-muted"
        >
          ↘ production · live
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.65 }}
          transition={{ duration: 1, delay: 0.95 }}
          className="absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-[0.28em] text-ink-muted"
        >
          uptime · 99.95%
        </motion.span>
      </div>
    </div>
  );
}
