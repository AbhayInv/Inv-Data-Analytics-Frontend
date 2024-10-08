import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      userName: "",
      token: "",
      addToken: (token) => set({ token: token }),
      addUser: (name) => set({ userName: name }),
    }),
    {
      name: "authStorage", // name of the item in the storage (must be unique)
      //   storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
