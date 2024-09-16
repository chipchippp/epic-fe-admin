import { get, post, put, del } from '~/utils/httpRequest';
import { toast } from 'react-toastify';

export const getOrders = async (currentPage = 1, limit = 10) => {
    try {
        const response = await get(`/orders?page=${currentPage}&limit=${limit}`);
        return response;
    } catch (error) {
        console.error('Error fetching Orders data:', error);
        throw error;
    }
};

export const getAllOrders = async () => {
    try {
        const response = await get(`/orders?page=1&limit=1000`);
        return response;
    } catch (error) {
        console.error('Error fetching Orders data:', error);
        throw error;
    }
};

export const createOrders = async (data) => {
    try {  
        const response = await post(`/orders`, data);
        return response;
    } catch (error) {
        console.error('Failed to create Orders', error);
        throw error;
    }
};

export const editOrders = async (id) => {
    try {
        const response = await get(`/orders/${id}`);
        return response;
    } catch (error) {
        console.error('Error fetching Orders data:', error);
        throw error;
    }
};

export const updateOrders = async (id, status) => {
    try {
        const response = await put(`/orders/changeStatus/${id}`, null, {
            params: { status },
        });
        return response;
    } catch (error) {
        console.error('Failed to update Orders', error);
        throw error;
    }
};

export const deleteOrders = async (id) => {
    try {
        await del(`/orders/id?id=${id}`);
        return true;
    } catch (error) {
        console.error('Failed to delete orders', error);
        throw error;
    }
};