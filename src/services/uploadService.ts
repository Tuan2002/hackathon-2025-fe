import { CLOUND_PRESET, type CloudPresets } from '@/constants/cloudPreset';
import Environment from '@/constants/env';
import type { IAppResposeBase, IUploadImageResponse } from '@/types/baseType';
import axios from 'axios';

const uploadAnImage = async (
  image: File,
  CloudPreset?: CloudPresets,
): Promise<IAppResposeBase<IUploadImageResponse>> => {
  try {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('cloud_name', String(Environment.CLOUD_NAME));
    formData.append('upload_preset', CloudPreset ?? CLOUND_PRESET.IMAGE);
    const response = await axios.post(
      `${Environment.CLOUD_BASE_URL}${Environment.CLOUD_NAME}/image/upload`,
      formData,
    );
    const data: IAppResposeBase<IUploadImageResponse> = {
      success: true,
      data: response.data,
      statusCode: response.status,
      message: '',
    };
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw error.response.data;
  }
};

const uploadAnAudio = async (
  audio: File | Blob,
  CloudPreset?: CloudPresets,
): Promise<IAppResposeBase<IUploadImageResponse>> => {
  try {
    const formData = new FormData();
    formData.append('file', audio);
    formData.append('cloud_name', String(Environment.CLOUD_NAME));
    formData.append('upload_preset', CloudPreset ?? CLOUND_PRESET.IMAGE);
    const response = await axios.post(
      `${Environment.CLOUD_BASE_URL}${Environment.CLOUD_NAME}/video/upload`,
      formData,
    );
    const data: IAppResposeBase<IUploadImageResponse> = {
      success: true,
      data: response.data,
      statusCode: response.status,
      message: '',
    };
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw error.response.data;
  }
};

const deleteAnImage = async (url: string): Promise<IAppResposeBase<IUploadImageResponse>> => {
  try {
    if (!url || !url.trim()) {
      throw new Error('Invalid url');
    }
    const publicId = url.split('/').pop()?.split('.')[0];
    if (!publicId) {
      throw new Error('Invalid url');
    }
    const params = {
      public_id: publicId,
      api_key: Environment.CLOUD_API_KEY,
      api_secret: Environment.CLOUD_API_SECRET,
    };
    const response = await axios.post(
      `${Environment.CLOUD_BASE_URL}${Environment.CLOUD_NAME}/image/destroy`,
      params,
    );
    const data: IAppResposeBase<IUploadImageResponse> = {
      success: true,
      data: response.data,
      statusCode: response.status,
      message: '',
    };
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw error.response.data;
  }
};

const uploadService = {
  uploadAnImage,
  uploadAnAudio,
  deleteAnImage,
};
export default uploadService;
