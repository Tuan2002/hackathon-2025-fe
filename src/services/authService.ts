/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  IConfirmOtpResponseData,
  IForgetPasswordRequestData,
  IForgetPasswordResponseData,
  ILoginRequestData,
  ILoginResponseData,
  IRegisterRequestData,
  IRegisterResponseData,
  IResetPasswordRequestData,
  IVeryfyOtpRequestData,
} from '@/types/authType';
import type { IAppResposeBase } from '@/types/baseType';
import http from '@/utils/customAxios';

const login = async (
  loginData: ILoginRequestData,
): Promise<IAppResposeBase<ILoginResponseData>> => {
  try {
    const response: IAppResposeBase<ILoginResponseData> = await http.post(
      '/v1/auth/credential-login',
      loginData,
    );
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const register = async (
  registerData: IRegisterRequestData,
): Promise<IAppResposeBase<IRegisterResponseData>> => {
  try {
    const response: IAppResposeBase<IRegisterResponseData> = await http.post(
      '/v1/auth/register',
      registerData,
    );
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const initialize = async (): Promise<IAppResposeBase<IRegisterResponseData>> => {
  try {
    const response: IAppResposeBase<IRegisterResponseData> = await http.get('/v1/auth/initialize');
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const forgetPassword = async (
  data: IForgetPasswordRequestData,
): Promise<IAppResposeBase<IForgetPasswordResponseData>> => {
  try {
    const response: IAppResposeBase<IForgetPasswordResponseData> = await http.post(
      '/v1/auth/forget-password',
      data,
    );
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const verifyOtp = async (
  data: IVeryfyOtpRequestData,
): Promise<IAppResposeBase<IConfirmOtpResponseData>> => {
  try {
    const response: IAppResposeBase<IConfirmOtpResponseData> = await http.post(
      '/v1/auth/verify-otp',
      data,
    );
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const resetPassword = async (
  data: IResetPasswordRequestData,
  otpToken: string,
): Promise<IAppResposeBase<ILoginResponseData>> => {
  try {
    const response: IAppResposeBase<ILoginResponseData> = await http.post(
      '/v1/auth/reset-password',
      data,
      {
        headers: {
          Authorization: 'Bearer ' + otpToken,
        },
      },
    );
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const authService = {
  login,
  register,
  initialize,
  forgetPassword,
  verifyOtp,
  resetPassword,
};
export default authService;
