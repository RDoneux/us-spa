import axios from 'axios';

const baseURL = import.meta.env.VITE_GATEWAY_SERVICE;

const axiosInstance = axios.create({ baseURL });

axiosInstance.interceptors.request.use((config) => {
  config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    console.log('error.response', response.status);
    return response;
  },
  (error) => {
    console.log('error.response', error);
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
