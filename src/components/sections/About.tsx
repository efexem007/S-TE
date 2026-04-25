'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Target, Users, Award, TrendingUp } from 'lucide-react';

const stats = [
  { icon: Users, value: '2.500+', label: 'Öğrenci', labelEn: 'Students' },
  { icon: Award, value: '15+', label: 'Yıllık Deneyim', labelEn: 'Years Experience' },
  { icon: Target, value: '95%', label: 'Başarı Oranı', labelEn: 'Success Rate' },
  { icon: TrendingUp, value: '40+', label: 'Kurumsal İş Birliği', labelEn: 'Corporate Partners' },
];

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
      gsap.from('.about-stat', {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.about-stats', start: 'top 85%' },
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
      {/* Decorative gradient blob */}
      <div
        className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-10 blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #00F0FF 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="about-fade-up font-extrabold text-section text-white mb-6">
              {isTr ? 'Hakkımızda' : 'About Us'}
            </h2>
            <p className="about-fade-up text-accent-cyan font-semibold text-lg md:text-xl mb-6">
              {isTr ? 'Akdeniz\'in sıcaklığı, profesyonel disiplin' : 'Mediterranean warmth, professional discipline'}
            </p>
            <p className="about-fade-up text-text-light/70 text-lg leading-relaxed mb-6">
              {isTr
                ? 'dueMWeWork olarak, bireylerin ve kurumların potansiyellerini en üst düzeye çıkarmaları için kişiselleştirilmiş koçluk ve eğitim programları sunuyoruz. Geleceğin yetkinliklerini bugünden kazanmanız için yanınızdayız.'
                : 'At dueMWeWork, we offer personalized coaching and training programs to help individuals and organizations reach their full potential. We are by your side to acquire future skills starting today.'}
            </p>
            <p className="about-fade-up text-text-light/70 text-lg leading-relaxed">
              {isTr
                ? 'Uzman kadromuz ve kanıtlanmış metodolojilerimizle, her adımda sizi destekliyor ve hedeflerinize ulaşmanızı sağlıyoruz.'
                : 'With our expert team and proven methodologies, we support you at every step and ensure you reach your goals.'}
            </p>
          </div>

          <div className="about-stats grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="about-stat glass rounded-2xl p-6 text-center hover:bg-white/5 transition-colors"
              >
                <stat.icon className="w-8 h-8 text-accent-cyan mx-auto mb-3" />
                <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-text-light/50 text-sm">{isTr ? stat.label : stat.labelEn}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
