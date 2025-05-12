/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IChangePasswordRequest, IUpdateProfileRequest, IUser } from '@/types/accountType';
import type { IAppResposeBase } from '@/types/baseType';
import http from '@/utils/customAxios';

const getMe = async (): Promise<IAppResposeBase<IUser>> => {
  try {
    const response: IAppResposeBase<IUser> = await http.get('/v1/account/me');
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const updateProfile = async (data: IUpdateProfileRequest): Promise<IAppResposeBase<IUser>> => {
  try {
    const response: IAppResposeBase<IUser> = await http.put('/v1/account/update-profile', data);
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const changePassword = async (data: IChangePasswordRequest): Promise<IAppResposeBase<IUser>> => {
  try {
    const response: IAppResposeBase<IUser> = await http.put('/v1/account/change-password', data);
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const accountService = {
  getMe,
  updateProfile,
  changePassword,
};
export default accountService;
