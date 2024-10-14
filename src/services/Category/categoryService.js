import { get, post, put, del } from '~/utils/httpRequest';

const service = 'product';

export const getCategory = async (currentPage = 1, limit = 10) => {
    try {
        const response = await get(service, `/categories/getAll?page=${currentPage}&limit=${limit}`);
        return response;
    } catch (error) {
        console.error('Error fetching category data:', error);
        throw error;
    }
};

export const getTrashCategory = async (currentPage = 1, limit = 10) => {
    try {
        const response = await get(service, `/categories/trash?page=${currentPage}&limit=${limit}`);
        return response;
    } catch (error) {
        console.error('Error fetching category data:', error);
        throw error;
    }
};

export const createCategory = async (data) => {
    try {
        const response = await post(service, '/categories', data);
        return response;
    } catch (error) {
        console.error('Failed to create category', error);
        throw error;
    }
};

export const editCategory = async (id) => {
    try {
        const response = await get(service, `/categories/id/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching category data:', error);
        throw error;
    }
};

export const updateCategory = async (id, data) => {
    try {
        const response = await put(service, `/categories/${id}`, data);
        return response;
    } catch (error) {
        console.error('Failed to update category', error);
        throw error;
    }
};

export const updateRestoreCategory = async (id) => {
    try {
        await put(service, `/categories/restore/${id}`);
        return true;
    } catch (error) {
        console.error('Failed to update restore category', error);
        throw error;
    }
};

export const deleteCategory = async (id) => {
    try {
        await del(service, `/categories/in-trash/${id}`);
        return true;
    } catch (error) {
        console.error('Failed to delete category', error);
        throw error;
    }
};
