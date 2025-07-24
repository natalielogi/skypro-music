import axiosInstance from '../axiosInstance';

export const getFavorites = () => {
  return axiosInstance.get('/catalog/track/favorite/all');
};

export const addToFavorites = (trackId: number): Promise<void> => {
  return axiosInstance
    .post(`/catalog/track/${trackId}/favorite/`)
    .then(() => {});
};

export const removeFromFavorites = (trackId: number): Promise<void> => {
  return axiosInstance
    .delete(`/catalog/track/${trackId}/favorite/`)
    .then(() => {});
};
