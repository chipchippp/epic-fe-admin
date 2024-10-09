import { get, post, put, del } from '~/utils/httpRequest';

const service = 'inventory';

export const getInventory = async (currentPage = 1, limit = 10) => {
    try {
        const response = await get(service, `/inventory?page=${currentPage}&limit=${limit}`);
        return response;
    } catch (error) {
        console.error('Error fetching Inventory data:', error);
        throw error;
    }
};

export const createInventory = async (data) => {
    try {
        const response = await post(service, '/inventory', data);
        return response;
    } catch (error) {
        console.error('Failed to create Inventory', error);
        throw error;
    }
};

export const editInventory = async (id) => {
    try {
        const response = await get(service, `/inventory/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching Inventory data:', error);
        throw error;
    }
};

export const updateInventory = async (id, data) => {
    try {
        const response = await put(service, `/inventory/${id}`, data);
        return response;
    } catch (error) {
        console.error('Failed to update Inventory', error);
        throw error;
    }
};

export const deleteInventory = async (id) => {
    try {
        await del(service, `/inventory/in-trash/${id}`);
        return true;
    } catch (error) {
        console.error('Failed to delete Inventory', error);
        throw error;
    }
};
