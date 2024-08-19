import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function Product() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:8082/api/v1/products`);
                setProducts(response.data.content);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleDelete = async (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await axios.delete(`http://localhost:8082/api/v1/products/${productId}`);
                setProducts(products.filter(product => product.productId !== productId));
                alert('Product deleted successfully');
            } catch (error) {
                console.error('Error deleting product:', error);
                alert('Failed to delete product');
            }
        }
    };

    return (
        <>
            <div className="content-wrapper">
                <div className="row">
                    <div className="col-lg-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Striped Table</h4>
                                <p className="card-description">
                                    <a href="/addcreate" className="btn btn-primary">
                                        Add Product
                                    </a>
                                </p>
                                <div className="table-responsive">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>Product ID</th>
                                                <th>Name</th>
                                                <th>Images</th>
                                                <th>Price</th>
                                                <th>Category</th>
                                                <th>Stock Quantity</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {products.map((product) => (
                                                <tr key={product.productId}>
                                                    <td>{product.productId}</td>
                                                    <td> <Link to={`/productdetail/${product.productId}`}>{product.name}</Link></td>
                                                    <td>
                                                        {product.images.length > 0 ? (
                                                            <img src={`http://localhost:8082/api/v1/product-images/images/${product.images[0].imageUrl}`} alt={product.name} style={{ width: '70px', height: '70px', borderRadius: '0px' }} />
                                                        ) : (
                                                            'No Image'
                                                        )}
                                                    </td>
                                                    <td>{product.price}$</td>
                                                    <td>{product.category ? product.category.categoryName : 'N/A'}</td>
                                                    <td>{product.stockQuantity}</td>
                                                    <td>
                                                        <Link
                                                            to={`/editproduct/${product.productId}`}
                                                            className="btn btn-primary"
                                                            title="Edit"
                                                        >
                                                            <i className="fas fa-pencil-alt"></i>
                                                        </Link>
                                                        &nbsp;
                                                        <button
                                                            className="btn btn-danger"
                                                            onClick={() => handleDelete(product.productId)}
                                                            title="Delete"
                                                        >
                                                            <i className="fas fa-trash"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Product;