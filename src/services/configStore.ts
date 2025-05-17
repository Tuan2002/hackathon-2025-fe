/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IAppResposeBase } from '@/types/baseType';
import type { IConfig, IConfigFormData } from '@/types/configType';
import http from '@/utils/customAxios';

const getConfigs = async (): Promise<IAppResposeBase<IConfig[]>> => {
  try {
    const response: IAppResposeBase<IConfig[]> = await http.get('/v1/configs/get-configs');
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const getActiveConfig = async (): Promise<IAppResposeBase<IConfig>> => {
  try {
    const response: IAppResposeBase<IConfig> = await http.get('/v1/configs/get-active-config');
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const createConfig = async (data: IConfigFormData): Promise<IAppResposeBase<IConfig>> => {
  try {
    const response: IAppResposeBase<IConfig> = await http.post('/v1/configs/create-config', data);
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};
const updateConfig = async (
  id: string,
  data: IConfigFormData,
): Promise<IAppResposeBase<IConfig>> => {
  try {
    const response: IAppResposeBase<IConfig> = await http.put(
      `/v1/configs/update-config/${id}`,
      data,
    );
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};
const deleteConfig = async (id: string): Promise<IAppResposeBase<IConfig>> => {
  try {
    const response: IAppResposeBase<IConfig> = await http.delete(`/v1/configs/delete-config/${id}`);
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const setActiveConfig = async (id: string): Promise<IAppResposeBase<IConfig>> => {
  try {
    const response: IAppResposeBase<IConfig> = await http.patch(
      `/v1/configs/set-active-config/${id}`,
    );
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

const ConfigService = {
  getConfigs,
  getActiveConfig,
  createConfig,
  updateConfig,
  deleteConfig,
  setActiveConfig,
};
export default ConfigService;
