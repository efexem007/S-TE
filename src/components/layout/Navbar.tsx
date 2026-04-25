'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { id: 'about', label: 'Hakkımızda', labelEn: 'About' },
  { id: 'programs', label: 'Programlar', labelEn: 'Programs' },
  { id: 'services', label: 'Hizmetler', labelEn: 'Services' },
  { id: 'contact', label: 'İletişim', labelEn: 'Contact' },
];

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export default function Navbar({ lang = 'tr' }: { lang?: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isTr = lang === 'tr';

  return (
    <nav
      role="navigation"
      aria-label="Ana navigasyon"
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-bg-darkest/70 backdrop-blur-xl border-b border-white/5 py-3'
          : 'bg-transparent py-5'
      )}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link 
          href={`/${lang}`} 
          className="text-2xl font-extrabold tracking-tight text-white hover:opacity-90 transition-opacity" 
          aria-label="dueMWeWork Ana Sayfa"
        >
          <span className="text-gradient">dueM</span>
          <span className="text-white">WeWork</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToId(link.id)}
              className="relative text-text-light/80 hover:text-accent-cyan transition-colors text-sm font-medium group py-2 bg-transparent border-none cursor-pointer"
            >
              {isTr ? link.label : link.labelEn}
              <span className="absolute bottom-0 left-0 h-0.5 bg-accent-cyan transition-all duration-300 w-0 group-hover:w-full" />
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link 
            href={`/${lang === 'tr' ? 'en' : 'tr'}`} 
            className="text-sm text-text-light/60 hover:text-accent-cyan transition-colors" 
            aria-label={isTr ? 'Switch to English' : 'Türkçeye geç'}
          >
            {isTr ? 'EN' : 'TR'}
          </Link>
          <a
            href={`https://wa.me/905551234567?text=${encodeURIComponent(isTr ? 'Merhaba, koçluk hizmetleriniz hakkında bilgi almak istiyorum.' : 'Hello, I would like to get information about your coaching services.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-green-500/20 text-green-400 hover:bg-green-500/30 hover:text-green-300 transition-all duration-300"
            aria-label={isTr ? 'WhatsApp ile iletişime geç' : 'Contact via WhatsApp'}
          >
            <MessageCircle className="w-5 h-5" />
          </a>
          <button 
            onClick={() => scrollToId('contact')}
            className="px-5 py-2.5 bg-gradient-accent text-bg-darkest text-sm font-semibold rounded-full hover:shadow-glow-cyan transition-all duration-300 border-none cursor-pointer"
          >
            {isTr ? 'Başvuru Yap' : 'Apply Now'}
          </button>
        </div>

        <div className="md:hidden">
          <button 
            onClick={() => setMobileOpen(!mobileOpen)} 
            aria-label={mobileOpen ? 'Menüyü kapat' : 'Menüyü aç'} 
            aria-expanded={mobileOpen} 
            aria-controls="mobile-menu" 
            className="p-2 text-text-light hover:text-accent-cyan transition-colors"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <div 
        id="mobile-menu" 
        className={cn(
          'md:hidden absolute top-full left-0 right-0 bg-bg-darkest/95 backdrop-blur-xl border-b border-white/5 transition-all duration-300 overflow-hidden',
          mobileOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="px-4 py-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <button 
              key={link.id}
              onClick={() => { setMobileOpen(false); scrollToId(link.id); }}
              className="block w-full text-left py-3 px-4 text-text-light/90 hover:text-accent-cyan hover:bg-white/5 rounded-lg transition-colors text-base bg-transparent border-none cursor-pointer"
            >
              {isTr ? link.label : link.labelEn}
            </button>
          ))}
          <Link 
            href={`/${lang === 'tr' ? 'en' : 'tr'}`} 
            className="block py-3 px-4 text-accent-cyan hover:bg-white/5 rounded-lg transition-colors text-base font-medium"
          >
            {isTr ? 'English' : 'Türkçe'}
          </Link>
          <button 
            onClick={() => { setMobileOpen(false); scrollToId('contact'); }}
            className="block w-full py-3 px-4 bg-gradient-accent text-bg-darkest text-center rounded-full font-semibold hover:shadow-glow-cyan transition-all duration-300 mt-2 border-none cursor-pointer"
          >
            {isTr ? 'Başvuru Yap' : 'Apply Now'}
          </button>
        </div>
      </div>
    </nav>
  );
}
