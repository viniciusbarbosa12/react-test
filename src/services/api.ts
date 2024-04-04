import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

import config from "../config/index";

const api: AxiosInstance = axios.create({
  baseURL: config.url,
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response && error.response.status === 500) {
      console.log(error);
    }
    return Promise.reject(error);
  }
);

export default api;
