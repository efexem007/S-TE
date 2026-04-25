'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '#hero', label: 'Ana Sayfa', labelEn: 'Home' },
  { href: '#about', label: 'Hakkımızda', labelEn: 'About' },
  { href: '#programs', label: 'Programlar', labelEn: 'Programs' },
  { href: '#services', label: 'Hizmetler', labelEn: 'Services' },
  { href: '#coaches', label: 'Koçlar', labelEn: 'Coaches' },
  { href: '#process', label: 'Süreç', labelEn: 'Process' },
  { href: '#testimonials', label: 'Yorumlar', labelEn: 'Testimonials' },
  { href: '#pricing', label: 'Fiyatlandırma', labelEn: 'Pricing' },
  { href: '#faq', label: 'SSS', labelEn: 'FAQ' },
  { href: '#contact', label: 'İletişim', labelEn: 'Contact' },
];

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
            <Link 
              key={link.href} 
              href={link.href} 
              className="relative text-text-light/80 hover:text-accent-cyan transition-colors text-sm font-medium group py-2"
            >
              {isTr ? link.label : link.labelEn}
              <span className="absolute bottom-0 left-0 h-0.5 bg-accent-cyan transition-all duration-300 w-0 group-hover:w-full" />
            </Link>
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
          <Link 
            href="#contact" 
            className="px-5 py-2.5 bg-gradient-accent text-bg-darkest text-sm font-semibold rounded-full hover:shadow-glow-cyan transition-all duration-300"
          >
            {isTr ? 'Randevu Al' : 'Book Now'}
          </Link>
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
            <Link 
              key={link.href} 
              href={link.href} 
              onClick={() => setMobileOpen(false)} 
              className="block py-3 px-4 text-text-light/90 hover:text-accent-cyan hover:bg-white/5 rounded-lg transition-colors text-base"
            >
              {isTr ? link.label : link.labelEn}
            </Link>
          ))}
          <Link 
            href={`/${lang === 'tr' ? 'en' : 'tr'}`} 
            className="block py-3 px-4 text-accent-cyan hover:bg-white/5 rounded-lg transition-colors text-base font-medium"
          >
            {isTr ? 'English' : 'Türkçe'}
          </Link>
          <Link 
            href="#contact" 
            onClick={() => setMobileOpen(false)} 
            className="block py-3 px-4 bg-gradient-accent text-bg-darkest text-center rounded-full font-semibold hover:shadow-glow-cyan transition-all duration-300 mt-2"
          >
            {isTr ? 'Randevu Al' : 'Book Now'}
          </Link>
        </div>
      </div>
    </nav>
  );
}
