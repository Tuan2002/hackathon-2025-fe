/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IAppResposeBase } from '@/types/baseType';
import type {
  IComment,
  ICreateDocumentRequest,
  IDocument,
  IGenerateSummaryResponse,
  IGetDownloadDocumentUrlResponse,
  ISendCommentRequest,
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

const getDocumentPreview = async (id: string): Promise<string> => {
  try {
    const response: string = await http.get(`/v1/documents/get-document-preview/${id}`, {
      responseType: 'blob',
    });
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const getDownloadDocumentUrl = async (
  id: string,
): Promise<IAppResposeBase<IGetDownloadDocumentUrlResponse>> => {
  try {
    const response: IAppResposeBase<IGetDownloadDocumentUrlResponse> = await http.get(
      `/v1/documents/get-download-url/${id}`,
    );
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const generateSummary = async (id: string): Promise<IAppResposeBase<IGenerateSummaryResponse>> => {
  try {
    const response: IAppResposeBase<IGenerateSummaryResponse> = await http.get(
      `/v1/documents/generate-summary/${id}`,
    );
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};
const getFavoriteDocuments = async (): Promise<IAppResposeBase<IDocument[]>> => {
  try {
    const response: IAppResposeBase<IDocument[]> = await http.get(
      '/v1/documents/get-favorite-documents',
    );
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const favoriteDocument = async (id: string): Promise<IAppResposeBase<IDocument>> => {
  try {
    const response: IAppResposeBase<IDocument> = await http.patch(
      `/v1/documents/favorite-document/${id}`,
    );
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};
const getDownloadedDocuments = async (): Promise<IAppResposeBase<IDocument[]>> => {
  try {
    const response: IAppResposeBase<IDocument[]> = await http.get(
      '/v1/documents/downloaded-documents',
    );
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};
const getAllDownloadedDocuments = async (): Promise<IAppResposeBase<IDocument[]>> => {
  try {
    const response: IAppResposeBase<IDocument[]> = await http.get(
      '/v1/documents/all-downloaded-documents',
    );
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const getAuthDocuments = async (): Promise<IAppResposeBase<IDocument[]>> => {
  try {
    const response: IAppResposeBase<IDocument[]> = await http.get(
      '/v1/documents/get-auth-documents',
    );
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const getAuthDocumentBySlug = async (slug: string): Promise<IAppResposeBase<IDocument>> => {
  try {
    const response: IAppResposeBase<IDocument> = await http.get(
      `/v1/documents/auth-get-by-slug/${slug}`,
    );
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const textToSpeech = async (id: string): Promise<any> => {
  try {
    const response = await http.get(`/v1/documents/generate-audio-summary/${id}`, {
      responseType: 'blob',
    });
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const postComment = async (
  documentId: string,
  data: ISendCommentRequest,
): Promise<IAppResposeBase<IComment>> => {
  try {
    const response: IAppResposeBase<IComment> = await http.post(
      `/v1/documents/post-comment/${documentId}`,
      data,
    );
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const getComments = async (documentId: string): Promise<IAppResposeBase<IComment[]>> => {
  try {
    const response: IAppResposeBase<IComment[]> = await http.get(
      `/v1/documents/get-comments/${documentId}`,
    );
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const updateComment = async (
  commentId: string,
  data: ISendCommentRequest,
): Promise<IAppResposeBase<IComment>> => {
  try {
    const response: IAppResposeBase<IComment> = await http.patch(
      `/v1/documents/update-comment/${commentId}`,
      data,
    );
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const deleteComment = async (commentId: string): Promise<IAppResposeBase<IComment>> => {
  try {
    const response: IAppResposeBase<IComment> = await http.delete(
      `/v1/documents/delete-comment/${commentId}`,
    );
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const replyComment = async (
  commentId: string,
  data: ISendCommentRequest,
): Promise<IAppResposeBase<IComment>> => {
  try {
    const response: IAppResposeBase<IComment> = await http.post(
      `/v1/documents/reply-comment/${commentId}`,
      data,
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
  getDocumentPreview,
  getDownloadDocumentUrl,
  generateSummary,
  getFavoriteDocuments,
  favoriteDocument,
  getDownloadedDocuments,
  getAllDownloadedDocuments,
  getAuthDocuments,
  getAuthDocumentBySlug,
  textToSpeech,
  postComment,
  getComments,
  updateComment,
  deleteComment,
  replyComment,
};
export default DocumentService;
