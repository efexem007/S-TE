'use client';

import Link from 'next/link';
import { Home, ArrowLeft, Search, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg-darkest flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full opacity-10 blur-[100px] pointer-events-none bg-accent-cyan" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full opacity-10 blur-[80px] pointer-events-none bg-accent-violet" />

      <div className="relative z-10 text-center max-w-lg">
        {/* 404 Icon */}
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 rounded-2xl glass flex items-center justify-center relative">
            <Compass className="w-12 h-12 text-accent-cyan animate-pulse" />
            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent-rose" />
          </div>
        </div>

        {/* Error Code */}
        <h1 className="text-8xl font-bold bg-gradient-accent bg-clip-text text-transparent mb-4 tracking-tight">
          404
        </h1>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-white mb-3">
          Sayfa Bulunamadı
        </h2>

        {/* Description */}
        <p className="text-text-light/60 mb-8 leading-relaxed">
          Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir.
          <br />
          Ana sayfaya dönerek yolculuğunuza devam edebilirsiniz.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-accent text-bg-darkest font-medium rounded-full hover:shadow-glow-cyan transition-all text-sm"
          >
            <Home className="w-4 h-4" />
            Ana Sayfa
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 glass text-text-light font-medium rounded-full hover:bg-white/10 transition-all text-sm border-none cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Geri Dön
          </button>
        </div>

        {/* Search hint */}
        <div className="mt-10 pt-8 border-t border-white/5">
          <div className="flex items-center justify-center gap-2 text-text-light/40 text-sm">
            <Search className="w-4 h-4" />
            <span>Yanlış bir bağlantı mı gördünüz? Bize bildirin.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
