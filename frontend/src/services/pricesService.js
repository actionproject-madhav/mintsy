import api from './api';

export async function getSpotPrices() {
  const { data } = await api.get('/prices/spot');
  return data;
}
