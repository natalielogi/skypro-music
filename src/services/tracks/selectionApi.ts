import { GetSelectionsResponse } from '@/sharedTypes/types';
import axios from 'axios';
import { BASE_URL } from '../constants';

export const getSelections = (): Promise<GetSelectionsResponse> => {
  return axios
    .get<GetSelectionsResponse>(`${BASE_URL}/catalog/selections/all`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => res.data);
};
