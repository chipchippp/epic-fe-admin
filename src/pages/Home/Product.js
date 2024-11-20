import React, { useState, useEffect } from 'react';
import { getProduct } from '~/services/Product/productService';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const Product = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        try {
            getProduct()
                .then((response) => {
                    setProducts(response.data.content);
                })
                .catch((error) => {
                    toast.error('Failed to fetch products', error);
                });
        } catch (error) {
            toast.error('Failed to fetch products', error);
        }
    };

    return (
        <div className="content-wrapper">
            <div className="col-lg-20 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h3 className="font-weight-bold">Best Selling Products</h3>

                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th className="col-id">Id</th>
                                        <th className="col-img">Img</th>
                                        <th className="col-name">Name</th>
                                        <th className="col-category">Category</th>
                                        <th className="col-soldQuantity">SoldQuantity</th>
                                        <th className="col-quantity">Quantity</th>
                                        <th className="col-price">Price</th>
                                        <th className="col-actions">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((item, index) => (
                                        <tr key={item.productId}>
                                            <td className="col-id">{index + 1}</td>
                                            <td className="col-img">
                                                {item.images.length > 0 ? (
                                                    <img
                                                        src={item.images[0].imageUrl}
                                                        alt={item.name}
                                                        style={{ width: '70px', height: '70px', borderRadius: '0px' }}
                                                    />
                                                ) : (
                                                    'No Image'
                                                )}
                                            </td>
                                            <td className="col-name">{item.name}</td>
                                            <td className="col-category">
                                                {item.category ? item.category.categoryName : 'N/A'}
                                            </td>
                                            <td className="col-soldQuantity">{item.soldQuantity}</td>
                                            <td className="col-quantity">{item.stockQuantity}</td>
                                            <td className="col-price">{item.price}$</td>
                                            <td className="col-actions">
                                                <Link
                                                    to={`/product/detail/${item.productId}`}
                                                    className="btn btn-primary"
                                                    title="Details"
                                                >
                                                    <i class="far fa-eye"></i>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
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

export default Product;
