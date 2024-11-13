import { get, post, put, del } from '~/utils/httpRequest';

const service = 'user';

export const getAllUsers = async (currentPage = 1, limit = 10) => {
    try {
        const response = await get(service, `/users/count`);
        return response;
    } catch (error) {
        console.error('Error fetching Users data:', error);
        throw error;
    }
};

export const getUsers = async (currentPage = 1, limit = 10) => {
    try {
        const response = await get(service, `/users?page=${currentPage}&limit=${limit}`);
        return response;
    } catch (error) {
        console.error('Error fetching Users data:', error);
        throw error;
    }
};

export const getUserCount = async () => {
    try {
        const response = await get(service, `/users/count`);
        return response;
    } catch (error) {
        console.error('Error fetching Users data:', error);
        throw error;
    }
};

export const getOrderUser = async (id, data) => {
    try {
        const response = await post(service, `/orders/user/${id}`, data);
        return response;
    } catch (error) {
        console.error('Error fetching orders Users data:', error);
        throw error;
    }
};

export const createUsers = async (data) => {
    try {
        const response = await post(service, '/users', data);
        return response;
    } catch (error) {
        console.error('Failed to create Users', error);
        throw error;
    }
};

export const editUsers = async (id) => {
    try {
        const response = await get(service, `/users/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching Users data:', error);
        throw error;
    }
};

export const updateUsers = async (id, data) => {
    try {
        const response = await put(service, `/users/${id}`, data);
        return response;
    } catch (error) {
        console.error('Failed to update Users', error);
        throw error;
    }
};

export const deleteUsers = async (id) => {
    try {
        await del(service, `/users/in-trash/${id}`);
        return true;
    } catch (error) {
        console.error('Failed to delete Users', error);
        throw error;
    }
};
