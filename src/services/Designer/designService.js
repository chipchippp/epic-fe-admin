import { get, post, put, del } from '~/utils/httpRequest';

const service = 'design';

export const getDesign = async (status) => {
    try {
        const response = await get(service, `/designer_profile/getByStatus?status=${status}`);
        return response;
    } catch (error) {
        console.error('Error fetching Design data:', error);
        throw error;
    }
};

export const getCategoryGallery = async () => {
    try {
        const response = await get(service, `/category_gallery/getAll?page=1&limit=100`);
        return response;
    } catch (error) {
        console.error('Error fetching category_gallery data:', error);
        throw error;
    }
};

export const getTrashDesign = async (currentPage = 1, limit = 10) => {
    try {
        const response = await get(service, `/designer_profile/trash?page=${currentPage}&limit=${limit}`);
        return response;
    } catch (error) {
        console.error('Error fetching Design data:', error);
        throw error;
    }
};

export const createDesign = async (data) => {
    try {
        const response = await post(service, '/designer_profile', data);
        return response;
    } catch (error) {
        console.error('Failed to create Design', error);
        throw error;
    }
};

export const editDesign = async (id) => {
    try {
        const response = await get(service, `/designer_profile/${id}`);
        console.log('response', response);
        return response;
    } catch (error) {
        console.error('Error fetching Design data:', error);
        throw error;
    }
};

export const updateDesign = async (id, status) => {
    try {
        const response = await put(service, `/designer_profile/updateStatus/${id}`, null, {
            params: { status },
        });
        return response;
    } catch (error) {
        console.error('Failed to update Design', error);
        throw error;
    }
};

export const deleteDesign = async (id) => {
    try {
        await del(service, `/designer_profile/in-trash/${id}`);
        return true;
    } catch (error) {
        console.error('Failed to delete Design', error);
        throw error;
    }
};
