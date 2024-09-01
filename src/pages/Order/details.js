import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';

function OrderDetail() {
    const [products, setProducts] = useState([]);
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
                setProducts(result.data.data.orderDetails);
                setLoading(false);
            } catch (error) {
                toast.error('Failed to fetch order data');
                console.error('Fetch error:', error);
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleUpdate = async (event) => {
        event.preventDefault();
        try {
            const result = await axios.put(`http://localhost:8084/api/v1/orders/${id}`, {
                status: tempStatus,
            });
            console.log('result', result);
            toast.success('Order status updated successfully');
            navigate(`/orders/${id}`);
        }
        catch (error) {
            toast.error('Failed to update order status');
            console.error('Update error:', error);
        }
    };

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

    const getSelectableOptions = () => {
        const options = [
            { value: 0, label: 'Pending' },
            { value: 1, label: 'Confirmed' },
            { value: 2, label: 'Shipping' },
            { value: 3, label: 'Shipped' },
            { value: 4, label: 'Complete' },
            { value: 5, label: 'Canceled' },
        ];

        switch (tempStatus) {
            case 0:
                return options.filter((option) => ![2, 3, 4].includes(option.value));
            case 1:
                return options.filter((option) => ![0, 3, 4].includes(option.value));
            case 2:
                return options.filter((option) => ![0, 1, 4, 5].includes(option.value));
            case 3:
                return options.filter((option) => ![0, 1, 2, 5].includes(option.value));
            case 4:
                return options.filter((option) => ![0, 1, 2, 3].includes(option.value));
            default:
                return options;
        }
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
                                            <form onSubmit={handleUpdate}>
                            <div className="row mb-4">
                                <div className="col-md-2">
                                    <select
                                        className="form-control"
                                        id="status"
                                        value={tempStatus}
                                        onChange={(e) => setTempStatus(parseInt(e.target.value))}
                                        disabled={data.status !== tempStatus || data.status === 4 || data.status === 5}
                                    >
                                        {getSelectableOptions().map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <button className="btn btn-primary" type="submit">
                                        Update Status
                                    </button>
                                </div>
                            </div>
                        </form>
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
                                                                            <img
                                                                                src={item.product.image}
                                                                                alt={item.product.name}
                                                                                className="img-fluid"
                                                                                style={{ width: '100px' }}
                                                                            />
                                                                        </td>
                                                                        <td>{item.product.name}</td>
                                                                        <td>{item.product.category.categoryName}</td>
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
