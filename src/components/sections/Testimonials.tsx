'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import Card from '@/components/ui/Card';

const testimonialsData = [
  {
    id: 'testimonial-1',
    name: 'Elif Şahin',
    title: 'Pazarlama Müdürü',
    titleEn: 'Marketing Manager',
    quote: 'DueM via Work sayesinde kariyerimde beklenmedik bir dönüşüm yaşadım. Koçluk seansları benim için çok değerliydi.',
    quoteEn: 'Thanks to DueM via Work, I experienced an unexpected transformation in my career. The coaching sessions were invaluable.',
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
      className="bg-bg-cream py-24 md:py-32"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-section text-text-primary text-center mb-4">
          {isTr ? 'Müşteri Yorumları' : 'Client Testimonials'}
        </h2>
        <p className="text-text-secondary text-center mb-16 max-w-2xl mx-auto">
          {isTr ? 'Başarı hikayelerimizden ilham alın.' : 'Be inspired by our success stories.'}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial) => (
            <Card key={testimonial.id} className="testimonial-card" hover>
              {/* Stars */}
              <div className="flex gap-1 mb-4" aria-label={`${testimonial.rating} üzerinden ${testimonial.rating} yıldız`}>
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent-terra text-accent-terra" aria-hidden="true" />
                ))}
              </div>

              <blockquote className="text-text-primary text-base leading-relaxed mb-6">
                "{isTr ? testimonial.quote : testimonial.quoteEn}"
              </blockquote>

              <div className="border-t border-text-secondary/10 pt-4">
                <p className="font-medium text-text-primary">{testimonial.name}</p>
                <p className="text-text-secondary text-sm">{isTr ? testimonial.title : testimonial.titleEn}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
