'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, BookOpen, Clock, Tag } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const blogPosts = [
  {
    id: 1,
    title: 'Verimli Ders Çalışmanın 7 Altın Kuralı',
    titleEn: '7 Golden Rules for Efficient Studying',
    excerpt: 'Pomodoro tekniği, aktif öğrenme ve tekrar stratejileri ile ders verimliliğini iki katına çıkarın.',
    excerptEn: 'Double your study efficiency with Pomodoro technique, active learning, and review strategies.',
    category: 'Çalışma Teknikleri',
    categoryEn: 'Study Techniques',
    readTime: '5 dk',
    color: 'accent-cyan',
  },
  {
    id: 2,
    title: 'Sınav Kaygısını Motivasyona Dönüştürme Rehberi',
    titleEn: 'Guide to Transforming Exam Anxiety into Motivation',
    excerpt: 'Kaygı normaldir. Önemli olan onu enerjiye ve motivasyona çevirmeyi bilmek. İşte adım adım yöntemler.',
    excerptEn: 'Anxiety is normal. The key is knowing how to convert it into energy and motivation. Here are step-by-step methods.',
    category: 'Motivasyon',
    categoryEn: 'Motivation',
    readTime: '7 dk',
    color: 'accent-violet',
  },
  {
    id: 3,
    title: 'Birebir Koçluk ile Hedeflerine Ulaşmak',
    titleEn: 'Reaching Your Goals with One-on-One Coaching',
    excerpt: 'Kişiselleştirilmiş koçluk seanslarının kariyer ve akademik başarıya etkisini araştırdık. Sonuçlar şaşırtıcı.',
    excerptEn: 'We researched the impact of personalized coaching sessions on career and academic success. The results are surprising.',
    category: 'Koçluk',
    categoryEn: 'Coaching',
    readTime: '6 dk',
    color: 'accent-rose',
  },
];

export default function Blog({ lang = 'tr' }: { lang?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from('.blog-card', {
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
      id="blog"
      aria-label={isTr ? 'Blog' : 'Blog'}
      className="bg-bg-dark-2 py-24 md:py-32"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-accent-cyan mb-4">
            <BookOpen className="w-4 h-4" />
            {isTr ? 'dueMWeWork Blog' : 'dueMWeWork Blog'}
          </div>
          <h2 className="font-extrabold text-section text-white mb-4">
            {isTr ? 'Bilgi ve İlham Köşesi' : 'Knowledge & Inspiration Hub'}
          </h2>
          <p className="text-text-light/60 max-w-2xl mx-auto">
            {isTr
              ? 'Koçluk, motivasyon ve başarı stratejileri hakkında en güncel içerikler.'
              : 'The most up-to-date content on coaching, motivation, and success strategies.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="blog-card group glass rounded-2xl overflow-hidden hover:bg-white/5 transition-all duration-300 cursor-pointer"
              onClick={() => alert(isTr ? 'Blog yazısı yakında yayında!' : 'Blog post coming soon!')}
            >
              {/* Colored top bar */}
              <div className={`h-1 bg-${post.color}`} />
              
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full bg-${post.color}/10 text-${post.color} text-xs font-medium`}>
                    <Tag className="w-3 h-3" />
                    {isTr ? post.category : post.categoryEn}
                  </span>
                  <span className="flex items-center gap-1 text-text-light/40 text-xs">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="font-semibold text-lg text-white mb-3 group-hover:text-accent-cyan transition-colors">
                  {isTr ? post.title : post.titleEn}
                </h3>
                <p className="text-text-light/60 text-sm leading-relaxed mb-6">
                  {isTr ? post.excerpt : post.excerptEn}
                </p>

                <div className="flex items-center gap-2 text-accent-cyan text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  {isTr ? 'Devamını oku' : 'Read more'}
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
