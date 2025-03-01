'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const { handleLogin } = useAuth();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/user/`);
          
          // Cek jika user datang dari halaman online test
          const returnUrl = localStorage.getItem('returnUrl');
          if (returnUrl && returnUrl.startsWith('/proyek/onlinetest')) {
            router.replace(returnUrl);
            localStorage.removeItem('returnUrl');
          }
        } catch (error) {
          localStorage.removeItem('token');
          localStorage.removeItem('username');
          delete axios.defaults.headers.common['Authorization'];
        }
      }
      setIsChecking(false);
    };

    checkAuth();
  }, [router]); // Tambahkan router sebagai dependency

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/token/`, {
        username,
        password
      });

      if (response.data.access) {
        const userResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/user/`, {
          headers: {
            'Authorization': `Bearer ${response.data.access}`
          }
        });
        
        handleLogin(response.data.access, userResponse.data.username);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
        
        const returnUrl = localStorage.getItem('returnUrl');
        if (returnUrl && returnUrl.startsWith('/proyek/onlinetest')) {
          router.replace(returnUrl);
          localStorage.removeItem('returnUrl');
        } else {
          router.replace('/proyek/onlinetest');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Username atau password salah. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  if (isChecking) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-700"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-green-50 to-white">
        <div className="w-full max-w-sm md:max-w-md bg-white rounded-lg shadow-md p-6 md:p-8 border border-green-100">
          <div>
            <h2 className="text-center text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-800 via-green-600 to-green-400 text-transparent bg-clip-text mt-[-9px]">
              Login ke Akun Anda
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block text-sm">{error}</span>
              </div>
            )}
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-green-800">Username</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-green-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="Masukkan username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-green-800">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-green-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  loading ? 'bg-gradient-to-r from-green-700 via-green-600 to-green-400 opacity-75 cursor-not-allowed' : 'bg-gradient-to-r from-green-800 via-green-600 to-green-400 hover:opacity-90 transition-opacity'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading...
                  </span>
                ) : (
                  'Login'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}