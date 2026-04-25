'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Send, Mail, MapPin, Phone } from 'lucide-react';

export default function Contact({ lang = 'tr' }: { lang?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from('.contact-fade-up', {
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('submitting');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
      website: formData.get('website'),
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setFormState('success');
      } else {
        setFormState('error');
      }
    } catch {
      setFormState('error');
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      aria-label={isTr ? 'İletişim' : 'Contact'}
      className="bg-bg-darkest py-24 md:py-32"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="contact-fade-up font-extrabold text-section text-white mb-4">
              {isTr ? 'Bizimle İletişime Geçin' : 'Get in Touch'}
            </h2>
            <p className="contact-fade-up text-text-light/60 mb-12">
              {isTr ? 'Hedeflerinize ulaşmak için ilk adımı atın.' : 'Take the first step towards achieving your goals.'}
            </p>

            <div className="space-y-6">
              <div className="contact-fade-up flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-accent-cyan" />
                </div>
                <div>
                  <p className="text-sm text-text-light/50">{isTr ? 'E-posta' : 'Email'}</p>
                  <p className="text-white">info@duemwework.com</p>
                </div>
              </div>
              <div className="contact-fade-up flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-accent-cyan" />
                </div>
                <div>
                  <p className="text-sm text-text-light/50">{isTr ? 'Telefon' : 'Phone'}</p>
                  <p className="text-white">+90 555 123 45 67</p>
                </div>
              </div>
              <div className="contact-fade-up flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-accent-cyan" />
                </div>
                <div>
                  <p className="text-sm text-text-light/50">{isTr ? 'Adres' : 'Address'}</p>
                  <p className="text-white">İstanbul, Türkiye</p>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="contact-fade-up glass rounded-2xl p-8 space-y-6">
            {/* Honeypot - hidden from users, bots will fill it */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              className="absolute left-[-9999px] opacity-0"
              aria-hidden="true"
            />

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-text-light mb-2">
                {isTr ? 'İsim' : 'Name'} <span aria-hidden="true" className="text-accent-rose">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                aria-required="true"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-text-light placeholder:text-text-light/30 focus:outline-none focus:ring-2 focus:ring-accent-cyan focus:border-transparent transition-all"
                placeholder={isTr ? 'Adınız Soyadınız' : 'Your Full Name'}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-light mb-2">
                {isTr ? 'E-posta' : 'Email'} <span aria-hidden="true" className="text-accent-rose">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                aria-required="true"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-text-light placeholder:text-text-light/30 focus:outline-none focus:ring-2 focus:ring-accent-cyan focus:border-transparent transition-all"
                placeholder={isTr ? 'ornek@email.com' : 'example@email.com'}
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-text-light mb-2">
                {isTr ? 'Mesaj' : 'Message'} <span aria-hidden="true" className="text-accent-rose">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                aria-required="true"
                rows={5}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-text-light placeholder:text-text-light/30 focus:outline-none focus:ring-2 focus:ring-accent-cyan focus:border-transparent transition-all resize-none"
                placeholder={isTr ? 'Mesajınızı yazın...' : 'Write your message...'}
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={formState === 'submitting'}
                aria-label={isTr ? 'Formu gönder' : 'Submit form'}
                className="w-full px-8 py-4 bg-gradient-accent text-bg-darkest font-semibold rounded-full hover:shadow-glow-cyan transition-all duration-300 disabled:opacity-50 inline-flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                {formState === 'submitting'
                  ? (isTr ? 'Gönderiliyor...' : 'Sending...')
                  : (isTr ? 'Gönder' : 'Send')}
              </button>
            </div>

            {formState === 'success' && (
              <p role="alert" className="text-accent-cyan text-center">
                {isTr ? 'Mesajınız başarıyla gönderildi!' : 'Your message has been sent successfully!'}
              </p>
            )}
            {formState === 'error' && (
              <p role="alert" className="text-accent-rose text-center">
                {isTr ? 'Bir hata oluştu. Lütfen tekrar deneyin.' : 'An error occurred. Please try again.'}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
