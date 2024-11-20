import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { editProduct, updateProduct, deleteProductImg } from '~/services/Product/productService';
import { getCategories } from '~/services/Category/categoryService';
import { toast, ToastContainer } from 'react-toastify';

const EditProduct = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [categories, setCategories] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [data, setData] = useState({
        name: '',
        description: '',
        price: 0,
        size: '',
        manufacturer: '',
        weight: 0,
        categoryId: null,
        images: [{}],
        returnPeriodDays: 0,
    });
    const [imagesOld, setImagesOld] = useState([]);
    const [imagesNew, setImagesNew] = useState([]);
    const [removedImages, setRemovedImages] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await editProduct(id);
                const productData = response.data;

                productData.categoryId = productData.category?.categoryId || null;
                setData(productData);
                setImagesOld(response.data.images || []);
            } catch (error) {
                toast.error(error.message);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await getCategories();
                setCategories(response.data.content || []);
            } catch (error) {
                toast.error('Failed to fetch categories data');
            }
        };

        fetchCategories();
        fetchProduct();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const updatedProduct = {
                ...data,
                categoryId: parseInt(data.categoryId, 10) || null,
            };
            console.log('Updated Product:', JSON.stringify(updatedProduct, null, 2));

            const formData = new FormData();
            formData.append('productDTO', new Blob([JSON.stringify(updatedProduct)], { type: 'application/json' }));

            selectedFiles.forEach((file) => formData.append('files', file));
            if (removedImages.length > 0) {
                formData.append('removedImages', JSON.stringify(removedImages));
            }

            // Log FormData content for debugging
            for (const [key, value] of formData.entries()) {
                console.log(`${key}:`, value);
            }

            const response = await updateProduct(id, formData);
            console.log('Response:', response);
            toast.success('Product updated successfully');
            navigate('/product');
        } catch (error) {
            if (error.response) {
                console.error('Error response data:', error.response.data);
            } else {
                console.error('Error message:', error.message);
            }
            toast.error('Failed to update product');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'price' && value < 1) {
            toast.warning('Price must be 1 or higher');
            return;
        }

        console.log(name, ': ', value);
        setData({ ...data, [name]: value });
    };

    const handleFileChange = (e) => {
        const filesArray = Array.from(e.target.files);
        setImagesNew([]);

        filesArray.forEach((file) => {
            const reader = new FileReader();
            reader.onload = (x) => {
                setImagesNew((prevImages) => [
                    ...prevImages,
                    {
                        imageId: null,
                        imageName: file.name,
                        imageSrc: x.target.result,
                    },
                ]);
            };
            reader.readAsDataURL(file);
        });

        setSelectedFiles(filesArray);
    };

    const handleRemoveOldImage = async (e, index) => {
        e.preventDefault();
        try {
            const imageId = imagesOld[index].imageId;
            await deleteProductImg(imageId);
            setImagesOld((prevImages) => prevImages.filter((_, i) => i !== index));
            setRemovedImages((prevImages) => [...prevImages, imageId]);
        } catch (error) {
            toast.error('Failed to remove image');
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
            <div className="col-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Edit Product {data.codeProduct}</h4>
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
                                {renderInput('Return Period Days', 'returnPeriodDays', 'number', data.returnPeriodDays)}
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
                                        className="form-control"
                                        multiple
                                        onChange={handleFileChange}
                                    />
                                </div>
                            </div>
                            <div className="row mb-6">
                                <div
                                    className="col-md-3"
                                    style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}
                                >
                                    <div>
                                        <h4>Current Images:</h4>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                            {imagesOld.length > 0 ? (
                                                imagesOld.map((image, index) => (
                                                    <div key={index} style={{ position: 'relative' }}>
                                                        <img
                                                            src={image.imageUrl}
                                                            alt={image.imageName}
                                                            style={{
                                                                width: '100px',
                                                                height: '100px',
                                                                objectFit: 'cover',
                                                            }}
                                                        />
                                                        <button
                                                            onClick={(e) => handleRemoveOldImage(e, index)}
                                                            style={{
                                                                position: 'absolute',
                                                                top: '5px',
                                                                right: '5px',
                                                                background: 'red',
                                                                color: 'white',
                                                                border: 'none',
                                                                cursor: 'pointer',
                                                                padding: '2px 5px',
                                                            }}
                                                        >
                                                            X
                                                        </button>
                                                    </div>
                                                ))
                                            ) : (
                                                <p>No Images</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="">
                                        <h4>New Images Preview:</h4>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                            {imagesNew.length > 0 ? (
                                                imagesNew.map((image, index) => (
                                                    <div key={index}>
                                                        <img
                                                            src={image.imageSrc}
                                                            alt={image.imageName}
                                                            style={{
                                                                width: '100px',
                                                                height: '100px',
                                                                objectFit: 'cover',
                                                            }}
                                                        />
                                                    </div>
                                                ))
                                            ) : (
                                                <p>No Images</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <button type="submit" className="btn btn-primary mr-2">
                                Update
                            </button>
                            <Link to="/product" className="btn btn-light">
                                Back
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
            {/* <ToastContainer /> */}
        </div>
    );
};

export default EditProduct;
