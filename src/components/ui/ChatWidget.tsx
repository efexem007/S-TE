'use client';

import { useState, useRef, useEffect } from 'react';
import {
  MessageCircle,
  X,
  Send,
  User,
  BookOpen,
  ClipboardList,
  Sparkles,
  Zap,
  PanelRightOpen,
  PanelRightClose,
  Maximize2,
  Minimize2,
  RotateCcw,
} from 'lucide-react';
import { useCoach } from '@/components/providers/CoachProvider';
import { CoachAgent, StudentProfile } from '@/lib/coach/types';
import { detectAgent } from '@/lib/coach/prompts';

/* ------------------------------------------------------------------ */
/*  Agent meta                                                          */
/* ------------------------------------------------------------------ */
const agentMeta: Record<
  CoachAgent,
  { label: string; icon: React.ElementType; color: string; bg: string; border: string }
> = {
  mentor: {
    label: 'Mentor',
    icon: Sparkles,
    color: 'text-accent-rose',
    bg: 'bg-accent-rose/10',
    border: 'border-accent-rose/20',
  },
  tutor: {
    label: 'Tutor',
    icon: BookOpen,
    color: 'text-accent-cyan',
    bg: 'bg-accent-cyan/10',
    border: 'border-accent-cyan/20',
  },
  assessor: {
    label: 'Assessor',
    icon: Zap,
    color: 'text-accent-violet',
    bg: 'bg-accent-violet/10',
    border: 'border-accent-violet/20',
  },
  planner: {
    label: 'Planner',
    icon: ClipboardList,
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/20',
  },
  general: {
    label: 'Asistan',
    icon: MessageCircle,
    color: 'text-text-light',
    bg: 'bg-white/5',
    border: 'border-white/10',
  },
};

