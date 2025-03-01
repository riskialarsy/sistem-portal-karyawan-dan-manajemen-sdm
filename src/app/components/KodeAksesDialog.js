import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLock } from 'react-icons/fa';

export default function KodeAksesDialog({ onSubmit, onCancel, error: externalError }) {
  const [kodeAkses, setKodeAkses] = useState('');
  const [internalError, setInternalError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setInternalError(''); // Reset error internal
    
    if (!kodeAkses.trim()) {
      setInternalError('Kode akses wajib diisi');
      return;
    }
    onSubmit(kodeAkses);
  };

  // Gunakan error dari props jika ada, jika tidak gunakan error internal
  const displayError = externalError || internalError;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", duration: 0.3 }}
        className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-sm"
      >
        <div className="flex items-center gap-2 mb-4">
          <FaLock className="text-blue-500 text-lg" />
          <h2 className="text-base sm:text-lg font-bold">Masukkan Kode Akses</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <motion.input
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            type="text"
            value={kodeAkses}
            onChange={(e) => {
              setKodeAkses(e.target.value);
              setInternalError(''); // Reset error saat user mengetik
            }}
            placeholder="Masukkan kode akses"
            className="w-full px-3 py-2 text-sm sm:text-base border rounded-lg mb-2"
            autoFocus
          />
          {displayError && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-xs sm:text-sm mb-2"
            >
              {displayError}
            </motion.p>
          )}
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex justify-end gap-2"
          >
            <button
              type="button"
              onClick={onCancel}
              className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-500 text-white rounded-lg hover:opacity-90"
            >
              Mulai Ujian
            </button>
          </motion.div>
        </form>
      </motion.div>
    </motion.div>
  );
}