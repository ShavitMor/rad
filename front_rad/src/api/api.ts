// src/api.ts
import axios, { InternalAxiosRequestConfig } from 'axios';

// Create an Axios instance
const api = axios.create({
    baseURL: 'http://localhost:8080', // Replace with your backend URL
});

// Add a request interceptor to attach the JWT token
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('token');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
