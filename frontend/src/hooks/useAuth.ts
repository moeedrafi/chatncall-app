import { create } from "zustand";

type Auth = {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
};

export const useAuthStore = create<Auth>((set) => ({
  isLoggedIn: false,
  login: () => set({ isLoggedIn: true }),
  logout: () => set({ isLoggedIn: false }),
}));
