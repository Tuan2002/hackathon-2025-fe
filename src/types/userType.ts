import type { EGender, EUserRole } from './accountType';

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
