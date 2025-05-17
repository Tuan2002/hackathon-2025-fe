import type { IContact, IFeedback } from '@/types/feedbackType';
import { create } from 'zustand';

type FeedbackState = {
  // state
  currentFeedback: IFeedback | null;
  currentContact: IContact | null;
  listFeedbacks: IFeedback[];
  listContacts: IContact[];
  openModalReplyContact: boolean;
  openModalReplyFeedback: boolean;
  openModalToggleFeedback: boolean;

  // actions
  setCurrentFeedback: (feedback: IFeedback | null) => void;
  setCurrentContact: (contact: IContact | null) => void;
  setListFeedbacks: (feedbacks: IFeedback[]) => void;
  setListContacts: (contacts: IContact[]) => void;
  setOpenModalReplyContact: (open: boolean) => void;
  setOpenModalReplyFeedback: (open: boolean) => void;
  setOpenModalToggleFeedback: (open: boolean) => void;
};

const useFeedbackStore = create<FeedbackState>((set) => ({
  currentFeedback: null,
  currentContact: null,
  listFeedbacks: [],
  listContacts: [],
  openModalReplyContact: false,
  openModalReplyFeedback: false,
  openModalToggleFeedback: false,

  setCurrentFeedback: (feedback) => set({ currentFeedback: feedback }),
  setCurrentContact: (contact) => set({ currentContact: contact }),
  setListFeedbacks: (feedbacks) => set({ listFeedbacks: feedbacks }),
  setListContacts: (contacts) => set({ listContacts: contacts }),
  setOpenModalReplyContact: (open) => set({ openModalReplyContact: open }),
  setOpenModalReplyFeedback: (open) => set({ openModalReplyFeedback: open }),
  setOpenModalToggleFeedback: (open) => set({ openModalToggleFeedback: open }),
}));

export default useFeedbackStore;
