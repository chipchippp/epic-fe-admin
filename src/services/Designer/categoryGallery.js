import { get, post, put, del } from '~/utils/httpRequest';

const service = 'design';

export const getCategoryGallery = async (currentPage = 1, limit = 10) => {
    try {
        const response = await get(service, `/category_gallery/getAll?page=${currentPage}&limit=${limit}`);
        return response;
    } catch (error) {
        console.error('Error fetching category data:', error);
        throw error;
    }
};

export const getTrashCategoryGallery = async (currentPage = 1, limit = 10) => {
    try {
        const response = await get(service, `/category_gallery/trash?page=${currentPage}&limit=${limit}`);
        return response;
    } catch (error) {
        console.error('Error fetching category data:', error);
        throw error;
    }
};

export const createCategoryGallery = async (data) => {
    try {
        const response = await post(service, '/category_gallery', data);
        return response;
    } catch (error) {
        console.error('Failed to create category', error);
        throw error;
    }
};

export const editCategoryGallery = async (id) => {
    try {
        const response = await get(service, `/category_gallery/id/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching category data:', error);
        throw error;
    }
};

export const updateCategoryGallery = async (id, data) => {
    try {
        const response = await put(service, `/category_gallery/${id}`, data);
        return response;
    } catch (error) {
        console.error('Failed to update category', error);
        throw error;
    }
};

export const deleteCategoryGallery = async (id) => {
    try {
        await del(service, `/category_gallery/in-trash/${id}`);
        return true;
    } catch (error) {
        console.error('Failed to delete category', error);
        throw error;
    }
};