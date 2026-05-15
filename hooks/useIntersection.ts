'use client';

import { useEffect, useState, type RefObject } from 'react';

export function useIntersection(
  ref: RefObject<Element | null>,
  options: IntersectionObserverInit = { threshold: 0.3, rootMargin: '-10% 0px -20% 0px' },
) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), options);
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, options]);

  return active;
}
