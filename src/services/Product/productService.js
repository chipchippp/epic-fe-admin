import { get, post, put, del } from '~/utils/httpRequest';

export const getProduct = async (currentPage = 1, limit = 7) => {
    try {
        const response = await get(`/products/getAll?page=${currentPage}&limit=${limit}`);
        return response;
    } catch (error) {
        console.error('Error fetching Product data:', error);
        throw error;
    }
};

export const getFilteredProducts = async (params) => {
    try {
        const response = await get(`/products/search-by-specification`, { params });
        return response;
    } catch (error) {
        console.error('Error fetching Product data:', error);
        throw error;
    }
};

export const getCategories = async () => {
    try {
        const response = await get(`/categories/getAll`);
        return response;
    } catch (error) {
        console.error('Error fetching category data:', error);
        throw error;
    }
};

export const getTrashProduct = async (currentPage = 1, limit = 10, search) => {
    try {
        const response = await get(`/products/trash?page=${currentPage}&limit=${limit}&search=${search}`);
        return response;
    } catch (error) {
        console.error('Error fetching products data:', error);
        throw error;
    }
};


export const getProductCategory = async (params) => {
    try {
        const response = await get('http://localhost:8080/api/v1/products/category', { params });
        return response;
    } catch (error) {
        console.error('Error fetching categories data:', error);
        throw error;
    }
};

export const getTrashCategories = async () => {
    try {
        const response = await get(`/categories/trash?page=1&limit=100`);
        return response;
    } catch (error) {
        console.error('Error fetching categories data:', error);
        throw error;
    }
};

export const getProductDetails = async (id) => {
    try {
        const response = await get(`/products/${id}`);
        return response;
    } catch (error) {
        console.error('Error fetching Product data:', error);
        throw error;
    }
};

export const createProduct = async (data) => {
    try {
        const response = await post('/products', data);
        return response;
    } catch (error) {
        console.error('Error creating Product:', error);
        throw error;
    }
};

export const editProduct = async (id) => {
    try {
        const response = await get(`/products/id/${id}`);
        return response;
    } catch (error) {
        console.error('Error fetching Product data:', error);
        throw error;
    }
};

export const updateProduct = async (id, data) => {
    try {
        const response = await put(`/products/${id}`, data);
        return response;
    } catch (error) {
        console.error('Error updating Product:', error);
        throw error;
    }
};
export const deleteProduct = async (id) => {
    try {
        const response = await del(`/products/in-trash/${id}`);
        return response;
    } catch (error) {
        console.error('Error deleting Product:', error);
        throw error;
    }
};