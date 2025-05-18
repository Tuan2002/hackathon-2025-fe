import type { POINT_ACTIONS } from '@/constants/pointActions';
import type { EGender, EUserRole } from './accountType';

export type EPointAction = (typeof POINT_ACTIONS)[keyof typeof POINT_ACTIONS];

export interface IUpdateUserRequest {
  email: string;
  isLocked: boolean;
  role: EUserRole;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  dob: string | null;
  gender: EGender;
  avatar: string;
}

export interface ICreateUserRequest {
  email: string;
  role: EUserRole;
  firstName: string;
  lastName: string;
  phone: string;
  dob: string | null;
  gender: EGender;
}

export interface IUserFormData {
  email: string;
  isLocked: boolean;
  role: EUserRole;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  dob: string | null;
  gender: EGender;
  avatar: string;
}

export interface IUserPoint {
  id: string;
  createdAt: string;
  amount: number;
  lastPoint: number;
  pointAction: EPointAction;
  note: string;
  historyUserId: string;
  userName: string;
  avatar: string;
}

export interface ICheckoutPaymentRequest {
  amount: number;
}

export interface IConfirmPaymentRequest {
  orderCode: number;
  paymentId: string;
}

export interface ICheckoutPaymentResponse {
  paymentUrl: string;
  orderCode: string;
  paymentId: string;
}
