// src/api.ts
import axios, { InternalAxiosRequestConfig } from 'axios';

// Create an Axios instance
const api = axios.create({
    baseURL: 'http://aa547d65f2d104528955bbe360e40030-388049372.us-east-2.elb.amazonaws.com:8080', // Replace with your backend URL
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

// Add an interceptor to include the X-PrivateTenant header
api.interceptors.request.use((config) => {
    const organizationName = localStorage.getItem('organizationname');
    if (organizationName) {
        config.headers['X-PrivateTenant'] = organizationName;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;
