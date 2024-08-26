import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';

function OrderDetail() {
    const [products, setProducts] = useState([]); // Initial state as an empty array
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({
        id: '',
        userId: '',
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        phone: '',
        country: '',
        postalCode: '',
        note: '',
        totalPrice: '',
        status: '',
        createdAt: '',
        updatedAt: '',
    });

    const [tempStatus, setTempStatus] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(`http://localhost:8084/api/v1/orders/${id}`);
                console.log('result', result.data.data);
                setData(result.data.data);
                setProducts(result.data.data.orderDetails); // Set products to orderDetails
                setLoading(false);
            } catch (error) {
                toast.error('Failed to fetch order data');
                console.error('Fetch error:', error);
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
        });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="content-wrapper">
                <div className="row">
                    <div className="col-md-12 grid-margin">
                        <div className="row">
                            <div className="col-12 col-xl-8 mb-4 mb-xl-0">
                                <h3 className="font-weight-bold">Order Details</h3>
                                <h6 className="font-weight-normal mb-0">
                                    All systems are running smoothly! You have
                                    <span className="text-primary"> 3 unread alerts!</span>
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <div className="invoice">
                                <div className="invoice-print">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="invoice-title">
                                                <h4>Order #{id}</h4>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <address>
                                                        <strong>Billed To:</strong>
                                                        <p>FullName: {data.firstName} {data.lastName}</p>
                                                        <p>Email: {data.email}</p>
                                                        <p>Telephone: {data.phone}</p>
                                                    </address>
                                                </div>
                                                <div className="col-md-6 text-md-right">
                                                    <address>
                                                        <strong>Shipped To:</strong>
                                                        <p>Address: {data.address}</p>
                                                    </address>
                                                    <address>
                                                        <strong>Order Date:</strong>
                                                        <p>{formatDate(data.createdAt)}</p>
                                                    </address>
                                                </div>
                                            </div>
                                            <div className="row mt-4">
                                                <div className="col-md-12">
                                                    <div className="section-title">Order Summary</div>
                                                    <p className="section-lead">All items here cannot be deleted.</p>
                                                    <div className="table-responsive">
                                                        <table className="table table-striped table-hover table-md">
                                                            <thead>
                                                                <tr>
                                                                    <th>#</th>
                                                                    <th>Image</th>
                                                                    <th>Name</th>
                                                                    <th>Category</th>
                                                                    <th>Price</th>
                                                                    <th>Quantity</th>
                                                                    <th>Subtotal</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {Array.isArray(products) && products.map((item, index) => (
                                                                    <tr key={index}>
                                                                        <td>{index + 1}</td>
                                                                        <td>
                                                                            {item.productDTO.images.length > 0 ? (
                                                                            <img src={`http://localhost:8082/api/v1/product-images/images/${item.productDTO.images[0].imageUrl}`}
                                                                             alt={item.productDTO.name} style={{ width: '70px', height: '70px', borderRadius: '0px' }} />
                                                                            ) : ('No Image' )}
                                                                        </td>
                                                                        <td>{item.productDTO.name}</td>
                                                                        <td>{item.productDTO.category.categoryName}</td>
                                                                        <td>${item.unitPrice}</td>
                                                                        <td>{item.quantity}</td>
                                                                        <td>${item.unitPrice * item.quantity}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <div className="row mt-4">
                                                        <div className="col-lg-8">
                                                            <div className="section-title">Payment Method</div>
                                                            <p className="section-lead">
                                                                The payment method that we provide is to make it easier for you to pay
                                                                invoices.
                                                            </p>
                                                        </div>
                                                        <div className="col-lg-4 text-right">
                                                            <div className="invoice-detail-item">
                                                                <div className="invoice-detail-name">Subtotal</div>
                                                                <div className="invoice-detail-value">${data.totalPrice}</div>
                                                            </div>
                                                            <hr className="mt-2 mb-2" />
                                                            <div className="invoice-detail-item">
                                                                <div className="invoice-detail-name">Total</div>
                                                                <div className="invoice-detail-value invoice-detail-value-lg">
                                                                    ${data.totalPrice}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="text-md-right">
                                            <Link to={`/orders/invoice/${id}`} className="btn btn-primary me-1">
                                                <i className="fa-solid fa-download"></i> Invoice
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export default OrderDetail;
