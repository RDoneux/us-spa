import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { load, save } from '../services/LocalStorageService';
import { jwtDecode } from 'jwt-decode';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useRef } from 'react';

const BASE_URL = import.meta.env.VITE_GATEWAY_SERVICE;
const HEALTH_ENDPOINT = '/actuator/health';
const SERVICE_CONNECTION_ATTEMPTS = 5;
const ACCESS_TOKEN_KEY  = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

// Axios hook to handle token refresh and service spinup
export default function useAxios() {
  if (!BASE_URL) throw new Error('Gateway service URL not found');

  const axiosInstance = axios.create({ baseURL: BASE_URL });
  const navigate = useNavigate();
  const lastPathRef = useRef<string>('/');

  axiosInstance.interceptors.request.use(async (config) => {
    lastPathRef.current = window.location.pathname;
    return await awaitServiceSpinup(config, navigate, lastPathRef.current);
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401 || error.response.status === 403)
        navigate('/login');
      return Promise.reject(error);
    }
  );

  return axiosInstance;
}

async function awaitServiceSpinup(
  config: InternalAxiosRequestConfig<any>,
  navigate: NavigateFunction,
  lastPath: string,
  attempts: number = 0
): Promise<InternalAxiosRequestConfig<any>> {
  try {
    await axios.get(`${BASE_URL}${HEALTH_ENDPOINT}`);
    navigate(lastPath);
    return await attachAccessToken(config, navigate);
  } catch {
    if (attempts < SERVICE_CONNECTION_ATTEMPTS) {
      navigate('/loading');
      await new Promise((resolve) => setTimeout(resolve, 10000));
      return await awaitServiceSpinup(config, navigate, lastPath, attempts + 1);
    }
    navigate('/service-unavailable');
    return config;
  }
}

async function attachAccessToken(
  config: InternalAxiosRequestConfig<any>,
  navigate: NavigateFunction
): Promise<InternalAxiosRequestConfig<any>> {
  let maybeAccessToken = load(ACCESS_TOKEN_KEY);

  if (tokenIsValid(maybeAccessToken)) {
    console.log("Attaching access token", maybeAccessToken);
    config.headers['Authorization'] = `Bearer ${maybeAccessToken}`;
    return config;
  }

  try {
    maybeAccessToken = await refreshToken();
    console.log("Refreshing access token", maybeAccessToken);
    config.headers['Authorization'] = `Bearer ${maybeAccessToken}`;
  } catch (error) {
    console.log("Failed to refresh access token");
    navigate('/login');
  }
  return config;
}

/**
 * @return accessToken;
 */
async function refreshToken(): Promise<string> {
  const maybeRefreshToken = load(REFRESH_TOKEN_KEY);

  console.log("Using refreshing token", maybeRefreshToken);
  if (!tokenIsValid(maybeRefreshToken)) {
    console.log("Invalid refresh token");
    throw new Error('Invalid refresh token');
  }

  try {
    const response: AxiosResponse = await axios.post(
      `${BASE_URL}/refresh-token`,
      {},
      {
        headers: { Authorization: `Bearer ${maybeRefreshToken}` }
      }
    );
    save(ACCESS_TOKEN_KEY, response.data.accessToken);
    save(REFRESH_TOKEN_KEY, response.data.refreshToken);
    return response.data.accessToken;
  } catch {
    throw new Error('Failed to refresh token');
  }
}

function tokenIsValid(token: string | null): string {
  if (!token) return '';
  const decodedToken = jwtDecode(token);
  const now = Date.now().valueOf() / 1000;
  if (!decodedToken.exp) return '';
  return decodedToken.exp > now ? token : '';
}
