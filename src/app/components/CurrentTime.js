'use client';

export default function CurrentTime({ mounted }) {
  return (
    <div className="mt-2 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-green-700 via-green-600 to-green-500 opacity-10 animate-pulse"></div>
      <div className="absolute -inset-1 bg-gradient-to-r from-green-700 via-green-600 to-green-400 blur-xl opacity-20 animate-pulse"></div>
      <p className="relative px-3 py-1.5 text-xs sm:text-sm bg-white/90 backdrop-blur-sm rounded-lg border border-green-100/50 shadow-lg text-justify">
        <span className="font-medium bg-gradient-to-r from-green-800 via-green-700 to-green-500 bg-clip-text text-transparent text-[10px] sm:text-xs">⌚ Waktu Sekarang:</span>
        <span className="ml-1 sm:ml-2 font-mono text-green-700 text-[10px] sm:text-xs">
          {mounted ? new Date().toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }) : ''}
        </span>
      </p>
    </div>
  );
}