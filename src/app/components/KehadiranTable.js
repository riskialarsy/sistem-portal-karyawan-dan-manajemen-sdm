'use client';

import { motion } from 'framer-motion';
import { kehadiranData, karyawanData } from '../data/dummyData';

export default function KehadiranTable() {
  // Fungsi untuk mendapatkan nama karyawan berdasarkan ID
  const getKaryawanName = (id) => {
    const karyawan = karyawanData.find(k => k.id === id);
    return karyawan ? karyawan.nama : 'Tidak diketahui';
  };
  
  // Fungsi untuk mendapatkan posisi karyawan berdasarkan ID
  const getKaryawanPosition = (id) => {
    const karyawan = karyawanData.find(k => k.id === id);
    return karyawan ? karyawan.posisi : 'Tidak diketahui';
  };
  
  // Fungsi untuk memformat tanggal
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="overflow-x-auto bg-white rounded-xl shadow-md"
    >
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-green-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">
              Tanggal
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">
              Nama
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">
              Posisi
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">
              Waktu
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">
              Lokasi
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {kehadiranData.map((kehadiran) => (
            <tr key={kehadiran.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {formatDate(kehadiran.tanggal)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {getKaryawanName(kehadiran.karyawanId)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {getKaryawanPosition(kehadiran.karyawanId)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  kehadiran.status === 'Hadir' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {kehadiran.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {kehadiran.waktu}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {kehadiran.lokasi ? kehadiran.lokasi.nama : '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}