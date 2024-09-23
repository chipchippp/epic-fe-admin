import { get, post, put, del } from '~/utils/httpRequest';

const service = 'design';

export const getImgDesign = async (currentPage = 1, limit = 10) => {
    try {
        const response = await get(service, `/images_design/getAll?page=${currentPage}&limit=${limit}`);
        return response;
    } catch (error) {
        console.error('Error fetching ImgDesign data:', error);
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

export const getTrashImgDesign = async (currentPage = 1, limit = 10) => {
    try {
        const response = await get(service, `/images_design/trash?page=${currentPage}&limit=${limit}`);
        return response;
    } catch (error) {
        console.error('Error fetching ImgDesign data:', error);
        throw error;
    }
};

export const createImgDesign = async (data) => {
    try {
        const response = await post(service, '/images_design', data);
        return response;
    } catch (error) {
        console.error('Failed to create ImgDesign', error);
        throw error;
    }
}; 

export const editImgDesign = async (id) => {
    try {
        const response = await get(service, `/images_design/id/${id}`);
        console.log('response', response);
        return response;
    } catch (error) {
        console.error('Error fetching ImgDesign data:', error);
        throw error;
    }
};

export const updateImgDesign = async (id, data) => {
    try {
        const response = await put(service, `/images_design/${id}`, data);
        return response;
    } catch (error) {
        console.error('Failed to update ImgDesign', error);
        throw error;
    }
};

export const deleteImgDesign = async (id) => {
    try {
        await del(service, `/images_design/in-trash/${id}`);
        return true;
    } catch (error) {
        console.error('Failed to delete ImgDesign', error);
        throw error;
    }
};