import { get, post, put, del } from '~/utils/httpRequest';

const service = 'user';

export const getContact = async (currentPage = 1, limit = 7) => {
    try {
        const response = await get(service, `/contact/getAll?page=${currentPage}&limit=${limit}`);
        return response;
    } catch (error) {
        console.error('Error fetching Contact data:', error);
        throw error;
    }
};

export const getContactsReplyIsNull = async (currentPage = 1, limit = 7) => {
    try {
        const response = await get(service, `/contact/getContactsReplyIsNull`);
        return response;
    } catch (error) {
        console.error('Error fetching Contact data:', error);
        throw error;
    }
};

export const createContact = async (data) => {
    try {
        const response = await post(service, '/contact', data);
        return response;
    } catch (error) {
        console.error('Error creating Contact:', error);
        throw error;
    }
};

export const editContact = async (id) => {
    try {
        const response = await get(service, `/contact/id/${id}`);
        return response;
    } catch (error) {
        console.error('Error fetching Contact data:', error);
        throw error;
    }
};

export const updateContact = async (id, data) => {
    try {
        const response = await put(service, `/contact/${id}`, data);
        return response;
    } catch (error) {
        console.error('Error updating Contact:', error);
        throw error;
    }
};
export const deleteContact = async (id) => {
    try {
        const response = await del(service, `/contact/${id}`);
        return response;
    } catch (error) {
        console.error('Error deleting Contact:', error);
        throw error;
    }
};
