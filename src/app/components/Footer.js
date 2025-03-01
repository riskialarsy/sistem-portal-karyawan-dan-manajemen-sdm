export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-white via-green-50/30 to-emerald-50/30 dark:from-gray-900 dark:via-green-900/30 dark:to-emerald-900/30 shadow-lg p-4 sm:p-8 mt-auto relative">
      <div className="container mx-auto text-center">
        <p className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4 bg-gradient-to-r from-green-700 via-green-600 to-emerald-500 bg-clip-text text-transparent">&copy; 2025 Riski</p>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-4 sm:mb-6">Hak Cipta Dilindungi</p>
        <div className="flex justify-center space-x-2 sm:space-x-4 mb-4 sm:mb-6">
          {[
            { name: 'GitHub', url: 'https://github.com/riskialarsy' },
            { name: 'Facebook', url: 'https://web.facebook.com/riski.prana.739?locale=id_ID' }, 
            { name: 'Instagram', url: 'https://www.instagram.com/riski_al_arsy/' },
          ].map((social) => (
            <a 
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm sm:text-base text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-300 px-2 py-1 sm:px-3 sm:py-2 bg-white/80 dark:bg-gray-800/50 rounded-lg shadow-sm hover:shadow-md"
            >
              {social.name}
            </a>
          ))}
        </div>
        <div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 p-2 rounded-lg">
          <p>Dibuat menggunakan Next.js, Django, SQLite3 Database, dan Tailwind CSS</p>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-700 via-green-500 to-emerald-400"></div>
    </footer>
  );
}
