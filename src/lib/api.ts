import axios from 'axios';
import { useAuthStore } from '../stores/authStore';
import { toast } from 'sonner';

export const api = axios.create({
  baseURL: 'https://plataforma-de-objetos-perdidos-pop.onrender.com/api',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      useAuthStore.getState().logout();
    }
    const message = error.response?.data?.message || 'Error de conexión';
    if (error.response?.status !== 422) {
      toast.error(message);
    }
    return Promise.reject(error);
  }
);