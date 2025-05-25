// src/utils/authStorage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeToken = async (token: string) => {
  await AsyncStorage.setItem('auth_token', token);
};

export const getToken = async (): Promise<string | null> => {
  return await AsyncStorage.getItem('auth_token');
};

export const removeToken = async () => {
  await AsyncStorage.removeItem('auth_token');
};

export const storeUser = async (user: any) => {
  await AsyncStorage.setItem('user', JSON.stringify(user));
};

export const getUser = async (): Promise<any | null> => {
  const userStr = await AsyncStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

export const removeUser = async () => {
  await AsyncStorage.removeItem('user');
};