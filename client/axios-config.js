import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

axios.interceptors.request.use((config) => {

    if (config.url !== '/login' && config.url !== '/signup') {
 
      const Token = localStorage.getItem('token');
      config.headers.Authorization = `Bearer ${Token}`;
    }
    return config;
  }); 

export default axios;