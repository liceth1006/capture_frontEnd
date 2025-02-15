
import axios from 'axios';

const api = axios.create({
  baseURL:import.meta.env.PUBLIC_API_URL || "http://127.0.0.1:8000/api/capture/",
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
