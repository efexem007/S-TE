'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const steps = [
  { number: '01', title: 'Keşif', titleEn: 'Discovery', description: 'İhtiyaçlarınızı ve hedeflerinizi analiz ediyoruz.', descriptionEn: 'We analyze your needs and goals.' },
  { number: '02', title: 'Planlama', titleEn: 'Planning', description: 'Size özel bir yol haritası oluşturuyoruz.', descriptionEn: 'We create a customized roadmap for you.' },
  { number: '03', title: 'Uygulama', titleEn: 'Implementation', description: 'Koçluk seansları ve eğitimler başlıyor.', descriptionEn: 'Coaching sessions and training begin.' },
  { number: '04', title: 'Değerlendirme', titleEn: 'Evaluation', description: 'İlerlemenizi ölçüyor ve optimize ediyoruz.', descriptionEn: 'We measure and optimize your progress.' },
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
      className="bg-bg-light py-24 md:py-32"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-section text-text-primary text-center mb-16">
          {isTr ? 'Sürecimiz' : 'Our Process'}
        </h2>

        {/* Desktop: horizontal timeline */}
        <div className="hidden md:grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="process-step relative text-center">
              {index < steps.length - 1 && (
                <div className="absolute top-8 left-[60%] w-[80%] h-0.5 bg-accent-teal/20" />
              )}
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent-teal flex items-center justify-center">
                <span className="text-white font-display text-xl font-bold">{step.number}</span>
              </div>
              <h3 className="font-display text-xl font-semibold text-text-primary mb-3">
                {isTr ? step.title : step.titleEn}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {isTr ? step.description : step.descriptionEn}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile: vertical timeline */}
        <div className="md:hidden space-y-8">
          {steps.map((step) => (
            <div key={step.number} className="process-step flex gap-4 items-start">
              <div className="w-12 h-12 shrink-0 rounded-full bg-accent-teal flex items-center justify-center">
                <span className="text-white font-display text-lg font-bold">{step.number}</span>
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-text-primary mb-1">
                  {isTr ? step.title : step.titleEn}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {isTr ? step.description : step.descriptionEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
