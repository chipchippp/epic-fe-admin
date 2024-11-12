import axios from 'axios';
import getBaseUrl from './baseUrl';
import { jwtDecode } from 'jwt-decode';
import { toast, ToastContainer } from 'react-toastify';
export const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

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
        (error) => Promise.reject(error),
    );

    httpRequest.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            // Kiểm tra nếu lỗi là do expired token (status 401)
            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                const refreshToken = localStorage.getItem('refreshToken');

                if (refreshToken) {
                    try {
                        // Gửi refreshToken lên server để lấy accessToken mới
                        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/refresh`, {
                            refreshToken,
                        });

                        const { accessToken } = response.data;
                        localStorage.setItem('accessToken', accessToken); // Lưu accessToken mới

                        // Gửi lại yêu cầu ban đầu với accessToken mới
                        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                        return httpRequest(originalRequest);
                    } catch (error) {
                        console.log('Refresh token is invalid or expired');
                        toast.error('Session expired. Please log in again.');
                        localStorage.removeItem('accessToken');
                        localStorage.removeItem('refreshToken');
                        localStorage.removeItem('roles');
                        localStorage.removeItem('id');
                        localStorage.removeItem('username');
                        window.location.href = '/login';
                    }
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
