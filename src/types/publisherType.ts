export interface IPublisher {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreatePublisherRequest {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface IUpdatePublisherRequest {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface IPublisherFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
}
