/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IAppResposeBase } from '@/types/baseType';
import type {
  ICreateDocumentRequest,
  IDocument,
  IUpdateDocumentRequest,
  IUploadDocumentResponse,
} from '@/types/documentType';
import http from '@/utils/customAxios';

const uploadFile = async (file: File): Promise<IAppResposeBase<IUploadDocumentResponse>> => {
  console.log('file', file);
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response: IAppResposeBase<IUploadDocumentResponse> = await http.post(
      '/v1/documents/upload-document',
      formData,
      {
        // ĐỪNG set Content-Type tay
        // headers: { 'Content-Type': 'multipart/form-data' },
      },
    );

    return response;
  } catch (error: any) {
    console.error('Upload lỗi nè:', error.response?.data || error);
    throw error.response?.data || error;
  }
};

const getMyDocuments = async (): Promise<IAppResposeBase<IDocument[]>> => {
  try {
    const response: IAppResposeBase<IDocument[]> = await http.get('/v1/documents/get-my-documents');
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const getPublicDocuments = async (): Promise<IAppResposeBase<IDocument[]>> => {
  try {
    const response: IAppResposeBase<IDocument[]> = await http.get(
      '/v1/documents/get-public-documents',
    );
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const getDocuments = async (): Promise<IAppResposeBase<IDocument[]>> => {
  try {
    const response: IAppResposeBase<IDocument[]> = await http.get('/v1/documents/get-documents');
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const createDocument = async (
  data: ICreateDocumentRequest,
): Promise<IAppResposeBase<IDocument>> => {
  try {
    const response: IAppResposeBase<IDocument> = await http.post(
      '/v1/documents/create-document',
      data,
    );
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const getDocumentById = async (id: string): Promise<IAppResposeBase<IDocument>> => {
  try {
    const response: IAppResposeBase<IDocument> = await http.get(`/v1/documents/get-by-id/${id}`);
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const getDocumentBySlug = async (slug: string): Promise<IAppResposeBase<IDocument>> => {
  try {
    const response: IAppResposeBase<IDocument> = await http.get(
      `/v1/documents/get-by-slug/${slug}`,
    );
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const updateDocument = async (
  id: string,
  data: IUpdateDocumentRequest,
): Promise<IAppResposeBase<IDocument>> => {
  try {
    const response: IAppResposeBase<IDocument> = await http.put(
      `/v1/documents/update-document/${id}`,
      data,
    );
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const deleteDocument = async (id: string): Promise<IAppResposeBase<IDocument>> => {
  try {
    const response: IAppResposeBase<IDocument> = await http.delete(
      `/v1/documents/delete-document/${id}`,
    );
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const approveDocument = async (id: string): Promise<IAppResposeBase<IDocument>> => {
  try {
    const response: IAppResposeBase<IDocument> = await http.patch(
      `/v1/documents/approve-document/${id}`,
    );
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const rejectDocument = async (id: string): Promise<IAppResposeBase<IDocument>> => {
  try {
    const response: IAppResposeBase<IDocument> = await http.patch(
      `/v1/documents/reject-document/${id}`,
    );
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const toggleBlockDocument = async (id: string): Promise<IAppResposeBase<IDocument>> => {
  try {
    const response: IAppResposeBase<IDocument> = await http.patch(
      `/v1/documents/toggle-block/${id}`,
    );
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const toggleActiveDocument = async (id: string): Promise<IAppResposeBase<IDocument>> => {
  try {
    const response: IAppResposeBase<IDocument> = await http.patch(
      `/v1/documents/toggle-active/${id}`,
    );
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const DocumentService = {
  uploadFile,
  getMyDocuments,
  getPublicDocuments,
  getDocuments,
  createDocument,
  getDocumentById,
  getDocumentBySlug,
  updateDocument,
  deleteDocument,
  approveDocument,
  rejectDocument,
  toggleBlockDocument,
  toggleActiveDocument,
};
export default DocumentService;
