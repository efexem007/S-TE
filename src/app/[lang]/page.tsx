import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import QuickLinks from '@/components/sections/QuickLinks';
import About from '@/components/sections/About';
import Programs from '@/components/sections/Programs';
import QuizSection from '@/components/sections/QuizSection';
import Services from '@/components/sections/Services';
import Coaches from '@/components/sections/Coaches';
import Process from '@/components/sections/Process';
import SocialProof from '@/components/sections/SocialProof';
import Testimonials from '@/components/sections/Testimonials';
import Pricing from '@/components/sections/Pricing';
import Blog from '@/components/sections/Blog';
import SuccessStories from '@/components/sections/SuccessStories';
import LeadMagnet from '@/components/sections/LeadMagnet';
import FAQ from '@/components/sections/FAQ';
import Contact from '@/components/sections/Contact';
import BackToTop from '@/components/ui/BackToTop';

export default function HomePage({ params }: { params: { lang: string } }) {
  const { lang } = params;

  return (
    <>
      <Navbar lang={lang} />
      <Hero lang={lang} />
      <QuickLinks lang={lang} />
      <About lang={lang} />
      <Programs lang={lang} />
      <QuizSection lang={lang} />
      <Services lang={lang} />
      <Coaches lang={lang} />
      <Process lang={lang} />
      <SocialProof lang={lang} />
      <Testimonials lang={lang} />
      <SuccessStories lang={lang} />
      <Pricing lang={lang} />
      <Blog lang={lang} />
      <LeadMagnet lang={lang} />
      <FAQ lang={lang} />
      <Contact lang={lang} />
      <Footer lang={lang} />
      <BackToTop />
    </>
  );
}
