import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { editProduct, updateProduct, deleteProductImg } from '~/services/Product/productService';
import { getCategories } from '~/services/Category/categoryService';
import { toast, ToastContainer } from 'react-toastify';

const EditProduct = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [data, setData] = useState({});
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
                categoryId: data.categoryId || (data.category && data.category.categoryId),
            };

            const formData = new FormData();
            formData.append('productDTO', new Blob([JSON.stringify(updatedProduct)], { type: 'application/json' }));

            if (selectedFiles.length > 0) {
                selectedFiles.forEach((file) => formData.append('files', file));
            }

            if (removedImages.length > 0) {
                formData.append('removedImages', JSON.stringify(removedImages));
            }

            const response = await updateProduct(id, formData);

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
            toast.warning(`${name.charAt(0).toUpperCase() + name.slice(1)} must be 1 or higher`);
            return;
        }
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

    return (
        <div className="content-wrapper">
            <div className="col-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Edit Product {data.codeProduct}</h4>
                        <form onSubmit={handleSubmit}>
                            <div className="row mb-4">
                                <div className="col-md-3">
                                    <label className="col-form-label text-md-right">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        value={data.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-3">
                                    <label className="col-form-label text-md-right">Description</label>
                                    <input
                                        type="text"
                                        name="description"
                                        className="form-control"
                                        value={data.description}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-3">
                                    <label className="col-form-label text-md-right">Price</label>
                                    <input
                                        type="text"
                                        name="price"
                                        className="form-control"
                                        value={data.price}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-3">
                                    <label className="col-form-label text-md-right">Category</label>
                                    <select
                                        name="category"
                                        className="form-control"
                                        value={data.categoryId || ''}
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
                                <div className="col-md-3">
                                    <label className="col-form-label text-md-right">Manufacturer</label>
                                    <input
                                        type="text"
                                        name="manufacturer"
                                        className="form-control"
                                        value={data.manufacturer}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-3">
                                    <label className="col-form-label text-md-right">Size</label>
                                    <input
                                        type="text"
                                        name="size"
                                        className="form-control"
                                        value={data.size}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-3">
                                    <label className="col-form-label text-md-right">Weight</label>
                                    <input
                                        type="text"
                                        name="weight"
                                        className="form-control"
                                        value={data.weight}
                                        onChange={handleInputChange}
                                        required
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
            <ToastContainer />
        </div>
    );
};

export default EditProduct;