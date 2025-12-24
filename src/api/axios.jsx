// src/api/axios.js
import axios from 'axios';

const API_URL = 'https://zoro-zone-backend.onrender.com'; 

const authAxios = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Automatically attach JWT token to every request
authAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken'); // Get token from local storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default authAxios;
