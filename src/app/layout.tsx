import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700', '800'],
  preload: true,
});

export const metadata: Metadata = {
  title: 'dueMWeWork | Eğitim ve Gelişim Platformu',
  description: 'Profesyonel gelişim, birebir koçluk ve kurumsal eğitimler. Geleceğin yetkinliklerini bugünden kazanın.',
  metadataBase: new URL('https://duemwework.com'),
  openGraph: {
    title: 'dueMWeWork',
    description: 'Profesyonel gelişim ve eğitim platformu.',
    url: 'https://duemwework.com',
    siteName: 'dueMWeWork',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'dueMWeWork' }],
    locale: 'tr_TR',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${inter.variable}`}>
      <head>
        {/* Font preload — kritik fontlar */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        {/* Skip-to-content linki */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-accent-cyan focus:text-bg-darkest focus:rounded"
        >
          Ana içeriğe geç
        </a>
        {children}
      </body>
    </html>
  );
}
