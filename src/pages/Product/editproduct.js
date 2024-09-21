import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { editProduct, updateProduct, getCategories, deleteProductImg } from '~/services/Product/productService';
import { toast } from 'react-toastify';

const EditProduct = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [product, setProduct] = useState({});
    const [imagesOld, setImagesOld] = useState([]);
    const [imagesNew, setImagesNew] = useState([]);
    const [removedImages, setRemovedImages] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const response = await editProduct(id);
                const productData = response.data;
                if (productData.category && productData.category.categoryId) {
                    productData.categoryId = productData.category.categoryId;
                }
                setProduct(productData);
                setImagesOld(productData.images || []);
            } catch (error) {
                setError('Failed to fetch product details');
            } finally {
                setLoading(false);
            }
        };
    
        const fetchCategories = async () => {
            try {
                const response = await getCategories();
                setCategories(response.data.content || []);
            } catch (error) {
                toast('Failed to fetch categories');
            }
        };
    
        fetchProduct();
        fetchCategories();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
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

    // const handleRemoveOldImage = (e, index) => {
    //     e.preventDefault();
    //     setImagesOld((prevImages) => prevImages.filter((_, i) => i !== index));
    // };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedProduct = {
                ...product,
                categoryId: product.categoryId || (product.category && product.category.categoryId),
            };
    
            const formData = new FormData();
            formData.append('productDTO', new Blob([JSON.stringify(updatedProduct)], { type: 'application/json' }));
    
            if (selectedFiles.length > 0) {
                selectedFiles.forEach((file) => formData.append('files', file));
            }
    
            if (removedImages.length > 0) {
                formData.append('removedImages', JSON.stringify(removedImages));
            }
    
            await updateProduct(id, formData);
            navigate('/product');
        } catch (error) {
            toast('Failed to update product');
        }
    };
    
    
    
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

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
            <div className="row">
                <div className="col-md-12 grid-margin">
                    <h2 className="font-weight-bold">{product.name}</h2>
                <Link to="/product" className="btn btn-primary mb-3">
                    <i className="fas fa-arrow-left"></i> Back
                </Link>
                </div>
            </div>
            <div className="col-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Edit Product</h4>
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
                                        value={product.category.categoryId || ''}
                                        onChange={(e) => setProduct({ ...product, categoryId: e.target.value })}
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

                            <div className="row mb-4">
                                <div className="col-md-6">
                                    <label className="col-form-label text-md-right">Images</label>
                                    <input
                                      type="file"
                                      name="images"
                                      className="form-control"
                                      multiple
                                      onChange={handleFileChange}
                                    />
                                </div> 
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
                            <div>
                                <h4>List of available products:</h4>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                    {imagesOld.length > 0 ? (
                                        imagesOld.map((image, index) => (
                                            <div key={index} style={{ position: 'relative' }}>
                                                <img
                                                    src={`http://localhost:8080/api/v1/product-images/imagesPost/${image.imageUrl}`}
                                                    alt={image.imageName}
                                                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
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
                            <div>
                                <h4>Preview new images:</h4>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                    {imagesNew.length > 0 ? (
                                        imagesNew.map((image, index) => (
                                            <div key={index}>
                                                <img
                                                    src={image.imageSrc}
                                                    alt={image.imageName}
                                                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
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
                            <button type="submit" className="btn btn-primary">
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
    );
};

export default EditProduct;