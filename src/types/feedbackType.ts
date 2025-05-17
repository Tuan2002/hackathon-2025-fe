export interface IFeedback {
  id: string;
  createdAt: string;
  star: number;
  content: string;
  reviewerId: string;
  isActive: boolean;
  reviewerName: string;
  reviewerAvatar: string;
}

export interface IContact {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  isReplied: boolean;
}

export interface IFeedbackFormData {
  star: number;
  content: string;
}

export interface IContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}
