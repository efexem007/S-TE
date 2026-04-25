'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Users, BookOpen, Briefcase, UserCheck, GitBranch,
  MessageSquare, Tag, HelpCircle, Mail, ArrowRight
} from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const sections = [
  { id: 'about', label: 'Hakkımızda', labelEn: 'About', desc: 'Geleceğinizi şekillendiren ekip', descEn: 'The team shaping your future', icon: Users, gradient: 'from-accent-cyan/20 to-accent-violet/20' },
  { id: 'programs', label: 'Programlar', labelEn: 'Programs', desc: '6 kapsamlı eğitim programı', descEn: '6 comprehensive training programs', icon: BookOpen, gradient: 'from-accent-violet/20 to-accent-rose/20' },
  { id: 'services', label: 'Hizmetler', labelEn: 'Services', desc: 'Koçluk ve danışmanlık', descEn: 'Coaching & consulting', icon: Briefcase, gradient: 'from-accent-rose/20 to-accent-cyan/20' },
  { id: 'coaches', label: 'Koçlarımız', labelEn: 'Coaches', desc: 'Sertifikalı uzman kadro', descEn: 'Certified expert team', icon: UserCheck, gradient: 'from-accent-cyan/20 to-accent-rose/20' },
  { id: 'process', label: 'Sürecimiz', labelEn: 'Process', desc: '4 adımlı başarı yol haritası', descEn: '4-step success roadmap', icon: GitBranch, gradient: 'from-accent-violet/20 to-accent-cyan/20' },
  { id: 'testimonials', label: 'Yorumlar', labelEn: 'Testimonials', desc: 'Gerçek başarı hikayeleri', descEn: 'Real success stories', icon: MessageSquare, gradient: 'from-accent-rose/20 to-accent-violet/20' },
  { id: 'pricing', label: 'Fiyatlandırma', labelEn: 'Pricing', desc: 'Size uygun planı seçin', descEn: 'Choose your plan', icon: Tag, gradient: 'from-accent-cyan/20 to-accent-violet/20' },
  { id: 'faq', label: 'SSS', labelEn: 'FAQ', desc: 'Merak ettiklerinizin cevabı', descEn: 'Answers to your questions', icon: HelpCircle, gradient: 'from-accent-violet/20 to-accent-rose/20' },
  { id: 'contact', label: 'İletişim', labelEn: 'Contact', desc: 'Hedeflerinize ilk adım', descEn: 'First step to your goals', icon: Mail, gradient: 'from-accent-rose/20 to-accent-cyan/20' },
];

export default function QuickLinks({ lang = 'tr' }: { lang?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (reducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.from('.ql-card', {
        opacity: 0, y: 30, duration: 0.6, stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  const isTr = lang === 'tr';

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section ref={sectionRef} className="bg-bg-darkest py-16 md:py-20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center font-extrabold text-2xl md:text-3xl text-white mb-10">
          {isTr ? 'Keşfetmeye Başla' : 'Start Exploring'}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6">
          {sections.map((s) => {
            const Icon = s.icon;
            return (
              <button
                key={s.id}
                onClick={() => handleClick(s.id)}
                className="ql-card group relative glass rounded-2xl p-5 md:p-6 text-left hover:bg-white/5 transition-all duration-300 cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-white text-base md:text-lg mb-1">{isTr ? s.label : s.labelEn}</h3>
                <p className="text-text-light/50 text-xs md:text-sm leading-snug">{isTr ? s.desc : s.descEn}</p>
                <div className="mt-3 flex items-center gap-1 text-accent-cyan text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  {isTr ? 'Git' : 'Go'} <ArrowRight className="w-3 h-3" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
