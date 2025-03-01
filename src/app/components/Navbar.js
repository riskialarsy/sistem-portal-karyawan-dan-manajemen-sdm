import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, username, handleLogout } = useAuth();
  const router = useRouter();

  const onLogout = () => {
    handleLogout();
    router.push('/login');
  };

  return (
    <nav className="bg-white shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-semibold tracking-tight hover:scale-105 transition-transform duration-300 ease-in-out">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-700 via-green-600 to-green-400">
              PT. Abcde Fghij
            </span>
          </Link>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {[
              { href: "/", label: "Home" },
              { href: "/kehadiran", label: "Kehadiran" }
            ].map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className="px-4 py-2 text-gray-600 hover:text-green-600 text-sm font-medium transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
            
            {/* Informasi User dan Tombol Login/Logout */}
            <div className="flex items-center space-x-3 min-w-[150px] justify-end">
              {isLoggedIn ? (
                <div className="flex items-center space-x-3">
                  <span className="text-gray-700 text-sm">
                    Hi, <span className="font-medium bg-gradient-to-r from-green-700 via-green-600 to-green-400 text-transparent bg-clip-text">{username || 'Pengguna'}</span>
                  </span>
                  <button
                    onClick={onLogout}
                    className="px-4 py-2 bg-gradient-to-r from-red-400 via-red-500 to-red-600 text-white rounded-full text-sm font-medium hover:opacity-90 transition-opacity duration-300"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="px-4 py-2 bg-gradient-to-r from-green-700 via-green-600 to-green-400 text-white rounded-full text-sm font-medium hover:opacity-90 transition-opacity duration-300"
                >
                  Login
                </Link>
              )}
            </div>
          </div>

          {/* Hamburger Menu untuk Mobile */}
          <button 
            className="md:hidden text-gray-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Menu Mobile */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden mt-4 space-y-2`}>
          {isLoggedIn && (
            <div className="px-4 py-2 text-gray-700 border-b border-gray-200">
              Hi, <span className="font-medium bg-gradient-to-r from-green-700 via-green-600 to-green-400 text-transparent bg-clip-text">{username || 'Pengguna'}</span>
            </div>
          )}
          
          {[
            { href: "/", label: "Home" },
            { href: "/kehadiran", label: "Kehadiran" }
          ].map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className="block px-4 py-2 text-gray-600 hover:text-green-600 text-sm font-medium transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          
          {/* Tombol Login/Logout Mobile */}
          {isLoggedIn ? (
            <button
              onClick={onLogout}
              className="block w-full text-left px-4 py-2 bg-gradient-to-r from-red-400 via-red-500 to-red-600 text-white text-sm font-medium hover:opacity-90 transition-opacity duration-300 rounded-full"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="block px-4 py-2 bg-gradient-to-r from-green-700 via-green-600 to-green-400 text-white text-sm font-medium hover:opacity-90 transition-opacity duration-300 rounded-full"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

