'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Target, Users, Award, TrendingUp, Quote } from 'lucide-react';
import TextReveal from '@/components/effects/TextReveal';

const motivationQuotes = [
  { tr: 'Nerede olursan ol, elinden geleni yaparsan hak ettiğini alırsın.', en: 'Wherever you are, do your best and you will get what you deserve.' },
  { tr: 'Bugün yaptığın fedakarlık, yarının zaferi olacak.', en: 'Today\'s sacrifice will be tomorrow\'s victory.' },
  { tr: 'Sınırını zorlamazsan, potansiyelini asla keşfedemezsin.', en: 'If you don\'t push your limits, you\'ll never discover your potential.' },
  { tr: 'Pişman olmaktan korkma, hiç denememekten kork.', en: 'Don\'t fear regret, fear never trying.' },
  { tr: 'Küçük adımlar, büyük değişimlerin başlangıcıdır.', en: 'Small steps are the beginning of big changes.' },
  { tr: 'Başarı, hazır olduğun anda fırsatın kapını çalmasıdır.', en: 'Success is when opportunity knocks while you are prepared.' },
  { tr: 'Hayal etmek bedava, peşinden koşmak zafer.', en: 'Dreaming is free, chasing it is victory.' },
  { tr: 'Bugün zor, yarın daha zor, ama öbür gün muhteşem olacak.', en: 'Today is hard, tomorrow harder, but the day after will be magnificent.' },
  { tr: 'Durduğun yerde ileriye gidemezsin, harekete geç.', en: 'You can\'t move forward standing still, take action.' },
  { tr: 'Her düşüş, kalkış için bir fırsattır.', en: 'Every fall is an opportunity to rise.' },
  { tr: 'Geleceğini bugünden inşa et, yarın için pişmanlık taşıma.', en: 'Build your future today, carry no regrets for tomorrow.' },
  { tr: 'En büyük zafer, kendini aşmaktır.', en: 'The greatest victory is surpassing yourself.' },
  { tr: 'Hayallerin için savaş, çünkü sen onlara layıksın.', en: 'Fight for your dreams, because you deserve them.' },
  { tr: 'Değişim acı verebilir, ama hiçbir şey aynı kalmak kadar acı vermez.', en: 'Change can hurt, but nothing hurts as much as staying the same.' },
  { tr: 'Yol uzun olabilir, ama her adım seni hedefine yaklaştırır.', en: 'The road may be long, but every step brings you closer.' },
  { tr: 'Başkalarının inanmadığı bir hayali gerçekleştirmek, en büyük zaferdir.', en: 'Achieving a dream others didn\'t believe in is the greatest victory.' },
  { tr: 'Vazgeçmek, asla başlamamaktan daha kötü değildir.', en: 'Giving up is never worse than never starting.' },
  { tr: 'Senin için imkansız görünen, birinin günlük rutinidir.', en: 'What seems impossible to you is someone\'s daily routine.' },
  { tr: 'Mükemmellik bir gecede oluşmaz, sabır ve azimle gelir.', en: 'Excellence doesn\'t happen overnight, it comes with patience and determination.' },
  { tr: 'Bugünün çabası, yarının gurur kaynağı olacak.', en: 'Today\'s effort will be tomorrow\'s source of pride.' },
  { tr: 'Korkularını aş, çünkü diğer tarafında özgürlük var.', en: 'Overcome your fears, because freedom is on the other side.' },
  { tr: 'Hayat seni beklemiyor, sen hayatı yakalayacaksın.', en: 'Life isn\'t waiting for you, you will catch up to life.' },
  { tr: 'Bir kez daha dene, her deneme bir adım daha yaklaştırır.', en: 'Try once more, every attempt brings you one step closer.' },
  { tr: 'Güçlü olmak zorundayız, çünkü pes etme lüksümüz yok.', en: 'We must be strong, because we have no luxury of giving up.' },
  { tr: 'En karanlık gece bile sabahı getirir.', en: 'Even the darkest night brings morning.' },
  { tr: 'Sen düşebilirsin, ama düştüğün yerde kalmak zorunda değilsin.', en: 'You may fall, but you don\'t have to stay where you fell.' },
  { tr: 'Bugün zorlanıyorsan, yarın güçleniyorsun demektir.', en: 'If you\'re struggling today, it means you\'re getting stronger tomorrow.' },
  { tr: 'Her şeyi yapabilirsin, tek ihtiyacın olan inanmak.', en: 'You can do everything, all you need is to believe.' },
  { tr: 'Kendine yatırım yap, bu dünyadaki en iyi yatırımdır.', en: 'Invest in yourself, it\'s the best investment in the world.' },
  { tr: 'Başarısızlık bir seçenek değil, öğrenme fırsatıdır.', en: 'Failure is not an option, it\'s an opportunity to learn.' },
];

