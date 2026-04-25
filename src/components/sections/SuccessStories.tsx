'use client';

import { TrendingUp, Target, Award, GraduationCap, Quote } from 'lucide-react';

const stories = [
  {
    name: 'Elif Öğrenci',
    before: 65,
    after: 85,
    target: 'Boğaziçi Üniversitesi',
    department: 'Bilgisayar Mühendisliği',
    increase: 20,
    quote: 'Koçum sayesinde TYT Matematik netlerim 3 ayda 20 arttı. Artık hedefime çok daha yakınım!',
    badge: 'TYT',
  },
  {
    name: 'Can Yılmaz',
    before: 55,
    after: 78,
    target: 'ODTÜ',
    department: 'Endüstri Mühendisliği',
    increase: 23,
    quote: 'Temel konulardaki eksiklerimi tamamladık. Şimdi kendime çok daha güveniyorum.',
    badge: 'TYT',
  },
  {
    name: 'Zeynep Demir',
    before: 80,
    after: 92,
    target: 'İstanbul Üniversitesi',
    department: 'Hukuk',
    increase: 12,
    quote: 'AYT netlerimi 85+ çıkarmak için çalışıyoruz. Koçumun desteğiyle her şey mümkün.',
    badge: 'AYT',
  },
];

export default function SuccessStories({ lang }: { lang: string }) {
  const isTr = lang === 'tr';

  return (
    <section id="success-stories" className="py-20 md:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-bg-darkest" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-5 blur-[120px] pointer-events-none bg-accent-cyan" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs text-accent-cyan mb-4">
            <Award className="w-3.5 h-3.5" />
            {isTr ? 'Başarı Hikayeleri' : 'Success Stories'}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {isTr ? 'Öğrencilerimizin Başarıları' : 'Our Students\' Success'}
          </h2>
          <p className="text-text-light/60 max-w-2xl mx-auto">
            {isTr
              ? 'Koçluk sistemimizle hedeflerine ulaşan öğrencilerimizin öncesi-sonrası başarı hikayeleri.'
              : 'Before-and-after success stories of students who reached their goals with our coaching system.'}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stories.map((story) => (
            <div
              key={story.name}
              className="glass rounded-2xl p-6 hover:bg-white/[0.07] transition-all group"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-full bg-gradient-accent flex items-center justify-center text-bg-darkest font-bold text-lg">
                  {story.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-white">{story.name}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-text-light/50">
                    <Target className="w-3 h-3 text-accent-cyan" />
                    {story.target}
                  </div>
                </div>
              </div>

              {/* Before/After */}
              <div className="flex items-center gap-4 mb-5 p-4 rounded-xl bg-white/5">
                <div className="text-center flex-1">
                  <p className="text-xs text-text-light/40 mb-1">{isTr ? 'Öncesi' : 'Before'}</p>
                  <p className="text-2xl font-bold text-text-light/60">{story.before}</p>
                </div>
                <div className="flex flex-col items-center">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  <span className="text-xs text-green-400 font-medium">+{story.increase}</span>
                </div>
                <div className="text-center flex-1">
                  <p className="text-xs text-text-light/40 mb-1">{isTr ? 'Sonrası' : 'After'}</p>
                  <p className="text-2xl font-bold text-accent-cyan">{story.after}</p>
                </div>
              </div>

              {/* Quote */}
              <div className="relative mb-4">
                <Quote className="w-6 h-6 text-accent-cyan/20 absolute -top-1 -left-1" />
                <p className="text-sm text-text-light/70 italic pl-4 leading-relaxed">
                  "{story.quote}"
                </p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex items-center gap-1.5 text-xs text-text-light/50">
                  <GraduationCap className="w-3.5 h-3.5 text-accent-violet" />
                  {story.department}
                </div>
                <span className="text-[10px] px-2 py-1 rounded-full bg-accent-cyan/10 text-accent-cyan font-medium">
                  {story.badge}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
