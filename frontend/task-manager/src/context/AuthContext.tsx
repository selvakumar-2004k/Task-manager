import { createContext, useState, useEffect, type ReactNode } from 'react';
import axios from 'axios';
import type { User } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>; // Added this
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response =  await axios.post(`${API_URL}/api/users/login`, { email, password });
      const data = response.data;
      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);
    } catch (error) {
      console.error('Login failed');
      throw error;
    }
  };

  // Added this function to handle registration
  const register = async (name: string, email: string, password: string) => {
    try {
      const response =await axios.post(`${API_URL}/api/users/register`, { name, email, password });
      const data = response.data;
      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);
    } catch (error) {
      console.error('Registration failed');
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    // Make sure to add 'register' to the value object here
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};