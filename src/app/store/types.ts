export interface IUser {
  id: number;
  username: string;
  email: string;
  address: string;
}

export interface IMeta {
  currentPage: number;
  perPage: number;
  totalPages: number;
}

export interface IResponse<T> {
  meta: IMeta;
  items: T;
}
