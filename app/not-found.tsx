import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 pt-32 pb-20">
      <p className="text-gold tracking-[0.3em] text-xs mb-4">404</p>
      <h1 className="font-serif text-4xl md:text-6xl text-cream mb-4">This leaf has fallen elsewhere.</h1>
      <p className="text-cream/60 max-w-md mb-8">The page you are looking for does not exist or has moved.</p>
      <Link href="/" className="px-6 py-3 rounded-full bg-gold text-black text-sm font-medium">
        Back to home
      </Link>
    </main>
  );
}
