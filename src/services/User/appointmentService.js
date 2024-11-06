import { get, post, put, del } from '~/utils/httpRequest';

const service = 'user';

export const getAppointment = async (currentPage = 1, limit = 10) => {
    try {
        const response = await get(service, `/appointments/getAll?page=${currentPage}&limit=${limit}`);
        return response;
    } catch (error) {
        console.error('Error fetching appointments data:', error);
        throw error;
    }
};

export const getTrashAppointment = async (currentPage = 1, limit = 10) => {
    try {
        const response = await get(service, `/appointments/trash?page=${currentPage}&limit=${limit}`);
        return response;
    } catch (error) {
        console.error('Error fetching appointments data:', error);
        throw error;
    }
};

export const createAppointment = async (data) => {
    try {
        const response = await post(service, '/appointments', data);
        return response;
    } catch (error) {
        console.error('Failed to create appointments', error);
        throw error;
    }
};

export const editAppointmentDesign = async (id, page, limit) => {
    try {
        const response = await get(service, `/appointments/designer/${id}?page=${page}&limit=${limit}`);
        return response;
    } catch (error) {
        console.error('Error fetching appointments data:', error);
        throw error;
    }
};

export const editAppointment = async (id) => {
    try {
        const response = await get(service, `/appointments/id/${id}`);
        return response;
    } catch (error) {
        console.error('Error fetching appointments data:', error);
        throw error;
    }
};

export const updateAppointment = async (id, data) => {
    try {
        const response = await put(service, `/appointments/${id}`, data);
        return response;
    } catch (error) {
        console.error('Failed to update appointments', error);
        throw error;
    }
};

export const deleteAppointment = async (id) => {
    try {
        await del(service, `/appointments/in-trash/${id}`);
        return true;
    } catch (error) {
        console.error('Failed to delete appointments', error);
        throw error;
    }
};
