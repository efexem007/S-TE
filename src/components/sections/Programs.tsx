'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, Users, BarChart, ArrowRight } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const programsData = [
  {
    id: 'leadership',
    title: 'Liderlik ve Yöneticilik',
    titleEn: 'Leadership & Management',
    level: 'Orta - İleri',
    levelEn: 'Intermediate - Advanced',
    duration: '8 Hafta',
    durationEn: '8 Weeks',
    format: 'Online / Yüz Yüze',
    formatEn: 'Online / In-Person',
    description: 'Etkili liderlik becerileri, ekip yönetimi ve stratejik düşünme üzerine kapsamlı program.',
    descriptionEn: 'Comprehensive program on effective leadership skills, team management, and strategic thinking.',
    tags: ['Liderlik', 'Yönetim', 'Strateji'],
    tagsEn: ['Leadership', 'Management', 'Strategy'],
  },
  {
    id: 'career',
    title: 'Kariyer Gelişimi',
    titleEn: 'Career Development',
    level: 'Başlangıç - Orta',
    levelEn: 'Beginner - Intermediate',
    duration: '6 Hafta',
    durationEn: '6 Weeks',
    format: 'Online',
    formatEn: 'Online',
    description: 'Kariyer hedeflerinizi belirleme, kişisel markanızı oluşturma ve iş arama stratejileri.',
    descriptionEn: 'Define your career goals, build your personal brand, and master job search strategies.',
    tags: ['Kariyer', 'Kişisel Marka', 'Mülakat'],
    tagsEn: ['Career', 'Personal Brand', 'Interview'],
  },
  {
    id: 'communication',
    title: 'İletişim ve Sunum Becerileri',
    titleEn: 'Communication & Presentation Skills',
    level: 'Tüm Seviyeler',
    levelEn: 'All Levels',
    duration: '4 Hafta',
    durationEn: '4 Weeks',
    format: 'Online / Yüz Yüze',
    formatEn: 'Online / In-Person',
    description: 'Etkili iletişim teknikleri, halka açık konuşma ve profesyonel sunum hazırlama.',
    descriptionEn: 'Effective communication techniques, public speaking, and professional presentation preparation.',
    tags: ['İletişim', 'Sunum', 'Konuşma'],
    tagsEn: ['Communication', 'Presentation', 'Speaking'],
  },
  {
    id: 'digital',
    title: 'Dijital Dönüşüm ve AI',
    titleEn: 'Digital Transformation & AI',
    level: 'Orta - İleri',
    levelEn: 'Intermediate - Advanced',
    duration: '10 Hafta',
    durationEn: '10 Weeks',
    format: 'Online',
    formatEn: 'Online',
    description: 'Yapay zeka araçları, dijital stratejiler ve geleceğin teknolojilerine hazırlık.',
    descriptionEn: 'AI tools, digital strategies, and preparation for future technologies.',
    tags: ['AI', 'Dijital', 'Teknoloji'],
    tagsEn: ['AI', 'Digital', 'Technology'],
  },
  {
    id: 'entrepreneurship',
    title: 'Girişimcilik ve İnovasyon',
    titleEn: 'Entrepreneurship & Innovation',
    level: 'Tüm Seviyeler',
    levelEn: 'All Levels',
    duration: '12 Hafta',
    durationEn: '12 Weeks',
    format: 'Hibrit',
    formatEn: 'Hybrid',
    description: 'İş fikrinden başlangıca, iş modeli geliştirmeden yatırım almaya kadar kapsamlı girişimcilik programı.',
    descriptionEn: 'Comprehensive entrepreneurship program from idea to startup, business model development to investment.',
    tags: ['Girişimcilik', 'İnovasyon', 'Startup'],
    tagsEn: ['Entrepreneurship', 'Innovation', 'Startup'],
  },
  {
    id: 'emotional',
    title: 'Duygusal Zeka ve Farkındalık',
    titleEn: 'Emotional Intelligence & Mindfulness',
    level: 'Başlangıç',
    levelEn: 'Beginner',
    duration: '4 Hafta',
    durationEn: '4 Weeks',
    format: 'Online',
    formatEn: 'Online',
    description: 'Duygusal zekanızı geliştirme, stres yönetimi ve mindfulness teknikleri.',
    descriptionEn: 'Develop your emotional intelligence, stress management, and mindfulness techniques.',
    tags: ['EQ', 'Mindfulness', 'Stres'],
    tagsEn: ['EQ', 'Mindfulness', 'Stress'],
  },
];

export default function Programs({ lang = 'tr' }: { lang?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from('.program-card', {
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
      id="programs"
      aria-label={isTr ? 'Programlar' : 'Programs'}
      className="bg-bg-darkest py-24 md:py-32"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-extrabold text-section text-white mb-4">
            {isTr ? 'Eğitim Programlarımız' : 'Our Training Programs'}
          </h2>
          <p className="text-text-light/60 max-w-2xl mx-auto">
            {isTr
              ? 'Geleceğin yetkinliklerini kazanmanız için tasarlanmış kapsamlı programlar.'
              : 'Comprehensive programs designed to help you acquire future skills.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programsData.map((program) => (
            <div
              key={program.id}
              className="program-card group glass rounded-2xl p-6 hover:bg-white/5 transition-all duration-300 flex flex-col"
            >
              <div className="flex flex-wrap gap-2 mb-4">
                {(isTr ? program.tags : program.tagsEn).map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="font-semibold text-xl text-white mb-2">{isTr ? program.title : program.titleEn}</h3>
              <p className="text-text-light/60 text-sm leading-relaxed mb-6 flex-1">
                {isTr ? program.description : program.descriptionEn}
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-text-light/50">
                  <BarChart className="w-4 h-4 text-accent-cyan" />
                  <span>{isTr ? program.level : program.levelEn}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-text-light/50">
                  <Clock className="w-4 h-4 text-accent-cyan" />
                  <span>{isTr ? program.duration : program.durationEn}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-text-light/50">
                  <Users className="w-4 h-4 text-accent-cyan" />
                  <span>{isTr ? program.format : program.formatEn}</span>
                </div>
              </div>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-accent-cyan text-sm font-medium group-hover:gap-3 transition-all"
              >
                {isTr ? 'Detaylı bilgi al' : 'Learn more'}
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
