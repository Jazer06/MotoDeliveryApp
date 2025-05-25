// src/api/apiClient.ts
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = "http://192.168.0.104:8000/api";

const apiClient = axios.create({
  baseURL: API_URL,
});

// Добавляем токен к каждому запросу
apiClient.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('auth_token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;













// const API_URL = "http://192.168.0.104:8000/api";

// php artisan serve --host=0.0.0.0 --port=8000 запууск.

 // npx expo start запуск