// Deterministic daily quote selection based on date
function getDailyQuoteIndex(): number {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - startOfYear.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  return dayOfYear % motivationQuotes.length;
}

const stats = [
  { icon: Users, value: '2.500+', label: 'Öğrenci', labelEn: 'Students' },
  { icon: Award, value: '15+', label: 'Yıllık Deneyim', labelEn: 'Years Experience' },
  { icon: Target, value: '95%', label: 'Başarı Oranı', labelEn: 'Success Rate' },
  { icon: TrendingUp, value: '40+', label: 'Kurumsal İş Birliği', labelEn: 'Corporate Partners' },
];

export default function About({ lang = 'tr' }: { lang?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    setQuoteIndex(getDailyQuoteIndex());
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from('.about-fade-up', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
      gsap.from('.about-stat', {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.about-stats', start: 'top 85%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const isTr = lang === 'tr';
  const dailyQuote = motivationQuotes[quoteIndex];

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-label={isTr ? 'Hakkımızda' : 'About'}
      className="relative bg-bg-dark py-24 md:py-32 overflow-hidden"
    >
      {/* Decorative gradient blob */}
      <div
        className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-10 blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #00F0FF 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <TextReveal
              tag="h2"
              className="font-extrabold text-section text-white mb-6"
              splitBy="words"
              stagger={0.05}
            >
              {isTr ? 'Hakkımızda' : 'About Us'}
            </TextReveal>

            <div className="about-fade-up glass rounded-2xl p-6 mb-6 border-l-4 border-accent-cyan">
              <Quote className="w-8 h-8 text-accent-cyan/40 mb-3" />
              <p className="text-accent-cyan font-semibold text-lg md:text-xl italic leading-relaxed">
                {isTr ? dailyQuote.tr : dailyQuote.en}
              </p>
              <p className="text-text-light/40 text-xs mt-3 uppercase tracking-wider">
                {isTr ? 'Günlük Motivasyon' : 'Daily Motivation'}
              </p>
            </div>

            <p className="about-fade-up text-text-light/70 text-lg leading-relaxed mb-6">
              {isTr
                ? 'dueMWeWork olarak, bireylerin ve kurumların potansiyellerini en üst düzeye çıkarmaları için kişiselleştirilmiş koçluk ve eğitim programları sunuyoruz. Geleceğin yetkinliklerini bugünden kazanmanız için yanınızdayız.'
                : 'At dueMWeWork, we offer personalized coaching and training programs to help individuals and organizations reach their full potential. We are by your side to acquire future skills starting today.'}
            </p>
            <p className="about-fade-up text-text-light/70 text-lg leading-relaxed">
              {isTr
                ? 'Uzman kadromuz ve kanıtlanmış metodolojilerimizle, her adımda sizi destekliyor ve hedeflerinize ulaşmanızı sağlıyoruz.'
                : 'With our expert team and proven methodologies, we support you at every step and ensure you reach your goals.'}
            </p>
          </div>

          <div className="about-stats grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="about-stat glass rounded-2xl p-6 text-center hover:bg-white/5 transition-colors"
              >
                <stat.icon className="w-8 h-8 text-accent-cyan mx-auto mb-3" />
                <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-text-light/50 text-sm">{isTr ? stat.label : stat.labelEn}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
