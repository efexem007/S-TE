'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Quote } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const testimonialsData = [
  {
    id: 'testimonial-1',
    name: 'Elif Şahin',
    title: 'Pazarlama Müdürü',
    titleEn: 'Marketing Manager',
    quote: 'dueMWeWork sayesinde kariyerimde beklenmedik bir dönüşüm yaşadım. Koçluk seansları benim için çok değerliydi.',
    quoteEn: 'Thanks to dueMWeWork, I experienced an unexpected transformation in my career. The coaching sessions were invaluable.',
    rating: 5,
  },
  {
    id: 'testimonial-2',
    name: 'Can Özdemir',
    title: 'Girişimci',
    titleEn: 'Entrepreneur',
    quote: 'Kurumsal eğitim programları ekibimizin verimliliğini %40 artırdı. Profesyonel ve samimi bir yaklaşım.',
    quoteEn: 'The corporate training programs increased our team\'s efficiency by 40%. A professional yet warm approach.',
    rating: 5,
  },
  {
    id: 'testimonial-3',
    name: 'Selin Aydın',
    title: 'Yazılım Mühendisi',
    titleEn: 'Software Engineer',
    quote: 'Online koçluk programı sayesinde yoğun iş temposunda bile kendime zaman ayırabildim. Harika bir deneyim!',
    quoteEn: 'Thanks to the online coaching program, I could make time for myself even with a busy work schedule. A great experience!',
    rating: 5,
  },
];

export default function Testimonials({ lang = 'tr' }: { lang?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from('.testimonial-card', {
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
      id="testimonials"
      aria-label={isTr ? 'Yorumlar' : 'Testimonials'}
      className="bg-bg-dark py-24 md:py-32"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-extrabold text-section text-white mb-4">
            {isTr ? 'Müşteri Yorumları' : 'Client Testimonials'}
          </h2>
          <p className="text-text-light/60 max-w-2xl mx-auto">
            {isTr ? 'Başarı hikayelerimizden ilham alın.' : 'Be inspired by our success stories.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial) => (
            <div
              key={testimonial.id}
              className="testimonial-card glass rounded-2xl p-8 hover:bg-white/5 transition-all duration-300 relative"
            >
              <Quote className="w-10 h-10 text-accent-cyan/20 absolute top-6 right-6" />
              
              {/* Stars */}
              <div className="flex gap-1 mb-6" aria-label={`${testimonial.rating} üzerinden ${testimonial.rating} yıldız`}>
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent-cyan text-accent-cyan" aria-hidden="true" />
                ))}
              </div>

              <blockquote className="text-text-light/80 text-base leading-relaxed mb-8">
                "{isTr ? testimonial.quote : testimonial.quoteEn}"
              </blockquote>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-accent flex items-center justify-center text-bg-darkest font-bold">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-text-light/50 text-sm">{isTr ? testimonial.title : testimonial.titleEn}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
