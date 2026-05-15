import { Navbar } from '@/components/navbar/Navbar';
import { Hero } from '@/components/hero/Hero';
import { About } from '@/components/about/About';
import { Experience } from '@/components/experience/Experience';
import { Projects } from '@/components/projects/Projects';
import { Skills } from '@/components/skills/Skills';
import { Education } from '@/components/education/Education';
import { Achievements } from '@/components/achievements/Achievements';
import { Contact } from '@/components/contact/Contact';
import { Footer } from '@/components/footer/Footer';
import { ParticleField } from '@/components/animations/ParticleField';
import { CommandPalette } from '@/components/ui/CommandPalette';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { SectionIndicator } from '@/components/ui/SectionIndicator';

export default function Page() {
  return (
    <main className="relative isolate overflow-x-hidden">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            'radial-gradient(1100px circle at 50% -10%, rgba(91,234,255,0.08), transparent 55%),' +
            'radial-gradient(800px circle at 100% 30%, rgba(167,139,250,0.08), transparent 55%),' +
            'linear-gradient(180deg, #06070B 0%, #08090F 40%, #06070B 100%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[120vh] bg-grid-fade bg-[size:56px_56px] opacity-[0.08] mask-fade-b"
      />

      <ParticleField />
      <ScrollProgress />
      <SectionIndicator />
      <CommandPalette />

      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Education />
      <Achievements />
      <Contact />
      <Footer />
    </main>
  );
}
