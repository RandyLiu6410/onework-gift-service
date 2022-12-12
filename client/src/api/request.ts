import axios from "axios";

const service = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_BASE_URL,
  timeout: 50000,
});

service.interceptors.request.use(
  (config) => {
    return config;
  },
  // eslint-disable-next-line handle-callback-err
  (error) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (rsp) => {
    return rsp;
  },
  (err) => {
    switch (err.response.status) {
      case 401:
        break;
      case 403:
        break;
      case 500:
        break;
      case 404:
        break;
      default:
        return Promise.reject(err);
    }
    return Promise.reject(err);
  }
);

export default service;
