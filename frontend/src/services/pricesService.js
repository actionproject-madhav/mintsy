import api from './api';

export async function getSpotPrices() {
  const { data } = await api.get('/prices/spot');
  return data;
}

/** @param {{ metal?: string; interval?: string }} params */
export async function getMetalHistory(params = {}) {
  const { data } = await api.get('/prices/history', { params });
  return data;
}
