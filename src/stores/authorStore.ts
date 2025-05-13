import type { IAuthor } from '@/types/authorType';
import { create } from 'zustand';

type AuthorState = {
  // state
  listAuthors: IAuthor[];
  openModalCreateAndUpdateAuthor: boolean;
  currentAuthor: IAuthor | null;
  openModalDeleteAuthor: boolean;

  // actions
  setListAuthors: (listAuthors: IAuthor[]) => void;
  deleteAuthor: (authorId: string) => void;
  updateAuthor: (updatedAuthor: IAuthor) => void;
  createAuthor: (newAuthor: IAuthor) => void;
  setOpenModalCreateAndUpdateAuthor: (openModalCreateAndUpdateAuthor: boolean) => void;
  setCurrentAuthor: (currentAuthor: IAuthor | null) => void;
  setOpenModalDeleteAuthor: (openModalDeleteAuthor: boolean) => void;
};

const useAuthorStore = create<AuthorState>((set) => ({
  // state
  listAuthors: [],
  openModalCreateAndUpdateAuthor: false,
  currentAuthor: null,
  openModalDeleteAuthor: false,

  // actions
  setListAuthors: (listAuthors: IAuthor[]) => set(() => ({ listAuthors })),
  deleteAuthor: (authorId: string) => {
    set((state) => ({
      listAuthors: state.listAuthors.filter((author) => author.id !== authorId),
    }));
  },
  updateAuthor: (updatedAuthor: IAuthor) => {
    set((state) => ({
      listAuthors: state.listAuthors.map((author) =>
        author.id === updatedAuthor.id ? { ...author, ...updatedAuthor } : author,
      ),
    }));
  },
  createAuthor: (newAuthor: IAuthor) => {
    set((state) => ({
      listAuthors: [...state.listAuthors, newAuthor],
    }));
  },
  setOpenModalCreateAndUpdateAuthor: (openModalCreateAndUpdateAuthor: boolean) =>
    set(() => ({ openModalCreateAndUpdateAuthor })),
  setCurrentAuthor: (currentAuthor: IAuthor | null) => set(() => ({ currentAuthor })),
  setOpenModalDeleteAuthor: (openModalDeleteAuthor: boolean) =>
    set(() => ({ openModalDeleteAuthor })),
}));

export default useAuthorStore;
