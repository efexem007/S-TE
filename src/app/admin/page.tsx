'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/providers/AuthProvider';
import {
  Users, DollarSign, BookOpen, Settings, Shield,
  TrendingUp, ArrowRight, Mail, Phone
} from 'lucide-react';
import { getAllStudents, getAllCoaches } from '@/lib/auth/mockData';

export default function AdminPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout, hasRole } = useAuth();

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !hasRole('admin'))) {
      router.push('/login');
    }
  }, [isLoading, isAuthenticated, hasRole, router]);

  if (isLoading) {
    return <div className="min-h-screen bg-bg-darkest flex items-center justify-center text-text-light">Yükleniyor...</div>;
  }
  if (!user || !hasRole('admin')) return null;

  const students = getAllStudents();
  const coaches = getAllCoaches();

  const stats = [
    { label: 'Toplam Öğrenci', value: students.length + 12, icon: Users, color: 'text-accent-cyan' },
    { label: 'Aktif Koç', value: coaches.length + 3, icon: Shield, color: 'text-accent-violet' },
    { label: 'Aylık Gelir', value: '₺48.500', icon: DollarSign, color: 'text-accent-rose' },
    { label: 'Yeni Kayıt (Bu Ay)', value: '+8', icon: TrendingUp, color: 'text-green-400' },
  ];

  return (
    <div className="min-h-screen bg-bg-darkest text-text-light">
      {/* Header */}
      <header className="border-b border-white/5 bg-bg-darkest/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-accent-rose" />
            <h1 className="font-bold text-white">Admin Paneli</h1>
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
        {/* Stats */}
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
          {/* Quick Actions */}
          <div className="glass rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Hızlı İşlemler</h2>
            <div className="space-y-3">
              {[
                { label: 'Fiyatlandırma Ayarları', desc: 'Paket fiyatlarını ve özellikleri düzenle', icon: DollarSign, action: () => alert('Fiyatlandırma ayarları modalı yakında!') },
                { label: 'İçerik Yönetimi', desc: 'Blog yazıları, quiz ve SSS güncelle', icon: BookOpen, action: () => alert('İçerik yönetimi modalı yakında!') },
                { label: 'Site Ayarları', desc: 'İletişim bilgileri ve sosyal medya', icon: Settings, action: () => alert('Site ayarları modalı yakında!') },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button key={item.label} onClick={item.action} className="w-full flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-left border-none cursor-pointer">
                    <div className="w-10 h-10 rounded-xl bg-accent-cyan/10 flex items-center justify-center text-accent-cyan">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-white">{item.label}</p>
                      <p className="text-text-light/50 text-sm">{item.desc}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-text-light/30" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Coaches List */}
          <div className="glass rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Koçlar</h2>
            <div className="space-y-3">
              {coaches.map((coach) => (
                <div key={coach.id} className="flex items-center gap-4 p-4 rounded-xl bg-white/5">
                  <div className="w-10 h-10 rounded-full bg-gradient-accent flex items-center justify-center text-bg-darkest font-bold">
                    {coach.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-white">{coach.name}</p>
                    <p className="text-text-light/50 text-sm">{coach.specialty} • {coach.experience} yıl</p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-accent-violet/10 text-accent-violet">
                    {coach.assignedStudents.length} öğrenci
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Students Table */}
        <div className="glass rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Öğrenciler</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-text-light/40 border-b border-white/5">
                  <th className="text-left py-3 px-4">İsim</th>
                  <th className="text-left py-3 px-4">Hedef Üniversite</th>
                  <th className="text-left py-3 px-4">Bölüm</th>
                  <th className="text-left py-3 px-4">TYT Net</th>
                  <th className="text-left py-3 px-4">AYT Net</th>
                  <th className="text-left py-3 px-4">Haftalık Çalışma</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4 font-medium text-white">{s.name}</td>
                    <td className="py-3 px-4 text-text-light/60">{s.targetUniversity}</td>
                    <td className="py-3 px-4 text-text-light/60">{s.targetDepartment}</td>
                    <td className="py-3 px-4 text-accent-cyan">{s.progress.tytNet}</td>
                    <td className="py-3 px-4 text-accent-violet">{s.progress.aytNet}</td>
                    <td className="py-3 px-4 text-text-light/60">{s.progress.weeklyStudyHours} saat</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
