'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogIn, Shield, GraduationCap, UserCheck, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/components/providers/AuthProvider';
import type { UserRole } from '@/lib/auth/types';

const roles: { id: UserRole; label: string; icon: React.ElementType; color: string }[] = [
  { id: 'admin', label: 'Site Sahibi', icon: Shield, color: 'text-accent-rose border-accent-rose/30 bg-accent-rose/10' },
  { id: 'coach', label: 'Koç', icon: UserCheck, color: 'text-accent-violet border-accent-violet/30 bg-accent-violet/10' },
  { id: 'student', label: 'Öğrenci', icon: GraduationCap, color: 'text-accent-cyan border-accent-cyan/30 bg-accent-cyan/10' },
];

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await login({ email, password, role });
    setLoading(false);
    if (result.success) {
      const redirectMap: Record<UserRole, string> = { admin: '/admin', coach: '/coach', student: '/student' };
      router.push(redirectMap[role]);
    } else {
      setError(result.error || 'Giriş başarısız.');
    }
  };

  return (
    <div className="min-h-screen bg-bg-darkest flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-white mb-2"><span className="text-gradient">dueM</span>WeWork</h1>
          <p className="text-text-light/60">Panel Girişi</p>
        </div>
        <div className="glass rounded-2xl p-8 space-y-6">
          <div className="grid grid-cols-3 gap-2">
            {roles.map((r) => {
              const Icon = r.icon;
              const active = role === r.id;
              return (
                <button key={r.id} type="button" onClick={() => setRole(r.id)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all duration-300 cursor-pointer ${active ? `${r.color} border-opacity-100` : 'border-white/10 text-text-light/40 hover:border-white/20'}`}>
                  <Icon className="w-5 h-5" />
                  <span className="text-xs font-medium">{r.label}</span>
                </button>
              );
            })}
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-light mb-2">E-posta</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ornek@email.com"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-text-light placeholder:text-text-light/30 focus:outline-none focus:ring-2 focus:ring-accent-cyan focus:border-transparent transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-light mb-2">Şifre</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••"
                  className="w-full px-4 py-3 pr-12 rounded-xl bg-white/5 border border-white/10 text-text-light placeholder:text-text-light/30 focus:outline-none focus:ring-2 focus:ring-accent-cyan focus:border-transparent transition-all" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-light/40 hover:text-text-light transition-colors">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            {error && <p className="text-accent-rose text-sm text-center">{error}</p>}
            <button type="submit" disabled={loading}
              className="w-full px-6 py-3 bg-gradient-accent text-bg-darkest font-semibold rounded-full hover:shadow-glow-cyan transition-all duration-300 disabled:opacity-50 inline-flex items-center justify-center gap-2 border-none cursor-pointer">
              <LogIn className="w-5 h-5" />
              {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
            </button>
          </form>
          <div className="text-center text-xs text-text-light/30 space-y-1">
            <p>Demo giriş bilgileri:</p>
            <p>admin@duemwework.com / admin123</p>
            <p>coach@duemwework.com / admin123</p>
            <p>student@duemwework.com / admin123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
