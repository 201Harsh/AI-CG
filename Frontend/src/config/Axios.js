import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

export default AxiosInstance;
