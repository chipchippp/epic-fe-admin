import { get, post, put, del } from '~/utils/httpRequest';

export const getRoom = async (currentPage = 1, limit = 7) => {
    try {
        const response = await get(`/room_specifications/getAll?page=${currentPage}&limit=${limit}`);
        return response;
    } catch (error) {
        console.error('Error fetching Room data:', error);
        throw error;
    }
};

export const getUsers = async () => {
    try {
        const response = await get(`/users?page=1&limit=100`);
        return response;
    } catch (error) {
        console.error('Error fetching category data:', error);
        throw error;
    }
};

export const createRoom = async (data) => {
    try {
        const response = await post('/room_specifications', data);
        return response;
    } catch (error) {
        console.error('Error creating Room:', error);
        throw error;
    }
};

export const editRoom = async (id) => {
    try {
        const response = await get(`/room_specifications/id/${id}`);
        return response;
    } catch (error) {
        console.error('Error fetching Room data:', error);
        throw error;
    }
};

export const updateRoom = async (id, data) => {
    try {
        const response = await put(`/room_specifications/${id}`, data);
        return response;
    } catch (error) {
        console.error('Error updating Room:', error);
        throw error;
    }
};
export const deleteRoom = async (id) => {
    try {
        const response = await del(`/room_specifications/${id}`);
        return response;
    } catch (error) {
        console.error('Error deleting Room:', error);
        throw error;
    }
};
