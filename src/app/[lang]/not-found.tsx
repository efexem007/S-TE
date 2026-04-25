import Link from 'next/link';
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg-dark text-text-light gap-6">
      <h1 className="font-display text-hero">404</h1>
      <p className="text-text-secondary">Bu sayfa bulunamadı.</p>
      <Link href="/" className="px-6 py-3 bg-accent-teal text-white rounded-lg hover:opacity-90 transition-opacity">
        Ana sayfaya dön
      </Link>
    </div>
  );
}
