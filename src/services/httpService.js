import axios from "axios";

const token = window.localStorage.getItem("token");
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_API_URL,
  timeout: 15000,
});

instance.interceptors.request.use((config) => {
  return {
    ...config,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const responseBody = (response) => response.data.data;

const requests = {
  get: (url) => instance.get(url).then(responseBody),
  post: (url, body) => instance.post(url, body).then(responseBody),
  patch: (url, body) => instance.patch(url, body).then(responseBody),
  delete: (url) => instance.delete(url).then(responseBody),
};

export default requests;
