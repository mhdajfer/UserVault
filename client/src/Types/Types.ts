export type axiosResponseType = {
  success: boolean;
  message: string;
};

export type signupStateType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword?: string;
  phone: string;
  age: string;
};
