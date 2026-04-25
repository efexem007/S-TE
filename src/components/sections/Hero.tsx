'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import Button from '@/components/ui/Button';

export default function Hero({ lang = 'tr' }: { lang?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from('.hero-fade-up', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.3,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const isTr = lang === 'tr';

  return (
    <section
      ref={sectionRef}
      id="hero"
      role="banner"
      aria-label="Hero bölümü"
      className="relative min-h-screen flex items-center justify-center bg-bg-light overflow-hidden"
    >
      {/* Blur gradient blob */}
      <div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-15 blur-[120px] pointer-events-none"
        style={{ background: 'linear-gradient(135deg, #2EC4B6 0%, #1A659E 100%)' }}
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="hero-fade-up font-display text-hero text-text-primary mb-6">
          {isTr ? 'Potansiyelinizi Keşfedin' : 'Unlock Your Potential'}
        </h1>
        <p className="hero-fade-up text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10">
          {isTr
            ? 'Profesyonel koçluk ve eğitim hizmetleriyle kariyerinizi ve yaşamınızı dönüştürün.'
            : 'Transform your career and life with professional coaching and training services.'}
        </p>
        <div className="hero-fade-up flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="primary" size="lg">
            {isTr ? 'Hemen Başlayın' : 'Get Started'}
          </Button>
          <Button variant="secondary" size="lg">
            {isTr ? 'Hizmetlerimizi Keşfedin' : 'Explore Services'}
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-accent-teal" aria-hidden="true" />
      </div>
    </section>
  );
}
