export interface UserDataType {
  firstName: string;
  lastName?: string;
  phone: string;
  email: string;
}

export interface UserCredentialsType {
  password: string;
  authToken: string;
}
