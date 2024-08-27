import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditProduct = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [categories, setCategories] = useState([]); // Khởi tạo là mảng rỗng
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [product, setProduct] = useState(null);
    const [imagesOld, setImagesOld] = useState([]);
    const [imagesNew, setImagesNew] = useState([]);

    console.log('images', imagesOld);
    console.log('files', selectedFiles);
    console.log('products', product);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:8082/api/v1/products/${id}`);
                setProduct(response.data);
                console.log(response.data);
                setImagesOld(response.data.images.map((img) => img));
            } catch (error) {
                setError('Failed to fetch product details');
            } finally {
                setLoading(false);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8082/api/v1/categories');
                setCategories(response.data.content);
            } catch (error) {
                setError('Failed to fetch categories');
            }
        };

        fetchProduct();
        fetchCategories();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleCategoryChange = (e) => {
        const categoryId = e.target.value;
        setProduct({ ...product, category: { ...product.category, categoryId } });
    };

    const handleFileChange = (e) => {
        const filesArray = Array.from(e.target.files);

        filesArray.forEach((file) => {
            setImagesNew([]);
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

    const handleRemoveOldImage = (e, index) => {
        e.preventDefault();
        setImagesOld((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedProduct = {
                ...product,
                categoryId: product.category.categoryId,
                images: imagesOld,
            };

            console.log('updated product: ', updatedProduct);

            const formData = new FormData();
            formData.append('productDTO', new Blob([JSON.stringify(updatedProduct)], { type: 'application/json' }));
            if (selectedFiles.length > 0) {
                for (let i = 0; i < selectedFiles.length; i++) {
                    formData.append('files', selectedFiles[i]);
                }
            } else {
                const emptyFile = new File([], '', { type: 'application/octet-stream' });
                formData.append('files', emptyFile);
            }

            await axios.put(`http://localhost:8082/api/v1/products/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            
            navigate('/product');
        } catch (error) {
            alert('Failed to update product');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="content-wrapper">
            <div className="row">
                <div className="col-md-12 grid-margin">
                    <div className="row">
                        <div className="col-12 col-xl-8 mb-4 mb-xl-0">
                            <h2 className="font-weight-bold">{product.name}</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Edit Product</h4>
                        <form onSubmit={handleSubmit}>
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <th>Product Name</th>
                                        <td>
                                            <input
                                                type="text"
                                                name="name"
                                                value={product.name}
                                                onChange={handleInputChange}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Description</th>
                                        <td>
                                            <input
                                                type="text"
                                                name="description"
                                                value={product.description}
                                                onChange={handleInputChange}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Price</th>
                                        <td>
                                            <input
                                                type="number"
                                                name="price"
                                                value={product.price}
                                                onChange={handleInputChange}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Category</th>
                                        <td>
                                            <select
                                                name="category"
                                                value={product.category?.categoryId || ''}
                                                onChange={handleCategoryChange}
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
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Stock Quantity</th>
                                        <td>
                                            <input
                                                type="number"
                                                name="stockQuantity"
                                                value={product.stockQuantity}
                                                onChange={handleInputChange}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Manufacturer</th>
                                        <td>
                                            <input
                                                type="text"
                                                name="manufacturer"
                                                value={product.manufacturer}
                                                onChange={handleInputChange}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Size</th>
                                        <td>
                                            <input
                                                type="text"
                                                name="size"
                                                value={product.size}
                                                onChange={handleInputChange}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Weight</th>
                                        <td>
                                            <input
                                                type="text"
                                                name="weight"
                                                value={product.weight}
                                                onChange={handleInputChange}
                                            />
                                        </td>
                                    </tr>
                                    
                                    <tr>
    <th>Images</th>
    <td>
        <input
            type="file"
            className="form-control"
            multiple
            onChange={handleFileChange}
            // required
        />
    </td>
</tr>
<div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
    <div>
        <h4>List of available products:</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {imagesOld.length > 0 ? (
                imagesOld.map((image, index) => (
                    <div key={index} style={{ position: 'relative', marginRight: '10px' }}>
                        <img
                            src={`http://localhost:8082/api/v1/product-images/images/${image.imageUrl}`}
                            alt={product.name}
                            style={{
                                width: '100px',
                                height: '100px',
                                borderRadius: '4px',
                                objectFit: 'cover',
                                border: '1px solid #ccc',
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
                                borderRadius: '50%',
                                width: '20px',
                                height: '20px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
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
        <h4>List of new products:</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {imagesNew.map((image, index) => (
                <div key={index} style={{ position: 'relative', marginRight: '10px' }}>
                    <img
                        src={image.imageSrc}
                        alt="Product"
                        style={{
                            width: '100px',
                            height: '100px',
                            borderRadius: '4px',
                            objectFit: 'cover',
                            border: '1px solid #ccc',
                        }}
                    />
                </div>
            ))}
        </div>
    </div>
</div>
                                </tbody>
                            </table>
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
