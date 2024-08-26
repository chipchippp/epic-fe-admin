import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';

function OrderDetail() {
    const { id } = useParams();
    const [data, setData] = useState({
        categoryId: '',
        categoryName: '',
        description: '',
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(`http://localhost:8082/api/v1/orders/${id}`);
                setData(result.data);
            } catch (error) {
                toast.error('Failed to fetch category data');
                console.error('Fetch error:', error);
            }
        };
        fetchData();
    }, [id]);

    const handleUpdate = async (event) => {
        event.preventDefault();

        try {
            await axios.put(`http://localhost:8082/api/v1/orders/${id}`, {
                categoryName: data.categoryName,
                description: data.description,
            });
            toast.success('orders updated successfully');
            navigate('/orders');
        } catch (error) {
            toast.error('Failed to update orders');
            console.error('Update error:', error);
        }
    };

    return (
        <>
            <div className="content-wrapper">
                <div className="row">
                    <div className="col-md-12 grid-margin">
                        <div className="row">
                            <div className="col-12 col-xl-8 mb-4 mb-xl-0">
                                <h3 className="font-weight-bold">Detail Category</h3>
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
                                    <h2>Order #{data.id}</h2>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-md-6">
                                        <address>
                                            <strong>Billed To:</strong>
                                            <p>User: {data.name}</p>
                                            <p>Email: {data.email}</p>
                                            <p>Telephone: {data.tel}</p>
                                            <p>OrderCode: {data.orderCode}</p>
                                        </address>
                                    </div>
                                    <div className="col-md-6 text-md-right">
                                        <address>
                                            <strong>Shipped To:</strong>
                                            <p>Address: {data.address}</p>
                                        </address>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <address>
                                            <p>Payment Method: {data.payment_method}</p>
                                        </address>
                                    </div>
                                    <div className="col-md-6 text-md-right">
                                        <address>
                                            <strong>Order Date:</strong>
                                            {/* <p>{formatDate(data.orderDate)}</p> */}
                                        </address>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <form onSubmit={handleUpdate}>
                            <div className="row mb-4">
                                <div className="col-md-2">
                                    {/* <select
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
                                    </select> */}
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
                                        <tbody>
                                            <tr>
                                                <th>#</th>
                                                <th>Products</th>
                                                <th>Name</th>
                                                <th>Price</th>
                                                <th>Quantity</th>
                                                <th>Subtotal</th>
                                            </tr>
                                            {/* {products.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>
                                                        <img
                                                            src={item.product.imageSrc}
                                                            style={{ width: '100px', height: 'auto' }}
                                                            alt={item.image}
                                                        />
                                                    </td>
                                                    <td>{item.product.name}</td>
                                                    <td>${item.product.price}</td>
                                                    <td>{item.quantity}</td>
                                                    <td>${data.totalAmount}</td>
                                                </tr>
                                            ))} */}
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
                                            <div className="invoice-detail-value">${data.totalAmount}</div>
                                        </div>
                                        <hr className="mt-2 mb-2" />
                                        <div className="invoice-detail-item">
                                            <div className="invoice-detail-name">Total</div>
                                            <div className="invoice-detail-value invoice-detail-value-lg">
                                                ${data.totalAmount}
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
            <ToastContainer />
        </>
    );
}

export default OrderDetail;
