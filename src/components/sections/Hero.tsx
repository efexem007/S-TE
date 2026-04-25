'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Play } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export default function Hero({ lang = 'tr' }: { lang?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from('.hero-fade-up', {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.3,
      });
      gsap.from('.hero-blob', {
        opacity: 0,
        scale: 0.8,
        duration: 1.5,
        ease: 'power2.out',
        delay: 0.1,
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
      className="relative min-h-screen flex items-center justify-center bg-bg-darkest overflow-hidden"
    >
      {/* Animated mesh gradient blobs */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-60" />
      <div
        className="hero-blob absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-20 blur-[120px] pointer-events-none animate-float"
        style={{ background: 'radial-gradient(circle, #00F0FF 0%, transparent 70%)' }}
      />
      <div
        className="hero-blob absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-15 blur-[100px] pointer-events-none animate-float"
        style={{ background: 'radial-gradient(circle, #8B5CF6 0%, transparent 70%)', animationDelay: '2s' }}
      />
      <div
        className="hero-blob absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-10 blur-[90px] pointer-events-none animate-float"
        style={{ background: 'radial-gradient(circle, #F43F5E 0%, transparent 70%)', animationDelay: '4s' }}
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="hero-fade-up inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-accent-cyan mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-cyan opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-cyan" />
          </span>
          {isTr ? 'Yeni dönem kayıtları açıldı' : 'New term registrations are open'}
        </div>

        <h1 className="hero-fade-up font-extrabold text-hero text-white mb-6 tracking-tight">
          {isTr ? (
            <>
              Geleceği <span className="text-gradient">Bugünden</span>{' '}
              İnşa Et
            </>
          ) : (
            <>
              Build Your <span className="text-gradient">Future</span>{' '}
              Today
            </>
          )}
        </h1>
        <p className="hero-fade-up text-lg md:text-xl text-text-light/70 max-w-2xl mx-auto mb-10 leading-relaxed">
          {isTr
            ? 'Profesyonel koçluk ve eğitim hizmetleriyle kariyerinizi ve yaşamınızı dönüştürün. Geleceğin yetkinliklerini bugünden kazanın.'
            : 'Transform your career and life with professional coaching and training. Acquire future skills starting today.'}
        </p>
        <div className="hero-fade-up flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#contact"
            className="px-8 py-4 bg-gradient-accent text-bg-darkest font-semibold rounded-full hover:shadow-glow-cyan transition-all duration-300 text-base"
          >
            {isTr ? 'Hemen Başlayın' : 'Get Started'}
          </a>
          <a
            href="#services"
            className="px-8 py-4 glass text-text-light font-medium rounded-full hover:bg-white/10 transition-all duration-300 text-base inline-flex items-center gap-2"
          >
            <Play className="w-4 h-4" />
            {isTr ? 'Hizmetlerimizi Keşfedin' : 'Explore Services'}
          </a>
        </div>

        {/* Stats */}
        <div className="hero-fade-up mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-bold text-gradient">500+</p>
            <p className="text-text-light/50 text-xs mt-1">{isTr ? 'Mezun' : 'Graduates'}</p>
          </div>
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-bold text-gradient">50+</p>
            <p className="text-text-light/50 text-xs mt-1">{isTr ? 'Eğitim' : 'Programs'}</p>
          </div>
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-bold text-gradient">98%</p>
            <p className="text-text-light/50 text-xs mt-1">{isTr ? 'Memnuniyet' : 'Satisfaction'}</p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-accent-cyan/70" aria-hidden="true" />
      </div>
    </section>
  );
}
