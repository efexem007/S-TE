'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Sparkles, Gift, RefreshCw } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useTilt } from '@/hooks/useTilt';

const plans = [
  {
    id: 'basic',
    name: 'Temel',
    nameEn: 'Basic',
    price: '₺999',
    period: '/ay',
    periodEn: '/month',
    description: 'Bireysel gelişim için ideal başlangıç paketi.',
    descriptionEn: 'Ideal starter package for personal development.',
    features: [
      { tr: '4 saat birebir koçluk', en: '4 hours one-on-one coaching' },
      { tr: 'Online kaynaklara erişim', en: 'Access to online resources' },
      { tr: 'E-posta desteği', en: 'Email support' },
      { tr: 'Aylık ilerleme raporu', en: 'Monthly progress report' },
    ],
    popular: false,
  },
  {
    id: 'pro',
    name: 'Profesyonel',
    nameEn: 'Professional',
    price: '₺2.499',
    period: '/ay',
    periodEn: '/month',
    description: 'Kariyerinizi hızlandırmak için kapsamlı destek.',
    descriptionEn: 'Comprehensive support to accelerate your career.',
    features: [
      { tr: '12 saat birebir koçluk', en: '12 hours one-on-one coaching' },
      { tr: 'Özel eğitim programları', en: 'Custom training programs' },
      { tr: '7/24 WhatsApp desteği', en: '24/7 WhatsApp support' },
      { tr: 'Haftalık ilerleme raporu', en: 'Weekly progress report' },
      { tr: 'LinkedIn profil optimizasyonu', en: 'LinkedIn profile optimization' },
    ],
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Kurumsal',
    nameEn: 'Enterprise',
    price: 'Özel',
    priceEn: 'Custom',
    period: '',
    description: 'Ekipleriniz için özel çözümler ve kurumsal eğitim.',
    descriptionEn: 'Custom solutions and corporate training for your teams.',
    features: [
      { tr: 'Sınırsız koçluk seansları', en: 'Unlimited coaching sessions' },
      { tr: 'Kurumsal eğitim programları', en: 'Corporate training programs' },
      { tr: 'Özel atölye çalışmaları', en: 'Custom workshop sessions' },
      { tr: 'Detaylı analiz raporları', en: 'Detailed analytics reports' },
      { tr: 'Özel hesap yöneticisi', en: 'Dedicated account manager' },
    ],
    popular: false,
  },
];

export default function Pricing({ lang = 'tr' }: { lang?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from('.pricing-card', {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
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
      id="pricing"
      aria-label={isTr ? 'Fiyatlandırma' : 'Pricing'}
      className="bg-bg-dark-2 py-24 md:py-32 relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-10 blur-[150px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #00F0FF 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-extrabold text-section text-white mb-4">
            {isTr ? 'Fiyatlandırma' : 'Pricing'}
          </h2>
          <p className="text-text-light/60 max-w-2xl mx-auto">
            {isTr
              ? 'Size en uygun planı seçin, geleceğinize yatırım yapın.'
              : 'Choose the plan that suits you best and invest in your future.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} isTr={isTr} />
          ))}
        </div>

        {/* Guarantee badges inspired by kantakademi.com */}
        <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10">
          <div className="flex items-center gap-3 glass rounded-full px-6 py-3">
            <Gift className="w-5 h-5 text-accent-cyan" />
            <span className="text-text-light/80 text-sm">
              {isTr ? '2 Ücretsiz Deneme Dersi' : '2 Free Trial Sessions'}
            </span>
          </div>
          <div className="flex items-center gap-3 glass rounded-full px-6 py-3">
            <RefreshCw className="w-5 h-5 text-accent-violet" />
            <span className="text-text-light/80 text-sm">
              {isTr ? 'Sınırsız Koç Değişimi' : 'Unlimited Coach Changes'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingCard({ plan, isTr }: { plan: typeof plans[0]; isTr: boolean }) {
  const tiltRef = useTilt<HTMLDivElement>({ max: 8, scale: 1.02 });

  return (
    <div
      ref={tiltRef}
      className={`pricing-card relative rounded-2xl p-8 transition-all duration-300 ${
        plan.popular
          ? 'glass-strong border-accent-cyan/30 shadow-glow-cyan scale-105 z-10'
          : 'glass hover:bg-white/5'
      }`}
      style={{ transformStyle: 'preserve-3d' }}
    >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-accent text-bg-darkest text-xs font-bold rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  {isTr ? 'En Popüler' : 'Most Popular'}
                </div>
              )}

              <h3 className="text-xl font-semibold text-white mb-2">{isTr ? plan.name : plan.nameEn}</h3>
              <p className="text-text-light/50 text-sm mb-6">{isTr ? plan.description : plan.descriptionEn}</p>

              <div className="mb-8">
                <span className="text-4xl font-extrabold text-white">{isTr ? plan.price : plan.priceEn}</span>
                <span className="text-text-light/50">{isTr ? plan.period : plan.periodEn}</span>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent-cyan shrink-0 mt-0.5" />
                    <span className="text-text-light/70 text-sm">{isTr ? feature.tr : feature.en}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => {
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className={`block w-full text-center py-3 rounded-full font-semibold transition-all duration-300 border-none cursor-pointer ${
                  plan.popular
                    ? 'bg-gradient-accent text-bg-darkest hover:shadow-glow-cyan'
                    : 'border border-white/20 text-text-light hover:bg-white/10'
                }`}
              >
                {isTr ? 'Hemen Başla' : 'Get Started'}
              </button>
            </div>
  );
}
