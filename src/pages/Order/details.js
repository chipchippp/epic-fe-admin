import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { editOrders, updateOrders } from '~/services/Orders/orderService';

function OrderDetail() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({
        id: '',
        codeOrder: '',
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
                const result = await editOrders(id);
                setData(result.data);
                setProducts(result.data.orderDetails);
                setLoading(false);
            } catch (error) {
                toast.error('Failed to fetch order data');
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await updateOrders(id, tempStatus);
            toast.success('Order status updated successfully');
            navigate(`/order/detail/${id}`);
            window.location.reload();
        } catch (error) {
            toast.error('Failed to update order status');
            console.error('Error updating order:', error);
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
            { value: 'CREATED', label: 'Created' },
            { value: 'PAYMENT_FAILED', label: 'Payment_Failed' },
            { value: 'PENDING', label: 'Pending' },
            { value: 'PROCESSING', label: 'Processing' },
            { value: 'ONDELIVERY', label: 'On Delivery' },
            { value: 'DELIVERED', label: 'Delivered' },
            { value: 'COMPLETE', label: 'Complete' },
            { value: 'CANCEL', label: 'Cancel' },
        ];

        switch (data.status) {
            case 'CREATED':
                return options.filter((option) => ['PENDING', 'CANCEL'].includes(option.value));
            case 'PAYMENT_FAILED':
                return options.filter((option) => ['PAYMENT_FAILED'].includes(option.value));
            case 'PENDING':
                return options.filter((option) => ['PENDING', 'PROCESSING', 'CANCEL'].includes(option.value));
            case 'PROCESSING':
                return options.filter((option) => ['PROCESSING', 'ONDELIVERY'].includes(option.value));
            case 'ONDELIVERY':
                return options.filter((option) => ['ONDELIVERY', 'DELIVERED'].includes(option.value));
            case 'DELIVERED':
                return options.filter((option) => ['DELIVERED', 'COMPLETE'].includes(option.value));
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
                <div className="col-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <div className="invoice">
                                <div className="invoice-print">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <Link to="/order" className="btn btn-primary mb-3">
                                                <i className="fas fa-arrow-left"></i> Back
                                            </Link>
                                            <div className="invoice-title">
                                                <h4>
                                                    Order <span style={{ color: 'gray' }}>#{data.codeOrder}</span>
                                                </h4>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <address>
                                                        <strong>Billed To:</strong>
                                                        <p>Id: {data.id}</p>
                                                        <p>
                                                            FullName: {data.firstName} {data.lastName}
                                                        </p>
                                                        <p>Email: {data.email}</p>
                                                        <p>Telephone: {data.phone}</p>
                                                        <p>Status: {data.status}</p>
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
                                            <form onSubmit={handleSubmit}>
                                                <div className="row mb-4">
                                                    <div className="col-md-2">
                                                        <select
                                                            className="form-control"
                                                            id="status"
                                                            value={tempStatus}
                                                            onChange={(e) => setTempStatus(e.target.value)}
                                                            disabled={
                                                                data.status === 'COMPLETE' || data.status === 'CANCEL'
                                                            }
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
                                                                {Array.isArray(products) &&
                                                                    products.map((item, index) => (
                                                                        <tr key={index}>
                                                                            <td>{index + 1}</td>
                                                                            <td>
                                                                                {item.product &&
                                                                                item.product.images &&
                                                                                item.product.images.length > 0 ? (
                                                                                    <img
                                                                                        src={
                                                                                            item.product.images[0]
                                                                                                .imageUrl
                                                                                        }
                                                                                        alt={item.product.name}
                                                                                        style={{
                                                                                            width: '70px',
                                                                                            height: '70px',
                                                                                            borderRadius: '0px',
                                                                                        }}
                                                                                    />
                                                                                ) : (
                                                                                    'No Image'
                                                                                )}
                                                                            </td>
                                                                            <td>{item.product.name}</td>
                                                                            <td>
                                                                                {item.product.category.categoryName}
                                                                            </td>
                                                                            <td>${item.unitPrice}</td>
                                                                            <td>{item.quantity}</td>
                                                                            <td>${item.totalPrice}</td>
                                                                        </tr>
                                                                    ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <div className="row mt-4">
                                                        <div className="col-lg-8">
                                                            <div className="section-title">Payment Method</div>
                                                            <p className="section-lead">
                                                                The payment method that we provide is to make it easier
                                                                for you to pay invoices.
                                                            </p>
                                                        </div>
                                                        <div className="col-lg-4 text-right">
                                                            <div className="invoice-detail-item">
                                                                <div className="invoice-detail-name">Subtotal</div>
                                                                <div className="invoice-detail-value">
                                                                    ${data.totalPrice}
                                                                </div>
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
