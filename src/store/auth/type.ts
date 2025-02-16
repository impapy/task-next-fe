export enum UserType {
  ADMIN = "ADMIN",
  USER = "USER",
}

export interface User {
  name: string;
  id: string;
  email: string;
  image?: string;
  userType: UserType;
  isActive: boolean;
  createdAt: Date;
  modifiedAt: Date;
  isDeleted: boolean;
}

export interface LoginResponse {
  token: string;
  user: User;
  userType?: UserType;
}
