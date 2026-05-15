'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Linkedin, Mail, Phone } from 'lucide-react';
import { Reveal } from '@/components/animations/Reveal';
import { Button } from '@/components/ui/Button';
import { MagneticButton } from '@/components/animations/MagneticButton';
import { SITE, SOCIAL_LINKS } from '@/lib/constants';

const channels = [
  {
    icon: Mail,
    label: 'Email',
    value: SITE.email,
    href: SOCIAL_LINKS.email,
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/dipakyadav28',
    href: SOCIAL_LINKS.linkedin,
  },
  {
    icon: Phone,
    label: 'Phone',
    value: SITE.phone,
    href: SOCIAL_LINKS.phone,
  },
];

export function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-24 py-28 sm:py-36">
      <div className="container">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border-strong glass-strong p-8 sm:p-12 md:p-16">
            <motion.div
              aria-hidden
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="pointer-events-none absolute -left-20 -top-32 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(91,234,255,0.18),transparent_60%)] blur-3xl"
            />
            <motion.div
              aria-hidden
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="pointer-events-none absolute -right-20 -bottom-32 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.18),transparent_60%)] blur-3xl"
            />

            <div className="relative grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
              <div>
                <p className="text-xs uppercase tracking-[0.32em] text-ink-muted">Let’s talk</p>
                <h2 className="mt-5 text-balance text-4xl font-semibold tracking-tight text-ink sm:text-5xl md:text-6xl">
                  Have a platform that{' '}
                  <span className="text-gradient-accent">needs to scale quietly?</span>
                </h2>
                <p className="mt-6 max-w-xl text-pretty text-[15px] leading-relaxed text-ink-muted sm:text-base">
                  Open to senior and staff-level platform, SRE and backend roles. Happy to talk about
                  observability rebuilds, Kafka migrations, or anything multi-tenant.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <MagneticButton>
                    <a href={SOCIAL_LINKS.email}>
                      <Button variant="primary" size="lg">
                        Email me
                        <ArrowUpRight size={16} />
                      </Button>
                    </a>
                  </MagneticButton>
                  <MagneticButton>
                    <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer">
                      <Button variant="secondary" size="lg">
                        LinkedIn
                        <ArrowUpRight size={16} />
                      </Button>
                    </a>
                  </MagneticButton>
                </div>
              </div>

              <ul className="flex flex-col gap-3">
                {channels.map(({ icon: Icon, label, value, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noreferrer' : undefined}
                      className="group flex items-center justify-between gap-4 rounded-2xl border border-border-strong bg-white/[0.025] p-5 transition hover:border-white/20 hover:bg-white/[0.05]"
                    >
                      <span className="flex items-center gap-4">
                        <span className="grid h-10 w-10 place-items-center rounded-xl border border-border-strong bg-white/[0.04] text-ink">
                          <Icon size={16} />
                        </span>
                        <span>
                          <span className="block text-[11px] uppercase tracking-[0.24em] text-ink-muted">
                            {label}
                          </span>
                          <span className="mt-0.5 block text-[14px] font-medium tracking-tight text-ink">
                            {value}
                          </span>
                        </span>
                      </span>
                      <ArrowUpRight
                        size={16}
                        className="text-ink-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
