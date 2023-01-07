export interface ILogin {
  email: string;
  password: string;
}

export interface IUser {
  id?: number;
  username?: string;
  role?: string;
  email?: string;
  password?: string;
}

export interface IResponse {
  [key: string]: object | null | number | string
}
