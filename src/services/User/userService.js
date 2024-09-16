import { get, post, put, del } from '~/utils/httpRequest';

export const getUsers = async (currentPage = 1, limit = 10) => {
    try {
        const response = await get(`/users?page=${currentPage}&limit=${limit}`);
        return response;
    } catch (error) {
        console.error('Error fetching Users data:', error);
        throw error;
    }
};

export const getOrderUser = async (id) => {
    try {
        const response = await get(`/orders/user/${id}`);
        return response;
    } catch (error) {
        console.error('Error fetching orders Users data:', error);
        throw error;
    }
};

export const createUsers = async (data) => {
    try {
        const response = await post('/users', data);
        return response;
    } catch (error) {
        console.error('Failed to create Users', error);
        throw error;
    }
};

export const editUsers = async (id) => {
    try {
        const response = await get(`/users/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching Users data:', error);
        throw error;
    }
};

export const updateUsers = async (id, data) => {
    try {
        const response = await put(`/users/${id}`, data);
        return response;
    } catch (error) {
        console.error('Failed to update Users', error);
        throw error;
    }
};

export const deleteUsers = async (id) => {
    try {
        await del(`/users/in-trash/${id}`);
        return true;
    } catch (error) {
        console.error('Failed to delete Users', error);
        throw error;
    }
};