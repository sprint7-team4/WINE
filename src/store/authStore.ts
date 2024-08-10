// src/store/authStore.ts
import { create } from "zustand";

type UserType = {
  id: number;
  email: string;
  nickname: string;
  teamId: string;
  updatedAt: string;
  createdAt: string;
  image: string;
};

interface AuthState {
  user: UserType;
  setUser: (user: UserType) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: {
    id: 0,
    email: "",
    nickname: "",
    teamId: "",
    updatedAt: "",
    createdAt: "",
    image: "",
  },
  setUser: (user) => set({ user }),
}));
