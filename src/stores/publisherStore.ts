import type { IPublisher } from '@/types/publisherType';
import { create } from 'zustand';

type PublisherState = {
  // state
  listPublishers: IPublisher[];
  openModalCreateAndUpdatePublisher: boolean;
  currentPublisher: IPublisher | null;
  openModalDeletePublisher: boolean;

  // actions
  setListPublishers: (listPublishers: IPublisher[]) => void;
  deletePublisher: (publisherId: string) => void;
  updatePublisher: (updatedPublisher: IPublisher) => void;
  createPublisher: (newPublisher: IPublisher) => void;
  setOpenModalCreateAndUpdatePublisher: (openModalCreateAndUpdatePublisher: boolean) => void;
  setCurrentPublisher: (currentPublisher: IPublisher | null) => void;
  setOpenModalDeletePublisher: (openModalDeletePublisher: boolean) => void;
};

const usePublisherStore = create<PublisherState>((set) => ({
  // state
  listPublishers: [],
  openModalCreateAndUpdatePublisher: false,
  currentPublisher: null,
  openModalDeletePublisher: false,

  // actions
  setListPublishers: (listPublishers: IPublisher[]) => set(() => ({ listPublishers })),
  deletePublisher: (publisherId: string) => {
    set((state) => ({
      listPublishers: state.listPublishers.filter((publisher) => publisher.id !== publisherId),
    }));
  },
  updatePublisher: (updatedPublisher: IPublisher) => {
    set((state) => ({
      listPublishers: state.listPublishers.map((publisher) =>
        publisher.id === updatedPublisher.id ? { ...publisher, ...updatedPublisher } : publisher,
      ),
    }));
  },
  createPublisher: (newPublisher: IPublisher) => {
    set((state) => ({
      listPublishers: [...state.listPublishers, newPublisher],
    }));
  },
  setOpenModalCreateAndUpdatePublisher: (openModalCreateAndUpdatePublisher: boolean) =>
    set(() => ({ openModalCreateAndUpdatePublisher })),
  setCurrentPublisher: (currentPublisher: IPublisher | null) => set(() => ({ currentPublisher })),
  setOpenModalDeletePublisher: (openModalDeletePublisher: boolean) =>
    set(() => ({ openModalDeletePublisher })),
}));

export default usePublisherStore;
