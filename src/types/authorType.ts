export interface IAuthor {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateAuthorRequest {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface IUpdateAuthorRequest {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface IAuthorFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
}
