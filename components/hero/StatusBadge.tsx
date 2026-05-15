'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const TZ = 'Asia/Kolkata';

function useIst() {
  const [time, setTime] = useState<string>('');
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: TZ,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function isWorkingHours(time: string) {
  if (!time) return true;
  const [h] = time.split(':').map((n) => parseInt(n, 10));
  return h >= 9 && h < 22;
}

export function StatusBadge() {
  const time = useIst();
  const working = isWorkingHours(time);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.1 }}
      className="inline-flex items-center gap-3 rounded-full border border-border-strong bg-white/[0.03] px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-muted"
    >
      <span className="relative inline-flex h-1.5 w-1.5">
        <span
          className={
            'absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 ' +
            (working ? 'bg-accent-cyan' : 'bg-accent-violet')
          }
        />
        <span
          className={
            'relative inline-flex h-1.5 w-1.5 rounded-full ' +
            (working ? 'bg-accent-cyan' : 'bg-accent-violet')
          }
        />
      </span>
      <span className="text-ink/90">available for senior + staff platform roles</span>
      <span aria-hidden className="text-ink-subtle">·</span>
      <span className="tabular-nums text-ink-subtle">
        {time || '—:—'}{' '}
        <span className="text-ink-subtle/70">IST</span>
      </span>
    </motion.div>
  );
}
