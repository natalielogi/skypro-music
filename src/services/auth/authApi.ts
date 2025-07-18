import axios from 'axios';
import { BASE_URL } from '../constants';

type authUserProps = {
  email: string;
  password: string;
};

type authUserReturn = {
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

export const authUser = (data: authUserProps): Promise<authUserReturn> => {
  return axios
    .post(BASE_URL + '/user/login/', data, {
      headers: {
        'content-type': 'application/json',
      },
    })
    .then((res) => res.data);
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
