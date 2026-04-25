'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/providers/AuthProvider';
import {
  GraduationCap, Target, TrendingUp, Clock, BookOpen,
  Calendar, Award, Flame, ChevronRight, CheckCircle2, Circle,
  Star, Zap, BarChart3, BrainCircuit, ArrowUpRight,
  ArrowDownRight, FileText, Map, LayoutList, ScrollText
} from 'lucide-react';
import { getStudentProfile, getSessionsByStudent, MOCK_COACH_PROFILES } from '@/lib/auth/mockData';

export default function StudentPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout, hasRole } = useAuth();
  const [selectedSubject, setSelectedSubject] = useState<string>('Tümü');
  const [coachRating, setCoachRating] = useState(0);
  const [ratingComment, setRatingComment] = useState('');
  const [submittedRating, setSubmittedRating] = useState(false);
  const profile = getStudentProfile(user?.id || '');
  const [tasks, setTasks] = useState<{id:string;subject:string;topic:string;done:boolean;date:string}[]>(profile?.dailyTasks || []);

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !hasRole('student'))) {
      router.push('/login');
    }
  }, [isLoading, isAuthenticated, hasRole, router]);

  if (isLoading) {
    return <div className="min-h-screen bg-bg-darkest flex items-center justify-center text-text-light">Yükleniyor...</div>;
  }
  if (!user || !hasRole('student') || !profile) {
    return <div className="min-h-screen bg-bg-darkest flex items-center justify-center text-text-light">Profil bulunamadı</div>;
  }

  const sessions = getSessionsByStudent(profile.id);
  const upcomingSession = sessions
    .filter(s => s.status === 'onaylandı')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];
  const coach = profile.assignedCoach ? MOCK_COACH_PROFILES[profile.assignedCoach] : null;

  const { progress, targetUniversity, examYear, examHistory, topicProgress, streakDays } = profile;

  // Net değişim hesapla
  const prevExam = examHistory.length > 1 ? examHistory[examHistory.length - 2] : null;
  const latestExam = examHistory[examHistory.length - 1];
  const tytChange = prevExam ? latestExam.tytNet - prevExam.tytNet : 0;
  const aytChange = prevExam ? latestExam.aytNet - prevExam.aytNet : 0;

  const weeklyStudy = [
    { day: 'Pzt', hours: 6 }, { day: 'Sal', hours: 8 }, { day: 'Çar', hours: 7 },
    { day: 'Per', hours: 5 }, { day: 'Cum', hours: 9 }, { day: 'Cmt', hours: 4 }, { day: 'Paz', hours: 3 },
  ];

  const subjects = ['Tümü', ...Array.from(new Set(topicProgress.map(t => t.subject)))];
  const filteredTopics = selectedSubject === 'Tümü'
    ? topicProgress
    : topicProgress.filter(t => t.subject === selectedSubject);

  const topicCounts = {
    mastered: topicProgress.filter(t => t.status === 'mastered').length,
    done: topicProgress.filter(t => t.status === 'done').length,
    'in-progress': topicProgress.filter(t => t.status === 'in-progress').length,
    'not-started': topicProgress.filter(t => t.status === 'not-started').length,
  };

  const toggleTask = (taskId: string) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, done: !t.done } : t));
  };

  const handleSubmitRating = () => {
    if (coachRating > 0) {
      setSubmittedRating(true);
      setTimeout(() => setSubmittedRating(false), 3000);
      setCoachRating(0);
      setRatingComment('');
    }
  };

  return (
    <div className="min-h-screen bg-bg-darkest text-text-light">
      <header className="border-b border-white/5 bg-bg-darkest/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <GraduationCap className="w-6 h-6 text-accent-cyan" />
            <h1 className="font-bold text-white">Öğrenci Paneli</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs">
              <Target className="w-3.5 h-3.5 text-accent-cyan" />
              <span className="text-text-light/70">{targetUniversity}</span>
            </div>
            <span className="text-sm text-text-light/60">{user.name}</span>
            <button onClick={logout} className="px-4 py-2 rounded-full glass text-sm text-accent-rose hover:bg-accent-rose/10 transition-all border-none cursor-pointer">
              Çıkış Yap
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Welcome + Target */}
        <div className="glass rounded-2xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">Merhaba, {user.name}! 👋</h2>
              <p className="text-text-light/60 text-sm">{examYear} YKS hedefin için bugÃ¼n de çalışmaya devam!</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent-cyan/10 text-accent-cyan text-sm font-medium">
                <Flame className="w-4 h-4" />
                {streakDays} günlük seri!
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-text-light/80">
                <Target className="w-4 h-4 text-accent-rose" />
                {targetUniversity}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-xl bg-white/5 relative overflow-hidden">
              <p className="text-2xl font-bold text-accent-cyan">{progress.tytNet}</p>
              <p className="text-text-light/50 text-xs">TYT Net</p>
              {tytChange !== 0 && (
                <span className={`absolute top-2 right-2 text-[10px] flex items-center gap-0.5 ${tytChange > 0 ? 'text-green-400' : 'text-accent-rose'}`}>
                  {tytChange > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {Math.abs(tytChange)}
                </span>
              )}
            </div>
            <div className="text-center p-4 rounded-xl bg-white/5 relative overflow-hidden">
              <p className="text-2xl font-bold text-accent-violet">{progress.aytNet}</p>
              <p className="text-text-light/50 text-xs">AYT Net</p>
              {aytChange !== 0 && (
                <span className={`absolute top-2 right-2 text-[10px] flex items-center gap-0.5 ${aytChange > 0 ? 'text-green-400' : 'text-accent-rose'}`}>
                  {aytChange > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {Math.abs(aytChange)}
                </span>
              )}
            </div>
            <div className="text-center p-4 rounded-xl bg-white/5">
              <p className="text-2xl font-bold text-accent-rose">{progress.weeklyStudyHours}</p>
              <p className="text-text-light/50 text-xs">Haftalık Saat</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-white/5">
              <p className="text-2xl font-bold text-green-400">{progress.completedTopics.length}</p>
              <p className="text-text-light/50 text-xs">Tamamlanan Konu</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Today's Tasks - kantakademi style günlük takip */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <LayoutList className="w-5 h-5 text-accent-cyan" />
                  Bugünkü Görevler
                </h2>
                <span className="text-xs text-text-light/40">{tasks.filter(t => t.done).length}/{tasks.length} tamamlandı</span>
              </div>
              <div className="space-y-2">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer"
                  >
                    {task.done ? <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" /> : <Circle className="w-5 h-5 text-text-light/30 shrink-0" />}
                    <div className="flex-1">
                      <p className={`text-sm ${task.done ? 'text-text-light/40 line-through' : 'text-white'}`}>{task.topic}</p>
                      <p className="text-xs text-text-light/50">{task.subject}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Exam Analysis - Milet Portal tarzı */}
            <div className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-accent-violet" />
                Deneme Analizi
              </h2>
              {/* TYT/AYT trend chart */}
              <div className="mb-6">
                <p className="text-xs text-text-light/50 mb-3">Net Trendi</p>
                <div className="flex items-end gap-3 h-48 px-2">
                  {examHistory.map((exam) => (
                    <div key={exam.name} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full flex gap-1 items-end" style={{ height: '140px' }}>
                        <div className="flex-1 bg-accent-cyan/60 rounded-t transition-all relative group" style={{ height: `${exam.tytNet * 1.4}px` }}>
                          <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] text-accent-cyan opacity-0 group-hover:opacity-100 transition-opacity">{exam.tytNet}</span>
                        </div>
                        <div className="flex-1 bg-accent-violet/60 rounded-t transition-all relative group" style={{ height: exam.aytNet > 0 ? `${exam.aytNet * 1.4}px` : '4px' }}>
                          {exam.aytNet > 0 && (
                            <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] text-accent-violet opacity-0 group-hover:opacity-100 transition-opacity">{exam.aytNet}</span>
                          )}
                        </div>
                      </div>
                      <span className="text-[10px] text-text-light/40">{exam.name}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-4 mt-3 text-xs">
                  <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-accent-cyan/60" /><span className="text-text-light/50">TYT</span></div>
                  <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-accent-violet/60" /><span className="text-text-light/50">AYT</span></div>
                </div>
              </div>
              {/* Subject breakdown for latest exam */}
              {latestExam && (
                <div>
                  <p className="text-xs text-text-light/50 mb-3">Son Deneme Konu Bazlı Netler — {latestExam.name}</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {Object.entries(latestExam.subjectNets).map(([subject, net]) => (
                      <div key={subject} className="p-3 rounded-xl bg-white/5 text-center">
                        <p className="text-lg font-bold text-white">{net}</p>
                        <p className="text-[10px] text-text-light/50">{subject}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Topic Progress Map - detailed */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Map className="w-5 h-5 text-accent-rose" />
                  Konu Durumu
                </h2>
                <div className="flex items-center gap-2">
                  {subjects.map(sub => (
                    <button
                      key={sub}
                      onClick={() => setSelectedSubject(sub)}
                      className={`text-[10px] px-2.5 py-1 rounded-full transition-all border-none cursor-pointer ${selectedSubject === sub ? 'bg-accent-cyan/20 text-accent-cyan' : 'bg-white/5 text-text-light/40 hover:bg-white/10'}`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              </div>
              {/* Summary counts */}
              <div className="grid grid-cols-4 gap-3 mb-4">
                <div className="text-center p-2 rounded-lg bg-yellow-400/5 border border-yellow-400/10">
                  <p className="text-lg font-bold text-yellow-400">{topicCounts.mastered}</p>
                  <p className="text-[10px] text-text-light/40">Uzman</p>
                </div>
                <div className="text-center p-2 rounded-lg bg-green-500/5 border border-green-500/10">
                  <p className="text-lg font-bold text-green-400">{topicCounts.done}</p>
                  <p className="text-[10px] text-text-light/40">TamamlandÄ±</p>
                </div>
                <div className="text-center p-2 rounded-lg bg-accent-cyan/5 border border-accent-cyan/10">
                  <p className="text-lg font-bold text-accent-cyan">{topicCounts['in-progress']}</p>
                  <p className="text-[10px] text-text-light/40">Devam Ediyor</p>
                </div>
                <div className="text-center p-2 rounded-lg bg-white/5 border border-white/10">
                  <p className="text-lg font-bold text-text-light/40">{topicCounts['not-started']}</p>
                  <p className="text-[10px] text-text-light/40">Başlanmadı</p>
                </div>
              </div>
              {/* Topic tags */}
              <div className="flex flex-wrap gap-2">
                {filteredTopics.map((tp) => (
                  <span key={`${tp.subject}-${tp.topic}`} className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                    tp.status === 'mastered' ? 'bg-yellow-400/15 text-yellow-400 border border-yellow-400/20' :
                    tp.status === 'done' ? 'bg-green-500/15 text-green-400 border border-green-500/20' :
                    tp.status === 'in-progress' ? 'bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/20' :
                    'bg-white/5 text-text-light/40 border border-white/10'
                  }`}>
                    {tp.topic}
                  </span>
                ))}
              </div>
            </div>

            {/* Weekly Study Tracker */}
            <div className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-accent-cyan" />
                Haftalık Çalışma Takibi
              </h2>
              <div className="flex items-end gap-2 h-40 px-2">
                {weeklyStudy.map((d) => (
                  <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full bg-accent-cyan/30 rounded-t transition-all relative group" style={{ height: `${d.hours * 12}px` }}>
                      <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] text-accent-cyan opacity-0 group-hover:opacity-100 transition-opacity">{d.hours}s</span>
                    </div>
                    <span className="text-[10px] text-text-light/40">{d.day}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 rounded-xl bg-white/5 flex items-center justify-between">
                <div>
                  <p className="text-xs text-text-light/50">Bu Hafta Toplam</p>
                  <p className="text-lg font-bold text-white">{weeklyStudy.reduce((a, d) => a + d.hours, 0)} saat</p>
                </div>
                <div>
                  <p className="text-xs text-text-light/50">Günlük Ortalama</p>
                  <p className="text-lg font-bold text-white">{(weeklyStudy.reduce((a, d) => a + d.hours, 0) / 7).toFixed(1)} saat</p>
                </div>
                <div>
                  <p className="text-xs text-text-light/50">Hedef</p>
                  <p className="text-lg font-bold text-accent-cyan">{progress.weeklyStudyHours} saat</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Next Coach Session */}
            <div className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-accent-cyan" />
                Sonraki Koç Görüşmesi
              </h2>
              {upcomingSession ? (
                <div className="p-4 rounded-xl bg-accent-cyan/5 border border-accent-cyan/20">
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar className="w-5 h-5 text-accent-cyan" />
                    <span className="text-white font-medium">
                      {new Date(upcomingSession.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' })}, {new Date(upcomingSession.date).getHours()}:00
                    </span>
                  </div>
                  <p className="text-text-light/50 text-sm">{coach?.name || 'Koç'} • {upcomingSession.type}</p>
                  {upcomingSession.notes && (
                    <p className="text-text-light/40 text-xs mt-2 italic">&quot;{upcomingSession.notes}&quot;</p>
                  )}
                </div>
              ) : (
                <p className="text-text-light/40 text-sm text-center py-4">Yaklaşan seans yok.</p>
              )}
            </div>

            {/* Monthly Performance Summary */}
            <div className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <ScrollText className="w-5 h-5 text-accent-violet" />
                Aylık Performans Özeti
              </h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-light/60">Net Artışı</span>
                  <span className="text-green-400 font-medium">+{tytChange + aytChange}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-light/60">Tamamlanan Konu</span>
                  <span className="text-accent-cyan font-medium">{progress.completedTopics.length}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-light/60">Katılım Oranı</span>
                  <span className="text-accent-violet font-medium">%92</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-light/60">Koç Değerlendirmesi</span>
                  <span className="text-yellow-400 font-medium">Çok İyi</span>
                </div>
                <div className="pt-3 border-t border-white/5">
                  <p className="text-xs text-text-light/40 italic">
                    "Bu ay hedeflerinin üzerine çıktın. Özellikle AYT Matematik netlerindeki artış dikkat çekici."
                  </p>
                </div>
              </div>
            </div>

            {/* Coach Rating - miletakademi style */}
            <div className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" />
                Koçumu Puanla
              </h2>
              {submittedRating ? (
                <div className="text-center py-4">
                  <CheckCircle2 className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <p className="text-sm text-text-light/80">Puanın gönderildi! Teşekkürler.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setCoachRating(star)}
                        className="border-none cursor-pointer p-1"
                      >
                        <Star className={`w-7 h-7 transition-all ${star <= coachRating ? 'text-yellow-400 fill-yellow-400 scale-110' : 'text-text-light/20'}`} />
                      </button>
                    ))}
                  </div>
                  <textarea
                    value={ratingComment}
                    onChange={(e) => setRatingComment(e.target.value)}
                    placeholder="Koçun hakkında bir şeyler yaz... (isteğe bağlı)"
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-text-light text-sm placeholder:text-text-light/30 focus:outline-none focus:ring-2 focus:ring-accent-cyan resize-none h-16"
                  />
                  <button
                    onClick={handleSubmitRating}
                    disabled={coachRating === 0}
                    className="w-full px-4 py-2 bg-gradient-accent text-bg-darkest font-medium rounded-full text-sm hover:shadow-glow-cyan transition-all disabled:opacity-40 border-none cursor-pointer"
                  >
                    Gönder
                  </button>
                </div>
              )}
            </div>

            {/* Achievements */}
            <div className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-accent-rose" />
                Başarılarım
              </h2>
              <div className="space-y-3">
                {[
                  { icon: Award, label: 'İlk 50 Net', desc: 'TYT denemesinde 50+ net', color: 'text-accent-cyan', achieved: true },
                  { icon: Flame, label: '7 Günlük Seri', desc: '7 gÃ¼n üst üste çalışma', color: 'text-accent-rose', achieved: true },
                  { icon: TrendingUp, label: 'Net Artışı', desc: 'Bir ayda +10 net', color: 'text-green-400', achieved: true },
                  { icon: Zap, label: 'Maratoncu', desc: '30 gÃ¼n üst üste çalışma', color: 'text-yellow-400', achieved: false },
                  { icon: BrainCircuit, label: 'AI Uzmanı', desc: '50+ AI sorusu çözümü', color: 'text-accent-violet', achieved: false },
                ].map((badge) => {
                  const Icon = badge.icon;
                  return (
                    <div key={badge.label} className={`flex items-center gap-3 p-3 rounded-xl ${badge.achieved ? 'bg-white/5' : 'bg-white/[0.02] opacity-50'}`}>
                      <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${badge.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">{badge.label}</p>
                        <p className="text-xs text-text-light/50">{badge.desc}</p>
                      </div>
                      {badge.achieved && <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Resources */}
            <div className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-accent-cyan" />
                Koçumdan Kaynaklar
              </h2>
              <div className="space-y-2">
                {[
                  { name: 'TYT Matematik Formülleri.pdf', type: 'PDF' },
                  { name: 'Paragraf Çözüm Teknikleri.mp4', type: 'Video' },
                  { name: 'Haftalık Çalışma Planı', type: 'Plan' },
                  { name: 'AYT Fizik Konu Anlatımı.pdf', type: 'PDF' },
                ].map((r) => (
                  <div key={r.name} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer">
                    <FileText className="w-4 h-4 text-accent-cyan" />
                    <div className="flex-1">
                      <p className="text-sm text-text-light">{r.name}</p>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-text-light/40">{r.type}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Support Button - kantakademi style */}
            <button
              onClick={() => {
                const el = document.getElementById('chat-widget-root');
                if (el) el.click();
                else alert('AI Koç asistanı yakÄ±nda aktif!');
              }}
              className="w-full glass rounded-2xl p-4 flex items-center gap-4 hover:bg-white/5 transition-all border-none cursor-pointer text-left"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-cyan to-accent-violet flex items-center justify-center">
                <BrainCircuit className="w-6 h-6 text-bg-darkest" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-white text-sm">AI Destek (Kant Yapay Zeka)</p>
                <p className="text-text-light/50 text-xs">Sorularını anlık çöz, ders özeti al</p>
              </div>
              <ChevronRight className="w-5 h-5 text-text-light/30" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
