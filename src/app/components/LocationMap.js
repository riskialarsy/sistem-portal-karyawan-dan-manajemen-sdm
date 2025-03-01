'use client';

import { useEffect, useRef } from 'react';

export default function LocationMap({ latitude, longitude, accuracy, height = '300px' }) {
  const mapRef = useRef(null);
  
  useEffect(() => {
    // Fungsi ini akan dijalankan ketika komponen di-mount
    // Dalam implementasi nyata, Anda bisa menggunakan library seperti Leaflet atau Google Maps API
    
    // Untuk sementara, kita gunakan iframe Google Maps
    if (mapRef.current && latitude && longitude) {
      const iframe = document.createElement('iframe');
      iframe.src = `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;
      iframe.width = '100%';
      iframe.height = '100%';
      iframe.frameBorder = '0';
      iframe.allowFullscreen = true;
      
      // Hapus konten sebelumnya dan tambahkan iframe
      mapRef.current.innerHTML = '';
      mapRef.current.appendChild(iframe);
    }
  }, [latitude, longitude]);
  
  return (
    <div 
      ref={mapRef} 
      className="rounded-lg overflow-hidden" 
      style={{ height }}
    >
      {(!latitude || !longitude) && (
        <div className="flex items-center justify-center h-full bg-gray-100 text-gray-500">
          Lokasi tidak tersedia
        </div>
      )}
    </div>
  );
}