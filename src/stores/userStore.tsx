import type { IUser } from '@/types/accountType';
import type { IHistoryTransaction, IUserPoint } from '@/types/userType';
import { create } from 'zustand';

type UserState = {
  // state
  listUsers: IUser[];
  listPointHistory: IUserPoint[];

  listTransactionHistory: IHistoryTransaction[];
  openModalCreateAndUpdateUser: boolean;
  currentUser: IUser | null;
  openModalDeleteUser: boolean;
  openModalLockUser: boolean;
  openModalShowPointHistory: boolean;
  openModalShowTransactionHistory: boolean;

  // actions
  setListUsers: (listUsers: IUser[]) => void;
  deleteUser: (userId: string) => void;
  updateUser: (updatedUser: IUser) => void;
  createUser: (newUser: IUser) => void;
  setOpenModalCreateAndUpdateUser: (openModalCreateAndUpdateUser: boolean) => void;
  setCurrentUser: (currentUser: IUser | null) => void;
  setOpenModalDeleteUser: (openModalDeleteUser: boolean) => void;
  setOpenModalLockUser: (openModalLockUser: boolean) => void;
  setListPointHistory: (listPointHistory: IUserPoint[]) => void;
  setOpenModalShowPointHistory: (openModalShowPointHistory: boolean) => void;
  setOpenModalShowTransactionHistory: (openModalShowTransactionHistory: boolean) => void;
  setListTransactionHistory: (listTransactionHistory: IHistoryTransaction[]) => void;
};

const useUserStore = create<UserState>((set) => ({
  // state
  listUsers: [],
  openModalCreateAndUpdateUser: false,
  currentUser: null,
  openModalDeleteUser: false,
  openModalLockUser: false,
  listPointHistory: [],
  openModalShowPointHistory: false,
  openModalShowTransactionHistory: false,
  listTransactionHistory: [],

  // actions
  setListUsers: (listUsers: IUser[]) => set(() => ({ listUsers })),
  deleteUser: (userId: string) => {
    set((state) => ({
      listUsers: state.listUsers.filter((user) => user.id !== userId),
    }));
  },
  updateUser: (updatedUser: IUser) => {
    set((state) => ({
      listUsers: state.listUsers.map((user) =>
        user.id === updatedUser.id ? { ...user, ...updatedUser } : user,
      ),
    }));
  },
  createUser: (newUser: IUser) => {
    set((state) => ({
      listUsers: [...state.listUsers, newUser],
    }));
  },
  setOpenModalCreateAndUpdateUser: (openModalCreateAndUpdateUser: boolean) =>
    set(() => ({ openModalCreateAndUpdateUser })),
  setCurrentUser: (currentUser: IUser | null) => set(() => ({ currentUser })),
  setOpenModalDeleteUser: (openModalDeleteUser: boolean) => set(() => ({ openModalDeleteUser })),
  setOpenModalLockUser: (openModalLockUser: boolean) => set(() => ({ openModalLockUser })),
  setListPointHistory: (listPointHistory: IUserPoint[]) => set(() => ({ listPointHistory })),
  setOpenModalShowPointHistory: (openModalShowPointHistory: boolean) =>
    set(() => ({ openModalShowPointHistory })),
  setOpenModalShowTransactionHistory: (openModalShowTransactionHistory: boolean) =>
    set(() => ({ openModalShowTransactionHistory })),
  setListTransactionHistory: (listTransactionHistory: IHistoryTransaction[]) =>
    set(() => ({ listTransactionHistory })),
}));

export default useUserStore;
