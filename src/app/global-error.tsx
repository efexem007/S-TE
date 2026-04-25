'use client';

import { useEffect } from 'react';
import { Home, RefreshCw, AlertTriangle } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console for debugging
    console.error('Global error:', error);
  }, [error]);

  return (
    <html>
      <body className="min-h-screen bg-bg-darkest flex items-center justify-center px-4 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-10 blur-[100px] pointer-events-none bg-accent-rose" />
        <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] rounded-full opacity-10 blur-[80px] pointer-events-none bg-accent-violet" />

        <div className="relative z-10 text-center max-w-lg">
          {/* Error Icon */}
          <div className="mb-8 flex justify-center">
            <div className="w-24 h-24 rounded-2xl glass flex items-center justify-center relative">
              <AlertTriangle className="w-12 h-12 text-accent-rose animate-pulse" />
              <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-yellow-400" />
            </div>
          </div>

          {/* Error Code */}
          <h1 className="text-7xl font-bold bg-gradient-to-r from-accent-rose to-accent-violet bg-clip-text text-transparent mb-4 tracking-tight">
            500
          </h1>

          {/* Title */}
          <h2 className="text-2xl font-semibold text-white mb-3">
            Bir Hata Oluştu
          </h2>

          {/* Description */}
          <p className="text-text-light/60 mb-8 leading-relaxed">
            Üzgünüz, bir şeyler yanlış gitti.
            <br />
            Sayfayı yenileyerek veya ana sayfaya dönerek tekrar deneyebilirsiniz.
          </p>

          {/* Error digest for support */}
          {error.digest && (
            <p className="text-text-light/30 text-xs mb-6 font-mono bg-white/5 rounded-lg px-3 py-2 inline-block">
              Hata Kodu: {error.digest}
            </p>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={reset}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-accent text-bg-darkest font-medium rounded-full hover:shadow-glow-cyan transition-all text-sm border-none cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              Sayfayı Yenile
            </button>
            <a
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 glass text-text-light font-medium rounded-full hover:bg-white/10 transition-all text-sm"
            >
              <Home className="w-4 h-4" />
              Ana Sayfa
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
