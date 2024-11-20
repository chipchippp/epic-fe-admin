import React, { useState, useEffect } from 'react';
import { getProduct } from '~/services/Product/productService';
import { getAllUsers } from '~/services/User/userService';
import { getAllOrders, getOrderCount } from '~/services/Orders/orderService';
import Product from './Product';
import { toast, ToastContainer } from 'react-toastify';

function HomeAdmin() {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState({});

    useEffect(() => {
        getProductData();
        getOrderCounts();
        getUserData();
    }, []);

    const getOrderData = () => {
        getAllOrders()
            .then((data) => {
                setOrders(data.data.content);
            })
            .catch((error) => {
                // toast.error('Failed to fetch orders', error);
                console.log(error);
            });
    };

    const getOrderCounts = () => {
        getOrderCount()
            .then((data) => {
                setOrders(data.data);
            })
            .catch((error) => {
                // toast.error('Failed to fetch orders', error);
                console.log(error);
            });
    };

    const getProductData = () => {
        getProduct()
            .then((data) => {
                setProducts(data.data.content);
            })
            .catch((error) => {
                // toast.error('Failed to fetch products', error);
                console.log(error);
            });
    };

    const getUserData = () => {
        getAllUsers()
            .then((data) => {
                console.log(data.data);
                setUsers(data.data);
            })
            .catch((error) => {
                // toast.error('Failed to fetch users', error);
                console.log(error);
            });
    };

    return (
        <div className="content-wrapper">
            <div className="row mb-4">
                <div className="col-md-12">
                    <div className="d-flex justify-content-between align-items-center">
                        <h3 className="font-weight-bold">Welcome Epicfigures</h3>
                    </div>
                </div>
            </div>

            <div className="row mb-4">
                <div className="col-md-6">
                    <div className="card tale-bg">
                        <div className="card-body d-flex flex-column align-items-center">
                            <img src="/src/assets/images/dashboard/people.svg" alt="people" className="mb-3" />
                            <div className="weather-info text-center">
                                <h2 className="mb-0 font-weight-normal">
                                    <i className="icon-sun mr-2" />
                                    31<sup>C</sup>
                                </h2>
                                <h4 className="location font-weight-normal">Bangalore</h4>
                                <h6 className="font-weight-normal">India</h6>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="row">
                        <div className="col-md-6 mb-4">
                            <div className="card card-dark-blue">
                                <div className="card-body">
                                    <p className="mb-4">Total Revenue</p>
                                    <p className="fs-30 mb-2">{orders.revenue}</p>
                                    <p> </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mb-4">
                            <div className="card card-light-danger">
                                <div className="card-body">
                                    <p className="mb-4">Total Order Completed</p>
                                    <p className="fs-30 mb-2">{orders.complete}</p>
                                    <p> </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mb-4">
                            <div className="card card-light-blue">
                                <div className="card-body">
                                    <p className="mb-4">Total Product</p>
                                    <p className="fs-30 mb-2">{products.length}</p>
                                    <p> </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mb-4">
                            <div className="card card-light-blue">
                                <div className="card-body">
                                    <p className="mb-4">Total Users</p>
                                    <p className="fs-30 mb-2">{users.totalUsersCustomer || 0}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mb-4">
                <div className="col-md-6 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="font-weight-bold">Order Statistics</h3>
                            <div className="table-responsive">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>CREATED</th>
                                            <th>PAYMENT_FAILED</th>
                                            <th>PENDING</th>
                                            <th>PROCESSING</th>
                                            <th>ONDELIVERY</th>
                                            <th>DELIVERED</th>
                                            <th>COMPLETED</th>
                                            <th>CANCEL</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <p className="fs-20 mb-2">{orders.created}</p>
                                            </td>
                                            <td>
                                                <p className="fs-20 mb-2">{orders.paymentFailed}</p>
                                            </td>
                                            <td>
                                                <p className="fs-20 mb-2">{orders.pending}</p>
                                            </td>
                                            <td>
                                                <p className="fs-20 mb-2">{orders.processing}</p>
                                            </td>
                                            <td>
                                                <p className="fs-20 mb-2">{orders.onDelivery}</p>
                                            </td>
                                            <td>
                                                <p className="fs-20 mb-2">{orders.delivered}</p>
                                            </td>
                                            <td>
                                                <p className="fs-20 mb-2">{orders.complete}</p>
                                            </td>
                                            <td>
                                                <p className="fs-20 mb-2">{orders.cancel}</p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="font-weight-bold">User Statistics</h3>
                            <div className="table-responsive">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>User</th>
                                            <th>Admin</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <p className="fs-20 mb-2">{users.totalUsersCustomer || 0}</p>
                                            </td>
                                            <td>
                                                <p className="fs-20 mb-2">{users.totalUsersAdmin || 0}</p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mb-4">
                <div className="col-md-12">
                    <Product />
                </div>
            </div>
            {/* <ToastContainer /> */}
        </div>
    );
}

export default HomeAdmin;