/* ------------------------------------------------------------------ */
/*  Main Component                                                      */
/* ------------------------------------------------------------------ */
export default function ChatWidget() {
  const coach = useCoach();
  const {
    profile,
    messages,
    addMessage,
    setProfile,
    currentAgent,
    setCurrentAgent,
    isPanelOpen,
    togglePanel,
    isFullscreen,
    toggleFullscreen,
    clearMessages,
    isOnboarded,
    streak,
    progress,
    currentPlan,
  } = coach;

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  /* Onboarding */
  const [onboardStep, setOnboardStep] = useState(0);
  const [onboardData, setOnboardData] = useState({
    name: '',
    targetExam: '',
    strongSubjects: '',
    weakSubjects: '',
    dailyStudyHours: 4,
    learningStyle: '',
    goals: '',
  });

  /* Inline quiz */
  const [activeQuiz, setActiveQuiz] = useState<{
    questions: { q: string; options: string[]; correct: number }[];
    currentIndex: number;
    answers: number[];
    finished: boolean;
  } | null>(null);

  /* scroll to bottom */
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, activeQuiz]);

  /* ---------------------------------------------------------------- */
  /*  Send message                                                     */
  /* ---------------------------------------------------------------- */
  const send = async (forcedAgent?: CoachAgent, customText?: string) => {
    const text = (customText ?? input).trim();
    if (!text || loading) return;
    if (text.length > 800) return;

    const agent = forcedAgent && forcedAgent !== 'general' ? forcedAgent : detectAgent(text);
    setCurrentAgent(agent);
    addMessage({ role: 'user', content: text, agent });
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages,
          profile,
          agent: forcedAgent,
        }),
      });

      if (!res.ok) throw new Error('API error');

      const data = await res.json();
      addMessage({ role: 'assistant', content: data.reply, agent: data.agent });
    } catch {
      addMessage({
        role: 'assistant',
        content:
          'Şu anda bağlantıda bir sorun var. Lütfen tekrar dene veya form üzerinden bize ulaş.',
        agent: 'general',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const handleQuickAction = (text: string, agent: CoachAgent) => {
    setCurrentAgent(agent);
    send(agent, text);
  };

  /* ---------------------------------------------------------------- */
  /*  Onboarding                                                       */
  /* ---------------------------------------------------------------- */
  const handleOnboardNext = () => {
    if (onboardStep === 0 && !onboardData.name.trim()) return;
    if (onboardStep === 5) {
      setProfile({
        name: onboardData.name,
        targetExam: (onboardData.targetExam as any) || 'general',
        strongSubjects: onboardData.strongSubjects
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
        weakSubjects: onboardData.weakSubjects
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
        dailyStudyHours: Number(onboardData.dailyStudyHours) || 4,
        learningStyle: (onboardData.learningStyle as any) || null,
        stressLevel: null,
        goals: onboardData.goals.split(',').map((s) => s.trim()).filter(Boolean),
      });
      addMessage({
        role: 'assistant',
        content: `Harika ${onboardData.name}! 🎉 Profilin oluşturuldu. Şimdi sana nasıl yardımcı olabilirim? Konu anlatabilir, test edebilir, program oluşturabilir veya motivasyon verebilirim.`,
        agent: 'general',
      });
      return;
    }
    setOnboardStep(onboardStep + 1);
  };

  /* ---------------------------------------------------------------- */
  /*  Inline Quiz                                                      */
  /* ---------------------------------------------------------------- */
  const startQuiz = () => {
    const demoQuiz = {
      questions: [
        {
          q: 'Bir iş görüşmesinde ilk 90 saniye ne kadar önemlidir?',
          options: ['Hiç önemli değil', 'Biraz önemli', "Kararın %90'ı verilir", 'Sadece son 5 dakika önemli'],
          correct: 2,
        },
        {
          q: 'Pomodoro tekniğinde bir seans kaç dakikadır?',
          options: ['15', '25', '45', '60'],
          correct: 1,
        },
        {
          q: 'Aktif dinlemede hangi davranış doğrudur?',
          options: ['Sürekli söz kesmek', 'Telefona bakmak', 'Göz teması ve özetleme', 'Sadece kendi fikrini söylemek'],
          correct: 2,
        },
      ],
      currentIndex: 0,
      answers: [],
      finished: false,
    };
    setActiveQuiz(demoQuiz);
    addMessage({
      role: 'assistant',
      content: 'Mini quiz başlıyor! 🧠 İşte ilk sorun:',
      agent: 'assessor',
    });
  };

  const answerQuiz = (optionIndex: number) => {
    if (!activeQuiz) return;
    const newAnswers = [...activeQuiz.answers, optionIndex];
    if (newAnswers.length >= activeQuiz.questions.length) {
      setActiveQuiz({ ...activeQuiz, answers: newAnswers, finished: true });
      const correctCount = newAnswers.filter(
        (a, i) => a === activeQuiz.questions[i].correct
      ).length;
      addMessage({
        role: 'assistant',
        content: `Quiz tamamlandı! ${correctCount}/${activeQuiz.questions.length} doğru. ${
          correctCount === activeQuiz.questions.length
            ? 'Mükemmel! 🌟'
            : 'Zayıf konuları tekrar etmek için Tutor modunu kullanabilirsin. 📚'
        }`,
        agent: 'assessor',
      });
    } else {
      setActiveQuiz({
        ...activeQuiz,
        answers: newAnswers,
        currentIndex: activeQuiz.currentIndex + 1,
      });
    }
  };

  /* ---------------------------------------------------------------- */
  /*  Closed state                                                     */
  /* ---------------------------------------------------------------- */
  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        aria-label="AI Koç'u aç"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-accent text-bg-darkest shadow-lg hover:shadow-glow-cyan transition-all flex items-center justify-center animate-float"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    );
  }

  /* ---------------------------------------------------------------- */
  /*  Layout classes                                                   */
  /* ---------------------------------------------------------------- */
  const wrapperCls = isFullscreen
    ? 'fixed inset-0 z-[100] bg-bg-darkest flex'
    : 'fixed bottom-6 right-6 z-50 flex flex-col items-end';

  const windowCls = isFullscreen
    ? 'w-full h-full flex flex-col'
    : 'mb-4 w-[420px] max-w-[96vw] h-[640px] rounded-2xl bg-bg-darkest border border-white/10 shadow-2xl flex flex-col overflow-hidden';

  const AgentIcon = agentMeta[currentAgent].icon;

  return (
    <div className={wrapperCls}>
      <div className={windowCls}>
        {/* Header */}
        <div className="px-4 py-3 glass border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-accent flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-bg-darkest" />
            </div>
            <div>
              <span className="text-text-light font-medium text-sm block leading-tight">
                dueMWeWork AI Koç
              </span>
              {isOnboarded && (
                <span
                  className={`text-[11px] flex items-center gap-1 leading-tight ${agentMeta[currentAgent].color}`}
                >
                  <AgentIcon className="w-3 h-3" />
                  {agentMeta[currentAgent].label} modu aktif
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-0.5">
            <HeaderBtn onClick={togglePanel} label="Panel">
              {isPanelOpen ? (
                <PanelRightClose className="w-4 h-4" />
              ) : (
                <PanelRightOpen className="w-4 h-4" />
              )}
            </HeaderBtn>
            <HeaderBtn onClick={toggleFullscreen} label="Tam ekran">
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </HeaderBtn>
            <HeaderBtn
              onClick={() => {
                clearMessages();
                setActiveQuiz(null);
              }}
              label="Sıfırla"
            >
              <RotateCcw className="w-4 h-4" />
            </HeaderBtn>
            <HeaderBtn onClick={() => setOpen(false)} label="Kapat">
              <X className="w-4 h-4" />
            </HeaderBtn>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-1 overflow-hidden">
          {/* Chat */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
              {!isOnboarded ? (
                <OnboardingForm
                  step={onboardStep}
                  data={onboardData}
                  setData={setOnboardData}
                  onNext={handleOnboardNext}
                />
              ) : (
                <>
                  {messages.length === 0 && (
                    <div className="text-center py-10">
                      <Sparkles className="w-10 h-10 text-accent-cyan mx-auto mb-3 opacity-40" />
                      <p className="text-text-light/50 text-sm">
                        AI Koçun hazır! Hızlı aksiyonları kullanabilir veya doğrudan soru
                        sorabilirsin.
                      </p>
                    </div>
                  )}

                  {messages.map((msg) => {
                    const meta = msg.agent ? agentMeta[msg.agent] : agentMeta.general;
                    return (
                      <div
                        key={msg.id}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[88%] px-4 py-2.5 rounded-xl text-sm ${
                            msg.role === 'user'
                              ? 'bg-gradient-accent text-bg-darkest rounded-br-none'
                              : 'bg-white/5 text-text-light border border-white/10 rounded-bl-none'
                          }`}
                        >
                          {msg.role === 'assistant' && msg.agent && (
                            <span
                              className={`text-[10px] uppercase tracking-wider font-bold block mb-1 ${meta.color}`}
                            >
                              {meta.label}
                            </span>
                          )}
                          <div className="whitespace-pre-wrap leading-relaxed">
                            {msg.content}
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* Inline Quiz */}
                  {activeQuiz && !activeQuiz.finished && (
                    <div className="bg-white/5 border border-accent-violet/30 rounded-xl p-4">
                      <span className="text-[10px] uppercase tracking-wider font-bold text-accent-violet block mb-2">
                        Mini Quiz — Soru {activeQuiz.currentIndex + 1}/
                        {activeQuiz.questions.length}
                      </span>
                      <p className="text-text-light text-sm mb-3 font-medium leading-snug">
                        {activeQuiz.questions[activeQuiz.currentIndex].q}
                      </p>
                      <div className="space-y-2">
                        {activeQuiz.questions[activeQuiz.currentIndex].options.map((opt, i) => (
                          <button
                            key={i}
                            onClick={() => answerQuiz(i)}
                            className="w-full text-left px-3 py-2 rounded-lg bg-white/5 hover:bg-accent-violet/20 border border-white/10 hover:border-accent-violet/40 text-text-light text-sm transition-all"
                          >
                            {String.fromCharCode(65 + i)}. {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {loading && <TypingIndicator />}
                </>
              )}
            </div>

            {/* Quick actions */}
            {isOnboarded && !activeQuiz && !loading && (
              <div className="px-4 py-2.5 border-t border-white/5 flex gap-2 overflow-x-auto scrollbar-hide">
                <QuickBtn
                  icon={BookOpen}
                  text="Konu Anlat"
                  color="text-accent-cyan"
                  bg="bg-accent-cyan/10"
                  border="border-accent-cyan/20"
                  hover="hover:bg-accent-cyan/20"
                  onClick={() =>
                    handleQuickAction(
                      'Bana bir konu anlatmak istiyorum, hangi konuda yardımcı olabilirsin?',
                      'tutor'
                    )
                  }
                />
                <QuickBtn
                  icon={Zap}
                  text="Beni Test Et"
                  color="text-accent-violet"
                  bg="bg-accent-violet/10"
                  border="border-accent-violet/20"
                  hover="hover:bg-accent-violet/20"
                  onClick={() => {
                    setCurrentAgent('assessor');
                    startQuiz();
                  }}
                />
                <QuickBtn
                  icon={ClipboardList}
                  text="Program"
                  color="text-green-400"
                  bg="bg-green-500/10"
                  border="border-green-500/20"
                  hover="hover:bg-green-500/20"
                  onClick={() =>
                    handleQuickAction(
                      'Bana haftalık bir çalışma programı oluşturur musun?',
                      'planner'
                    )
                  }
                />
                <QuickBtn
                  icon={Sparkles}
                  text="Motivasyon"
                  color="text-accent-rose"
                  bg="bg-accent-rose/10"
                  border="border-accent-rose/20"
                  hover="hover:bg-accent-rose/20"
                  onClick={() =>
                    handleQuickAction('Bana biraz motivasyon verir misin?', 'mentor')
                  }
                />
              </div>
            )}

            {/* Input */}
            <div className="px-4 py-3 border-t border-white/10 glass shrink-0">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  maxLength={800}
                  disabled={!isOnboarded || !!activeQuiz}
                  placeholder={
                    isOnboarded
                      ? 'Mesajınızı yazın...'
                      : 'Önce profilinizi oluşturun...'
                  }
                  aria-label="Mesajınızı yazın"
                  className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-text-light text-sm placeholder:text-text-light/40 focus:outline-none focus:ring-2 focus:ring-accent-cyan focus:border-transparent disabled:opacity-50"
                />
                <button
                  onClick={() => send()}
                  disabled={loading || !input.trim() || !isOnboarded || !!activeQuiz}
                  aria-label="Gönder"
                  className="p-2 rounded-lg bg-gradient-accent text-bg-darkest hover:shadow-glow-cyan transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-right text-[10px] text-text-light/30 mt-1">
                {input.length} / 800
              </p>
            </div>
          </div>

          {/* Side Panel */}
          {isPanelOpen && isOnboarded && profile && (
            <CoachPanel
              profile={profile}
              streak={streak}
              progress={progress}
              currentPlan={currentPlan}
            />
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                      */
/* ------------------------------------------------------------------ */

function HeaderBtn({
  children,
  onClick,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="p-2 text-text-light/50 hover:text-text-light transition-colors rounded-lg hover:bg-white/5"
    >
      {children}
    </button>
  );
}

function QuickBtn({
  icon: Icon,
  text,
  color,
  bg,
  border,
  hover,
  onClick,
}: {
  icon: React.ElementType;
  text: string;
  color: string;
  bg: string;
  border: string;
  hover: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 px-3 py-1.5 rounded-full ${bg} border ${border} ${color} text-xs font-medium ${hover} transition-colors flex items-center gap-1`}
    >
      <Icon className="w-3 h-3" /> {text}
    </button>
  );
}

function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="bg-white/5 text-text-light border border-white/10 px-4 py-2.5 rounded-xl rounded-bl-none text-sm flex items-center gap-1">
        <span className="inline-block w-2 h-2 rounded-full bg-accent-cyan animate-pulse-cyan" />
        <span className="inline-block w-2 h-2 rounded-full bg-accent-cyan animate-pulse-cyan animation-delay-150" />
        <span className="inline-block w-2 h-2 rounded-full bg-accent-cyan animate-pulse-cyan animation-delay-300" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Onboarding Form                                                     */
/* ------------------------------------------------------------------ */
function OnboardingForm({
  step,
  data,
  setData,
  onNext,
}: {
  step: number;
  data: Record<string, any>;
  setData: React.Dispatch<React.SetStateAction<any>>;
  onNext: () => void;
}) {
  const steps = [
    { label: 'İsminiz nedir?', field: 'name', type: 'text', placeholder: 'Adınızı yazın' },
    {
      label: 'Hedefiniz nedir?',
      field: 'targetExam',
      type: 'select',
      options: [
        { value: 'tyt', label: 'TYT' },
        { value: 'ayt', label: 'AYT' },
        { value: 'lgs', label: 'LGS' },
        { value: 'career', label: 'Kariyer' },
        { value: 'general', label: 'Genel Gelişim' },
      ],
    },
    {
      label: 'Güçlü olduğunuz alanlar (virgülle ayırın)',
      field: 'strongSubjects',
      type: 'text',
      placeholder: 'Matematik, Fizik, İletişim...',
    },
    {
      label: 'Geliştirmek istediğiniz alanlar (virgülle ayırın)',
      field: 'weakSubjects',
      type: 'text',
      placeholder: 'Kimya, Sunum, Stres Yönetimi...',
    },
    {
      label: 'Günlük kaç saat çalışabiliyorsunuz?',
      field: 'dailyStudyHours',
      type: 'range',
      min: 1,
      max: 12,
    },
    {
      label: 'Hedefleriniz neler? (virgülle ayırın)',
      field: 'goals',
      type: 'text',
      placeholder: 'Mühendislik, İngilizce, Liderlik...',
    },
  ];

  const current = steps[step];
  const isLast = step === steps.length - 1;

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-4 animate-fade-up">
      <div className="flex items-center justify-between">
        <span className="text-xs text-accent-cyan font-bold uppercase tracking-wider">
          Profil Oluşturma
        </span>
        <span className="text-xs text-text-light/40 font-medium">
          {step + 1} / {steps.length}
        </span>
      </div>

      <div className="h-1 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-accent rounded-full transition-all duration-500"
          style={{ width: `${((step + 1) / steps.length) * 100}%` }}
        />
      </div>

      <h3 className="text-text-light font-semibold text-sm">{current.label}</h3>

      {current.type === 'text' && (
        <input
          type="text"
          autoFocus
          value={data[current.field]}
          onChange={(e) => setData({ ...data, [current.field]: e.target.value })}
          placeholder={current.placeholder}
          className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-text-light text-sm placeholder:text-text-light/40 focus:outline-none focus:ring-2 focus:ring-accent-cyan focus:border-transparent"
          onKeyDown={(e) => e.key === 'Enter' && onNext()}
        />
      )}

      {current.type === 'select' && (
        <div className="flex flex-wrap gap-2">
          {current.options?.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setData({ ...data, [current.field]: opt.value })}
              className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-all ${
                data[current.field] === opt.value
                  ? 'bg-accent-cyan/20 border-accent-cyan text-accent-cyan'
                  : 'bg-white/5 border-white/10 text-text-light/70 hover:bg-white/10'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}

      {current.type === 'range' && (
        <div className="space-y-3">
          <input
            type="range"
            min={current.min}
            max={current.max}
            value={data[current.field]}
            onChange={(e) =>
              setData({ ...data, [current.field]: Number(e.target.value) })
            }
            className="w-full accent-accent-cyan"
          />
          <p className="text-center text-accent-cyan font-bold text-lg">
            {data[current.field]} saat
          </p>
        </div>
      )}

      <button
        onClick={onNext}
        disabled={current.type === 'text' && !data[current.field]?.trim()}
        className="w-full py-2.5 bg-gradient-accent text-bg-darkest font-bold rounded-lg hover:shadow-glow-cyan transition-all disabled:opacity-50 text-sm"
      >
        {isLast ? 'Profili Tamamla 🚀' : 'Devam Et'}
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Coach Panel                                                         */
/* ------------------------------------------------------------------ */
function CoachPanel({
  profile,
  streak,
  progress,
  currentPlan,
}: {
  profile: StudentProfile;
  streak: number;
  progress: any[];
  currentPlan: any;
}) {
  return (
    <div className="w-64 border-l border-white/10 bg-bg-dark-2/60 backdrop-blur-xl p-4 overflow-y-auto scrollbar-hide shrink-0 hidden md:flex md:flex-col">
      <h3 className="text-text-light font-semibold text-sm mb-4 flex items-center gap-2">
        <User className="w-4 h-4 text-accent-cyan" /> Profilim
      </h3>

      <div className="space-y-2.5 mb-5">
        <Row label="İsim" value={profile.name} />
        <Row label="Hedef" value={profile.targetExam?.toUpperCase() || '-'} />
        <Row label="Günlük Çalışma" value={`${profile.dailyStudyHours} saat`} />
        <Row
          label="Öğrenme Stili"
          value={profile.learningStyle ? profile.learningStyle.charAt(0).toUpperCase() + profile.learningStyle.slice(1) : 'Belirtilmemiş'}
        />
      </div>

      {/* Streak */}
      <div className="mb-5 p-3 rounded-xl bg-white/5 border border-white/10">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-text-light/50 font-medium">Günlük Streak</span>
          <span className="text-accent-rose font-bold text-sm">{streak} 🔥</span>
        </div>
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-accent rounded-full transition-all"
            style={{ width: `${Math.min(streak * 10, 100)}%` }}
          />
        </div>
      </div>

      {/* Progress */}
      {progress.length > 0 && (
        <div className="mb-5">
          <h4 className="text-[11px] uppercase tracking-wider text-text-light/40 font-bold mb-2">
            Konu İlerlemesi
          </h4>
          <div className="space-y-2.5">
            {progress.slice(0, 5).map((p: any) => (
              <div key={p.topic}>
                <div className="flex justify-between text-[11px] mb-0.5">
                  <span className="text-text-light/70 truncate pr-2">{p.topic}</span>
                  <span className="text-accent-cyan font-bold shrink-0">{p.mastery}%</span>
                </div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent-cyan rounded-full transition-all"
                    style={{ width: `${p.mastery}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Active Plan */}
      {currentPlan && (
        <div>
          <h4 className="text-[11px] uppercase tracking-wider text-text-light/40 font-bold mb-2">
            Aktif Program
          </h4>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <p className="text-text-light text-xs font-medium truncate">{currentPlan.title}</p>
            <p className="text-text-light/40 text-[10px] mt-0.5">
              {currentPlan.dailyTasks?.filter((t: any) => t.completed).length || 0}/
              {currentPlan.dailyTasks?.length || 0} görev tamamlandı
            </p>
          </div>
        </div>
      )}

      {progress.length === 0 && !currentPlan && (
        <div className="mt-auto pt-4 text-center">
          <p className="text-text-light/30 text-[11px]">
            Quiz çözdükçe ve program oluşturdukça ilerlemen burada görünecek.
          </p>
        </div>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-xs">
      <span className="text-text-light/50">{label}</span>
      <span className="text-text-light font-medium truncate max-w-[55%] text-right">{value}</span>
    </div>
  );
}
