import { get, post, put, del } from '~/utils/httpRequest';

const service = 'order';

export const getReturn = async (params) => {
    try {
        const response = await get(service, `/return_item/search-by-specification`, { params });
        return response;
    } catch (error) {
        console.error('Error fetching Return data:', error);
        throw error;
    }
};

export const getAllReturn = async () => {
    try {
        const response = await get(service, `/return_item?page=1&limit=100`);
        return response;
    } catch (error) {
        console.error('Error fetching Return data:', error);
        throw error;
    }
};

export const editReturn = async (id) => {
    try {
        const response = await get(service, `/return_item/id/${id}`);
        return response;
    } catch (error) {
        console.error('Error fetching Return data:', error);
        throw error;
    }
};

export const updateReturnStatus = async (id, status, statusNote) => {
    try {
        const response = await put(service, `/return_item/status/${id}`, {
            status,
            statusNote,
        });
        return response;
    } catch (error) {
        console.error('Failed to update Return', error);
        throw error;
    }
};

export const updateReturn = async (id, data) => {
    try {
        const response = await put(service, `/return_item/${id}`, data);
        return response;
    } catch (error) {
        console.error('Failed to update Return', error);
        throw error;
    }
};
