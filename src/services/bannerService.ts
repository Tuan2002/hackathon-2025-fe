/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IBanner, ICreateBannerRequest, IUpdateBannerRequest } from '@/types/bannerType';
import type { IAppResposeBase } from '@/types/baseType';
import http from '@/utils/customAxios';

const getBanners = async (): Promise<IAppResposeBase<IBanner[]>> => {
  try {
    const response: IAppResposeBase<IBanner[]> = await http.get('/v1/banners/get-banners');
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const getActiveBanners = async (): Promise<IAppResposeBase<IBanner[]>> => {
  try {
    const response: IAppResposeBase<IBanner[]> = await http.get('/v1/banners/get-active-banners');
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const getBanner = async (id: string): Promise<IAppResposeBase<IBanner>> => {
  try {
    const response: IAppResposeBase<IBanner> = await http.get(`/v1/banners/get-banner/${id}`);
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const updateBanner = async (
  id: string,
  data: IUpdateBannerRequest,
): Promise<IAppResposeBase<IBanner>> => {
  try {
    const response: IAppResposeBase<IBanner> = await http.put(
      `/v1/banners/update-banner/${id}`,
      data,
    );
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const createBanner = async (data: ICreateBannerRequest): Promise<IAppResposeBase<IBanner>> => {
  try {
    const response: IAppResposeBase<IBanner> = await http.post('/v1/banners/create-banner', data);
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const getDeletedBanners = async (): Promise<IAppResposeBase<IBanner[]>> => {
  try {
    const response: IAppResposeBase<IBanner[]> = await http.get('/v1/banners/get-deleted-banners');
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const restoreBanner = async (id: string): Promise<IAppResposeBase<IBanner>> => {
  try {
    const response: IAppResposeBase<IBanner> = await http.put(`/v1/banners/restore-banner/${id}`);
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const deleteBanner = async (id: string): Promise<IAppResposeBase<IBanner>> => {
  try {
    const response: IAppResposeBase<IBanner> = await http.delete(`/v1/banners/delete-banner/${id}`);
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const changeBannerStatus = async (id: string): Promise<IAppResposeBase<IBanner>> => {
  try {
    const response: IAppResposeBase<IBanner> = await http.patch(`/v1/banners/toggle-status/${id}`);
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const BannerService = {
  getBanners,
  getActiveBanners,
  getBanner,
  updateBanner,
  createBanner,
  getDeletedBanners,
  restoreBanner,
  deleteBanner,
  changeBannerStatus,
};
export default BannerService;
