'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, Users, BarChart, ArrowRight, BookOpen, Target, Award, CheckCircle2 } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import Modal from '@/components/ui/Modal';

const programsData = [
  {
    id: 'leadership',
    title: 'Liderlik ve Yöneticilik',
    titleEn: 'Leadership & Management',
    level: 'Orta - İleri',
    levelEn: 'Intermediate - Advanced',
    duration: '8 Hafta',
    durationEn: '8 Weeks',
    format: 'Online / Yüz Yüze',
    formatEn: 'Online / In-Person',
    description: 'Etkili liderlik becerileri, ekip yönetimi ve stratejik düşünme üzerine kapsamlı program.',
    descriptionEn: 'Comprehensive program on effective leadership skills, team management, and strategic thinking.',
    tags: ['Liderlik', 'Yönetim', 'Strateji'],
    tagsEn: ['Leadership', 'Management', 'Strategy'],
    curriculum: [
      { week: 'Hafta 1-2', topic: 'Liderlik Temelleri ve Kişisel Farkındalık', topicEn: 'Leadership Fundamentals & Self-Awareness' },
      { week: 'Hafta 3-4', topic: 'Ekip Dinamikleri ve Motivasyon Teknikleri', topicEn: 'Team Dynamics & Motivation Techniques' },
      { week: 'Hafta 5-6', topic: 'Stratejik Düşünme ve Karar Verme', topicEn: 'Strategic Thinking & Decision Making' },
      { week: 'Hafta 7-8', topic: 'Değişim Yönetimi ve Proje Liderliği', topicEn: 'Change Management & Project Leadership' },
    ],
    outcomes: [
      'Liderlik tarzınızı keşfedin ve geliştirin',
      'Etkili iletişim ve geri bildirim teknikleri',
      'Zor kararları analitik çerçevede alma becerisi',
      'Değişim süreçlerini yönetme yetkinliği',
    ],
    outcomesEn: [
      'Discover and develop your leadership style',
      'Effective communication and feedback techniques',
      'Analytical decision-making skills',
      'Competence in managing change processes',
    ],
  },
  {
    id: 'career',
    title: 'Kariyer Gelişimi',
    titleEn: 'Career Development',
    level: 'Başlangıç - Orta',
    levelEn: 'Beginner - Intermediate',
    duration: '6 Hafta',
    durationEn: '6 Weeks',
    format: 'Online',
    formatEn: 'Online',
    description: 'Kariyer hedeflerinizi belirleme, kişisel markanızı oluşturma ve iş arama stratejileri.',
    descriptionEn: 'Define your career goals, build your personal brand, and master job search strategies.',
    tags: ['Kariyer', 'Kişisel Marka', 'Mülakat'],
    tagsEn: ['Career', 'Personal Brand', 'Interview'],
    curriculum: [
      { week: 'Hafta 1', topic: 'Kariyer Değerlendirmesi ve Hedef Belirleme', topicEn: 'Career Assessment & Goal Setting' },
      { week: 'Hafta 2-3', topic: 'Kişisel Marka ve LinkedIn Optimizasyonu', topicEn: 'Personal Brand & LinkedIn Optimization' },
      { week: 'Hafta 4-5', topic: 'CV, Mülakat ve Müzakere Teknikleri', topicEn: 'CV, Interview & Negotiation Techniques' },
      { week: 'Hafta 6', topic: 'Ağ Kurma ve Kariyer Stratejisi', topicEn: 'Networking & Career Strategy' },
    ],
    outcomes: [
      'Net kariyer hedefleri ve yol haritası',
      'Profesyonel kişisel marka kimliği',
      'Mülakatlarda öne çıkma teknikleri',
      'Maaş müzakere stratejileri',
    ],
    outcomesEn: [
      'Clear career goals and roadmap',
      'Professional personal brand identity',
      'Techniques to stand out in interviews',
      'Salary negotiation strategies',
    ],
  },
  {
    id: 'communication',
    title: 'İletişim ve Sunum Becerileri',
    titleEn: 'Communication & Presentation Skills',
    level: 'Tüm Seviyeler',
    levelEn: 'All Levels',
    duration: '4 Hafta',
    durationEn: '4 Weeks',
    format: 'Online / Yüz Yüze',
    formatEn: 'Online / In-Person',
    description: 'Etkili iletişim teknikleri, halka açık konuşma ve profesyonel sunum hazırlama.',
    descriptionEn: 'Effective communication techniques, public speaking, and professional presentation preparation.',
    tags: ['İletişim', 'Sunum', 'Konuşma'],
    tagsEn: ['Communication', 'Presentation', 'Speaking'],
    curriculum: [
      { week: 'Hafta 1', topic: 'Etkili İletişim ve Aktif Dinleme', topicEn: 'Effective Communication & Active Listening' },
      { week: 'Hafta 2', topic: 'Halka Açık Konuşma ve Beden Dili', topicEn: 'Public Speaking & Body Language' },
      { week: 'Hafta 3', topic: 'Profesyonel Sunum Tasarımı', topicEn: 'Professional Presentation Design' },
      { week: 'Hafta 4', topic: 'Zor Durumlar ve Çatışma Çözümü', topicEn: 'Difficult Situations & Conflict Resolution' },
    ],
    outcomes: [
      'Her ortamda etkili iletişim kurma',
      'Stres altında güvenli konuşma',
      'Görsel ve sözel sunum hazırlama',
      'Zor anlarda soğukkanlılık',
    ],
    outcomesEn: [
      'Effective communication in any environment',
      'Confident speaking under stress',
      'Visual and verbal presentation preparation',
      'Calmness in difficult moments',
    ],
  },
  {
    id: 'digital',
    title: 'Dijital Dönüşüm ve AI',
    titleEn: 'Digital Transformation & AI',
    level: 'Orta - İleri',
    levelEn: 'Intermediate - Advanced',
    duration: '10 Hafta',
    durationEn: '10 Weeks',
    format: 'Online',
    formatEn: 'Online',
    description: 'Yapay zeka araçları, dijital stratejiler ve geleceğin teknolojilerine hazırlık.',
    descriptionEn: 'AI tools, digital strategies, and preparation for future technologies.',
    tags: ['AI', 'Dijital', 'Teknoloji'],
    tagsEn: ['AI', 'Digital', 'Technology'],
    curriculum: [
      { week: 'Hafta 1-2', topic: 'Dijital Dönüşüm ve AI Temelleri', topicEn: 'Digital Transformation & AI Fundamentals' },
      { week: 'Hafta 3-4', topic: 'Prompt Mühendisliği ve AI Araçları', topicEn: 'Prompt Engineering & AI Tools' },
      { week: 'Hafta 5-7', topic: 'Veri Analitiği ve Otomasyon', topicEn: 'Data Analytics & Automation' },
      { week: 'Hafta 8-10', topic: 'AI Stratejisi ve Etik', topicEn: 'AI Strategy & Ethics' },
    ],
    outcomes: [
      'AI araçlarını verimli kullanma',
      'Veriye dayalı karar verme',
      'İş süreçlerini otomatize etme',
      'Dijital strateji geliştirme',
    ],
    outcomesEn: [
      'Efficient use of AI tools',
      'Data-driven decision making',
      'Automating business processes',
      'Developing digital strategy',
    ],
  },
  {
    id: 'entrepreneurship',
    title: 'Girişimcilik ve İnovasyon',
    titleEn: 'Entrepreneurship & Innovation',
    level: 'Tüm Seviyeler',
    levelEn: 'All Levels',
    duration: '12 Hafta',
    durationEn: '12 Weeks',
    format: 'Hibrit',
    formatEn: 'Hybrid',
    description: 'İş fikrinden başlangıca, iş modeli geliştirmeden yatırım almaya kadar kapsamlı girişimcilik programı.',
    descriptionEn: 'Comprehensive entrepreneurship program from idea to startup, business model development to investment.',
    tags: ['Girişimcilik', 'İnovasyon', 'Startup'],
    tagsEn: ['Entrepreneurship', 'Innovation', 'Startup'],
    curriculum: [
      { week: 'Hafta 1-3', topic: 'Fikir Doğrulama ve Problem Çözümü', topicEn: 'Idea Validation & Problem Solving' },
      { week: 'Hafta 4-6', topic: 'İş Modeli ve MVP Geliştirme', topicEn: 'Business Model & MVP Development' },
      { week: 'Hafta 7-9', topic: 'Pazara Giriş ve Büyüme Stratejileri', topicEn: 'Go-to-Market & Growth Strategies' },
      { week: 'Hafta 10-12', topic: 'Yatırım ve Ölçeklendirme', topicEn: 'Investment & Scaling' },
    ],
    outcomes: [
      'Doğrulanmış iş fikri ve MVP',
      'Sağlam iş modeli canvası',
      'Yatırımcı sunum hazırlama',
      'Ölçeklenebilir büyüme planı',
    ],
    outcomesEn: [
      'Validated business idea and MVP',
      'Solid business model canvas',
      'Investor pitch preparation',
      'Scalable growth plan',
    ],
  },
  {
    id: 'emotional',
    title: 'Duygusal Zeka ve Farkındalık',
    titleEn: 'Emotional Intelligence & Mindfulness',
    level: 'Başlangıç',
    levelEn: 'Beginner',
    duration: '4 Hafta',
    durationEn: '4 Weeks',
    format: 'Online',
    formatEn: 'Online',
    description: 'Duygusal zekanızı geliştirme, stres yönetimi ve mindfulness teknikleri.',
    descriptionEn: 'Develop your emotional intelligence, stress management, and mindfulness techniques.',
    tags: ['EQ', 'Mindfulness', 'Stres'],
    tagsEn: ['EQ', 'Mindfulness', 'Stress'],
    curriculum: [
      { week: 'Hafta 1', topic: 'Duygusal Zeka ve Kendini Tanıma', topicEn: 'Emotional Intelligence & Self-Knowledge' },
      { week: 'Hafta 2', topic: 'Stres Yönetimi ve Duygu Düzenleme', topicEn: 'Stress Management & Emotion Regulation' },
      { week: 'Hafta 3', topic: 'Mindfulness ve Günlük Uygulamalar', topicEn: 'Mindfulness & Daily Practices' },
      { week: 'Hafta 4', topic: 'Empati ve Sosyal İlişkiler', topicEn: 'Empathy & Social Relationships' },
    ],
    outcomes: [
      'Duygusal farkındalık artışı',
      'Stres altında denge kurma',
      'Günlük mindfulness pratiği',
      'Daha güçlü ilişkiler',
    ],
    outcomesEn: [
      'Increased emotional awareness',
      'Balance under stress',
      'Daily mindfulness practice',
      'Stronger relationships',
    ],
  },
];

