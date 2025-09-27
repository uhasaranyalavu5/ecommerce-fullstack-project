// src/api.js

import axios from 'axios';

// Create an instance of axios
const api = axios.create({
  baseURL: 'http://localhost:8000', // Your Django server's address
});

// Use an interceptor to add the token to every request
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default api;