'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export default function About({ lang = 'tr' }: { lang?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from('.about-fade-up', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const isTr = lang === 'tr';

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-label={isTr ? 'Hakkımızda' : 'About'}
      className="relative bg-bg-dark py-24 md:py-32 overflow-hidden"
    >
      {/* Parallax background - decorative */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'url(/images/about-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-bg-dark/80 pointer-events-none" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="about-fade-up font-display text-section text-text-light mb-6">
          {isTr ? 'Hakkımızda' : 'About Us'}
        </h2>
        <p className="about-fade-up font-display text-2xl md:text-3xl text-accent-teal italic mb-8">
          {isTr ? 'Akdeniz\'in sıcaklığı, profesyonel disiplin' : 'Mediterranean warmth, professional discipline'}
        </p>
        <p className="about-fade-up text-text-light/80 text-lg max-w-3xl mx-auto leading-relaxed">
          {isTr
            ? 'DueM via Work olarak, bireylerin ve kurumların potansiyellerini en üst düzeye çıkarmaları için kişiselleştirilmiş koçluk ve eğitim programları sunuyoruz.'
            : 'At DueM via Work, we offer personalized coaching and training programs to help individuals and organizations reach their full potential.'}
        </p>
      </div>
    </section>
  );
}
