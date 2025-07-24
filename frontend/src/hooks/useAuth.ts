import { create } from "zustand";

interface User {
  email: string;
  username: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
}

type Auth = {
  user: User | null;
  isLoggedIn: boolean;
  login: (user: User) => void;
  logout: () => void;
};

export const useAuthStore = create<Auth>((set) => ({
  user: null,
  isLoggedIn: false,
  login: (user) => set({ user, isLoggedIn: true }),
  logout: () => set({ user: null, isLoggedIn: false }),
}));
