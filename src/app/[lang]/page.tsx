import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Services from '@/components/sections/Services';
import Coaches from '@/components/sections/Coaches';
import Process from '@/components/sections/Process';
import Testimonials from '@/components/sections/Testimonials';
import Contact from '@/components/sections/Contact';
import BackToTop from '@/components/ui/BackToTop';

export default function HomePage({ params }: { params: { lang: string } }) {
  const { lang } = params;

  return (
    <>
      <Navbar lang={lang} />
      <Hero lang={lang} />
      <About lang={lang} />
      <Services lang={lang} />
      <Coaches lang={lang} />
      <Process lang={lang} />
      <Testimonials lang={lang} />
      <Contact lang={lang} />
      <Footer lang={lang} />
      <BackToTop />
    </>
  );
}
