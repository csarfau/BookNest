import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
});

axiosClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("ACCESS_TOKEN");
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config;
})

axiosClient.interceptors.response.use((response: AxiosResponse) => {
  return response;
}, (error: AxiosError) => {
  try {
    const { response } = error;
    if(response?.status === 401) {
      localStorage.removeItem("ACCESS_TOKEN");      
    }
  } catch (err) {
    throw err;
  }

  throw error;
});

export default axiosClient;