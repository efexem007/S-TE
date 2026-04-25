'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Search, MapPin, Rocket, BarChart3 } from 'lucide-react';

const iconMap = {
  Search,
  MapPin,
  Rocket,
  BarChart3,
};

const steps = [
  { number: '01', title: 'Keşif', titleEn: 'Discovery', description: 'İhtiyaçlarınızı ve hedeflerinizi analiz ediyoruz.', descriptionEn: 'We analyze your needs and goals.', icon: 'Search' },
  { number: '02', title: 'Planlama', titleEn: 'Planning', description: 'Size özel bir yol haritası oluşturuyoruz.', descriptionEn: 'We create a customized roadmap for you.', icon: 'MapPin' },
  { number: '03', title: 'Uygulama', titleEn: 'Implementation', description: 'Koçluk seansları ve eğitimler başlıyor.', descriptionEn: 'Coaching sessions and training begin.', icon: 'Rocket' },
  { number: '04', title: 'Değerlendirme', titleEn: 'Evaluation', description: 'İlerlemenizi ölçüyor ve optimize ediyoruz.', descriptionEn: 'We measure and optimize your progress.', icon: 'BarChart3' },
];

export default function Process({ lang = 'tr' }: { lang?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from('.process-step', {
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
      id="process"
      aria-label={isTr ? 'Süreç' : 'Process'}
      className="bg-bg-dark-2 py-24 md:py-32"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-extrabold text-section text-white mb-4">
            {isTr ? 'Sürecimiz' : 'Our Process'}
          </h2>
          <p className="text-text-light/60 max-w-2xl mx-auto">
            {isTr 
              ? 'Sizi başarıya ulaştıran adım adım yol haritamız.' 
              : 'Our step-by-step roadmap that leads you to success.'}
          </p>
        </div>

        {/* Desktop: horizontal timeline */}
        <div className="hidden md:grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = iconMap[step.icon as keyof typeof iconMap];
            return (
              <div key={step.number} className="process-step relative text-center">
                {index < steps.length - 1 && (
                  <div className="absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-accent-cyan/50 to-transparent" />
                )}
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center">
                  <Icon className="w-7 h-7 text-accent-cyan" />
                </div>
                <div className="text-xs font-bold text-accent-cyan mb-2">{step.number}</div>
                <h3 className="font-semibold text-xl text-white mb-3">
                  {isTr ? step.title : step.titleEn}
                </h3>
                <p className="text-text-light/60 text-sm leading-relaxed">
                  {isTr ? step.description : step.descriptionEn}
                </p>
              </div>
            );
          })}
        </div>

        {/* Mobile: vertical timeline */}
        <div className="md:hidden space-y-8">
          {steps.map((step) => {
            const Icon = iconMap[step.icon as keyof typeof iconMap];
            return (
              <div key={step.number} className="process-step flex gap-4 items-start">
                <div className="w-12 h-12 shrink-0 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-accent-cyan" />
                </div>
                <div>
                  <div className="text-xs font-bold text-accent-cyan mb-1">{step.number}</div>
                  <h3 className="font-semibold text-lg text-white mb-1">
                    {isTr ? step.title : step.titleEn}
                  </h3>
                  <p className="text-text-light/60 text-sm leading-relaxed">
                    {isTr ? step.description : step.descriptionEn}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
