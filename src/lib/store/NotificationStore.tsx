import { create } from "zustand";

type NotificationStore = {
  status: "success" | "error" | null;
  message: string;
  setStatus: (status: NotificationStore["status"]) => void;
  setMessage: (message: string) => void;
};

const useNotificationStore = create<NotificationStore>((set) => ({
  status: null,
  message: "",
  setStatus: (status) => set({ status: status }),
  setMessage: (message) => set({ message: message }),
}));

export default useNotificationStore;
