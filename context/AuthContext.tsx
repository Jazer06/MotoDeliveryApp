// src/context/AuthContext.tsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '../api/apiClient';

// Тип пользователя
export type UserRole = 'user' | 'courier' | 'admin';

export type User = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
};

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role_id: number) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const loadSession = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      const storedToken = await AsyncStorage.getItem('auth_token');

      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      }
    };
    loadSession();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await apiClient.post('/login', { email, password });
      const { access_token, user } = response.data;

      await AsyncStorage.setItem('auth_token', access_token);
      await AsyncStorage.setItem('user', JSON.stringify(user));

      setUser(user);
      setToken(access_token);
    } catch (error) {
      console.error('Ошибка входа:', error);
      throw new Error('Не удалось войти');
    }
  };

  const register = async (name: string, email: string, password: string, role_id: number) => {
    try {
      await apiClient.post('/register', { name, email, password, role_id });
      // Можно перенаправить на Login
    } catch (error) {
      console.error('Ошибка регистрации:', error);
      throw new Error('Не удалось зарегистрироваться');
    }
  };

  const logout = async () => {
    try {
      await apiClient.post('/logout');
    } catch (error) {
      console.log('Ошибка при выходе:', error);
    }

    await AsyncStorage.removeItem('auth_token');
    await AsyncStorage.removeItem('user');

    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

// Хук для использования контекста
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};