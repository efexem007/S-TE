'use client';

import { useEffect } from 'react';
import { Home, RefreshCw, Bug } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Segment error:', error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 rounded-2xl glass flex items-center justify-center">
            <Bug className="w-10 h-10 text-accent-rose animate-bounce" />
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-white mb-2">
          Bir Şeyler Yanlış Gitti
        </h2>
        <p className="text-text-light/60 mb-6 text-sm">
          Bu sayfayı yüklerken bir sorun oluştu. Tekrar denemek için aşağıdaki butonu kullanabilirsiniz.
        </p>

        {error.digest && (
          <p className="text-text-light/30 text-xs mb-4 font-mono bg-white/5 rounded-lg px-3 py-2 inline-block">
            Hata Kodu: {error.digest}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-accent text-bg-darkest font-medium rounded-full hover:shadow-glow-cyan transition-all text-sm border-none cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            Tekrar Dene
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 glass text-text-light font-medium rounded-full hover:bg-white/10 transition-all text-sm"
          >
            <Home className="w-4 h-4" />
            Ana Sayfa
          </a>
        </div>
      </div>
    </div>
  );
}
