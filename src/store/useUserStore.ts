import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useUserStore = create<UserState>(set => ({
  user: null,
  isLoading: false,
  error: null,
  setUser: user => set({ user, error: null }),
  clearUser: () => set({ user: null }),
  setLoading: isLoading => set({ isLoading }),
  setError: error => set({ error }),
}));
