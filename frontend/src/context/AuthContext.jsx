import { createContext, useState, useEffect, useContext } from 'react';
import * as authService from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const userData = await authService.getMe();
          if (!cancelled) setUser(userData);
        } catch {
          localStorage.removeItem('token');
        }
      }
      if (!cancelled) setLoading(false);
    };

    void run();

    return () => {
      cancelled = true;
    };
  }, []);

  const login = async (googleToken) => {
    const data = await authService.googleLogin(googleToken);
    const { token, user } = data || {};
    if (!token || !user) {
      throw new Error('Invalid response from server (missing token or user).');
    }
    localStorage.setItem('token', token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  /** Replace context user with a document returned from the API (e.g. after PATCH /auth/me). */
  const applyServerUser = (userData) => {
    setUser(userData);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, applyServerUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
