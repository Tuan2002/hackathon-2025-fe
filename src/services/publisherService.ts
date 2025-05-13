/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IAppResposeBase } from '@/types/baseType';
import type {
  ICreatePublisherRequest,
  IPublisher,
  IUpdatePublisherRequest,
} from '@/types/publisherType';
import http from '@/utils/customAxios';

const getPublishers = async (): Promise<IAppResposeBase<IPublisher[]>> => {
  try {
    const response: IAppResposeBase<IPublisher[]> = await http.get('/v1/publishers/get-publishers');
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const getPublisher = async (id: string): Promise<IAppResposeBase<IPublisher>> => {
  try {
    const response: IAppResposeBase<IPublisher> = await http.get(
      `/v1/publishers/get-publisher/${id}`,
    );
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const updatePublisher = async (
  id: string,
  data: IUpdatePublisherRequest,
): Promise<IAppResposeBase<IPublisher>> => {
  try {
    const response: IAppResposeBase<IPublisher> = await http.put(
      `/v1/publishers/update-publisher/${id}`,
      data,
    );
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const createPublisher = async (
  data: ICreatePublisherRequest,
): Promise<IAppResposeBase<IPublisher>> => {
  try {
    const response: IAppResposeBase<IPublisher> = await http.post(
      '/v1/publishers/create-publisher',
      data,
    );
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const getDeletedPublishers = async (): Promise<IAppResposeBase<IPublisher[]>> => {
  try {
    const response: IAppResposeBase<IPublisher[]> = await http.get(
      '/v1/publishers/get-deleted-publishers',
    );
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const restorePublisher = async (id: string): Promise<IAppResposeBase<IPublisher>> => {
  try {
    const response: IAppResposeBase<IPublisher> = await http.put(
      `/v1/publishers/restore-publisher/${id}`,
    );
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const deletePublisher = async (id: string): Promise<IAppResposeBase<IPublisher>> => {
  try {
    const response: IAppResposeBase<IPublisher> = await http.delete(
      `/v1/publishers/delete-publisher/${id}`,
    );
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const PublisherService = {
  getPublishers,
  getPublisher,
  updatePublisher,
  createPublisher,
  getDeletedPublishers,
  restorePublisher,
  deletePublisher,
};
export default PublisherService;
