import { get, post, put, del } from '~/utils/httpRequest';

const service = 'inventory';

export const getAllInventoryStatus = async (currentPage = 1, limit = 10) => {
    try {
        const response = await get(service, `/inventory_status?page=${currentPage}&limit=${limit}`);
        return response;
    } catch (error) {
        console.error('Error fetching InventoryStatus data:', error);
        throw error;
    }
};

export const getInventoryStatus = async () => {
    try {
        const response = await get(service, `inventory_status?page=1&limit=10`);
        return response;
    } catch (error) {
        console.error('Error fetching InventoryStatus data:', error);
        throw error;
    }
};

export const createInventoryStatus = async (data) => {
    try {
        const response = await post(service, '/inventory_status', data);
        return response;
    } catch (error) {
        console.error('Failed to create InventoryStatus', error);
        throw error;
    }
};

export const editInventoryStatus = async (id) => {
    try {
        const response = await get(service, `/inventory_status/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching InventoryStatus data:', error);
        throw error;
    }
};

export const updateInventoryStatus = async (id, data) => {
    try {
        const response = await put(service, `/inventory_status/${id}`, data);
        return response;
    } catch (error) {
        console.error('Failed to update InventoryStatus', error);
        throw error;
    }
};

export const deleteInventoryStatus = async (id) => {
    try {
        await del(service, `/inventory_status/in-trash/${id}`);
        return true;
    } catch (error) {
        console.error('Failed to delete InventoryStatus', error);
        throw error;
    }
};
