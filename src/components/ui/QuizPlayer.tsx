'use client';

import { useState } from 'react';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Home, Zap, Target, Clock } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */
export interface QuizQuestion {
  id: string;
  question: string;
  questionEn: string;
  options: string[];
  optionsEn: string[];
  correct: number;
  explanation: string;
  explanationEn: string;
}

export interface QuizData {
  id: string;
  title: string;
  titleEn: string;
  category: string;
  categoryEn: string;
  difficulty: string;
  difficultyEn: string;
  description: string;
  descriptionEn: string;
  questions: QuizQuestion[];
}

interface QuizPlayerProps {
  quiz: QuizData;
  lang: string;
  onExit: () => void;
}

/* ------------------------------------------------------------------ */
/*  Difficulty color map                                                */
/* ------------------------------------------------------------------ */
const diffColors: Record<string, string> = {
  kolay: 'text-green-400 border-green-400/30 bg-green-400/10',
  easy: 'text-green-400 border-green-400/30 bg-green-400/10',
  orta: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10',
  medium: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10',
  ileri: 'text-accent-rose border-accent-rose/30 bg-accent-rose/10',
  advanced: 'text-accent-rose border-accent-rose/30 bg-accent-rose/10',
};

/* ------------------------------------------------------------------ */
/*  Main Component                                                      */
/* ------------------------------------------------------------------ */
export default function QuizPlayer({ quiz, lang, onExit }: QuizPlayerProps) {
  const isTr = lang === 'tr';
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answers, setAnswers] = useState<
    { questionId: string; selected: number | null; correct: boolean; skipped: boolean }[]
  >([]);
  const [finished, setFinished] = useState(false);
  const [startTime] = useState(Date.now());

  const questions = quiz.questions;
  const currentQ = questions[currentIndex];
  const progress = ((currentIndex + (showExplanation ? 1 : 0)) / questions.length) * 100;

  const handleSelect = (index: number) => {
    if (showExplanation) return;
    setSelectedOption(index);
    setShowExplanation(true);
    const isCorrect = index === currentQ.correct;
    setAnswers((prev) => [
      ...prev,
      { questionId: currentQ.id, selected: index, correct: isCorrect, skipped: false },
    ]);
  };

  const handleSkip = () => {
    if (showExplanation) return;
    setSelectedOption(null);
    setShowExplanation(true);
    setAnswers((prev) => [
      ...prev,
      { questionId: currentQ.id, selected: null, correct: false, skipped: true },
    ]);
  };

  const handleNext = () => {
    if (currentIndex + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setAnswers([]);
    setFinished(false);
  };

  /* -------------------------------------------------------------- */
  /*  Result Screen                                                   */
  /* -------------------------------------------------------------- */
  if (finished) {
    const correctCount = answers.filter((a) => a.correct).length;
    const wrongCount = answers.filter((a) => !a.correct && !a.skipped).length;
    const skippedCount = answers.filter((a) => a.skipped).length;
    const percentage = Math.round((correctCount / questions.length) * 100);
    const durationSec = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(durationSec / 60);
    const seconds = durationSec % 60;

    let message = isTr ? 'Harika bir performans! 🌟' : 'Amazing performance! 🌟';
    if (percentage < 40) message = isTr ? 'Tekrar çalışma zamanı! 📚' : 'Time to review! 📚';
    else if (percentage < 70) message = isTr ? 'İyi gidiyorsun, devam et! 💪' : 'Doing well, keep going! 💪';

    return (
      <div className="w-full max-w-2xl mx-auto animate-fade-up">
        <div className="glass rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-text-light mb-2">
            {isTr ? 'Quiz Tamamlandı!' : 'Quiz Completed!'}
          </h2>
          <p className="text-text-light/50 text-sm mb-8">{message}</p>

          {/* Score Circle */}
          <div className="relative w-40 h-40 mx-auto mb-8">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="url(#scoreGradient)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${(percentage / 100) * 264} 264`}
                className="transition-all duration-1000"
              />
              <defs>
                <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00F0FF" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-extrabold text-gradient">{percentage}%</span>
              <span className="text-xs text-text-light/40 mt-1">
                {correctCount}/{questions.length}
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            <StatBox
              icon={CheckCircle2}
              label={isTr ? 'Doğru' : 'Correct'}
              value={correctCount}
              color="text-green-400"
            />
            <StatBox
              icon={XCircle}
              label={isTr ? 'Yanlış' : 'Wrong'}
              value={wrongCount}
              color="text-accent-rose"
            />
            <StatBox
              icon={Clock}
              label={isTr ? 'Süre' : 'Time'}
              value={`${minutes}:${seconds.toString().padStart(2, '0')}`}
              color="text-accent-cyan"
            />
          </div>

          {/* Review */}
          <div className="text-left space-y-3 mb-8 max-h-64 overflow-y-auto scrollbar-hide pr-1">
            {answers.map((ans, i) => {
              const q = questions[i];
              const label = isTr ? q.question : q.questionEn;
              return (
                <div
                  key={q.id}
                  className={`p-3 rounded-xl border ${
                    ans.correct
                      ? 'border-green-400/20 bg-green-400/5'
                      : ans.skipped
                      ? 'border-white/10 bg-white/5'
                      : 'border-accent-rose/20 bg-accent-rose/5'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {ans.correct ? (
                      <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                    ) : ans.skipped ? (
                      <Clock className="w-4 h-4 text-text-light/40 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-4 h-4 text-accent-rose shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="text-xs text-text-light/70 line-clamp-2">{label}</p>
                      {!ans.skipped && !ans.correct && (
                        <p className="text-[10px] text-text-light/40 mt-1">
                          {isTr ? 'Doğru cevap: ' : 'Correct: '}
                          <span className="text-green-400 font-medium">
                            {String.fromCharCode(65 + q.correct)}. {isTr ? q.options[q.correct] : q.optionsEn[q.correct]}
                          </span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-center">
            <button
              onClick={handleRestart}
              className="px-5 py-2.5 rounded-xl bg-gradient-accent text-bg-darkest font-semibold text-sm hover:shadow-glow-cyan transition-all flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              {isTr ? 'Tekrar Çöz' : 'Retry'}
            </button>
            <button
              onClick={onExit}
              className="px-5 py-2.5 rounded-xl glass text-text-light font-semibold text-sm hover:bg-white/10 transition-all flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              {isTr ? 'Quizlere Dön' : 'Back to Quizzes'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* -------------------------------------------------------------- */
  /*  Question Screen                                                 */
  /* -------------------------------------------------------------- */
  const optionLabels = ['A', 'B', 'C', 'D'];

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-up">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-text-light/50 mb-2">
          <span>
            {isTr ? 'Soru' : 'Question'} {currentIndex + 1} / {questions.length}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-accent rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="glass rounded-2xl p-6 md:p-8 mb-4">
        <div className="flex items-center gap-2 mb-4">
          <span
            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${
              diffColors[quiz.difficulty] ?? diffColors['orta']
            }`}
          >
            {isTr ? quiz.difficulty : quiz.difficultyEn}
          </span>
          <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-white/10 bg-white/5 text-text-light/50">
            {isTr ? quiz.category : quiz.categoryEn}
          </span>
        </div>

        <h3 className="text-lg md:text-xl font-semibold text-text-light leading-relaxed mb-6">
          {currentIndex + 1}. {isTr ? currentQ.question : currentQ.questionEn}
        </h3>

        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {(isTr ? currentQ.options : currentQ.optionsEn).map((opt, i) => {
            let btnClass =
              'w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center gap-3 ';

            if (!showExplanation) {
              btnClass +=
                'bg-white/5 border-white/10 text-text-light hover:bg-white/10 hover:border-accent-cyan/40 cursor-pointer';
            } else if (i === currentQ.correct) {
              btnClass +=
                'bg-green-400/10 border-green-400/40 text-green-400 cursor-default';
            } else if (i === selectedOption && i !== currentQ.correct) {
              btnClass +=
                'bg-accent-rose/10 border-accent-rose/40 text-accent-rose cursor-default';
            } else {
              btnClass +=
                'bg-white/5 border-white/10 text-text-light/40 cursor-default';
            }

            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={showExplanation}
                className={btnClass}
              >
                <span
                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 border ${
                    !showExplanation
                      ? 'border-white/20 bg-white/5'
                      : i === currentQ.correct
                      ? 'border-green-400/30 bg-green-400/10'
                      : i === selectedOption
                      ? 'border-accent-rose/30 bg-accent-rose/10'
                      : 'border-white/10 bg-white/5'
                  }`}
                >
                  {optionLabels[i]}
                </span>
                <span className="text-sm font-medium">{opt}</span>
              </button>
            );
          })}
        </div>

        {/* Skip button (only before answering) */}
        {!showExplanation && (
          <button
            onClick={handleSkip}
            className="mt-4 text-xs text-text-light/30 hover:text-text-light/60 transition-colors underline underline-offset-2"
          >
            {isTr ? 'Bu soruyu atla →' : 'Skip this question →'}
          </button>
        )}
      </div>

      {/* Explanation */}
      {showExplanation && (
        <div className="glass rounded-2xl p-5 border-l-4 border-l-accent-cyan mb-4 animate-fade-up">
          <div className="flex items-start gap-3">
            <Zap className="w-5 h-5 text-accent-cyan shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-accent-cyan uppercase tracking-wider mb-1">
                {isTr ? 'Açıklama' : 'Explanation'}
              </p>
              <p className="text-sm text-text-light/80 leading-relaxed">
                {isTr ? currentQ.explanation : currentQ.explanationEn}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Next button */}
      {showExplanation && (
        <div className="flex justify-end animate-fade-up">
          <button
            onClick={handleNext}
            className="px-6 py-3 rounded-xl bg-gradient-accent text-bg-darkest font-bold text-sm hover:shadow-glow-cyan transition-all flex items-center gap-2"
          >
            {currentIndex + 1 >= questions.length
              ? isTr
                ? 'Sonuçları Gör'
                : 'View Results'
              : isTr
              ? 'Sonraki Soru'
              : 'Next Question'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Stat Box                                                            */
/* ------------------------------------------------------------------ */
function StatBox({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  color: string;
}) {
  return (
    <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center">
      <Icon className={`w-5 h-5 ${color} mb-1.5`} />
      <span className="text-xl font-bold text-text-light">{value}</span>
      <span className="text-[10px] text-text-light/40 uppercase tracking-wider">{label}</span>
    </div>
  );
}
