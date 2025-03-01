'use client';

import Layout from './components/Layout';
import { motion } from 'framer-motion';
import PageHeader from './components/PageHeader';
import { useState, useEffect } from 'react';
import CurrentTime from './components/CurrentTime';
import SectionTitle from './components/tentang/SectionTitle';
import AboutText from './components/tentang/AboutText';
import { dashboardData, shiftData } from './data/dummyData';
import Link from 'next/link';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
            title={<span className="text-xl sm:text-2xl md:text-3xl bg-gradient-to-r from-green-900 via-green-700 to-green-500 text-transparent bg-clip-text">Portal SDM Kebun Kelapa Sawit</span>}
            description="Sistem Manajemen Karyawan dan Produktivitas Perkebunan" 
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-900 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-semibold text-green-900 mb-4">Kehadiran Hari Ini</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Total Karyawan:</span>
                  <span className="font-bold">{dashboardData.totalKaryawan}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Hadir:</span>
                  <span className="font-bold">{dashboardData.hadir}</span>
                </div>
                <div className="flex justify-between text-green-700">
                  <span>Cuti:</span>
                  <span className="font-bold">{dashboardData.cuti}</span>
                </div>
                <div className="flex justify-between text-red-500">
                  <span>Sakit:</span>
                  <span className="font-bold">{dashboardData.sakit}</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-600 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-semibold text-green-900 mb-4">Produktivitas</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Progress Hari Ini</span>
                    <span className="font-bold">{dashboardData.produktivitasHarian}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div className="bg-gradient-to-r from-green-800 to-green-400 h-2.5 rounded-full" style={{ width: `${dashboardData.produktivitasHarian}%` }}></div>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  Target: {dashboardData.targetHarian}%
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-semibold text-green-900 mb-4">Pencatatan Kehadiran</h3>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  Catat kehadiran karyawan dengan verifikasi geolokasi untuk memastikan keberadaan di lokasi kerja yang tepat.
                </p>
                <Link 
                  href="/kehadiran"
                  className="inline-block mt-2 px-4 py-2 bg-green-100 text-green-800 rounded-md hover:bg-green-200 text-sm"
                >
                  Catat Kehadiran
                </Link>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-700 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-semibold text-green-900 mb-4">Shift Kerja Hari Ini</h3>
              <div className="space-y-3">
                {shiftData.map((shift, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-green-50 rounded-lg border border-green-100">
                    <div>
                      <div className="font-medium text-green-800">{shift.nama}</div>
                      <div className="text-sm text-gray-600">{shift.waktu}</div>
                    </div>
                    <div className="text-green-600 font-bold">
                      {shift.jumlahKaryawan}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 bg-gradient-to-br from-white to-green-50 p-6 rounded-xl shadow-sm"
          >
            <SectionTitle>Tentang Portal SDM Kebun Kelapa Sawit</SectionTitle>
            <AboutText />
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  );
}
