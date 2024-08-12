import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Product() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Hàm gọi API để lấy danh sách sản phẩm
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:8082/api/v1/products`); // URL của API
                setProducts(response.data.content);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <>
            <div className="content-wrapper">
                <div className="row">
                    <div className="col-lg-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Striped Table</h4>
                                <p className="card-description">
                                    Add class <code>.table-striped</code>
                                </p>
                                <div className="table-responsive">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>Product ID</th>
                                                <th>Name</th>
                                                <th>Images</th>
                                                <th>Description</th>
                                                <th>Price</th>
                                                <th>Category</th>
                                                <th>Stock Quantity</th>
                                                <th>Manufacturer</th>
                                               
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {products.map((product) => (
                                                <tr key={product.productId}>
                                                    <td>{product.productId}</td>
                                                    <td>{product.name}</td>
                                                    <td>
                                                    {product.images.length > 0 ? (
    <img src={`http://localhost:8082/api/v1/product-images/images/${product.images[0].imageUrl}`} alt={product.name} style={{ width: '50px', height: '50px' }} />
) : (
    'No Image'
)}
            </td>
                                                    <td>{product.description}</td>
                                                    <td>{product.price}</td>
                                                    <td>{product.category ? product.category.categoryName : 'N/A'}</td>
                                                    <td>{product.stockQuantity}</td>
                                                    <td>{product.manufacturer}</td>
                                                    
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