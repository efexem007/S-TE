'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { User, Building2, Monitor, Lightbulb, ArrowRight } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import Spotlight from '@/components/effects/Spotlight';

const iconMap = {
  User,
  Building2,
  Monitor,
  Lightbulb,
};

const servicesData = [
  {
    id: 'one-on-one',
    title: 'Birebir Koçluk',
    titleEn: 'One-on-One Coaching',
    description: 'Kişisel hedeflerinize ulaşmanız için özel koçluk seansları.',
    descriptionEn: 'Personalized coaching sessions to help you achieve your individual goals.',
    icon: 'User',
  },
  {
    id: 'corporate',
    title: 'Kurumsal Eğitim',
    titleEn: 'Corporate Training',
    description: 'Ekibinizin verimliliğini artıran özel eğitim programları.',
    descriptionEn: "Custom training programs to boost your team's productivity.",
    icon: 'Building2',
  },
  {
    id: 'online',
    title: 'Online Program',
    titleEn: 'Online Program',
    description: 'Esnek zamanlı, uzaktan eğitim ve koçluk imkanı.',
    descriptionEn: 'Flexible, remote coaching and training opportunities.',
    icon: 'Monitor',
  },
  {
    id: 'consulting',
    title: 'Danışmanlık',
    titleEn: 'Consulting',
    description: 'Stratejik planlama ve iş geliştirme danışmanlığı.',
    descriptionEn: 'Strategic planning and business development consulting.',
    icon: 'Lightbulb',
  },
];

export default function Services({ lang = 'tr' }: { lang?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from('.service-card', {
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
    <Spotlight>
    <section
      ref={sectionRef}
      id="services"
      aria-label={isTr ? 'Hizmetler' : 'Services'}
      className="bg-bg-dark-2 py-24 md:py-32"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-extrabold text-section text-white mb-4">
            {isTr ? 'Hizmetlerimiz' : 'Our Services'}
          </h2>
          <p className="text-text-light/60 max-w-2xl mx-auto">
            {isTr 
              ? 'Profesyonel gelişiminiz için tasarlanmış kapsamlı hizmetler.' 
              : 'Comprehensive services designed for your professional growth.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesData.map((service) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap];
            return (
              <div
                key={service.id}
                className="service-card group relative glass rounded-2xl p-6 hover:bg-white/5 transition-all duration-300 cursor-pointer"
                role="article"
              >
                <div className="w-14 h-14 mb-6 rounded-xl bg-accent-cyan/10 flex items-center justify-center group-hover:bg-accent-cyan/20 transition-colors">
                  <Icon className="w-7 h-7 text-accent-cyan" aria-hidden="true" />
                </div>
                <h3 className="font-semibold text-xl text-white mb-3">
                  {isTr ? service.title : service.titleEn}
                </h3>
                <p className="text-text-light/60 text-sm leading-relaxed mb-6">
                  {isTr ? service.description : service.descriptionEn}
                </p>
                <div className="flex items-center gap-2 text-accent-cyan text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  {isTr ? 'Detayları gör' : 'View details'}
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
    </Spotlight>
  );
}
