import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CreateProduct() {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        categoryId: '',
        stockQuantity: '',
        manufacturer: '',
        size: '',
        weight: '',
        images: [],
    });
    const [categories, setCategories] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8082/api/v1/categories');
                setCategories(response.data.content);
            } catch (error) {
                console.error('Error fetching categories:', error);
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
        console.log(e.target.files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('productDTO', new Blob([JSON.stringify(product)], { type: 'application/json' }));
            for (let i = 0; i < selectedFiles.length; i++) {
                formData.append('files', selectedFiles[i]);
            }

            await axios.post('http://localhost:8082/api/v1/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            alert('Product created successfully');
        } catch (error) {
            console.error('Error creating product:', error);
            alert('Failed to create product');
        }
    };

    return (
        <div className="content-wrapper">
            <div className="row">
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Create Product</h4>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Product Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        value={product.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <input
                                        type="text"
                                        name="description"
                                        className="form-control"
                                        value={product.description}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Price</label>
                                    <input
                                        type="number"
                                        name="price"
                                        className="form-control"
                                        value={product.price}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Category</label>
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
                                <div className="form-group">
                                    <label>Stock Quantity</label>
                                    <input
                                        type="number"
                                        name="stockQuantity"
                                        className="form-control"
                                        value={product.stockQuantity}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Manufacturer</label>
                                    <input
                                        type="text"
                                        name="manufacturer"
                                        className="form-control"
                                        value={product.manufacturer}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Size</label>
                                    <input
                                        type="text"
                                        name="size"
                                        className="form-control"
                                        value={product.size}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Weight</label>
                                    <input
                                        type="text"
                                        name="weight"
                                        className="form-control"
                                        value={product.weight}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Images</label>
                                    <input
                                        type="file"
                                        name="images"
                                        className="form-control"
                                        multiple
                                        onChange={handleFileChange}
                                        required
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
}

export default CreateProduct;
