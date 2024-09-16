import { get, post, put, del } from '~/utils/httpRequest';
import { toast } from 'react-toastify';

export const getCategory = async (currentPage = 1, limit = 10) => {
    try {
        const response = await get(`/categories/getAll?page=${currentPage}&limit=${limit}`);
        return response;
    } catch (error) {
        console.error('Error fetching category data:', error);
        throw error;
    }
};

export const getTrashCategory = async (currentPage = 1, limit = 10) => {
    try {
        const response = await get(`/categories/trash?page=${currentPage}&limit=${limit}`);
        return response;
    } catch (error) {
        console.error('Error fetching category data:', error);
        throw error;
    }
};

export const createCategory = async (data) => {
    try {
        const response = await post('/categories', data);
        return response;
    } catch (error) {
        console.error('Failed to create category', error);
        throw error;
    }
};

export const editCategory = async (id) => {
    try {
        const response = await get(`/categories/id/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching category data:', error);
        throw error;
    }
};

export const updateCategory = async (id, data) => {
    try {
        const response = await put(`/categories/${id}`, data);
        return response;
    } catch (error) {
        console.error('Failed to update category', error);
        throw error;
    }
};

export const deleteCategory = async (id) => {
    try {
        await del(`/categories/in-trash/${id}`);
        return true;
    } catch (error) {
        console.error('Failed to delete category', error);
        throw error;
    }
};