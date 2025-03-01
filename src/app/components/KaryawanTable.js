'use client';

import { motion } from 'framer-motion';
import { karyawanData } from '../data/dummyData';

export default function KaryawanTable() {
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
              Nama
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">
              Posisi
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">
              Lokasi
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">
              Produktivitas
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {karyawanData.map((karyawan) => (
            <tr key={karyawan.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {karyawan.nama}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {karyawan.posisi}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  karyawan.status === 'Hadir' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {karyawan.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {karyawan.lokasi}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {karyawan.produktivitas}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}