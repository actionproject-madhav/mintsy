import api from './api';

export const googleLogin = async (token) => {
  const response = await api.post('/auth/google', { token });
  return response.data;
};

export const getMe = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

export const patchProfile = async (payload) => {
  const response = await api.patch('/auth/me', payload);
  return response.data;
};
