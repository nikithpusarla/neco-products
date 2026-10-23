'use client';

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 pt-32 pb-20">
      <h1 className="font-serif text-4xl md:text-5xl text-cream mb-4">Something went wrong.</h1>
      <p className="text-cream/60 max-w-md mb-8">An unexpected error occurred. Please try again.</p>
      <button onClick={reset} className="px-6 py-3 rounded-full bg-gold text-black text-sm font-medium">
        Try again
      </button>
    </main>
  );
}
