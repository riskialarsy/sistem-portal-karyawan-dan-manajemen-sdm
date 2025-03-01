'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const checkAuthStatus = useCallback(async () => {
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    
    if (token && storedUsername) {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/user/`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setIsLoggedIn(true);
        setUsername(response.data.username);
      } catch (error) {
        handleLogout();
      }
    } else {
      handleLogout();
    }
    setIsLoading(false);
  }, []); // Dependencies kosong karena tidak menggunakan props atau state external

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const handleLogin = (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('username', user);
    setIsLoggedIn(true);
    setUsername(user);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    setUsername('');
  };

  return (
    <AuthContext.Provider value={{ 
      isLoggedIn, 
      username, 
      isLoading,
      handleLogin, 
      handleLogout,
      checkAuthStatus 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}