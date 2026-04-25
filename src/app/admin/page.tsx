'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/providers/AuthProvider';
import {
  Users, DollarSign, BookOpen, Settings, Shield,
  TrendingUp, ArrowRight, Mail, Phone, CheckCircle2, XCircle,
  Star, GraduationCap, Target, Clock, Package, BarChart3,
  AlertCircle, ChevronDown, ChevronUp, Search, Filter
} from 'lucide-react';
import {
  getAllStudents, getAllCoaches, getPendingApplications,
  MOCK_APPLICATIONS, MOCK_COACH_PROFILES
} from '@/lib/auth/mockData';
import type { Application } from '@/lib/auth/types';

export default function AdminPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout, hasRole } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCoachFilter, setSelectedCoachFilter] = useState<string>('all');
  const [applications, setApplications] = useState<Application[]>(getPendingApplications());
  const [expandedApp, setExpandedApp] = useState<string | null>(null);

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

  // wwakademi-style kontenjan analizi
  const totalQuota = coaches.reduce((sum, c) => sum + c.quota, 0);
  const filledQuota = coaches.reduce((sum, c) => sum + c.assignedStudents.length, 0);
  const availableQuota = totalQuota - filledQuota;

  // Finansal hesaplamalar (kantakademi-style paket yönetimi)
  const packageRevenue = {
    basic: students.filter(s => s.packageType === 'basic').length * 999,
    pro: students.filter(s => s.packageType === 'pro').length * 2499,
    enterprise: students.filter(s => s.packageType === 'enterprise').length * 5000, // estimate
  };
  const totalRevenue = packageRevenue.basic + packageRevenue.pro + packageRevenue.enterprise;

  const stats = [
    { label: 'Toplam Öğrenci', value: students.length + 12, icon: Users, color: 'text-accent-cyan', bg: 'bg-accent-cyan/10' },
    { label: 'Aktif Koç', value: coaches.length, icon: Shield, color: 'text-accent-violet', bg: 'bg-accent-violet/10' },
    { label: 'Aylık Gelir', value: `₺${(totalRevenue + 48500).toLocaleString('tr-TR')}`, icon: DollarSign, color: 'text-accent-rose', bg: 'bg-accent-rose/10' },
    { label: 'Yeni Kayıt (Bu Ay)', value: '+8', icon: TrendingUp, color: 'text-green-400', bg: 'bg-green-400/10' },
    { label: 'Bekleyen Başvuru', value: applications.length, icon: AlertCircle, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
    { label: 'Boş Kontenjan', value: availableQuota, icon: Target, color: 'text-accent-cyan', bg: 'bg-accent-cyan/10' },
  ];

  const handleApproveApplication = (appId: string) => {
    setApplications(prev => prev.filter(a => a.id !== appId));
  };

  const handleRejectApplication = (appId: string) => {
    setApplications(prev => prev.filter(a => a.id !== appId));
  };

  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         s.targetUniversity.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCoach = selectedCoachFilter === 'all' || s.assignedCoach === selectedCoachFilter;
    return matchesSearch && matchesCoach;
  });

  return (
    <div className="min-h-screen bg-bg-darkest text-text-light">
      {/* Header */}
      <header className="border-b border-white/5 bg-bg-darkest/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
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

      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Stats Grid */}
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
          {/* Applications Management */}
          <div className="lg:col-span-2 glass rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-yellow-400" />
                Bekleyen Başvurular
              </h2>
              <span className="text-xs px-2 py-1 rounded-full bg-yellow-400/10 text-yellow-400">
                {applications.length} yeni
              </span>
            </div>
            <div className="space-y-3">
              {applications.length === 0 ? (
                <p className="text-text-light/40 text-sm text-center py-8">Bekleyen başvuru yok.</p>
              ) : (
                applications.map((app) => (
                  <div key={app.id} className="rounded-xl bg-white/5 border border-white/5 overflow-hidden">
                    <div
                      className="flex items-center gap-4 p-4 cursor-pointer hover:bg-white/5 transition-all"
                      onClick={() => setExpandedApp(expandedApp === app.id ? null : app.id)}
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-accent flex items-center justify-center text-bg-darkest font-bold text-sm">
                        {app.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-white text-sm">{app.name}</p>
                        <p className="text-text-light/50 text-xs">{app.grade} • {app.targetExam} • {app.packageType === 'basic' ? 'Temel' : app.packageType === 'pro' ? 'Profesyonel' : 'Kurumsal'}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => { e.stopPropagation(); handleApproveApplication(app.id); }}
                          className="p-2 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-all border-none cursor-pointer"
                          title="Onayla"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleRejectApplication(app.id); }}
                          className="p-2 rounded-lg bg-accent-rose/10 text-accent-rose hover:bg-accent-rose/20 transition-all border-none cursor-pointer"
                          title="Reddet"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                        {expandedApp === app.id ? <ChevronUp className="w-4 h-4 text-text-light/40" /> : <ChevronDown className="w-4 h-4 text-text-light/40" />}
                      </div>
                    </div>
                    {expandedApp === app.id && (
                      <div className="px-4 pb-4 space-y-2 border-t border-white/5 pt-3">
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="flex items-center gap-2 text-text-light/60">
                            <Mail className="w-3 h-3" /> {app.email}
                          </div>
                          {app.phone && (
                            <div className="flex items-center gap-2 text-text-light/60">
                              <Phone className="w-3 h-3" /> {app.phone}
                            </div>
                          )}
                        </div>
                        {app.message && (
                          <p className="text-text-light/70 text-xs italic bg-white/5 rounded-lg p-2">"{app.message}"</p>
                        )}
                        <p className="text-text-light/40 text-xs">Başvuru tarihi: {new Date(app.createdAt).toLocaleDateString('tr-TR')}</p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Financial Summary */}
          <div className="glass rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-accent-cyan" />
              Finansal Özet
            </h2>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/5">
                <p className="text-text-light/50 text-xs mb-1">Toplam Aylık Gelir</p>
                <p className="text-2xl font-bold text-white">₺{(totalRevenue + 48500).toLocaleString('tr-TR')}</p>
              </div>
              <div className="space-y-3">
                {[
                  { label: 'Temel Paket', value: packageRevenue.basic, color: 'bg-accent-cyan', count: students.filter(s => s.packageType === 'basic').length },
                  { label: 'Profesyonel Paket', value: packageRevenue.pro, color: 'bg-accent-violet', count: students.filter(s => s.packageType === 'pro').length },
                  { label: 'Kurumsal Paket', value: packageRevenue.enterprise, color: 'bg-accent-rose', count: students.filter(s => s.packageType === 'enterprise').length },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-text-light/60">{item.label} ({item.count})</span>
                      <span className="text-text-light/80">₺{item.value.toLocaleString('tr-TR')}</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                      <div className={`h-full rounded-full ${item.color}`} style={{ width: `${totalRevenue > 0 ? (item.value / (totalRevenue + 48500)) * 100 : 0}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-3 border-t border-white/5 space-y-2">
                <div className="flex items-center gap-2 text-xs text-text-light/60">
                  <Clock className="w-3 h-3 text-accent-cyan" />
                  <span>7 Gün Koşulsuz İade: 2 aktif</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-text-light/60">
                  <TrendingUp className="w-3 h-3 text-green-400" />
                  <span>Geçen aya göre +12%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Coaches Section - wwakademi style */}
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-accent-violet" />
              Koç Kadrosu
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {coaches.map((coach) => (
              <div key={coach.id} className="rounded-xl bg-white/5 border border-white/5 p-5 hover:bg-white/[0.07] transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-accent flex items-center justify-center text-bg-darkest font-bold text-lg">
                    {coach.name.charAt(0)}
                  </div>
                  <span className={`text-[10px] px-2 py-1 rounded-full font-medium ${coach.quotaFilled ? 'bg-accent-rose/10 text-accent-rose' : 'bg-green-400/10 text-green-400'}`}>
                    {coach.quotaFilled ? 'KONTENJAN DOLU' : 'KONTENJAN MEVCUT'}
                  </span>
                </div>
                <h3 className="font-semibold text-white mb-1">{coach.name}</h3>
                <p className="text-text-light/50 text-xs mb-3 line-clamp-2">{coach.bio}</p>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-text-light/60">
                    <GraduationCap className="w-3 h-3 text-accent-cyan" />
                    <span>{coach.university} ({coach.universityYear})</span>
                  </div>
                  <div className="flex items-center gap-2 text-text-light/60">
                    <Target className="w-3 h-3 text-accent-cyan" />
                    <span>Sıralama: {coach.ranking.toLocaleString('tr-TR')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-text-light/60">
                    <Star className="w-3 h-3 text-yellow-400" />
                    <span>{coach.rating} / 5 • {coach.totalSessions} seans</span>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs text-text-light/50">{coach.assignedStudents.length} / {coach.quota} öğrenci</span>
                  <div className="flex gap-1">
                    {Array.from({ length: coach.quota }).map((_, i) => (
                      <div key={i} className={`w-2 h-2 rounded-full ${i < coach.assignedStudents.length ? 'bg-accent-cyan' : 'bg-white/10'}`} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Students Table with Filters */}
        <div className="glass rounded-2xl p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-accent-cyan" />
              Öğrenciler
            </h2>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-text-light/40 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 text-text-light text-sm placeholder:text-text-light/30 focus:outline-none focus:ring-2 focus:ring-accent-cyan w-48"
                />
              </div>
              <select
                value={selectedCoachFilter}
                onChange={(e) => setSelectedCoachFilter(e.target.value)}
                className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-text-light text-sm focus:outline-none focus:ring-2 focus:ring-accent-cyan cursor-pointer"
              >
                <option value="all">Tüm Koçlar</option>
                {coaches.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-text-light/40 border-b border-white/5">
                  <th className="text-left py-3 px-4">İsim</th>
                  <th className="text-left py-3 px-4">Paket</th>
                  <th className="text-left py-3 px-4">Koç</th>
                  <th className="text-left py-3 px-4">Hedef Üniversite</th>
                  <th className="text-left py-3 px-4">TYT</th>
                  <th className="text-left py-3 px-4">AYT</th>
                  <th className="text-left py-3 px-4">Seri</th>
                  <th className="text-left py-3 px-4">Haftalık</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((s) => (
                  <tr key={s.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-accent flex items-center justify-center text-bg-darkest font-bold text-xs">
                          {s.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-white text-sm">{s.name}</p>
                          <p className="text-text-light/40 text-xs">{s.examYear} YKS</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${s.packageType === 'basic' ? 'bg-accent-cyan/10 text-accent-cyan' : s.packageType === 'pro' ? 'bg-accent-violet/10 text-accent-violet' : 'bg-accent-rose/10 text-accent-rose'}`}>
                        {s.packageType === 'basic' ? 'Temel' : s.packageType === 'pro' ? 'Profesyonel' : 'Kurumsal'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-text-light/60 text-xs">
                      {coaches.find(c => c.id === s.assignedCoach)?.name || 'Atanmamış'}
                    </td>
                    <td className="py-3 px-4 text-text-light/60 text-xs">{s.targetUniversity}</td>
                    <td className="py-3 px-4 text-accent-cyan font-medium">{s.progress.tytNet}</td>
                    <td className="py-3 px-4 text-accent-violet font-medium">{s.progress.aytNet}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1 text-xs text-text-light/60">
                        <TrendingUp className="w-3 h-3 text-green-400" />
                        {s.streakDays} gün
                      </div>
                    </td>
                    <td className="py-3 px-4 text-text-light/60 text-xs">{s.progress.weeklyStudyHours} saat</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="glass rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Hızlı İşlemler</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Fiyatlandırma Ayarları', desc: 'Paket fiyatlarını ve özellikleri düzenle', icon: DollarSign, color: 'text-accent-rose' },
              { label: 'İçerik Yönetimi', desc: 'Blog yazıları, quiz ve SSS güncelle', icon: BookOpen, color: 'text-accent-cyan' },
              { label: 'Site Ayarları', desc: 'İletişim bilgileri ve sosyal medya', icon: Settings, color: 'text-accent-violet' },
              { label: 'Veli Paneli Erişimi', desc: 'Veli görüntüleme izinlerini yönet', icon: Users, color: 'text-green-400' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button key={item.label} onClick={() => alert(`${item.label} modalı yakında!`)} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-left border-none cursor-pointer">
                  <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${item.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white text-sm">{item.label}</p>
                    <p className="text-text-light/50 text-xs">{item.desc}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-text-light/30 shrink-0" />
                </button>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
