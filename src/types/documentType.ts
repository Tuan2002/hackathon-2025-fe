import type { DOCUMENT_STATUSES } from '@/constants/documentStatuses';
import type { FILE_TYPES } from '@/constants/fileTypes';

export type EDocumentStatus = (typeof DOCUMENT_STATUSES)[keyof typeof DOCUMENT_STATUSES];

export type EFileTypes = (typeof FILE_TYPES)[keyof typeof FILE_TYPES];

export interface IDocument {
  id: string;
  slug: string;
  name: string;
  image: string;
  status: EDocumentStatus;
  isActive: boolean;
  authorId: string;
  publisherId: string;
  categoryId: string;
  shortDescription: string;
  description: string;
  viewCount: number;
  downloadCount: number;
  fileKey: string;
  fileName: string;
  fileType: EFileTypes;
  categoryName: string;
  authorName: string;
  categorySlug: string;
  publisherName: string;
  createdAt: string;
  updatedAt: string;
  isFavorite: boolean;
  favoriteCount: number;
  rejectedReason: string | null;
}

export interface IUploadDocumentResponse {
  originalname: string;
  key: string;
  mimetype: EFileTypes;
  size: number;
}

export interface ICreateDocumentRequest {
  name: string;
  image: string;
  authorId: string;
  publisherId: string;
  categoryId: string;
  shortDescription: string;
  description: string;
  fileKey: string;
  fileName: string;
  fileType: EFileTypes;
}

export interface IUpdateDocumentRequest {
  name: string;
  image: string;
  authorId: string;
  publisherId: string;
  categoryId: string;
  shortDescription: string;
  description: string;
  fileKey: string;
  fileName: string;
  fileType: EFileTypes;
}

export interface IDocumentFormData {
  name: string;
  image: string;
  authorId: string;
  publisherId: string;
  categoryId: string;
  shortDescription: string;
  description: string;
  fileKey: string;
  fileName: string;
  fileType: EFileTypes;
}

export interface IGetDownloadDocumentUrlResponse {
  url: string;
  expiresAt: string;
}

export interface IGenerateSummaryResponse {
  content: string;
  documentId: string;
}

export interface ISendCommentRequest {
  content: string;
  image: string | null;
}

export interface IComment {
  id: string;
  createdAt: string;
  updatedAt: string;
  parentId: string;
  documentId: string;
  commenterId: string;
  content: string;
  image: string;
  isEdited: true;
  likeCount: number;
  dislikeCount: number;
  replyCount: number;
  commenterName: string;
  commenterImage: string;
}

export interface IDocumentUser {
  userId: string;
  documentId: string;
  userName: string;
  userEmail: string;
  avatar: string;
}
