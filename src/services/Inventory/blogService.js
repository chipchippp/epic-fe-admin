import { get, post, put, del } from '~/utils/httpRequest';

const service = 'inventory';

export const getBlog = async (currentPage = 1, limit = 7) => {
    try {
        const response = await get(service, `/blogs/getAll?page=${currentPage}&limit=${limit}`);
        return response;
    } catch (error) {
        console.error('Error fetching Blog data:', error);
        throw error;
    }
};

export const getUsers = async () => {
    try {
        const response = await get(service, `/users?page=1&limit=100`);
        return response;
    } catch (error) {
        console.error('Error fetching category data:', error);
        throw error;
    }
};

export const createBlog = async (data) => {
    try {
        const response = await post(service, '/blogs', data);
        return response;
    } catch (error) {
        console.error('Error creating Blog:', error);
        throw error;
    }
};

export const editBlog = async (id) => {
    try {
        const response = await get(service, `/blogs/id/${id}`);
        return response;
    } catch (error) {
        console.error('Error fetching Blog data:', error);
        throw error;
    }
};

export const updateBlog = async (id, data) => {
    try {
        const response = await put(service, `/blogs/${id}`, data);
        return response;
    } catch (error) {
        console.error('Error updating Blog:', error);
        throw error;
    }
};

export const deleteBlog = async (id) => {
    try {
        const response = await del(service, `/blogs/${id}`);
        return response;
    } catch (error) {
        console.error('Error deleting Blog:', error);
        throw error;
    }
};
