/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IAppResposeBase } from '@/types/baseType';
import type {
  IContact,
  IContactFormData,
  IFeedback,
  IFeedbackFormData,
} from '@/types/feedbackType';
import http from '@/utils/customAxios';

const getFeedbacks = async (): Promise<IAppResposeBase<IFeedback[]>> => {
  try {
    const response: IAppResposeBase<IFeedback[]> = await http.get('/v1/feedbacks/feedbacks');
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const createFeedback = async (feedback: IFeedbackFormData): Promise<IAppResposeBase<IFeedback>> => {
  try {
    const response: IAppResposeBase<IFeedback> = await http.post(
      '/v1/feedbacks/create-feedback',
      feedback,
    );
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const getMyFeedbacks = async (): Promise<IAppResposeBase<IFeedback[]>> => {
  try {
    const response: IAppResposeBase<IFeedback[]> = await http.get('/v1/feedbacks/my-feedbacks');
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const updateFeedback = async (feedback: IFeedbackFormData): Promise<IAppResposeBase<IFeedback>> => {
  try {
    const response: IAppResposeBase<IFeedback> = await http.put(
      '/v1/feedbacks/update-feedback',
      feedback,
    );
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const deleteFeedback = async (id: string): Promise<IAppResposeBase<IFeedback>> => {
  try {
    const response: IAppResposeBase<IFeedback> = await http.delete(
      `/v1/feedbacks/delete-feedback/${id}`,
    );
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const toogleFeedbackStatus = async (id: string): Promise<IAppResposeBase<IFeedback>> => {
  try {
    const response: IAppResposeBase<IFeedback> = await http.put(
      `/v1/feedbacks/toggle-feedback/${id}`,
    );
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const getContacts = async (): Promise<IAppResposeBase<IContact[]>> => {
  try {
    const response: IAppResposeBase<IContact[]> = await http.get('/v1/feedbacks/contacts');
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const createContact = async (contact: IContactFormData): Promise<IAppResposeBase<IContact>> => {
  try {
    const response: IAppResposeBase<IContact> = await http.post(
      '/v1/feedbacks/create-contact',
      contact,
    );
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const replyContact = async (contact: IContact): Promise<IAppResposeBase<IContact>> => {
  try {
    const response: IAppResposeBase<IContact> = await http.put(
      '/v1/feedbacks/reply-contact',
      contact,
    );
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const FeedbackService = {
  getFeedbacks,
  createFeedback,
  getMyFeedbacks,
  updateFeedback,
  deleteFeedback,
  toogleFeedbackStatus,
  getContacts,
  createContact,
  replyContact,
};
export default FeedbackService;
