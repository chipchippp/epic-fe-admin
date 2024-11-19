import axios from 'axios';
import getBaseUrl from './baseUrl';
import { toast } from 'react-toastify';
import { navigate } from 'react-router-dom';

export const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
        throw new Error('No refresh token available');
    }

    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/refresh`, { refreshToken });
    if (response && response.data && response.data.accessToken) {
        localStorage.setItem('accessToken', response.data.accessToken);
        return response.data.accessToken;
    } else {
        throw new Error('Failed to refresh access token');
    }
};

export const createHttpRequest = (service) => {
    const httpRequest = axios.create({
        baseURL: getBaseUrl(service),
    });

    httpRequest.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('accessToken');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        },
    );

    httpRequest.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            const originalRequest = error.config;
            if (error.response && error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                try {
                    const newAccessToken = await refreshAccessToken();
                    axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                    return httpRequest(originalRequest);
                } catch (refreshError) {
                    localStorage.clear();
                    toast.error('Session expired. Please log in again.');
                    navigate('/login');
                }
            }
            return Promise.reject(error);
        },
    );

    return httpRequest;
};

export const get = async (service, path, options = {}) => {
    const httpRequest = createHttpRequest(service);
    const response = await httpRequest.get(path, options);
    return response.data;
};

export const post = async (service, path, data, options = {}) => {
    const httpRequest = createHttpRequest(service);
    const response = await httpRequest.post(path, data, options);
    return response.data;
};

export const put = async (service, path, data, options = {}) => {
    const httpRequest = createHttpRequest(service);
    const response = await httpRequest.put(path, data, options);
    return response.data;
};

export const del = async (service, path, options = {}) => {
    const httpRequest = createHttpRequest(service);
    const response = await httpRequest.delete(path, options);
    return response.data;
};

export const isAuthenticated = () => {
    return !!localStorage.getItem('accessToken');
};
