import axios from 'axios';
import { BASE_URL } from '../constants';
import {
  authUserProps,
  authUserReturn,
  registerUserReturn,
  registerUserprops,
} from '@/sharedTypes/types';

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
