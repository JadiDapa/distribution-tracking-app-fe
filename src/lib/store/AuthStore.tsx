import { create } from "zustand";

type UserData = {
  id: number;
  name: string;
  password: string;
  picture?: string;
  relation?: string;
  status: string;
  token: string;
  unitId: number;
  user: string;
};

type AuthStore = {
  userData: UserData | null;
  saveUser: (userData: UserData) => void;
  removeUser: () => void;
};

const useAuthStore = create<AuthStore>((set) => ({
  userData: null,
  saveUser: (userData: UserData) => set({ userData: userData }),
  removeUser: () => set({ userData: null }),
}));

export default useAuthStore;
