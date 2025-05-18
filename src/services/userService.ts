/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IUser } from '@/types/accountType';
import type { IAppResposeBase } from '@/types/baseType';
import type {
  ICheckoutPaymentRequest,
  ICheckoutPaymentResponse,
  IConfirmPaymentRequest,
  ICreateUserRequest,
  IHistoryTransaction,
  IUpdateUserRequest,
  IUserPoint,
} from '@/types/userType';
import http from '@/utils/customAxios';

const getUsers = async (): Promise<IAppResposeBase<IUser[]>> => {
  try {
    const response: IAppResposeBase<IUser[]> = await http.get('/v1/users/get-users');
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const getUser = async (userId: string): Promise<IAppResposeBase<IUser>> => {
  try {
    const response: IAppResposeBase<IUser> = await http.get(`/v1/users/get-user/${userId}`);
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const updateUser = async (
  userId: string,
  data: IUpdateUserRequest,
): Promise<IAppResposeBase<IUser>> => {
  try {
    const response: IAppResposeBase<IUser> = await http.put(
      `/v1/users/update-user/${userId}`,
      data,
    );
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const createUser = async (data: ICreateUserRequest): Promise<IAppResposeBase<IUser>> => {
  try {
    const response: IAppResposeBase<IUser> = await http.post('/v1/users/create-user', data);
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const getDeletedUsers = async (): Promise<IAppResposeBase<IUser[]>> => {
  try {
    const response: IAppResposeBase<IUser[]> = await http.get('/v1/users/get-deleted-users');
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const restoreUser = async (userId: string): Promise<IAppResposeBase<IUser>> => {
  try {
    const response: IAppResposeBase<IUser> = await http.put(`/v1/users/restore-user/${userId}`);
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const deleteUser = async (userId: string): Promise<IAppResposeBase<IUser>> => {
  try {
    const response: IAppResposeBase<IUser> = await http.delete(`/v1/users/delete-user/${userId}`);
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const getMyPointHistory = async (): Promise<IAppResposeBase<IUserPoint[]>> => {
  try {
    const response: IAppResposeBase<IUserPoint[]> = await http.get('/v1/users/my-point-history');
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};
const getUserPointHistory = async (userId: string): Promise<IAppResposeBase<IUserPoint[]>> => {
  try {
    const response: IAppResposeBase<IUserPoint[]> = await http.get(
      `/v1/users/point-history/${userId}`,
    );
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const checkoutPayment = async (
  data: ICheckoutPaymentRequest,
): Promise<IAppResposeBase<ICheckoutPaymentResponse>> => {
  try {
    const response: IAppResposeBase<ICheckoutPaymentResponse> = await http.post(
      '/v1/payments/checkout-payment',
      data,
    );
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const confirmPayment = async (
  data: IConfirmPaymentRequest,
): Promise<IAppResposeBase<ICheckoutPaymentResponse>> => {
  try {
    const response: IAppResposeBase<ICheckoutPaymentResponse> = await http.post(
      '/v1/payments/confirm-payment',
      data,
    );
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const getHistoryTransaction = async (): Promise<IAppResposeBase<IUserPoint[]>> => {
  try {
    const response: IAppResposeBase<IUserPoint[]> = await http.get(
      '/v1/users/get-history-transaction',
    );
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const getUserTransaction = async (
  userId: string,
): Promise<IAppResposeBase<IHistoryTransaction[]>> => {
  try {
    const response: IAppResposeBase<IHistoryTransaction[]> = await http.get(
      `/v1/users/transactions/${userId}`,
    );
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const userService = {
  getUsers,
  getUser,
  updateUser,
  createUser,
  getDeletedUsers,
  restoreUser,
  deleteUser,
  getMyPointHistory,
  getUserPointHistory,
  checkoutPayment,
  confirmPayment,
  getHistoryTransaction,
  getUserTransaction,
};
export default userService;
