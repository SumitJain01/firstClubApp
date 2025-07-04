import { create } from 'zustand';

interface AuthState {
  isLoggedIn: boolean;
  login: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  login: () => set({ isLoggedIn: true }),
}));