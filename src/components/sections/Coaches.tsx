'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const coachesData = [
  {
    id: 'coach-1',
    name: 'Ayşe Yılmaz',
    title: 'Kariyer Koçu',
    titleEn: 'Career Coach',
    bio: '15 yıllık insan kaynakları deneyimiyle kariyer dönüşümü uzmanı.',
    bioEn: 'Career transformation expert with 15 years of HR experience.',
    image: '/images/coach-1.jpg',
  },
  {
    id: 'coach-2',
    name: 'Mehmet Kaya',
    title: 'İşletme Danışmanı',
    titleEn: 'Business Consultant',
    bio: 'Girişimcilik ve stratejik planlama alanında sertifikalı danışman.',
    bioEn: 'Certified consultant in entrepreneurship and strategic planning.',
    image: '/images/coach-2.jpg',
  },
  {
    id: 'coach-3',
    name: 'Zeynep Demir',
    title: 'Yaşam Koçu',
    titleEn: 'Life Coach',
    bio: 'Bireysel gelişim ve yaşam dengesi üzerine uzmanlaşmış koç.',
    bioEn: 'Coach specialized in personal development and life balance.',
    image: '/images/coach-3.jpg',
  },
];

export default function Coaches({ lang = 'tr' }: { lang?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from('.coach-card', {
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
      id="coaches"
      aria-label={isTr ? 'Koçlar' : 'Coaches'}
      className="bg-bg-dark-2 py-24 md:py-32"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-section text-text-light text-center mb-4">
          {isTr ? 'Koçlarımız' : 'Our Coaches'}
        </h2>
        <p className="text-text-light/70 text-center mb-16 max-w-2xl mx-auto">
          {isTr
            ? 'Alanında uzman, sertifikalı profesyonel koçlarımızla tanışın.'
            : 'Meet our certified, expert professional coaches.'}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {coachesData.map((coach) => (
            <div
              key={coach.id}
              className="coach-card group relative rounded-[16px] overflow-hidden bg-bg-dark shadow-card hover:shadow-card-hover transition-all duration-300"
              role="article"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-accent-teal/20 to-accent-blue/20 flex items-center justify-center">
                  <span className="text-text-light/30 text-6xl font-display">
                    {coach.name.charAt(0)}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-semibold text-text-light mb-1">
                  {coach.name}
                </h3>
                <p className="text-accent-teal text-sm font-medium mb-3">
                  {isTr ? coach.title : coach.titleEn}
                </p>
                <p className="text-text-light/70 text-sm leading-relaxed">
                  {isTr ? coach.bio : coach.bioEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
