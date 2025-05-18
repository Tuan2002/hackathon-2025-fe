import type { GENDERS } from '@/constants/genders';
import type { USER_ROLES } from '@/constants/userRoles';

export type EUserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];
export type EGender = (typeof GENDERS)[keyof typeof GENDERS];

export interface IUser {
  id: string;
  userName: string;
  role: EUserRole;
  isFirstLogin: true;
  isLocked: boolean;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  dob: string;
  gender: EGender;
  avatar: string;
  point: number;
  createdAt: string;
  updatedAt: string;
}

export interface IUpdateProfileRequest {
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  dob: string;
  gender: EGender;
  avatar: string;
}

export interface IChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
