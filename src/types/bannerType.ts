export interface IBanner {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateBannerRequest {
  title: string;
  description: string;
  image: string;
  link: string;
  isActive: boolean;
}
export interface IUpdateBannerRequest {
  title: string;
  description: string;
  image: string;
  link: string;
  isActive: boolean;
}

export interface IBannerData {
  title: string;
  description: string;
  image: string;
  link: string;
  isActive: boolean;
}
