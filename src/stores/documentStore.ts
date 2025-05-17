import type { IDocument } from '@/types/documentType';
import { create } from 'zustand';

type DocumentState = {
  // state
  listDocuments: IDocument[];
  openModalCreateAndUpdateDocument: boolean;
  currentDocument: IDocument | null;
  openModalDeleteDocument: boolean;
  openModalShowDocumentDetail: boolean;
  openModalShowSummaryDocument: boolean;
  openModalApproveDocument: boolean;
  openModalRejectDocument: boolean;

  // actions
  setListDocuments: (listDocuments: IDocument[]) => void;
  deleteDocument: (id: string) => void;
  updateDocument: (updatedDocument: IDocument) => void;
  createDocument: (newDocument: IDocument) => void;
  setOpenModalCreateAndUpdateDocument: (openModalCreateAndUpdateDocument: boolean) => void;
  setCurrentDocument: (currentDocument: IDocument | null) => void;
  setOpenModalDeleteDocument: (openModalDeleteDocument: boolean) => void;
  setOpenModalShowDocumentDetail: (openModalShowDocumentDetail: boolean) => void;
  setOpenModalShowSummaryDocument: (openModalShowSummaryDocument: boolean) => void;
  setOpenModalApproveDocument: (openModalApproveDocument: boolean) => void;
  setOpenModalRejectDocument: (openModalRejectDocument: boolean) => void;
};

const useDocumentStore = create<DocumentState>((set) => ({
  // state
  listDocuments: [],
  openModalCreateAndUpdateDocument: false,
  currentDocument: null,
  openModalDeleteDocument: false,
  openModalShowDocumentDetail: false,
  openModalShowSummaryDocument: false,
  openModalApproveDocument: false,
  openModalRejectDocument: false,

  // actions
  setListDocuments: (listDocuments: IDocument[]) => set(() => ({ listDocuments })),
  deleteDocument: (id: string) => {
    set((state) => ({
      listDocuments: state.listDocuments.filter((item) => item.id !== id),
    }));
  },
  updateDocument: (updatedDocument: IDocument) => {
    set((state) => ({
      listDocuments: state.listDocuments.map((item) =>
        item.id === updatedDocument.id ? { ...item, ...updatedDocument } : item,
      ),
    }));
  },
  createDocument: (newDocument: IDocument) => {
    set((state) => ({
      listDocuments: [...state.listDocuments, newDocument],
    }));
  },
  setOpenModalCreateAndUpdateDocument: (openModalCreateAndUpdateDocument: boolean) =>
    set(() => ({ openModalCreateAndUpdateDocument })),
  setCurrentDocument: (currentDocument: IDocument | null) => set(() => ({ currentDocument })),
  setOpenModalDeleteDocument: (openModalDeleteDocument: boolean) =>
    set(() => ({ openModalDeleteDocument })),
  setOpenModalShowDocumentDetail: (openModalShowDocumentDetail: boolean) =>
    set(() => ({ openModalShowDocumentDetail })),
  setOpenModalShowSummaryDocument: (openModalShowSummaryDocument: boolean) =>
    set(() => ({ openModalShowSummaryDocument })),
  setOpenModalApproveDocument: (openModalApproveDocument: boolean) =>
    set(() => ({ openModalApproveDocument })),
  setOpenModalRejectDocument: (openModalRejectDocument: boolean) =>
    set(() => ({ openModalRejectDocument })),
}));

export default useDocumentStore;
