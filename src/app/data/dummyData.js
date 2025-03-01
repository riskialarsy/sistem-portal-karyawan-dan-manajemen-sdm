export const dashboardData = {
    totalKaryawan: 150,
    hadir: 142,
    cuti: 5,
    sakit: 3,
    produktivitasHarian: 85.5,
    targetHarian: 90
  };
  
  export const shiftData = [
    { nama: 'Pagi', waktu: '06:00 - 14:00', jumlahKaryawan: 50 },
    { nama: 'Siang', waktu: '14:00 - 22:00', jumlahKaryawan: 45 },
    { nama: 'Malam', waktu: '22:00 - 06:00', jumlahKaryawan: 47 }
  ];
  
  export const karyawanData = [
    {
      id: 1,
      nama: 'Ahmad Subarjo',
      posisi: 'Pemanen',
      status: 'Hadir',
      lokasi: 'Blok A-12',
      produktivitas: 85,
      jamKerja: '06:00 - 14:00'
    },
    {
      id: 2,
      nama: 'Siti Aminah',
      posisi: 'Mandor',
      status: 'Hadir',
      lokasi: 'Blok B-08',
      produktivitas: 90,
      jamKerja: '06:00 - 14:00'
    },
    {
      id: 3,
      nama: 'Budi Santoso',
      posisi: 'Pemanen',
      status: 'Sakit',
      lokasi: 'Blok A-15',
      produktivitas: 0,
      jamKerja: '06:00 - 14:00'
    }
  ];
  
  // Menambahkan data kehadiran
  export const kehadiranData = [
    {
      id: 1,
      karyawanId: 1,
      tanggal: '2025-06-01',
      waktu: '06:15',
      status: 'Hadir',
      lokasi: {
        nama: 'Blok A-12',
        latitude: -1.2345,
        longitude: 116.8765,
        accuracy: 15.4
      }
    },
    {
      id: 2,
      karyawanId: 2,
      tanggal: '2025-06-01',
      waktu: '06:05',
      status: 'Hadir',
      lokasi: {
        nama: 'Blok B-08',
        latitude: -1.2355,
        longitude: 116.8775,
        accuracy: 12.8
      }
    },
    {
      id: 3,
      karyawanId: 3,
      tanggal: '2025-06-01',
      waktu: '00:00',
      status: 'Sakit',
      lokasi: null
    }
  ];
  
  // Tambahkan data lokasi kebun
  export const lokasiKebunData = [
    {
      id: 1,
      nama: 'Blok A-12',
      latitude: -1.2345,
      longitude: 116.8765,
      luasHektar: 12.5,
      jenisTanaman: 'Kelapa Sawit',
      tahunTanam: 2018
    },
    {
      id: 2,
      nama: 'Blok B-08',
      latitude: -1.2355,
      longitude: 116.8775,
      luasHektar: 10.2,
      jenisTanaman: 'Kelapa Sawit',
      tahunTanam: 2019
    },
    {
      id: 3,
      nama: 'Blok A-15',
      latitude: -1.2335,
      longitude: 116.8755,
      luasHektar: 11.8,
      jenisTanaman: 'Kelapa Sawit',
      tahunTanam: 2017
    }
  ];