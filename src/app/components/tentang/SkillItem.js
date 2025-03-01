'use client';

export default function SkillItem({ skill, onClick }) {
  return (
    <div
      className="bg-white/80 backdrop-blur-sm rounded-lg p-2 xs:p-3 sm:p-4 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-blue-100/50 relative overflow-hidden group"
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-blue-400/30 to-cyan-100/30 animate-pulse"></div>
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-cyan-500 blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
      <div className="flex flex-col items-center justify-center h-full space-y-1 sm:space-y-2 relative">
        <span className="text-sm sm:text-base font-medium text-center bg-gradient-to-r from-blue-500 via-blue-600 to-cyan-500 bg-clip-text text-transparent group-hover:from-blue-400 group-hover:via-blue-500 group-hover:to-cyan-500 transition-all duration-300">
          {skill}
        </span>
        <div className="w-12 sm:w-16 h-0.5 bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-500"></div>
        <span className="text-[10px] xs:text-xs text-blue-600/70 group-hover:text-cyan-500/70 transition-colors duration-300">
          Klik untuk melihat proyek
        </span>
      </div>
    </div>
  );
}