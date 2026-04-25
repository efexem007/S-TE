'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download, FileText, CheckCircle, Mail, ArrowRight } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const freeResources = [
  { tr: 'TYT Konu Özetleri PDF (100+ sayfa)', en: 'TYT Topic Summaries PDF (100+ pages)' },
  { tr: 'AYT Formül Kartları', en: 'AYT Formula Cards' },
  { tr: 'Haftalık Çalışma Planı Şablonu', en: 'Weekly Study Plan Template' },
  { tr: 'Motivasyon Günlüğü', en: 'Motivation Journal' },
];

export default function LeadMagnet({ lang = 'tr' }: { lang?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from('.leadmagnet-fade-up', {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1500);
  };

  return (
    <section
      ref={sectionRef}
      id="leadmagnet"
      aria-label={isTr ? 'Ücretsiz Kaynaklar' : 'Free Resources'}
      className="bg-bg-dark py-24 md:py-32 relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full opacity-10 blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #8B5CF6 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - value prop */}
          <div>
            <div className="leadmagnet-fade-up inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-accent-violet mb-6">
              <Download className="w-4 h-4" />
              {isTr ? 'ÜCRETSİZ' : 'FREE'}
            </div>
            <h2 className="leadmagnet-fade-up font-extrabold text-section text-white mb-4">
              {isTr
                ? 'Hemen İndir, Hemen Başla'
                : 'Download Now, Start Now'}
            </h2>
            <p className="leadmagnet-fade-up text-text-light/60 mb-8 leading-relaxed">
              {isTr
                ? 'Sizin için özenle hazırladığımız TYT-AYT konu özetleri, formül kartları ve çalışma planlarını ücretsiz indirin. E-posta adresinizi bırakın, kaynaklar anında e-postanıza gelsin.'
                : 'Download our carefully prepared TYT-AYT topic summaries, formula cards, and study plans for free. Leave your email address and the resources will be sent to your inbox instantly.'}
            </p>

            <div className="leadmagnet-fade-up space-y-3">
              {freeResources.map((resource, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-accent-cyan shrink-0" />
                  <span className="text-text-light/80 text-sm">{isTr ? resource.tr : resource.en}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - form */}
          <div className="leadmagnet-fade-up glass-strong rounded-2xl p-8 border border-accent-violet/20">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-accent-violet/20 flex items-center justify-center">
                <FileText className="w-7 h-7 text-accent-violet" />
              </div>
              <div>
                <h3 className="font-semibold text-white">
                  {isTr ? 'Ücretsiz PDF Paketi' : 'Free PDF Bundle'}
                </h3>
                <p className="text-text-light/50 text-sm">
                  {isTr ? 'Değerli kaynaklar, sıfır maliyet' : 'Valuable resources, zero cost'}
                </p>
              </div>
            </div>

            {status === 'success' ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
                <p className="text-accent-cyan font-semibold text-lg mb-2">
                  {isTr ? 'Başarılı!' : 'Success!'}
                </p>
                <p className="text-text-light/60 text-sm">
                  {isTr
                    ? 'Kaynaklar e-posta adresinize gönderildi. Spam klasörünü kontrol etmeyi unutmayın!'
                    : 'Resources have been sent to your email. Don\'t forget to check your spam folder!'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-light/30" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={isTr ? 'E-posta adresiniz' : 'Your email address'}
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-text-light placeholder:text-text-light/30 focus:outline-none focus:ring-2 focus:ring-accent-violet focus:border-transparent transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full px-6 py-4 bg-gradient-accent text-bg-darkest font-semibold rounded-full hover:shadow-glow-cyan transition-all duration-300 disabled:opacity-50 inline-flex items-center justify-center gap-2 border-none cursor-pointer"
                >
                  <Download className="w-5 h-5" />
                  {status === 'submitting'
                    ? (isTr ? 'Gönderiliyor...' : 'Sending...')
                    : (isTr ? 'Hemen İndir' : 'Download Now')}
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-text-light/30 text-xs text-center">
                  {isTr
                    ? 'E-posta adresiniz asla üçüncü taraflarla paylaşılmayacaktır.'
                    : 'Your email address will never be shared with third parties.'}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
