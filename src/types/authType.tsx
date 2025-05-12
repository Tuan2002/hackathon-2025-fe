export interface IRegisterRequestData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

export interface ILoginRequestData {
  email: string;
  password: string;
}

export interface IForgetPasswordRequestData {
  email: string;
}

export interface IVeryfyOtpRequestData {
  otp: string;
  userId: string;
}

export interface IResetPasswordRequestData {
  newPassword: string;
}

export interface ILoginResponseData {
  accessToken: string;
  userId: string;
  email: string;
  userName: string;
}

export interface IRegisterResponseData {
  userId: string;
  email: string;
  userName: string;
  createdAt: string;
}

export interface IForgetPasswordResponseData {
  userId: string;
}

export interface IConfirmOtpResponseData {
  otpToken: string;
}
