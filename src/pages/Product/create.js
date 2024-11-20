import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom';
import { createProduct } from '~/services/Product/productService';
import { getCategories } from '~/services/Category/categoryService';

import axios from 'axios';

const CreateProduct = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: '',
        description: '',
        price: '',
        categoryId: '',
        manufacturer: '',
        size: '',
        weight: '',
        returnPeriodDays: '',
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

        if (name === 'price' && value < 1) {
            toast.warning('Price must be 1 or higher');
            return;
        }

        setData({ ...data, [name]: value });
    };

    const handleFileChange = (e) => {
        setSelectedFiles(e.target.files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('productDTO', new Blob([JSON.stringify(data)], { type: 'application/json' }));

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

    const renderInput = (label, name, type = 'text', value) => (
        <div className="col-md-3">
            <label className="col-form-label text-md-right">{label}</label>
            <input
                type={type}
                name={name}
                className="form-control"
                value={value}
                onChange={handleInputChange}
                required
            />
        </div>
    );

    return (
        <div className="content-wrapper">
            <div className="row">
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Create Product</h4>
                            <form onSubmit={handleSubmit}>
                                <div className="row mb-4">
                                    {renderInput('Name', 'name', 'text', data.name)}
                                    {renderInput('Description', 'description', 'text', data.description)}
                                    {renderInput('Price', 'price', 'number', data.price)}
                                    <div className="col-md-3">
                                        <label className="col-form-label text-md-right">Size</label>
                                        <select
                                            name="size"
                                            className="form-control"
                                            value={data.size}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="" disabled>
                                                Select Size
                                            </option>
                                            <option value="S">S</option>
                                            <option value="M">M</option>
                                            <option value="L">L</option>
                                            <option value="XL">XL</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    {renderInput('Manufacturer', 'manufacturer', 'text', data.manufacturer)}
                                    {renderInput('Weight', 'weight', 'number', data.weight)}
                                    <div className="col-md-3">
                                        <label className="col-form-label text-md-right">Category</label>
                                        <select
                                            name="categoryId"
                                            className="form-control"
                                            value={data.categoryId}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="" disabled>
                                                Select Category
                                            </option>
                                            {categories.length > 0 ? (
                                                categories.map((category) => (
                                                    <option key={category.categoryId} value={category.categoryId}>
                                                        {category.categoryName}
                                                    </option>
                                                ))
                                            ) : (
                                                <option disabled>No categories available</option>
                                            )}
                                        </select>
                                    </div>
                                    <div className="col-md-3">
                                        <label className="col-form-label text-md-right">Images</label>
                                        <input
                                            type="file"
                                            name="images"
                                            required
                                            className="form-control"
                                            multiple
                                            onChange={handleFileChange}
                                        />
                                    </div>
                                </div>
                                <div className="row mb-4">{renderInput('ReturnPeriodDays', 'returnPeriodDays', 'number', data.returnPeriodDays)}</div>
                                <button type="submit" className="btn btn-primary mr-2">
                                    Save
                                </button>
                                <Link to="/product" className="btn btn-light">
                                    Back
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* <ToastContainer /> */}
        </div>
    );
};

export default CreateProduct;
