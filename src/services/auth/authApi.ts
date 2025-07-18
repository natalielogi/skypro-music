import axios from 'axios';
import { BASE_URL } from '../constants';

type authUserprops = {
  email: string;
  password: string;
};

type authUserreturn = {
  email: string;
  username: string;
  _id: number;
};

type registerUserprops = {
  email: string;
  password: string;
  username: string;
};

type registerUserReturn = {
  message: string;
  result: {
    username: string;
    email: string;
    _id: number;
  };
  success: boolean;
};

export const authUser = (data: authUserprops): Promise<authUserreturn> => {
  return axios.post(BASE_URL + '/user/login/', data, {
    headers: {
      'content-type': 'application/json',
    },
  });
};

export const registerUser = (
  data: registerUserprops,
): Promise<registerUserReturn> => {
  return axios.post(BASE_URL + '/user/signup', data, {
    headers: {
      'content-type': 'application/json',
    },
  });
};
