'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { User, Building2, Monitor, Lightbulb } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

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
    <section
      ref={sectionRef}
      id="services"
      aria-label={isTr ? 'Hizmetler' : 'Services'}
      className="bg-bg-cream py-24 md:py-32"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-section text-text-primary text-center mb-16">
          {isTr ? 'Hizmetlerimiz' : 'Our Services'}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesData.map((service) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap];
            return (
              <div
                key={service.id}
                className="service-card text-center rounded-[16px] bg-white p-6 shadow-card hover:-translate-y-2 hover:shadow-card-hover transition-all duration-300"
                role="article"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-accent-teal/10 flex items-center justify-center">
                  <Icon className="w-7 h-7 text-accent-teal" aria-hidden="true" />
                </div>
                <h3 className="font-display text-xl font-semibold text-text-primary mb-3">
                  {isTr ? service.title : service.titleEn}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {isTr ? service.description : service.descriptionEn}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
