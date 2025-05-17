export interface IConfig {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  isActive: boolean;
  config: {
    maxLoginAttempts: number;
    maxHomePageDocument: number;
    maxHomePageBanner: number;
    maxHomePagePost: number;
  };
}

export interface IConfigFormData {
  name: string;
  config: {
    maxLoginAttempts: number;
    maxHomePageDocument: number;
    maxHomePageBanner: number;
    maxHomePagePost: number;
  };
}
