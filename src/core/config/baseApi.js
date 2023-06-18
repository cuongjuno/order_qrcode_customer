/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import axios from 'axios';

import { cache, sessionCache } from '~utils/cache';
import objectHelper from '~utils/objectHelper';

import BASE_URL from './endpoint';
import PATH_URL from './pathURL';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
api.interceptors.request.use(
  // Do something before request is sent
  (config) => {
    const token = cache.get('token') || sessionCache.get('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    if (!['get', 'delete'].includes(config.method)) {
      config.transformRequest = [
        (data) => {
          if (typeof data === 'object') {
            return objectHelper.trim(data);
          }
          return data;
        },
        ...axios.defaults.transformRequest,
      ];
    }
    return config;
  },
  // Do something with request error
  (error) => Promise.reject(error),
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (response.request.responseType === 'blob') {
      return response;
    }
    return response.data;
  },
  async (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (
      error.response.data.errors?.[0].detail === 'Unauthorized'
      && window.location.pathname !== PATH_URL.LOGIN
      && !error.config._retry
    ) {
      error.config._retry = true;
      try {
        const refreshToken = cache.get('refreshToken') || sessionCache.get('refreshToken');

        const { data } = await api.post('/auth/refresh', {
          refreshToken,
        });

        if (cache.get('token')) {
          cache.set('token', data?.accessToken);
          cache.set('refreshToken', data?.refreshToken);
        } else {
          sessionCache.set('token', data?.accessToken);
          sessionCache.set('refreshToken', data?.refreshToken);
        }
        error.config.headers.Authorization = `Bearer ${data?.accessToken}`;
        return api(error.config);
      } catch (err) {
        if (cache.get('token')) {
          cache.remove('token');
          cache.remove('refreshToken');
        } else {
          sessionCache.remove('token');
          sessionCache.remove('refreshToken');
        }
        window.location = PATH_URL.LOGIN;
      }
      // eslint-disable-next-line no-empty
    } else {
      // TODO: document why this block is empty
    }
    return Promise.reject(error);
  },
);

export default api;
