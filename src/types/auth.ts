export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  firstName: string;
  lastName?: string;
  phone: string;
  email: string;
  message: string;
}
