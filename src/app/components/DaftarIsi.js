'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DaftarIsi({ sections, onMobileItemClick }) {
  const [isTableOfContentsOpen, setIsTableOfContentsOpen] = useState(false);
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    // Mendengarkan event dari navbar
    const handleNavMenuChange = (e) => {
      setIsNavMenuOpen(e.detail.isOpen);
      if (e.detail.isOpen) {
        setIsTableOfContentsOpen(false);
      }
    };

    window.addEventListener('navMenuChange', handleNavMenuChange);
    return () => window.removeEventListener('navMenuChange', handleNavMenuChange);
  }, []);

  useEffect(() => {
    // Mendengarkan scroll untuk highlight section yang aktif
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      // Tambahkan offset untuk kompensasi sticky header
      const offset = 100;

      // Cari section yang sedang aktif
      const currentSection = sections.find(section => {
        const element = document.getElementById(section.id);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          return top <= offset && bottom > offset;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const handleItemClick = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Sesuaikan dengan tinggi header Anda
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }

    if (onMobileItemClick) {
      onMobileItemClick();
    }
    setIsTableOfContentsOpen(false);
  };

  const handleMobileClick = () => {
    setIsTableOfContentsOpen(false);
    if (onMobileItemClick) {
      onMobileItemClick();
    }
  };

  return (
    <>
      {/* Mobile Table of Contents Toggle */}
      <div className={`lg:hidden mb-2 ${isNavMenuOpen ? 'hidden' : ''}`}>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsTableOfContentsOpen(!isTableOfContentsOpen)}
          className="w-full bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-2 rounded-lg flex justify-between items-center text-xs shadow-md hover:shadow-lg transition-shadow duration-300 border border-green-100 dark:border-green-800"
        >
          <span className="font-montserrat font-medium text-green-800 dark:text-green-200">Daftar Isi</span>
          <motion.svg 
            animate={{ rotate: isTableOfContentsOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="w-3 h-3" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </motion.svg>
        </motion.button>
        
        <AnimatePresence>
          {isTableOfContentsOpen && !isNavMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="mt-1 bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-green-900/30 rounded-lg shadow-lg p-2 max-h-[70vh] overflow-y-auto border border-green-100 dark:border-green-800"
            >
              <nav className="flex flex-col gap-1 text-xs">
                {sections.map((section, index) => (
                  <motion.a
                    whileHover={{ x: 2 }}
                    key={section.id}
                    href={`#${section.id}`}
                    onClick={(e) => handleItemClick(e, section.id)}
                    className={`font-roboto text-green-700 dark:text-green-300 hover:text-emerald-600 dark:hover:text-emerald-400 py-1.5 px-2 rounded-md transition-colors duration-300 flex items-center gap-3
                      ${activeSection === section.id ? 'bg-green-50 dark:bg-green-900/20 text-emerald-700 dark:text-emerald-400' : 'hover:bg-green-50 dark:hover:bg-green-900/20'}`}
                  >
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 font-medium">
                      {index + 1}
                    </span>
                    {section.title}
                  </motion.a>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop Table of Contents */}
      <div className="hidden lg:block">
        <div className="sticky top-24">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-green-900/30 rounded-2xl shadow-lg p-6 max-h-[calc(100vh-96px)] overflow-y-auto border border-green-100 dark:border-green-800"
          >
            <div className="relative">
              <h2 className="text-xl font-playfair font-bold mb-4 text-gray-900 dark:text-white">
                <span className="bg-gradient-to-r from-green-600 via-green-700 to-emerald-600 text-transparent bg-clip-text">
                  Daftar Isi
                </span>
              </h2>
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-green-500/10 dark:bg-green-400/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-emerald-500/10 dark:bg-emerald-400/10 rounded-full blur-xl"></div>
              <nav className="relative mt-4 flex flex-col gap-2">
                {sections.map((section, index) => (
                  <motion.a
                    whileHover={{ x: 4 }}
                    key={section.id}
                    href={`#${section.id}`}
                    onClick={(e) => handleItemClick(e, section.id)}
                    className={`font-roboto text-green-700 dark:text-green-300 hover:text-emerald-600 dark:hover:text-emerald-400 text-sm py-2 px-3 rounded-lg transition-all duration-300 flex items-center gap-3
                      ${activeSection === section.id ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 text-emerald-700 dark:text-emerald-400' : 'hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 dark:hover:from-green-900/20 dark:hover:to-emerald-900/20'}`}
                  >
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 font-medium">
                      {index + 1}
                    </span>
                    {section.title}
                  </motion.a>
                ))}
              </nav>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
