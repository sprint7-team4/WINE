import { create } from "zustand";
import { persist } from "zustand/middleware";

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

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
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
    }),
    {
      name: "auth-storage", // 로컬 스토리지에 저장될 키 이름
      partialize: (state) => ({ user: state.user }), // 저장할 상태만 선택
    }
  )
);
