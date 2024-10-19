import axios from "axios";

const axiosAPI = axios.create({
  baseURL: `http://localhost:8000/api`
})

axiosAPI.interceptors.request.use((config) => {
  return config;
})

axiosAPI.interceptors.response.use((response) => {
  return response
}, (error) => {
 
  throw error;
})

export default axiosAPI