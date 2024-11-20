import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { editProduct } from '~/services/Product/productService';
import { ToastContainer } from 'react-toastify';
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
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Product Details</h4>
                            <Link to="/product" className="btn btn-primary mb-3">
                                <i className="fas fa-arrow-left"></i> Back
                            </Link>
                            <table className="table table-bordered table-striped">
                                <tbody>
                                    <tr>
                                        <th>Name</th>
                                        <td>{product.name}</td>
                                    </tr>
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
                                        <th>Images Product</th>
                                        <td>
                                            {product.images && product.images.length > 0
                                                ? product.images.map((image, index) => (
                                                      <img
                                                          key={image.imageId || index}
                                                          src={image.imageUrl}
                                                          alt={`${product.name} ${index + 1}`}
                                                          style={{
                                                              width: '150px',
                                                              height: '150px',
                                                              objectFit: 'cover',
                                                              borderRadius: '4px',
                                                              marginRight: '10px',
                                                          }}
                                                      />
                                                  ))
                                                : 'No Images'}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {/* <ToastContainer /> */}
        </div>
    );
};

export default ProductDetail;