export default function Programs({ lang = 'tr' }: { lang?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const [selectedProgram, setSelectedProgram] = useState<typeof programsData[0] | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from('.program-card', {
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
  const program = selectedProgram;

  return (
    <>
      <section
        ref={sectionRef}
        id="programs"
        aria-label={isTr ? 'Programlar' : 'Programs'}
        className="bg-bg-darkest py-24 md:py-32"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-extrabold text-section text-white mb-4">
              {isTr ? 'Eğitim Programlarımız' : 'Our Training Programs'}
            </h2>
            <p className="text-text-light/60 max-w-2xl mx-auto">
              {isTr
                ? 'Geleceğin yetkinliklerini kazanmanız için tasarlanmış kapsamlı programlar.'
                : 'Comprehensive programs designed to help you acquire future skills.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programsData.map((program) => (
              <button
                key={program.id}
                onClick={() => setSelectedProgram(program)}
                className="program-card group glass rounded-2xl p-6 hover:bg-white/5 transition-all duration-300 flex flex-col text-left cursor-pointer"
              >
                <div className="flex flex-wrap gap-2 mb-4">
                  {(isTr ? program.tags : program.tagsEn).map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="font-semibold text-xl text-white mb-2">{isTr ? program.title : program.titleEn}</h3>
                <p className="text-text-light/60 text-sm leading-relaxed mb-6 flex-1">
                  {isTr ? program.description : program.descriptionEn}
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm text-text-light/50">
                    <BarChart className="w-4 h-4 text-accent-cyan" />
                    <span>{isTr ? program.level : program.levelEn}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-light/50">
                    <Clock className="w-4 h-4 text-accent-cyan" />
                    <span>{isTr ? program.duration : program.durationEn}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-light/50">
                    <Users className="w-4 h-4 text-accent-cyan" />
                    <span>{isTr ? program.format : program.formatEn}</span>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 text-accent-cyan text-sm font-medium group-hover:gap-3 transition-all">
                  {isTr ? 'Detaylı bilgi al' : 'Learn more'}
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Program Detail Modal */}
      <Modal
        isOpen={!!program}
        onClose={() => setSelectedProgram(null)}
        title={program ? (isTr ? program.title : program.titleEn) : ''}
      >
        {program && (
          <div className="space-y-6">
            {/* Info badges */}
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20 flex items-center gap-1">
                <BarChart className="w-3 h-3" /> {isTr ? program.level : program.levelEn}
              </span>
              <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-accent-violet/10 text-accent-violet border border-accent-violet/20 flex items-center gap-1">
                <Clock className="w-3 h-3" /> {isTr ? program.duration : program.durationEn}
              </span>
              <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-accent-rose/10 text-accent-rose border border-accent-rose/20 flex items-center gap-1">
                <Users className="w-3 h-3" /> {isTr ? program.format : program.formatEn}
              </span>
            </div>

            {/* Description */}
            <p className="text-text-light/70 leading-relaxed">
              {isTr ? program.description : program.descriptionEn}
            </p>

            {/* Curriculum */}
            <div>
              <h4 className="flex items-center gap-2 font-semibold text-white mb-4">
                <BookOpen className="w-5 h-5 text-accent-cyan" />
                {isTr ? 'Müfredat' : 'Curriculum'}
              </h4>
              <div className="space-y-3">
                {program.curriculum.map((item, i) => (
                  <div key={i} className="flex gap-4 p-3 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-xs font-bold text-accent-cyan shrink-0 mt-0.5">{item.week}</span>
                    <span className="text-sm text-text-light/80">{isTr ? item.topic : item.topicEn}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Outcomes */}
            <div>
              <h4 className="flex items-center gap-2 font-semibold text-white mb-4">
                <Target className="w-5 h-5 text-accent-cyan" />
                {isTr ? 'Kazanımlar' : 'Outcomes'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(isTr ? program.outcomes : program.outcomesEn).map((outcome, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent-cyan shrink-0 mt-0.5" />
                    <span className="text-sm text-text-light/70">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <a
              href="#contact"
              onClick={() => setSelectedProgram(null)}
              className="block w-full text-center py-4 bg-gradient-accent text-bg-darkest font-semibold rounded-full hover:shadow-glow-cyan transition-all"
            >
              <Award className="w-4 h-4 inline mr-2" />
              {isTr ? 'Bu Programa Başvur' : 'Apply for This Program'}
            </a>
          </div>
        )}
      </Modal>
    </>
  );
}
