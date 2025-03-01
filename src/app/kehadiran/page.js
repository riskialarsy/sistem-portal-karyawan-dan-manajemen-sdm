'use client';

import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import PageHeader from '../components/PageHeader';
import { motion } from 'framer-motion';
import { karyawanData } from '../data/dummyData';
import CurrentTime from '../components/CurrentTime';
import KehadiranTable from '../components/KehadiranTable';

export default function Kehadiran() {
  const [mounted, setMounted] = useState(false);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [selectedKaryawan, setSelectedKaryawan] = useState('');
  const [status, setStatus] = useState('Hadir');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  const getLocation = () => {
    setError(null);
    
    if (!navigator.geolocation) {
      setError('Geolokasi tidak didukung oleh browser Anda');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy
        });
      },
      (error) => {
        let errorMessage = 'Tidak dapat mengakses lokasi Anda';
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Izin akses lokasi ditolak';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Informasi lokasi tidak tersedia';
            break;
          case error.TIMEOUT:
            errorMessage = 'Waktu permintaan lokasi habis';
            break;
        }
        setError(errorMessage);
      },
      { enableHighAccuracy: true }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!selectedKaryawan) {
      setError('Silakan pilih karyawan');
      return;
    }

    if (!location) {
      setError('Lokasi belum terdeteksi. Silakan klik tombol &quot;Dapatkan Lokasi&quot;');
      return;
    }

    setIsSubmitting(true);

    // Simulasi pengiriman data ke server
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage(`Kehadiran ${selectedKaryawan} berhasil dicatat!`);
      
      // Reset form setelah berhasil
      setSelectedKaryawan('');
      setStatus('Hadir');
      setLocation(null);
      
      // Hilangkan pesan sukses setelah 3 detik
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }, 1500);
  };

  return (
    <Layout>
      <div className="min-h-screen flex flex-col bg-white">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }} 
          className="container mx-auto px-3 py-4 sm:px-4 sm:py-8"
        >
          {mounted && <CurrentTime mounted={mounted} />}

          <PageHeader 
            title="Pencatatan Kehadiran" 
            description="Catat kehadiran karyawan dengan verifikasi geolokasi" 
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-700 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-semibold text-green-900 mb-4">Form Pencatatan Kehadiran</h3>
              
              {successMessage && (
                <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg border border-green-200">
                  {successMessage}
                </div>
              )}
              
              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg border border-red-200">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="karyawan" className="block text-sm font-medium text-green-800 mb-1">
                    Pilih Karyawan
                  </label>
                  <select
                    id="karyawan"
                    value={selectedKaryawan}
                    onChange={(e) => setSelectedKaryawan(e.target.value)}
                    className="w-full px-3 py-2 border border-green-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    required
                  >
                    <option value="">-- Pilih Karyawan --</option>
                    {karyawanData.map((karyawan) => (
                      <option key={karyawan.id} value={karyawan.nama}>
                        {karyawan.nama} - {karyawan.posisi}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-green-800 mb-1">
                    Status Kehadiran
                  </label>
                  <select
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-green-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="Hadir">Hadir</option>
                    <option value="Sakit">Sakit</option>
                    <option value="Izin">Izin</option>
                    <option value="Cuti">Cuti</option>
                  </select>
                </div>
                
                <div>
                  <button
                    type="button"
                    onClick={getLocation}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Dapatkan Lokasi
                  </button>
                </div>
                
                <div className="mt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full px-4 py-2 bg-gradient-to-r from-green-700 via-green-600 to-green-500 text-white rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? 'Memproses...' : 'Catat Kehadiran'}
                  </button>
                </div>
              </form>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-600 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-semibold text-green-900 mb-4">Informasi Lokasi</h3>
              
              {location ? (
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm text-gray-600">Latitude:</div>
                      <div className="text-sm font-medium text-gray-800">{location.latitude.toFixed(6)}</div>
                      
                      <div className="text-sm text-gray-600">Longitude:</div>
                      <div className="text-sm font-medium text-gray-800">{location.longitude.toFixed(6)}</div>
                      
                      <div className="text-sm text-gray-600">Akurasi:</div>
                      <div className="text-sm font-medium text-gray-800">{location.accuracy.toFixed(2)} meter</div>
                    </div>
                  </div>
                  
                  <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                    <iframe
                      title="Lokasi Anda"
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      src={`https://maps.google.com/maps?q=${location.latitude},${location.longitude}&z=15&output=embed`}
                      allowFullScreen
                    ></iframe>
                  </div>
                  
                  <div className="text-xs text-gray-500 italic">
                    Lokasi yang ditampilkan adalah perkiraan dan mungkin memiliki margin error sesuai dengan akurasi yang ditunjukkan.
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-gray-600 text-center">
                    Klik tombol &quot;Dapatkan Lokasi&quot; untuk menampilkan lokasi Anda saat ini
                  </p>
                </div>
              )}
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 bg-white p-6 rounded-xl shadow-md"
          >
            <h3 className="text-lg font-semibold text-green-900 mb-4">Riwayat Kehadiran Hari Ini</h3>
            
            <KehadiranTable />
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  );
}
