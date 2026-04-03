import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL;
if (import.meta.env.DEV && !baseURL?.trim()) {
  console.error(
    '[Mintsy] VITE_API_URL is missing. Create frontend/.env.local from .env.example (e.g. VITE_API_URL=http://localhost:5001/api) and restart the dev server.'
  );
}

const api = axios.create({
  baseURL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
