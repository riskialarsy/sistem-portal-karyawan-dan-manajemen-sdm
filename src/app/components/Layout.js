"use client";

import { useAuth } from '../hooks/useAuth';
import Navbar from './Navbar';
import Footer from './Footer';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function Layout({ children }) {
  const { user } = useAuth();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1 bg-green-700 origin-left z-50"
      />
      <main className="flex-grow pt-16 container mx-auto px-0">
        {children}
        {user?.isAdmin && (
          <motion.a 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0px 0px 8px rgb(34, 197, 94)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
            href="/admin"
            className="fixed bottom-4 right-4 px-6 py-2 bg-gradient-to-r from-green-700 via-green-600 to-green-500 text-white rounded-full hover:opacity-90"
            target="_blank"
            rel="noopener noreferrer"
          >
            Admin Panel
          </motion.a>
        )}
      </main>
      <Footer />
    </div>
  );
}

