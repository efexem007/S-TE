'use client';
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg-dark text-text-light gap-6">
      <h2 className="font-display text-3xl">Bir şeyler yanlış gitti</h2>
      <button
        onClick={reset}
        className="px-6 py-3 bg-accent-terra text-white rounded-lg hover:opacity-90 transition-opacity"
      >
        Tekrar dene
      </button>
    </div>
  );
}
