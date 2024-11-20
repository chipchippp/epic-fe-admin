import { get, post, put, del } from '~/utils/httpRequest';

const service = 'product';

export const getProduct = async () => {
    try {
        const response = await get(
            service,
            `/products/search-by-specification?page=1&limit=100&sort=soldQuantity:desc`,
        );
        return response;
    } catch (error) {
        console.error('Error fetching Product data:', error);
        throw error;
    }
};

export const getFilteredProducts = async (params) => {
    try {
        const response = await get(service, `/products/search-by-specification`, { params });
        return response;
    } catch (error) {
        console.error('Error fetching Product data:', error);
        throw error;
    }
};

export const getCategories = async () => {
    try {
        const response = await get(service, `/categories/getAll`);
        return response;
    } catch (error) {
        console.error('Error fetching category data:', error);
        throw error;
    }
};

export const getTrashProduct = async (currentPage = 1, limit = 10, search) => {
    try {
        const response = await get(service, `/products/trash?page=${currentPage}&limit=${limit}&search=${search}`);
        return response;
    } catch (error) {
        console.error('Error fetching products data:', error);
        throw error;
    }
};

export const getProductCategory = async (params) => {
    try {
        const response = await get(service, `/products/category`, { params });
        return response;
    } catch (error) {
        console.error('Error fetching categories data:', error);
        throw error;
    }
};

export const getTrashCategories = async () => {
    try {
        const response = await get(service, `/categories/trash?page=1&limit=100`);
        return response;
    } catch (error) {
        console.error('Error fetching categories data:', error);
        throw error;
    }
};

export const getProductDetails = async (id) => {
    try {
        const response = await get(service, `/products/${id}`);
        return response;
    } catch (error) {
        console.error('Error fetching Product data:', error);
        throw error;
    }
};

export const createProduct = async (data) => {
    try {
        const response = await post(service, '/products', data);
        return response;
    } catch (error) {
        console.error('Error creating Product:', error);
        throw error;
    }
};

export const editProduct = async (id) => {
    try {
        const response = await get(service, `/products/id/${id}`);
        return response;
    } catch (error) {
        console.error('Error fetching Product data:', error);
        throw error;
    }
};

export const updateProduct = async (id, data) => {
    try {
        const response = await put(service, `/products/${id}`, data);
        return response;
    } catch (error) {
        console.error('Error updating Product:', error);
        throw error;
    }
};

export const deleteProduct = async (id) => {
    try {
        await del(service, `/products/in-trash/${id}`);
        return true;
    } catch (error) {
        console.error('Error deleting Product:', error);
        throw error;
    }
};

export const deleteProductImg = async (id) => {
    try {
        const response = await del(service, `/product-images/${id}`);
        return response;
    } catch (error) {
        console.error('Error deleting Product:', error);
        throw error;
    }
};
