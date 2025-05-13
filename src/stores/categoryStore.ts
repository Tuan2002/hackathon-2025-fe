import type { ICategory } from '@/types/categoryType';
import { create } from 'zustand';

type CategoryState = {
  // state
  listCategories: ICategory[];
  openModalCreateAndUpdateCategory: boolean;
  currentCategory: ICategory | null;
  openModalDeleteCategory: boolean;

  // actions
  setListCategories: (listCategories: ICategory[]) => void;
  deleteCategory: (categoryId: string) => void;
  updateCategory: (updatedCategory: ICategory) => void;
  createCategory: (newCategory: ICategory) => void;
  setOpenModalCreateAndUpdateCategory: (openModalCreateAndUpdateCategory: boolean) => void;
  setCurrentCategory: (currentCategory: ICategory | null) => void;
  setOpenModalDeleteCategory: (openModalDeleteCategory: boolean) => void;
};

const useCategoryStore = create<CategoryState>((set) => ({
  // state
  listCategories: [],
  openModalCreateAndUpdateCategory: false,
  currentCategory: null,
  openModalDeleteCategory: false,

  // actions
  setListCategories: (listCategories: ICategory[]) => set(() => ({ listCategories })),
  deleteCategory: (categoryId: string) => {
    set((state) => ({
      listCategories: state.listCategories.filter((category) => category.id !== categoryId),
    }));
  },
  updateCategory: (updatedCategory: ICategory) => {
    set((state) => ({
      listCategories: state.listCategories.map((category) =>
        category.id === updatedCategory.id ? { ...category, ...updatedCategory } : category,
      ),
    }));
  },
  createCategory: (newCategory: ICategory) => {
    set((state) => ({
      listCategories: [...state.listCategories, newCategory],
    }));
  },
  setOpenModalCreateAndUpdateCategory: (openModalCreateAndUpdateCategory: boolean) =>
    set(() => ({ openModalCreateAndUpdateCategory })),
  setCurrentCategory: (currentCategory: ICategory | null) => set(() => ({ currentCategory })),
  setOpenModalDeleteCategory: (openModalDeleteCategory: boolean) =>
    set(() => ({ openModalDeleteCategory })),
}));

export default useCategoryStore;
