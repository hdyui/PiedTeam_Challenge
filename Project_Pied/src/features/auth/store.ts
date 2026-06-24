import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;

  // Actions
  setTokens: (access: string, refresh: string) => void;
  clearTokens: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        // Initial state
        accessToken: null,
        refreshToken: null,

        // Actions
        setTokens: (access, refresh) =>
          set({ accessToken: access, refreshToken: refresh }),

        clearTokens: () => set({ accessToken: null, refreshToken: null }),
      }),
      {
        name: "shopping-card-auth", // key trong locolStorage
        storage: createJSONStorage(() => localStorage),
      },
    ),
  ),
);
