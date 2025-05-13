/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IAppResposeBase } from '@/types/baseType';
import type {
  ICategory,
  ICreateCategoryRequest,
  IUpdateCategoryRequest,
} from '@/types/categoryType';
import http from '@/utils/customAxios';

const getCategories = async (): Promise<IAppResposeBase<ICategory[]>> => {
  try {
    const response: IAppResposeBase<ICategory[]> = await http.get('/v1/categories/get-categories');
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const getCategory = async (categoryId: string): Promise<IAppResposeBase<ICategory>> => {
  try {
    const response: IAppResposeBase<ICategory> = await http.get(
      `/v1/categories/get-category/${categoryId}`,
    );
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const updateCategory = async (
  categoryId: string,
  data: IUpdateCategoryRequest,
): Promise<IAppResposeBase<ICategory>> => {
  try {
    const response: IAppResposeBase<ICategory> = await http.put(
      `/v1/categories/update-category/${categoryId}`,
      data,
    );
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const createCategory = async (
  data: ICreateCategoryRequest,
): Promise<IAppResposeBase<ICategory>> => {
  try {
    const response: IAppResposeBase<ICategory> = await http.post(
      '/v1/categories/create-category',
      data,
    );
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const getDeletedCategories = async (): Promise<IAppResposeBase<ICategory[]>> => {
  try {
    const response: IAppResposeBase<ICategory[]> = await http.get(
      '/v1/categories/get-deleted-categories',
    );
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const restoreCategory = async (categoryId: string): Promise<IAppResposeBase<ICategory>> => {
  try {
    const response: IAppResposeBase<ICategory> = await http.put(
      `/v1/categories/restore-category/${categoryId}`,
    );
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const deleteCategory = async (categoryId: string): Promise<IAppResposeBase<ICategory>> => {
  try {
    const response: IAppResposeBase<ICategory> = await http.delete(
      `/v1/categories/delete-category/${categoryId}`,
    );
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const CategoryService = {
  getCategories,
  getCategory,
  updateCategory,
  createCategory,
  getDeletedCategories,
  restoreCategory,
  deleteCategory,
};
export default CategoryService;
