import type { IUser } from '@/types/accountType';
import { create } from 'zustand';

type AccountState = {
  // state
  currentUser: IUser | null;
  accessToken: string | null;
  isSubmitting: boolean;

  // actions
  setCurrentUser: (user: IUser | null) => void;
  clearCurrentUser: () => void;
  setAccessToken: (token: string | null) => void;
  clearAccessToken: () => void;
  setIsSubmitting: (isSubmitting: boolean) => void;
};

const useAccountStore = create<AccountState>((set) => ({
  currentUser: null,
  accessToken: null,
  isSubmitting: false,

  setCurrentUser: (user) => set({ currentUser: user }),
  clearCurrentUser: () => set({ currentUser: null }),

  setAccessToken: (token) => set({ accessToken: token }),
  clearAccessToken: () => set({ accessToken: null }),
  setIsSubmitting: (isSubmitting) => set({ isSubmitting }),
}));

export default useAccountStore;
