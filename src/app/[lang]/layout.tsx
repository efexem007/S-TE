import CookieBanner from '@/components/ui/CookieBanner';
import ChatWidget from '@/components/ui/ChatWidget';
import LenisProvider from '@/components/providers/LenisProvider';

export default function LangLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LenisProvider>
      <main id="main-content">{children}</main>
      <CookieBanner />
      <ChatWidget />
    </LenisProvider>
  );
}
