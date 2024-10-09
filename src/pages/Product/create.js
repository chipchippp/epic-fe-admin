import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom';
import { createProduct } from '~/services/Product/productService';
import axios from 'axios';

const CreateProduct = () => {
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        categoryId: '',
        stockQuantity: '',
        manufacturer: '',
        size: '',
        weight: '',
    });
    const [categories, setCategories] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/categories/getAll');
                setCategories(response.data.data.content || []);
            } catch (error) {
                toast.error('Failed to fetch categories');
            }
        };

        fetchCategories();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleFileChange = (e) => {
        setSelectedFiles(e.target.files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('productDTO', new Blob([JSON.stringify(product)], { type: 'application/json' }));

            if (selectedFiles.length > 0) {
                Array.from(selectedFiles).forEach((file) => formData.append('files', file));
            }

            await createProduct(formData);

            toast.success('Product created successfully');
            navigate('/product');
        } catch (error) {
            toast.error(`Failed to create product: ${error.message}`);
        }
    };

    return (
        <div className="content-wrapper">
            <div className="row">
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Create Product</h4>
                            <Link to="/product" className="btn btn-primary mb-3">
                                <i className="fas fa-arrow-left"></i> Back
                            </Link>
                            <form onSubmit={handleSubmit}>
                                <div className="row mb-4">
                                    <div className="col-md-6">
                                        <label className="col-form-label text-md-right">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            className="form-control"
                                            value={product.name}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="col-form-label text-md-right">Description</label>
                                        <input
                                            type="text"
                                            name="description"
                                            className="form-control"
                                            value={product.description}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-md-6">
                                        <label className="col-form-label text-md-right">Price</label>
                                        <input
                                            type="number"
                                            name="price"
                                            className="form-control"
                                            value={product.price}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="col-form-label text-md-right">Category</label>
                                        <select
                                            name="categoryId"
                                            className="form-control"
                                            value={product.categoryId}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="" disabled>
                                                Select Category
                                            </option>
                                            {categories.map((category) => (
                                                <option key={category.categoryId} value={category.categoryId}>
                                                    {category.categoryName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-md-6">
                                        <label className="col-form-label text-md-right">Stock Quantity</label>
                                        <input
                                            type="number"
                                            name="stockQuantity"
                                            className="form-control"
                                            value={product.stockQuantity}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="col-form-label text-md-right">Manufacturer</label>
                                        <input
                                            type="text"
                                            name="manufacturer"
                                            className="form-control"
                                            value={product.manufacturer}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-md-6">
                                        <label className="col-form-label text-md-right">Size</label>
                                        <input
                                            type="text"
                                            name="size"
                                            className="form-control"
                                            value={product.size}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="col-form-label text-md-right">Weight</label>
                                        <input
                                            type="text"
                                            name="weight"
                                            className="form-control"
                                            value={product.weight}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Images</label>
                                    <input
                                        type="file"
                                        name="images"
                                        required
                                        className="form-control"
                                        multiple
                                        onChange={handleFileChange}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">
                                    Create
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateProduct;
