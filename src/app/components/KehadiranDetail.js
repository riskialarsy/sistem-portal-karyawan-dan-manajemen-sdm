'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Layout from '../../../components/Layout';
import PageHeader from '../../../components/PageHeader';
import { motion } from 'framer-motion';
import { kehadiranData, karyawanData } from '../../../data/dummyData';
import LocationMap from '../../../components/LocationMap';
import Link from 'next/link';

export default function KehadiranDetail() {
  const params = useParams();
  const [kehadiran, setKehadiran] = useState(null);
  const [karyawan, setKaryawan] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulasi pengambilan data dari API
    const id = parseInt(params.id);
    const kehadiranItem = kehadiranData.find(k => k.id === id);
    
    if (kehadiranItem) {
      const karyawanItem = karyawanData.find(k => k.id === kehadiranItem.karyawanId);
      setKehadiran(kehadiranItem);
      setKaryawan(karyawanItem);
    }
    
    setLoading(false);
  }, [params.id]);
  
  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-700"></div>
        </div>
      </Layout>
    );
  }
  
  if (!kehadiran || !karyawan) {
    return (
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Data tidak ditemukan</h1>
          <p className="text-gray-600 mb-6">Maaf, data kehadiran yang Anda cari tidak ditemukan.</p>
          <Link 
            href="/kehadiran"
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Kembali ke Daftar Kehadiran
          </Link>
        </div>
      </Layout>
    );
  }
  
  // Format tanggal
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
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
          <PageHeader 
            title={`Detail Kehadiran - ${karyawan.nama}`}
            description={`Informasi kehadiran pada ${formatDate(kehadiran.tanggal)}`}
          />
          
          <div className="mt-8">
            <Link 
              href="/kehadiran"
              className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-md hover:bg-green-200 mb-6"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Kembali ke Daftar Kehadiran
            </Link>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-700 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg font-semibold text-green-900 mb-4">Informasi Karyawan</h3>
                
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-sm text-gray-600">Nama:</div>
                    <div className="text-sm font-medium text-gray-800">{karyawan.nama}</div>
                    
                    <div className="text-sm text-gray-600">Posisi:</div>
                    <div className="text-sm font-medium text-gray-800">{karyawan.posisi}</div>
                    
                    <div className="text-sm text-gray-600">Jam Kerja:</div>
                    <div className="text-sm font-medium text-gray-800">{karyawan.jamKerja}</div>
                    
                    <div className="text-sm text-gray-600">Produktivitas:</div>
                    <div className="text-sm font-medium text-gray-800">{karyawan.produktivitas}%</div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-600 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg font-semibold text-green-900 mb-4">Detail Kehadiran</h3>
                
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-sm text-gray-600">Tanggal:</div>
                    <div className="text-sm font-medium text-gray-800">{formatDate(kehadiran.tanggal)}</div>
                    
                    <div className="text-sm text-gray-600">Waktu:</div>
                    <div className="text-sm font-medium text-gray-800">{kehadiran.waktu}</div>
                    
                    <div className="text-sm text-gray-600">Status:</div>
                    <div className="text-sm font-medium">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        kehadiran.status === 'Hadir' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {kehadiran.status}
                      </span>
                    </div>
                    
                    <div className="text-sm text-gray-600">Lokasi:</div>
                    <div className="text-sm font-medium text-gray-800">
                      {kehadiran.lokasi ? kehadiran.lokasi.nama : '-'}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {kehadiran.lokasi && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-6 bg-white p-6 rounded-xl shadow-md"
              >
                <h3 className="text-lg font-semibold text-green-900 mb-4">Lokasi Kehadiran</h3>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="text-sm text-gray-600">Latitude:</div>
                      <div className="text-sm font-medium text-gray-800">{kehadiran.lokasi.latitude.toFixed(6)}</div>
                    </div>
                    
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="text-sm text-gray-600">Longitude:</div>
                      <div className="text-sm font-medium text-gray-800">{kehadiran.lokasi.longitude.toFixed(6)}</div>
                    </div>
                    
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="text-sm text-gray-600">Akurasi:</div>
                      <div className="text-sm font-medium text-gray-800">{kehadiran.lokasi.accuracy.toFixed(2)} meter</div>
                    </div>
                  </div>
                  
                  <div className="aspect-video bg-gray-100 rounded-lg">
                    <LocationMap 
                      latitude={kehadiran.lokasi.latitude} 
                      longitude={kehadiran.lokasi.longitude} 
                      accuracy={kehadiran.lokasi.accuracy}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}

