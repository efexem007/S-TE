'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/providers/AuthProvider';
import {
  Users, Calendar, MessageCircle, TrendingUp, UserCheck,
  BookOpen, Clock, ArrowRight, Star, GraduationCap, Target,
  CheckCircle2, Send, ChevronRight, Award, StickyNote
} from 'lucide-react';
import {
  getCoachProfile, getStudentsByCoach, getSessionsByCoach, getCoachRatings
} from '@/lib/auth/mockData';

export default function CoachPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout, hasRole } = useAuth();
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !hasRole('coach'))) {
      router.push('/login');
    }
  }, [isLoading, isAuthenticated, hasRole, router]);

  if (isLoading) {
    return <div className="min-h-screen bg-bg-darkest flex items-center justify-center text-text-light">Yükleniyor...</div>;
  }
  if (!user || !hasRole('coach')) return null;

  const coach = getCoachProfile(user.id);
  const students = coach ? getStudentsByCoach(coach.id) : [];
  const sessions = coach ? getSessionsByCoach(coach.id) : [];
  const ratings = coach ? getCoachRatings(coach.id) : [];

  const upcomingSessions = sessions.filter(s => s.status === 'onaylandı' || s.status === 'bekliyor')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const completedSessions = sessions.filter(s => s.status === 'tamamlandı');

  const avgTytNet = students.length
    ? Math.round(students.reduce((a, s) => a + s.progress.tytNet, 0) / students.length)
    : 0;
  const avgRating = ratings.length
    ? (ratings.reduce((a, r) => a + r.rating, 0) / ratings.length).toFixed(1)
    : '0.0';

  const stats = [
    { label: 'Öğrenci Sayım', value: students.length, icon: Users, color: 'text-accent-cyan', bg: 'bg-accent-cyan/10' },
    { label: 'Bu Hafta Seans', value: upcomingSessions.filter(s => {
      const d = new Date(s.date);
      const now = new Date();
      return d >= now && d <= new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    }).length, icon: Calendar, color: 'text-accent-violet', bg: 'bg-accent-violet/10' },
    { label: 'Ortalama TYT Net', value: avgTytNet, icon: TrendingUp, color: 'text-accent-rose', bg: 'bg-accent-rose/10' },
    { label: 'Bekleyen Mesaj', value: 3, icon: MessageCircle, color: 'text-green-400', bg: 'bg-green-400/10' },
    { label: 'Ortalama Puanım', value: avgRating, icon: Star, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
    { label: 'Toplam Seans', value: coach?.totalSessions || 0, icon: Award, color: 'text-accent-cyan', bg: 'bg-accent-cyan/10' },
  ];

  const handleAddNote = () => {
    if (newNote.trim()) {
      alert('Not eklendi: ' + newNote);
      setNewNote('');
    }
  };

  return (
    <div className="min-h-screen bg-bg-darkest text-text-light">
      <header className="border-b border-white/5 bg-bg-darkest/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <UserCheck className="w-6 h-6 text-accent-violet" />
            <h1 className="font-bold text-white">Koç Paneli</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-text-light/60">{user.name}</span>
            <button onClick={logout} className="px-4 py-2 rounded-full glass text-sm text-accent-rose hover:bg-accent-rose/10 transition-all border-none cursor-pointer">
              Çıkış Yap
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Coach Profile Summary - wwakademi style */}
        {coach && (
          <div className="glass rounded-2xl p-6">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-gradient-accent flex items-center justify-center text-bg-darkest font-bold text-2xl shrink-0">
                {coach.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-white mb-1">{coach.name}</h2>
                <p className="text-text-light/60 text-sm mb-2">{coach.bio}</p>
                <div className="flex flex-wrap gap-3 text-xs">
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent-cyan/10 text-accent-cyan">
                    <GraduationCap className="w-3 h-3" /> {coach.university}
                  </span>
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent-violet/10 text-accent-violet">
                    <Target className="w-3 h-3" /> Sıralama: {coach.ranking.toLocaleString('tr-TR')}
                  </span>
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-yellow-400/10 text-yellow-400">
                    <Star className="w-3 h-3" /> {coach.rating} / 5
                  </span>
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent-rose/10 text-accent-rose">
                    <Award className="w-3 h-3" /> {coach.totalSessions} seans
                  </span>
                </div>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-text-light/40 text-xs">Kontenjan</p>
                <p className="text-2xl font-bold text-white">{coach.assignedStudents.length} <span className="text-text-light/40 text-lg">/ {coach.quota}</span></p>
                <div className="flex gap-1 mt-2 justify-end">
                  {Array.from({ length: coach.quota }).map((_, i) => (
                    <div key={i} className={`w-2.5 h-2.5 rounded-full ${i < coach.assignedStudents.length ? 'bg-accent-cyan' : 'bg-white/10'}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="glass rounded-2xl p-5 hover:bg-white/5 transition-all">
                <div className={`w-9 h-9 rounded-lg ${s.bg} flex items-center justify-center ${s.color} mb-3`}>
                  <Icon className="w-4 h-4" />
                </div>
                <p className="text-xl font-bold text-white">{s.value}</p>
                <p className="text-text-light/50 text-xs mt-1">{s.label}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Students List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-accent-cyan" />
                Öğrencilerim
              </h2>
              <div className="space-y-4">
                {students.map((student) => {
                  const latestExam = student.examHistory[student.examHistory.length - 1];
                  const doneTasks = student.dailyTasks.filter(t => t.done).length;
                  const totalTasks = student.dailyTasks.length;
                  const isSelected = selectedStudent === student.id;
                  return (
                    <div key={student.id} className={`rounded-xl border transition-all overflow-hidden ${isSelected ? 'bg-white/[0.07] border-accent-cyan/30' : 'bg-white/5 border-white/5 hover:bg-white/[0.07]'}`}>
                      <div
                        className="flex items-center gap-4 p-4 cursor-pointer"
                        onClick={() => setSelectedStudent(isSelected ? null : student.id)}
                      >
                        <div className="w-10 h-10 rounded-full bg-gradient-accent flex items-center justify-center text-bg-darkest font-bold">
                          {student.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-white text-sm">{student.name}</p>
                            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${student.packageType === 'basic' ? 'bg-accent-cyan/10 text-accent-cyan' : student.packageType === 'pro' ? 'bg-accent-violet/10 text-accent-violet' : 'bg-accent-rose/10 text-accent-rose'}`}>
                              {student.packageType === 'basic' ? 'Temel' : student.packageType === 'pro' ? 'Profesyonel' : 'Kurumsal'}
                            </span>
                          </div>
                          <p className="text-text-light/50 text-xs">{student.targetUniversity} • {student.targetDepartment}</p>
                        </div>
                        <div className="text-right hidden sm:block">
                          <p className="text-accent-cyan text-sm font-medium">TYT: {student.progress.tytNet}</p>
                          <p className="text-accent-violet text-sm font-medium">AYT: {student.progress.aytNet}</p>
                        </div>
                        <ChevronRight className={`w-4 h-4 text-text-light/30 shrink-0 transition-transform ${isSelected ? 'rotate-90' : ''}`} />
                      </div>
                      {isSelected && (
                        <div className="px-4 pb-4 border-t border-white/5 pt-3 space-y-3">
                          {/* Quick stats row */}
                          <div className="grid grid-cols-3 gap-3">
                            <div className="text-center p-2 rounded-lg bg-white/5">
                              <p className="text-lg font-bold text-white">{student.streakDays}</p>
                              <p className="text-[10px] text-text-light/40">Günlük Seri</p>
                            </div>
                            <div className="text-center p-2 rounded-lg bg-white/5">
                              <p className="text-lg font-bold text-white">{doneTasks}/{totalTasks}</p>
                              <p className="text-[10px] text-text-light/40">Görev</p>
                            </div>
                            <div className="text-center p-2 rounded-lg bg-white/5">
                              <p className="text-lg font-bold text-white">{student.progress.weeklyStudyHours}</p>
                              <p className="text-[10px] text-text-light/40">Saat/Hafta</p>
                            </div>
                          </div>
                          {/* Latest exam */}
                          {latestExam && (
                            <div className="p-3 rounded-lg bg-white/5">
                              <p className="text-xs text-text-light/50 mb-2">Son Deneme: {latestExam.name} ({latestExam.date})</p>
                              <div className="flex gap-3 text-xs">
                                <span className="text-accent-cyan">TYT: {latestExam.tytNet}</span>
                                <span className="text-accent-violet">AYT: {latestExam.aytNet}</span>
                              </div>
                            </div>
                          )}
                          {/* Topic progress mini */}
                          <div>
                            <p className="text-xs text-text-light/50 mb-2">Konu Durumu Özeti</p>
                            <div className="flex flex-wrap gap-1.5">
                              {student.topicProgress.slice(0, 8).map((tp) => (
                                <span key={`${tp.subject}-${tp.topic}`} className={`text-[10px] px-2 py-0.5 rounded-md font-medium ${
                                  tp.status === 'mastered' ? 'bg-yellow-400/15 text-yellow-400 border border-yellow-400/20' :
                                  tp.status === 'done' ? 'bg-green-500/15 text-green-400 border border-green-500/20' :
                                  tp.status === 'in-progress' ? 'bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/20' :
                                  'bg-white/5 text-text-light/30 border border-white/10'
                                }`}>
                                  {tp.topic}
                                </span>
                              ))}
                              {student.topicProgress.length > 8 && (
                                <span className="text-[10px] px-2 py-0.5 rounded-md text-text-light/40">+{student.topicProgress.length - 8}</span>
                              )}
                            </div>
                          </div>
                          {/* Notes */}
                          {student.notes.length > 0 && (
                            <div className="space-y-1.5">
                              <p className="text-xs text-text-light/50">Son Notlar</p>
                              {student.notes.slice(-2).map((note, i) => (
                                <p key={i} className="text-xs text-text-light/60 bg-white/5 rounded-lg p-2">{note}</p>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Coach Ratings - miletakademi style */}
            <div className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" />
                Koç Puanlarım
              </h2>
              {ratings.length === 0 ? (
                <p className="text-text-light/40 text-sm text-center py-8">Henüz puanlama yok.</p>
              ) : (
                <div className="space-y-3">
                  {ratings.map((r, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/5">
                      <div className="flex items-center gap-1 shrink-0">
                        {Array.from({ length: 5 }).map((_, si) => (
                          <Star key={si} className={`w-3.5 h-3.5 ${si < r.rating ? 'text-yellow-400 fill-yellow-400' : 'text-text-light/20'}`} />
                        ))}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-text-light/80">{r.comment}</p>
                        <p className="text-[10px] text-text-light/40 mt-1">{r.week}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Sessions */}
            <div className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-accent-cyan" />
                Yaklaşan Seanslar
              </h2>
              <div className="space-y-3">
                {upcomingSessions.length === 0 ? (
                  <p className="text-text-light/40 text-sm text-center py-4">Yaklaşan seans yok.</p>
                ) : (
                  upcomingSessions.map((s) => {
                    const student = students.find(st => st.id === s.studentId);
                    const date = new Date(s.date);
                    const isToday = date.toDateString() === new Date().toDateString();
                    return (
                      <div key={s.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                        <div className="w-10 h-10 rounded-xl bg-accent-cyan/10 flex items-center justify-center text-accent-cyan shrink-0">
                          <Clock className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-white text-sm">{student?.name || 'Bilinmiyor'}</p>
                          <p className="text-text-light/50 text-xs">{s.type} • {isToday ? 'Bugün' : date.toLocaleDateString('tr-TR')}, {date.getHours()}:00</p>
                        </div>
                        <span className={`text-[10px] px-2 py-1 rounded-full shrink-0 ${s.status === 'onaylandı' ? 'bg-green-500/10 text-green-400' : 'bg-accent-rose/10 text-accent-rose'}`}>
                          {s.status === 'onaylandı' ? 'Onaylandı' : 'Bekliyor'}
                        </span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Completed Sessions Summary */}
            <div className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                Tamamlanan Seanslar
              </h2>
              <div className="space-y-3">
                {completedSessions.length === 0 ? (
                  <p className="text-text-light/40 text-sm text-center py-4">Henüz tamamlanan seans yok.</p>
                ) : (
                  completedSessions.map((s) => {
                    const student = students.find(st => st.id === s.studentId);
                    const date = new Date(s.date);
                    return (
                      <div key={s.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                        <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center text-green-400 shrink-0">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white">{student?.name || 'Bilinmiyor'}</p>
                          <p className="text-text-light/50 text-xs">{s.type} • {date.toLocaleDateString('tr-TR')}</p>
                        </div>
                        <span className="text-[10px] text-text-light/40">{s.duration} dk</span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Quick Note */}
            <div className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <StickyNote className="w-5 h-5 text-accent-violet" />
                Hızlı Not
              </h2>
              <div className="space-y-3">
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Öğrenci notu yaz..."
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-text-light text-sm placeholder:text-text-light/30 focus:outline-none focus:ring-2 focus:ring-accent-cyan resize-none h-24"
                />
                <button
                  onClick={handleAddNote}
                  className="w-full px-4 py-2 bg-gradient-accent text-bg-darkest font-medium rounded-full text-sm hover:shadow-glow-cyan transition-all border-none cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Not Ekle
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Hızlı İşlemler</h2>
              <div className="space-y-2">
                {[
                  { label: 'Yeni Seans Planla', icon: Calendar },
                  { label: 'Öğrenci Notu Ekle', icon: BookOpen },
                  { label: 'Mesaj Gönder', icon: MessageCircle },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button key={item.label} onClick={() => alert(`${item.label} modalı yakında!`)} className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-left border-none cursor-pointer">
                      <Icon className="w-4 h-4 text-accent-cyan" />
                      <span className="text-sm text-text-light">{item.label}</span>
                      <ArrowRight className="w-4 h-4 text-text-light/30 ml-auto" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
