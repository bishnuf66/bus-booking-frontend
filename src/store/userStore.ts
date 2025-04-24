import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { jwtDecode } from 'jwt-decode';
import { getCookie } from '@/utils/cookieutil';

interface UserToken {
  email: string;
  id: string;
  userName: string;
  iat: number;
  exp: number;
}

interface UserState {
  user: UserToken | null;
  setUserFromToken: () => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUserFromToken: () => {
        const token = getCookie('token');
        if (token) {
          try {
            const decoded = jwtDecode<UserToken>(token);
            set({ user: decoded });
          } catch (err) {
            console.error("Token decoding failed", err);
            set({ user: null });
          }
        }
      },
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'user-storage', // unique name
      partialize: (state) => ({ user: state.user }), // only persist user
    }
  )
);
