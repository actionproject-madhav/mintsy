import api from './api';

export const createListing = async (data) => {
  const response = await api.post('/listings', data);
  return response.data.listing;
};

export const getListings = async (filters) => {
  const response = await api.get('/listings', { params: filters });
  return response.data;
};

export const getListingById = async (id) => {
  const response = await api.get(`/listings/${id}`);
  return response.data.listing;
};

export const getUserListings = async () => {
  const response = await api.get('/listings/user');
  return response.data.listings;
};

export const updateListing = async (id, data) => {
  const response = await api.put(`/listings/${id}`, data);
  return response.data.listing;
};

export const deleteListing = async (id) => {
  const response = await api.delete(`/listings/${id}`);
  return response.data;
};
