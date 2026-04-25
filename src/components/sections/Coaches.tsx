'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Linkedin, Twitter } from 'lucide-react';

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
      className="bg-bg-dark py-24 md:py-32"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-extrabold text-section text-white mb-4">
            {isTr ? 'Koçlarımız' : 'Our Coaches'}
          </h2>
          <p className="text-text-light/60 max-w-2xl mx-auto">
            {isTr
              ? 'Alanında uzman, sertifikalı profesyonel koçlarımızla tanışın.'
              : 'Meet our certified, expert professional coaches.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {coachesData.map((coach) => (
            <div
              key={coach.id}
              className="coach-card group relative glass rounded-2xl overflow-hidden hover:bg-white/5 transition-all duration-300"
              role="article"
            >
              <div className="aspect-[3/4] overflow-hidden relative">
                <div className="w-full h-full bg-gradient-to-br from-accent-cyan/20 to-accent-violet/20 flex items-center justify-center">
                  <span className="text-text-light/20 text-8xl font-extrabold">
                    {coach.name.charAt(0)}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 rounded-full glass text-text-light/70 hover:text-accent-cyan transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-full glass text-text-light/70 hover:text-accent-cyan transition-colors">
                    <Twitter className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-xl text-white mb-1">
                  {coach.name}
                </h3>
                <p className="text-accent-cyan text-sm font-medium mb-3">
                  {isTr ? coach.title : coach.titleEn}
                </p>
                <p className="text-text-light/60 text-sm leading-relaxed">
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
