'use client';

import { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Çerez bildirimi"
      className="fixed bottom-0 left-0 right-0 z-50 bg-bg-darkest text-text-light p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl"
    >
      <p className="text-sm text-text-secondary">
        Bu site, deneyiminizi iyileştirmek için çerezler kullanır.
        <a href="/gizlilik" className="underline ml-1 text-accent-teal hover:opacity-80">
          Gizlilik Politikası
        </a>
      </p>
      <div className="flex gap-3 shrink-0">
        <button
          onClick={() => { localStorage.setItem('cookie-consent', 'declined'); setVisible(false); }}
          className="px-4 py-2 text-sm border border-text-secondary rounded-md hover:border-text-light transition-colors"
        >
          Reddet
        </button>
        <button
          onClick={accept}
          className="px-4 py-2 text-sm bg-accent-teal text-white rounded-md hover:opacity-90 transition-opacity"
        >
          Kabul et
        </button>
      </div>
    </div>
  );
}
