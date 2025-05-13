/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IAuthor, ICreateAuthorRequest, IUpdateAuthorRequest } from '@/types/authorType';
import type { IAppResposeBase } from '@/types/baseType';
import http from '@/utils/customAxios';

const getAuthors = async (): Promise<IAppResposeBase<IAuthor[]>> => {
  try {
    const response: IAppResposeBase<IAuthor[]> = await http.get('/v1/authors/get-authors');
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const getAuthor = async (id: string): Promise<IAppResposeBase<IAuthor>> => {
  try {
    const response: IAppResposeBase<IAuthor> = await http.get(`/v1/authors/get-author/${id}`);
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const updateAuthor = async (
  id: string,
  data: IUpdateAuthorRequest,
): Promise<IAppResposeBase<IAuthor>> => {
  try {
    const response: IAppResposeBase<IAuthor> = await http.put(
      `/v1/authors/update-author/${id}`,
      data,
    );
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const createAuthor = async (data: ICreateAuthorRequest): Promise<IAppResposeBase<IAuthor>> => {
  try {
    const response: IAppResposeBase<IAuthor> = await http.post('/v1/authors/create-author', data);
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const getDeletedAuthors = async (): Promise<IAppResposeBase<IAuthor[]>> => {
  try {
    const response: IAppResposeBase<IAuthor[]> = await http.get('/v1/authors/get-deleted-authors');
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const restoreAuthor = async (id: string): Promise<IAppResposeBase<IAuthor>> => {
  try {
    const response: IAppResposeBase<IAuthor> = await http.put(`/v1/authors/restore-author/${id}`);
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const deleteAuthor = async (id: string): Promise<IAppResposeBase<IAuthor>> => {
  try {
    const response: IAppResposeBase<IAuthor> = await http.delete(`/v1/authors/delete-author/${id}`);
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const AuthorService = {
  getAuthors,
  getAuthor,
  updateAuthor,
  createAuthor,
  getDeletedAuthors,
  restoreAuthor,
  deleteAuthor,
};
export default AuthorService;
