import type { IConfig } from '@/types/configType';
import { create } from 'zustand';

type ConfigState = {
  // state
  listConfigs: IConfig[];
  openModalCreateAndUpdateConfig: boolean;
  currentConfig: IConfig | null;
  openModalDeleteConfig: boolean;
  openModalShowConfig: boolean;
  openModalChangeConfigStatus: boolean;
  activeConfig: IConfig | null;

  // actions
  setListConfigs: (listConfigs: IConfig[]) => void;
  deleteConfig: (id: string) => void;
  updateConfig: (updatedConfig: IConfig) => void;
  createConfig: (newConfig: IConfig) => void;
  setOpenModalCreateAndUpdateConfig: (openModalCreateAndUpdateConfig: boolean) => void;
  setOpenModalShowConfig: (openModalShowConfig: boolean) => void;
  setCurrentConfig: (currentConfig: IConfig | null) => void;
  setOpenModalDeleteConfig: (openModalDeleteConfig: boolean) => void;
  setOpenModalChangeConfigStatus: (openModalChangeConfigStatus: boolean) => void;
  setActiveConfig: (activeConfig: IConfig | null) => void;
};

const useConfigStore = create<ConfigState>((set) => ({
  // state
  listConfigs: [],
  openModalCreateAndUpdateConfig: false,
  currentConfig: null,
  openModalDeleteConfig: false,
  openModalChangeConfigStatus: false,
  openModalShowConfig: false,
  activeConfig: null,

  // actions
  setListConfigs: (listConfigs: IConfig[]) => set(() => ({ listConfigs })),
  deleteConfig: (id: string) => {
    set((state) => ({
      listConfigs: state.listConfigs.filter((item) => item.id !== id),
    }));
  },
  updateConfig: (updatedConfig: IConfig) => {
    set((state) => ({
      listConfigs: state.listConfigs.map((item) =>
        item.id === updatedConfig.id ? { ...item, ...updatedConfig } : item,
      ),
    }));
  },
  createConfig: (newConfig: IConfig) => {
    set((state) => ({
      listConfigs: [...state.listConfigs, newConfig],
    }));
  },
  setOpenModalCreateAndUpdateConfig: (openModalCreateAndUpdateConfig: boolean) =>
    set(() => {
      return { openModalCreateAndUpdateConfig };
    }),
  setCurrentConfig: (currentConfig: IConfig | null) => set(() => ({ currentConfig })),
  setOpenModalDeleteConfig: (openModalDeleteConfig: boolean) =>
    set(() => ({ openModalDeleteConfig })),
  setOpenModalChangeConfigStatus: (openModalChangeConfigStatus: boolean) =>
    set(() => ({ openModalChangeConfigStatus })),
  setOpenModalShowConfig: (openModalShowConfig: boolean) => set(() => ({ openModalShowConfig })),
  setActiveConfig: (activeConfig: IConfig | null) => set(() => ({ activeConfig })),
}));

export default useConfigStore;
