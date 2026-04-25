'use client';

import { useState } from 'react';
import { Clock, BarChart, Zap, ArrowRight, BookOpen, CheckCircle2, XCircle, HelpCircle } from 'lucide-react';
import QuizPlayer, { QuizData } from '@/components/ui/QuizPlayer';
import quizData from '@/content/quizzes.json';

const diffBadge: Record<string, string> = {
  kolay: 'text-green-400 border-green-400/30 bg-green-400/10',
  easy: 'text-green-400 border-green-400/30 bg-green-400/10',
  orta: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10',
  medium: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10',
  ileri: 'text-accent-rose border-accent-rose/30 bg-accent-rose/10',
  advanced: 'text-accent-rose border-accent-rose/30 bg-accent-rose/10',
};

export default function QuizSection({ lang = 'tr' }: { lang?: string }) {
  const isTr = lang === 'tr';
  const quizzes = quizData as QuizData[];
  const [selectedQuiz, setSelectedQuiz] = useState<QuizData | null>(null);

  return (
    <section id="quizzes" aria-label={isTr ? 'Quizler' : 'Quizzes'} className="bg-bg-darkest py-24 md:py-32">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-extrabold text-section text-white mb-4">
            {isTr ? 'Online Quizler' : 'Online Quizzes'}
          </h2>
          <p className="text-text-light/60 max-w-2xl mx-auto">
            {isTr
              ? 'Kendini test et, bilgi boşluklarını tespit et ve ilerlemeni takip et.'
              : 'Test yourself, identify knowledge gaps and track your progress.'}
          </p>
        </div>

        {/* Quiz Player or List */}
        {selectedQuiz ? (
          <QuizPlayer quiz={selectedQuiz} lang={lang} onExit={() => setSelectedQuiz(null)} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} isTr={isTr} onStart={() => setSelectedQuiz(quiz)} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Quiz Card                                                           */
/* ------------------------------------------------------------------ */
function QuizCard({
  quiz,
  isTr,
  onStart,
}: {
  quiz: QuizData;
  isTr: boolean;
  onStart: () => void;
}) {
  return (
    <div className="group glass rounded-2xl p-6 hover:bg-white/5 transition-all duration-300 flex flex-col">
      {/* Top badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
            diffBadge[quiz.difficulty] ?? diffBadge['orta']
          }`}
        >
          {isTr ? quiz.difficulty : quiz.difficultyEn}
        </span>
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-text-light/60 border border-white/10">
          {isTr ? quiz.category : quiz.categoryEn}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-semibold text-xl text-white mb-2">{isTr ? quiz.title : quiz.titleEn}</h3>

      {/* Description */}
      <p className="text-text-light/60 text-sm leading-relaxed mb-6 flex-1">
        {isTr ? quiz.description : quiz.descriptionEn}
      </p>

      {/* Meta info */}
      <div className="flex items-center gap-4 mb-6 text-sm text-text-light/50">
        <div className="flex items-center gap-1.5">
          <HelpCircle className="w-4 h-4 text-accent-cyan" />
          <span>{quiz.questions.length} {isTr ? 'Soru' : 'Questions'}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-accent-violet" />
          <span>~{quiz.questions.length * 2} {isTr ? 'dk' : 'min'}</span>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={onStart}
        className="w-full py-3 bg-gradient-accent text-bg-darkest font-bold rounded-xl hover:shadow-glow-cyan transition-all flex items-center justify-center gap-2 text-sm"
      >
        <Zap className="w-4 h-4" />
        {isTr ? 'Quizi Başlat' : 'Start Quiz'}
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
