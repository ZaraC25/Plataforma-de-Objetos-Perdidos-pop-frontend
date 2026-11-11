import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'; // <-- Agregamos createJSONStorage
import type { Usuario } from '../types/api';

interface AuthState {
  usuario: Usuario | null;
  token: string | null;
  login: (usuario: Usuario, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      usuario: null,
      token: null,
      login: (usuario, token) => set({ usuario, token }),
      logout: () => set({ usuario: null, token: null }),
    }),
    { 
      name: 'pop-auth',
      storage: createJSONStorage(() => localStorage) // <-- Forzamos el uso de localStorage
    }
  )
);