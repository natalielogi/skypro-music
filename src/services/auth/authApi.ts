import axios from 'axios';
import { BASE_URL } from '../constants';
import {
  accessTokenType,
  authUserProps,
  authUserReturn,
  refreshTokenType,
  registerUserReturn,
  registerUserprops,
  tokensType,
} from '@/sharedTypes/types';
import axiosInstance from '../axiosInstance';

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
  return axios
    .post(BASE_URL + '/user/signup', data, {
      headers: {
        'content-type': 'application/json',
      },
    })
    .then((res) => res.data);
};

export const getTokens = (data: authUserProps): Promise<tokensType> => {
  return axiosInstance.post('/user/token/', data).then((res) => res.data);
};

export const refreshToken = (
  data: refreshTokenType,
): Promise<accessTokenType> => {
  return axiosInstance
    .post('/user/token/refresh/', data)
    .then((res) => res.data);
};
