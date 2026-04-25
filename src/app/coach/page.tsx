'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/providers/AuthProvider';
import {
  Users, Calendar, MessageCircle, TrendingUp, UserCheck,
  BookOpen, Clock, ArrowRight
} from 'lucide-react';
import { getCoachProfile, getStudentsByCoach } from '@/lib/auth/mockData';

export default function CoachPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout, hasRole } = useAuth();

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

  const stats = [
    { label: 'Öğrenci Sayım', value: students.length, icon: Users, color: 'text-accent-cyan' },
    { label: 'Bu Hafta Seans', value: 8, icon: Calendar, color: 'text-accent-violet' },
    { label: 'Ortalama TYT Net', value: students.length ? Math.round(students.reduce((a, s) => a + s.progress.tytNet, 0) / students.length) : 0, icon: TrendingUp, color: 'text-accent-rose' },
    { label: 'Bekleyen Mesaj', value: 3, icon: MessageCircle, color: 'text-green-400' },
  ];

  return (
    <div className="min-h-screen bg-bg-darkest text-text-light">
      <header className="border-b border-white/5 bg-bg-darkest/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
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

      <main className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="glass rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${s.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-white">{s.value}</p>
                <p className="text-text-light/50 text-sm">{s.label}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glass rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Öğrencilerim</h2>
            <div className="space-y-3">
              {students.map((student) => (
                <div key={student.id} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
                  <div className="w-10 h-10 rounded-full bg-gradient-accent flex items-center justify-center text-bg-darkest font-bold">
                    {student.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-white">{student.name}</p>
                    <p className="text-text-light/50 text-sm">{student.targetUniversity} • {student.targetDepartment}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-accent-cyan text-sm font-medium">TYT: {student.progress.tytNet}</p>
                    <p className="text-accent-violet text-sm font-medium">AYT: {student.progress.aytNet}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Yaklaşan Seanslar</h2>
              <div className="space-y-3">
                {[
                  { student: 'Elif Öğrenci', date: 'Bugün, 15:00', type: 'Birebir Görüşme', status: 'onaylandı' },
                  { student: 'Can Yılmaz', date: 'Yarın, 10:00', type: 'TYT Matematik', status: 'bekliyor' },
                  { student: 'Elif Öğrenci', date: '26 Nisan, 14:00', type: 'Motivasyon Seansı', status: 'onaylandı' },
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-white/5">
                    <div className="w-10 h-10 rounded-xl bg-accent-cyan/10 flex items-center justify-center text-accent-cyan">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-white text-sm">{s.student}</p>
                      <p className="text-text-light/50 text-xs">{s.type} • {s.date}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${s.status === 'onaylandı' ? 'bg-green-500/10 text-green-400' : 'bg-accent-rose/10 text-accent-rose'}`}>
                      {s.status === 'onaylandı' ? 'Onaylandı' : 'Bekliyor'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

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
