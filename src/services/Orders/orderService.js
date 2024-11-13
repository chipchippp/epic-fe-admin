import { get, post, put, del } from '~/utils/httpRequest';

const service = 'order';

export const getFilteredOrders = async (params) => {
    try {
        const response = await get(service, `/orders/search-by-specification`, { params });
        return response;
    } catch (error) {
        console.error('Error fetching Orders data:', error);
        throw error;
    }
};

export const getAllOrders = async () => {
    try {
        const response = await get(service, `/orders?page=1&limit=100`);
        return response;
    } catch (error) {
        console.error('Error fetching Orders data:', error);
        throw error;
    }
};

export const getOrderCount = async () => {
    try {
        const response = await get(service, `/orders/count/status`);
        return response;
    } catch (error) {
        console.error('Error fetching Orders data:', error);
        throw error;
    }
};

export const editOrders = async (id) => {
    try {
        const response = await get(service, `/orders/${id}`);
        return response;
    } catch (error) {
        console.error('Error fetching Orders data:', error);
        throw error;
    }
};

export const updateOrders = async (id, status) => {
    try {
        const response = await put(service, `/orders/changeStatus/${id}`, null, {
            params: { status },
        });
        return response;
    } catch (error) {
        console.error('Failed to update Orders', error);
        throw error;
    }
};
