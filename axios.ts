import axios, { AxiosResponse } from 'axios';
import { load, save } from './src/services/LocalStorageService';
import { jwtDecode } from 'jwt-decode';

const baseURL = import.meta.env.VITE_GATEWAY_SERVICE;
const axiosInstance = axios.create({ baseURL });

async function useRefreshToken() {
  const maybeRefreshToken = load('refresh_token');
  if (!tokenIsValid(maybeRefreshToken)) {
    throw new Error('Invalid refresh token');
  }

  try {
    const response: AxiosResponse = await axios.post(`${baseURL}/refresh-token`, {}, {
      headers: { Authorization: `Bearer ${maybeRefreshToken}` }
    });
    save('access_token', response.data.accessToken);
    save('refresh_token', response.data.refreshToken);
    return response.data.accessToken;
  } catch (error) {
    throw new Error('Failed to refresh token');
  }
}

axiosInstance.interceptors.request.use(async (config) => {
  let maybeAccessToken = load('access_token');

  if (tokenIsValid(maybeAccessToken)) {
    config.headers['Authorization'] = `Bearer ${maybeAccessToken}`;
    return config;
  }

  try {
    maybeAccessToken = await useRefreshToken();
    config.headers['Authorization'] = `Bearer ${maybeAccessToken}`;
  } catch (error) {
    window.location.href = '/login';
    return Promise.reject(error);
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

function tokenIsValid(token: string | null): string {
  if (!token) return '';
  const decodedToken = jwtDecode(token);
  const now = Date.now().valueOf() / 1000;
  if (!decodedToken.exp) return '';
  return decodedToken.exp > now ? token : '';
}

export default axiosInstance;
