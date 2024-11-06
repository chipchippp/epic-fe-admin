import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { editProduct } from '~/services/Product/productService';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await editProduct(id);
                setProduct(response.data);
            } catch (error) {
                setError('Failed to fetch product details');
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-danger">{error}</div>;
    }

    return (
        <div className="content-wrapper">
            <div className="row mb-4">
                <div className="col-md-12">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h2 className="font-weight-bold">{product.name}</h2>
                        <Link to="/product" className="btn btn-primary">
                            <i className="fas fa-arrow-left"></i> Back
                        </Link>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title mb-4">Product Details</h4>
                            <table className="table table-bordered table-striped">
                                <tbody>
                                    <tr>
                                        <th>Description</th>
                                        <td>{product.description}</td>
                                    </tr>
                                    <tr>
                                        <th>Price</th>
                                        <td>{product.price}$</td>
                                    </tr>
                                    <tr>
                                        <th>Category</th>
                                        <td>{product.category ? product.category.categoryName : 'N/A'}</td>
                                    </tr>
                                    <tr>
                                        <th>Stock Quantity</th>
                                        <td>{product.stockQuantity}</td>
                                    </tr>
                                    <tr>
                                        <th>Manufacturer</th>
                                        <td>{product.manufacturer}</td>
                                    </tr>
                                    <tr>
                                        <th>Size</th>
                                        <td>{product.size}</td>
                                    </tr>
                                    <tr>
                                        <th>Weight</th>
                                        <td>{product.weight}</td>
                                    </tr>
                                    <tr>
                                        <th>Created At</th>
                                        <td>{new Date(product.createdAt).toLocaleString()}</td>
                                    </tr>
                                    <tr>
                                        <th>Updated At</th>
                                        <td>{new Date(product.updatedAt).toLocaleString()}</td>
                                    </tr>
                                    <tr>
                                        <th>Images</th>
                                        <td>
                                            {product.images.length > 0 ? (
                                                <img
                                                    src={`http://localhost:8080/api/v1/product-images/images/${product.images[0].imageUrl}`}
                                                    alt={product.name}
                                                    style={{
                                                        width: '150px',
                                                        height: '150px',
                                                        objectFit: 'cover',
                                                        borderRadius: '4px',
                                                    }}
                                                />
                                            ) : (
                                                'No Image'
                                            )}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
