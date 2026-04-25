'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/providers/AuthProvider';
import {
  GraduationCap, Target, TrendingUp, Clock, BookOpen,
  Calendar, Award, Flame, ChevronRight, CheckCircle2, Circle
} from 'lucide-react';
import { getStudentProfile } from '@/lib/auth/mockData';

export default function StudentPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout, hasRole } = useAuth();

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !hasRole('student'))) {
      router.push('/login');
    }
  }, [isLoading, isAuthenticated, hasRole, router]);

  if (isLoading) {
    return <div className="min-h-screen bg-bg-darkest flex items-center justify-center text-text-light">Yükleniyor...</div>;
  }
  if (!user || !hasRole('student')) return null;

  const profile = getStudentProfile(user.id);
  if (!profile) return <div className="min-h-screen bg-bg-darkest flex items-center justify-center text-text-light">Profil bulunamadı</div>;

  const { progress, targetUniversity, targetDepartment, examYear } = profile;

  // Mock data for visualizations
  const weeklyStudy = [
    { day: 'Pzt', hours: 6 }, { day: 'Sal', hours: 8 }, { day: 'Çar', hours: 7 },
    { day: 'Per', hours: 5 }, { day: 'Cum', hours: 9 }, { day: 'Cmt', hours: 4 }, { day: 'Paz', hours: 3 },
  ];
  const mockExamHistory = [
    { name: 'TYT-1', tyt: 65, ayt: 0 }, { name: 'TYT-2', tyt: 72, ayt: 0 },
    { name: 'TYT-3', tyt: 78, ayt: 0 }, { name: 'AYT-1', tyt: 80, ayt: 58 },
    { name: 'Genel-1', tyt: 82, ayt: 65 }, { name: 'Genel-2', tyt: 85, ayt: 72 },
  ];
  const todayTasks = [
    { subject: 'TYT Matematik', topic: 'Sayı Basamakları', done: true },
    { subject: 'TYT Türkçe', topic: 'Paragraf Çözümü', done: true },
    { subject: 'TYT Fizik', topic: 'Vektörler', done: false },
    { subject: 'AYT Matematik', topic: 'Limit', done: false },
    { subject: 'TYT Kimya', topic: 'Atom Yapısı', done: false },
  ];
  const topicHeatmap = [
    { subject: 'Matematik', topics: [
      { name: 'Sayılar', status: 'done' }, { name: 'Bölünebilme', status: 'done' },
      { name: 'Rasyonel', status: 'in-progress' }, { name: 'Basit Eşitsizlik', status: 'not-started' },
    ]},
    { subject: 'Fizik', topics: [
      { name: 'Vektörler', status: 'in-progress' }, { name: 'Kuvvet', status: 'not-started' },
      { name: 'Hareket', status: 'not-started' }, { name: 'İş-Enerji', status: 'not-started' },
    ]},
    { subject: 'Kimya', topics: [
      { name: 'Atom', status: 'not-started' }, { name: 'Periyodik', status: 'not-started' },
      { name: 'Bileşikler', status: 'not-started' }, { name: 'Asit-Baz', status: 'not-started' },
    ]},
  ];

  return (
    <div className="min-h-screen bg-bg-darkest text-text-light">
      <header className="border-b border-white/5 bg-bg-darkest/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
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

      <main className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Welcome + Stats */}
        <div className="glass rounded-2xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">Merhaba, {user.name}! 👋</h2>
              <p className="text-text-light/60 text-sm">{examYear} YKS hedefin için bugün de çalışmaya devam!</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent-cyan/10 text-accent-cyan text-sm font-medium">
              <Flame className="w-4 h-4" />
              12 günlük seri!
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-xl bg-white/5">
              <p className="text-2xl font-bold text-accent-cyan">{progress.tytNet}</p>
              <p className="text-text-light/50 text-xs">TYT Net</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-white/5">
              <p className="text-2xl font-bold text-accent-violet">{progress.aytNet}</p>
              <p className="text-text-light/50 text-xs">AYT Net</p>
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
          {/* Today's Tasks */}
          <div className="lg:col-span-2 space-y-8">
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">Bugünkü Görevler</h2>
                <span className="text-xs text-text-light/40">{todayTasks.filter(t => t.done).length}/{todayTasks.length} tamamlandı</span>
              </div>
              <div className="space-y-2">
                {todayTasks.map((task, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer">
                    {task.done ? <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" /> : <Circle className="w-5 h-5 text-text-light/30 shrink-0" />}
                    <div className="flex-1">
                      <p className={`text-sm ${task.done ? 'text-text-light/40 line-through' : 'text-white'}`}>{task.topic}</p>
                      <p className="text-xs text-text-light/50">{task.subject}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Topic Heatmap */}
            <div className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Konu Durumu</h2>
              <div className="space-y-4">
                {topicHeatmap.map((subject) => (
                  <div key={subject.subject}>
                    <p className="text-sm font-medium text-text-light/70 mb-2">{subject.subject}</p>
                    <div className="flex flex-wrap gap-2">
                      {subject.topics.map((topic) => (
                        <span key={topic.name} className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                          topic.status === 'done' ? 'bg-green-500/15 text-green-400 border border-green-500/20' :
                          topic.status === 'in-progress' ? 'bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/20' :
                          'bg-white/5 text-text-light/40 border border-white/10'
                        }`}>
                          {topic.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Exam History Chart */}
            <div className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Deneme Geçmişi</h2>
              <div className="flex items-end gap-3 h-40">
                {mockExamHistory.map((exam) => (
                  <div key={exam.name} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full flex gap-0.5">
                      <div className="flex-1 bg-accent-cyan/60 rounded-t" style={{ height: `${exam.tyt * 1.2}px` }} />
                      <div className="flex-1 bg-accent-violet/60 rounded-t" style={{ height: `${exam.ayt * 1.2}px` }} />
                    </div>
                    <span className="text-[10px] text-text-light/40">{exam.name}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-4 mt-4 text-xs">
                <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-accent-cyan/60" /><span className="text-text-light/50">TYT</span></div>
                <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-accent-violet/60" /><span className="text-text-light/50">AYT</span></div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Weekly Study Bar */}
            <div className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Haftalık Çalışma</h2>
              <div className="flex items-end gap-2 h-32">
                {weeklyStudy.map((d) => (
                  <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full bg-accent-cyan/30 rounded-t transition-all" style={{ height: `${d.hours * 10}px` }} />
                    <span className="text-[10px] text-text-light/40">{d.day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Coach Session */}
            <div className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Sonraki Koç Görüşmesi</h2>
              <div className="p-4 rounded-xl bg-accent-cyan/5 border border-accent-cyan/20">
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="w-5 h-5 text-accent-cyan" />
                  <span className="text-white font-medium">26 Nisan, 15:00</span>
                </div>
                <p className="text-text-light/50 text-sm">Ahmet Koç • TYT Matematik Değerlendirmesi</p>
              </div>
            </div>

            {/* Achievements */}
            <div className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Başarılarım</h2>
              <div className="space-y-3">
                {[
                  { icon: Award, label: 'İlk 50 Net', desc: 'TYT denemesinde 50+ net', color: 'text-accent-cyan' },
                  { icon: Flame, label: '7 Günlük Seri', desc: '7 gün üst üste çalışma', color: 'text-accent-rose' },
                  { icon: TrendingUp, label: 'Net Artışı', desc: 'Bir ayda +10 net', color: 'text-green-400' },
                ].map((badge) => {
                  const Icon = badge.icon;
                  return (
                    <div key={badge.label} className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                      <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${badge.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{badge.label}</p>
                        <p className="text-xs text-text-light/50">{badge.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Resources */}
            <div className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Koçumdan Kaynaklar</h2>
              <div className="space-y-2">
                {[
                  { name: 'TYT Matematik Formülleri.pdf', type: 'PDF' },
                  { name: 'Paragraf Çözüm Teknikleri.mp4', type: 'Video' },
                  { name: 'Haftalık Çalışma Planı', type: 'Plan' },
                ].map((r) => (
                  <div key={r.name} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer">
                    <BookOpen className="w-4 h-4 text-accent-cyan" />
                    <div className="flex-1">
                      <p className="text-sm text-text-light">{r.name}</p>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-text-light/40">{r.type}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
