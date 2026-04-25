'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Trophy, Star, GraduationCap } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const stats = [
  {
    icon: Users,
    value: 42000,
    suffix: '+',
    label: 'Öğrenci Tarafından Tercih Edildi',
    labelEn: 'Students Chose Us',
  },
  {
    icon: Trophy,
    value: 500,
    suffix: '+',
    label: 'Üniversite Kazandıran Başarı',
    labelEn: 'University Placements',
  },
  {
    icon: Star,
    value: 98,
    suffix: '%',
    label: 'Memnuniyet Oranı',
    labelEn: 'Satisfaction Rate',
  },
  {
    icon: GraduationCap,
    value: 150,
    suffix: '+',
    label: 'Mezun Koç',
    labelEn: 'Graduated Coaches',
  },
];

function AnimatedCounter({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span className="tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function SocialProof({ lang = 'tr' }: { lang?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const [inView, setInView] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (reducedMotion) {
      setInView(true);
      return;
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        onEnter: () => setInView(true),
      });
      gsap.from('.stat-item', {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
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
      aria-label={isTr ? 'Sosyal Kanıt' : 'Social Proof'}
      className="bg-bg-dark py-16 md:py-20 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
      
      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-extrabold text-3xl md:text-4xl text-white mb-4">
            {isTr ? 'Rakamlarla dueMWeWork' : 'dueMWeWork in Numbers'}
          </h2>
          <p className="text-text-light/60 max-w-xl mx-auto">
            {isTr 
              ? 'Binlerce öğrencinin güvendiği koçluk deneyimi.'
              : 'The coaching experience trusted by thousands of students.'}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="stat-item text-center glass rounded-2xl p-6 hover:bg-white/5 transition-all duration-300"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-accent-cyan/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-accent-cyan" />
                </div>
                <div className="text-3xl md:text-4xl font-extrabold text-white mb-2">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} inView={inView} />
                </div>
                <p className="text-text-light/60 text-sm">
                  {isTr ? stat.label : stat.labelEn}
                </p>
              </div>
            );
          })}
        </div>

        {/* University ticker */}
        <div className="mt-12 overflow-hidden">
          <p className="text-center text-text-light/40 text-sm mb-6 uppercase tracking-widest">
            {isTr ? 'Öğrencilerimiz kazandığı üniversiteler' : 'Universities our students got into'}
          </p>
          <div className="flex gap-8 animate-scroll-x">
            {[
              'Boğaziçi Üniversitesi', 'Koç Üniversitesi', 'Hacettepe Üniversitesi',
              'İTÜ', 'ODTÜ', 'İstanbul Üniversitesi', 'Ankara Üniversitesi',
              'Ege Üniversitesi', 'Sabancı Üniversitesi', 'Bilkent Üniversitesi',
            ].map((uni, i) => (
              <span
                key={i}
                className="shrink-0 px-6 py-3 glass rounded-full text-text-light/70 text-sm font-medium whitespace-nowrap"
              >
                {uni}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
