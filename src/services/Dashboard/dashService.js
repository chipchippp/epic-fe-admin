import { get } from '~/utils/httpRequest';

export const getProducts = async () => {
    try {
        const response = await get(`/products/getAll?page=1&limit=1000`);
        return response;
    } catch (error) {
        console.error('Error fetching Product data:', error);
        throw error;
    }
};

export const getOrders = async () => {
    try {
        const response = await get(`/orders?page=1&limit=1000`);
        return response;
    } catch (error) {
        console.error('Error fetching Orders data:', error);
        throw error;
    }
};

export const getUsers = async () => {
    try {
        const response = await get(`/users?page=1&limit=1000`);
        return response;
    } catch (error) {
        console.error('Error fetching users data:', error);
        throw error;
    }
};

