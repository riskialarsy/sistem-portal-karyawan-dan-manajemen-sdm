import './globals.css';
import { AuthProvider } from './context/AuthContext';

export const metadata = {
  title: {
    template: '%s | Portal SDM Kebun Sawit',
    default: 'Portal SDM Kebun Sawit - Sistem Manajemen Karyawan'
  },
  description: 'Sistem manajemen terpadu untuk pengelolaan sumber daya manusia di perkebunan kelapa sawit',
  keywords: ['SDM', 'kelapa sawit', 'manajemen karyawan', 'perkebunan', 'produktivitas'],
  authors: [{ name: 'Portal SDM Kebun Sawit' }],
  creator: 'Portal SDM Kebun Sawit',
  metadataBase: new URL('https://portalsawit.vercel.app/'),
  openGraph: {
    title: 'Portal SDM Kebun Sawit',
    description: 'Sistem manajemen terpadu untuk pengelolaan sumber daya manusia di perkebunan kelapa sawit',
    url: 'https://portalsawit.vercel.app/',
    siteName: 'Portal SDM Kebun Sawit',
    locale: 'id_ID',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
