'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { User, Building2, Monitor, Lightbulb, ArrowRight, GraduationCap, Target, BookOpen, Brain } from 'lucide-react';
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
    description: 'Kişisel hedeflerinize ulaşmanız için özel koçluk seansları. Kariyer, yaşam ve öğrenci koçluğu alanlarında uzman desteği.',
    descriptionEn: 'Personalized coaching sessions to help you achieve your individual goals. Expert support in career, life, and student coaching.',
    icon: 'User',
    details: [
      { icon: GraduationCap, tr: 'Öğrenci Koçluğu & Danışmanlık', en: 'Student Coaching & Counseling' },
      { icon: Target, tr: 'Kariyer Yol Haritası', en: 'Career Roadmap' },
      { icon: Brain, tr: 'Motivasyon & Zihin Seti', en: 'Motivation & Mindset' },
    ],
  },
  {
    id: 'corporate',
    title: 'Kurumsal Eğitim',
    titleEn: 'Corporate Training',
    description: 'Ekibinizin verimliliğini artıran özel eğitim programları.',
    descriptionEn: "Custom training programs to boost your team's productivity.",
    icon: 'Building2',
    details: [
      { icon: Users, tr: 'Takım Performansı', en: 'Team Performance' },
      { icon: TrendingUp, tr: 'Liderlik Gelişimi', en: 'Leadership Development' },
      { icon: Lightbulb, tr: 'Yenilikçilik Atölyeleri', en: 'Innovation Workshops' },
    ],
  },
  {
    id: 'online',
    title: 'Online Program',
    titleEn: 'Online Program',
    description: 'Esnek zamanlı, uzaktan eğitim ve koçluk imkanı.',
    descriptionEn: 'Flexible, remote coaching and training opportunities.',
    icon: 'Monitor',
    details: [
      { icon: BookOpen, tr: '7/24 Kaynak Erişimi', en: '24/7 Resource Access' },
      { icon: MessageCircle, tr: 'Anlık Destek', en: 'Instant Support' },
      { icon: Monitor, tr: 'Canlı Dersler', en: 'Live Sessions' },
    ],
  },
  {
    id: 'consulting',
    title: 'Danışmanlık',
    titleEn: 'Consulting',
    description: 'Stratejik planlama ve iş geliştirme danışmanlığı.',
    descriptionEn: 'Strategic planning and business development consulting.',
    icon: 'Lightbulb',
    details: [
      { icon: Target, tr: 'Stratejik Planlama', en: 'Strategic Planning' },
      { icon: TrendingUp, tr: 'Büyüme Stratejileri', en: 'Growth Strategies' },
      { icon: Lightbulb, tr: 'Süreç Optimizasyonu', en: 'Process Optimization' },
    ],
  },
];

// Additional icons needed
function Users(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function TrendingUp(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}

function MessageCircle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  );
}

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
              <button
                key={service.id}
                onClick={() => {
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="service-card group relative glass rounded-2xl p-6 hover:bg-white/5 transition-all duration-300 cursor-pointer text-left w-full border-none bg-transparent"
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

                {/* Detail chips */}
                <div className="space-y-2 mb-6">
                  {service.details.map((detail, i) => {
                    const DetailIcon = detail.icon;
                    return (
                      <div key={i} className="flex items-center gap-2 text-text-light/50 text-xs">
                        <DetailIcon className="w-3.5 h-3.5 text-accent-cyan/60" />
                        <span>{isTr ? detail.tr : detail.en}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center gap-2 text-accent-cyan text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  {isTr ? 'Detayları gör' : 'View details'}
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Student Coaching Highlight Banner */}
        <div className="mt-16 glass-strong rounded-2xl p-8 md:p-10 border border-accent-cyan/20">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-20 h-20 rounded-2xl bg-gradient-accent flex items-center justify-center shrink-0">
              <GraduationCap className="w-10 h-10 text-bg-darkest" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-bold text-white mb-2">
                {isTr ? 'Öğrenci Koçluğu & Danışmanlık' : 'Student Coaching & Counseling'}
              </h3>
              <p className="text-text-light/70 leading-relaxed mb-4">
                {isTr
                  ? 'Üniversite sınavlarına hazırlık sürecinde birebir destek, günlük takip ve kişiselleştirilmiş çalışma programları ile hedefinize ulaşın. Her öğrenci özeldir ve biz de her öğrenciye özel bir yol haritası çiziyoruz.'
                  : 'Achieve your goals with one-on-one support, daily follow-up, and personalized study programs during university exam preparation. Every student is unique, and we draw a special roadmap for each one.'}
              </p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <span className="px-3 py-1 rounded-full bg-accent-cyan/10 text-accent-cyan text-xs font-medium">
                  {isTr ? 'Günlük Takip' : 'Daily Follow-up'}
                </span>
                <span className="px-3 py-1 rounded-full bg-accent-violet/10 text-accent-violet text-xs font-medium">
                  {isTr ? 'Özel Program' : 'Custom Program'}
                </span>
                <span className="px-3 py-1 rounded-full bg-accent-rose/10 text-accent-rose text-xs font-medium">
                  {isTr ? 'Motivasyon Desteği' : 'Motivation Support'}
                </span>
                <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-medium">
                  {isTr ? '7/24 WhatsApp' : '24/7 WhatsApp'}
                </span>
              </div>
            </div>
            <button
              onClick={() => {
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="px-6 py-3 bg-gradient-accent text-bg-darkest font-semibold rounded-full hover:shadow-glow-cyan transition-all duration-300 shrink-0 border-none cursor-pointer"
            >
              {isTr ? 'Bilgi Al' : 'Get Info'}
            </button>
          </div>
        </div>
      </div>
    </section>
    </Spotlight>
  );
}
