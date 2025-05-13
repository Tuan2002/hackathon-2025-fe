import type { IBanner } from '@/types/bannerType';
import { create } from 'zustand';

type BannerState = {
  // state
  listBanners: IBanner[];
  openModalCreateAndUpdateBanner: boolean;
  currentBanner: IBanner | null;
  openModalDeleteBanner: boolean;
  openModalChangeBannerStatus: boolean;

  // actions
  setListBanners: (listBanners: IBanner[]) => void;
  deleteBanner: (id: string) => void;
  updateBanner: (updatedBanner: IBanner) => void;
  createBanner: (newBanner: IBanner) => void;
  setOpenModalCreateAndUpdateBanner: (openModalCreateAndUpdateBanner: boolean) => void;
  setCurrentBanner: (currentBanner: IBanner | null) => void;
  setOpenModalDeleteBanner: (openModalDeleteBanner: boolean) => void;
  setOpenModalChangeBannerStatus: (openModalChangeBannerStatus: boolean) => void;
};

const useBannerStore = create<BannerState>((set) => ({
  // state
  listBanners: [],
  openModalCreateAndUpdateBanner: false,
  currentBanner: null,
  openModalDeleteBanner: false,
  openModalChangeBannerStatus: false,

  // actions
  setListBanners: (listBanners: IBanner[]) => set(() => ({ listBanners })),
  deleteBanner: (id: string) => {
    set((state) => ({
      listBanners: state.listBanners.filter((item) => item.id !== id),
    }));
  },
  updateBanner: (updatedBanner: IBanner) => {
    set((state) => ({
      listBanners: state.listBanners.map((item) =>
        item.id === updatedBanner.id ? { ...item, ...updatedBanner } : item,
      ),
    }));
  },
  createBanner: (newBanner: IBanner) => {
    set((state) => ({
      listBanners: [...state.listBanners, newBanner],
    }));
  },
  setOpenModalCreateAndUpdateBanner: (openModalCreateAndUpdateBanner: boolean) =>
    set(() => ({ openModalCreateAndUpdateBanner })),
  setCurrentBanner: (currentBanner: IBanner | null) => set(() => ({ currentBanner })),
  setOpenModalDeleteBanner: (openModalDeleteBanner: boolean) =>
    set(() => ({ openModalDeleteBanner })),
  setOpenModalChangeBannerStatus: (openModalChangeBannerStatus: boolean) =>
    set(() => ({ openModalChangeBannerStatus })),
}));

export default useBannerStore;
