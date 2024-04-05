import { create } from "zustand";

type AuthStore = {
  token: string | null;
  saveToken: (token: string) => void;
  removeToken: () => void;
};

const useAuthStore = create<AuthStore>((set) => ({
  token: null,
  saveToken: (token: string) => set({ token: token }),
  removeToken: () => set({ token: null }),
}));

export default useAuthStore;
