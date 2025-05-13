export interface ICategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateCategoryRequest {
  name: string;
  description?: string;
}

export interface IUpdateCategoryRequest {
  name?: string;
  description?: string;
}

export interface ICategoryFormData {
  name: string;
  description?: string;
}
