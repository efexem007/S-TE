'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const faqData = [
  {
    question: 'Koçluk seansları nasıl yapılıyor?',
    questionEn: 'How are coaching sessions conducted?',
    answer: 'Koçluk seanslarımız yüz yüze veya online olarak gerçekleştirilebilir. Her seans 45-60 dakika sürer ve size özel bir program çerçevesinde ilerler.',
    answerEn: 'Our coaching sessions can be conducted face-to-face or online. Each session lasts 45-60 minutes and follows a program tailored specifically for you.',
  },
  {
    question: 'Online eğitimlere nasıl katılabilirim?',
    questionEn: 'How can I join online training?',
    answer: 'Online eğitimlerimize web sitemiz üzerinden kayıt olarak katılabilirsiniz. Eğitim materyallerine 7/24 erişim imkanı sunuyoruz.',
    answerEn: 'You can register for our online training through our website. We provide 24/7 access to training materials.',
  },
  {
    question: 'Kurumsal eğitimler için minimum kaç kişi gerekli?',
    questionEn: 'What is the minimum number of participants for corporate training?',
    answer: 'Kurumsal eğitimlerimiz için minimum 5 kişilik katılım yeterlidir. Daha küçük gruplar için birebir koçluk programlarımızı öneririz.',
    answerEn: 'A minimum of 5 participants is required for our corporate training. For smaller groups, we recommend our one-on-one coaching programs.',
  },
  {
    question: 'Ödeme seçenekleri nelerdir?',
    questionEn: 'What are the payment options?',
    answer: 'Kredi kartı, havale/EFT veya çek ile ödeme yapabilirsiniz. Kurumsal müşterilerimize özel ödeme planları sunuyoruz.',
    answerEn: 'You can pay by credit card, bank transfer, or check. We offer special payment plans for our corporate clients.',
  },
  {
    question: 'Memnun kalmazsam para iadesi alabilir miyim?',
    questionEn: 'Can I get a refund if I am not satisfied?',
    answer: 'Evet, ilk seanstan sonra memnun kalmazsanız 7 gün içinde tam para iadesi talep edebilirsiniz. Sizin memnuniyetiniz bizim için öncelik.',
    answerEn: 'Yes, if you are not satisfied after the first session, you can request a full refund within 7 days. Your satisfaction is our priority.',
  },
];

export default function FAQ({ lang = 'tr' }: { lang?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from('.faq-item', {
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
      id="faq"
      aria-label={isTr ? 'Sıkça Sorulan Sorular' : 'FAQ'}
      className="bg-bg-dark py-24 md:py-32"
    >
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-extrabold text-section text-white mb-4">
            {isTr ? 'Sıkça Sorulan Sorular' : 'Frequently Asked Questions'}
          </h2>
          <p className="text-text-light/60">
            {isTr ? 'Aklınıza takılanları yanıtladık.' : 'We have answered your questions.'}
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="faq-item glass rounded-xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-medium text-white pr-4">{isTr ? faq.question : faq.questionEn}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-accent-cyan shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}
                >
                  <p className="px-6 pb-6 text-text-light/60 text-sm leading-relaxed">
                    {isTr ? faq.answer : faq.answerEn}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
