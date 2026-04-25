import Link from 'next/link';
import { Instagram, Linkedin, Twitter } from 'lucide-react';

export default function Footer({ lang = 'tr' }: { lang?: string }) {
  const isTr = lang === 'tr';

  return (
    <footer role="contentinfo" className="bg-bg-darkest border-t border-white/5 text-text-light py-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div className="space-y-4">
            <Link href={`/${lang}`} className="text-2xl font-extrabold tracking-tight inline-block">
              <span className="text-gradient">dueM</span>
              <span className="text-white">WeWork</span>
            </Link>
            <p className="text-text-light/60 text-sm leading-relaxed max-w-xs">
              {isTr 
                ? 'Profesyonel gelişim, birebir koçluk ve kurumsal eğitimlerle geleceğinizi şekillendirin.' 
                : 'Shape your future with professional development, one-on-one coaching, and corporate training.'}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-text-light text-sm uppercase tracking-wider">
              {isTr ? 'Hızlı Bağlantılar' : 'Quick Links'}
            </h3>
            <div className="flex flex-col gap-3">
              <Link href="#about" className="text-text-light/60 hover:text-accent-cyan transition-colors text-sm">{isTr ? 'Hakkımızda' : 'About'}</Link>
              <Link href="#services" className="text-text-light/60 hover:text-accent-cyan transition-colors text-sm">{isTr ? 'Hizmetler' : 'Services'}</Link>
              <Link href="#coaches" className="text-text-light/60 hover:text-accent-cyan transition-colors text-sm">{isTr ? 'Koçlar' : 'Coaches'}</Link>
              <Link href="#contact" className="text-text-light/60 hover:text-accent-cyan transition-colors text-sm">{isTr ? 'İletişim' : 'Contact'}</Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-text-light text-sm uppercase tracking-wider">
              {isTr ? 'Sosyal Medya' : 'Social Media'}
            </h3>
            <div className="flex gap-3">
              <Link 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram" 
                className="p-2.5 rounded-full glass text-text-light/70 hover:text-accent-cyan hover:border-accent-cyan/30 transition-all"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="LinkedIn" 
                className="p-2.5 rounded-full glass text-text-light/70 hover:text-accent-cyan hover:border-accent-cyan/30 transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Twitter" 
                className="p-2.5 rounded-full glass text-text-light/70 hover:text-accent-cyan hover:border-accent-cyan/30 transition-all"
              >
                <Twitter className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text-light/40">
            &copy; {new Date().getFullYear()} dueMWeWork. {isTr ? 'Tüm hakları saklıdır.' : 'All rights reserved.'}
          </p>
          <div className="flex gap-6 text-sm text-text-light/40">
            <Link href="#" className="hover:text-accent-cyan transition-colors">{isTr ? 'Gizlilik Politikası' : 'Privacy Policy'}</Link>
            <Link href="#" className="hover:text-accent-cyan transition-colors">{isTr ? 'Kullanım Koşulları' : 'Terms of Use'}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
