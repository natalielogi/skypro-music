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

export const authUser = (data: authUserprops): Promise<authUserreturn> => {
  return axios.post(BASE_URL + '/user/login/', data, {
    headers: {
      'content-type': 'application/json',
    },
  });
};
