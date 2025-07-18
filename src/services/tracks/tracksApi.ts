import { GetTracksResponse } from '@/sharedTypes/types';
import axios from 'axios';
import { BASE_URL } from '../constants';

export const getTracks = (): Promise<GetTracksResponse> => {
  return axios
    .get<GetTracksResponse>(`${BASE_URL}/catalog/track/all/`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => res.data);
};
