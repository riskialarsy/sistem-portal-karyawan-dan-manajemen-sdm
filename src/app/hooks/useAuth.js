import { useState, useEffect } from 'react';
import axios from 'axios';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setIsLoading(false);
        setUser(null);
        return;
      }

      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/user/`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUser(response.data);
        localStorage.setItem('username', response.data.username);
      } catch (error) {
        console.error('Error fetching user:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const checkAuth = async () => {
    // Cek jika path saat ini memerlukan autentikasi
    const requiresAuth = window.location.pathname.startsWith('/proyek/onlinetest');
    
    // Jika tidak memerlukan auth atau sudah di halaman login, return null
    if (!requiresAuth || window.location.pathname === '/login') {
      return null;
    }

    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/user`, {
        withCredentials: true
      });
      
      if (!response.data) {
        // Redirect ke login hanya jika bukan di halaman login
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
        return null;
      }
      
      return response.data;
    } catch (error) {
      console.error('Error checking auth:', error);
      // Redirect ke login hanya jika bukan di halaman login
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
      return null;
    }
  };

  return { user, isLoading, checkAuth };
}
