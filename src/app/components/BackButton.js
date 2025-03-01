'use client';

import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function BackButton() {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-1.5 md:gap-2 px-2.5 md:px-3.5 py-1 md:py-1.5 text-xs md:text-sm bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-500 text-white rounded-lg shadow-sm hover:opacity-90 transition-all duration-300 ease-in-out"
      >
        <FaArrowLeft className="text-[10px] md:text-xs" />
        <span className="font-medium text-justify">
          <span className="hidden md:inline">Kembali</span>
          <span className="inline md:hidden">Kembali</span>
        </span>
      </button>
    </motion.div>
  );
}
