import React, { useState, useEffect } from 'react';
import { getProduct } from '~/services/Product/productService';
import { getUsers } from '~/services/User/userService';
import { getAllOrders, getOrderCount } from '~/services/Orders/orderService';
import Product from './Product';
import { toast } from 'react-toastify';

function HomeAdmin() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getOrderData();
    getProductData();
    // getOrderCount();
    getUserData();
  }, []);

  const getOrderData = () => {
    getAllOrders()
      .then((data) => {
        setOrders(data.data.content);
      })
      .catch((error) => {
        toast.error('Failed to fetch orders', error);
      });
  };

  const getOrderCount = () => {
    getAllOrders()
      .then((data) => {
        console.log(data.data);
        setOrders(data.data);
      })
      .catch((error) => {
        toast.error('Failed to fetch orders', error);
      });
  };

  const getProductData = () => {
    getProduct()
      .then((data) => {
        console.log(data.data);
        setProducts(data.data);
      })
      .catch((error) => {
        toast.error('Failed to fetch products', error);
      });
  };

  const getUserData = () => {
    getUsers()
      .then((data) => {
        setUsers(data.data.content);
      })
      .catch((error) => {
        toast.error('Failed to fetch users', error);
      });
  };

  return (
    <div className="content-wrapper">
      <div className="row mb-4">
        <div className="col-md-12">
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="font-weight-bold">Welcome Aamir</h3>
            <h6 className="font-weight-normal mb-0">
              All systems are running smoothly! You have
              <span className="text-primary"> 3 unread alerts!</span>
            </h6>
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
                  <p className="mb-4">Today’s Bookings</p>
                  <p className="fs-30 mb-2">4006</p>
                  <p>10.00% (30 days)</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <div className="card card-light-danger">
                <div className="card-body">
                  <p className="mb-4">Total Order Completed</p>
                  <p className="fs-30 mb-2">{orders.filter(order => order.status === "COMPLETED").length}</p>
                  <p>abc</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <div className="card card-light-blue">
                <div className="card-body">
                  <p className="mb-4">Total Product</p>
                  <p className="fs-30 mb-2">{products.length}1</p>
                  <p>abc</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <div className="card card-light-blue">
                <div className="card-body">
                  <p className="mb-4">Total Users</p>
                  <p className="fs-30 mb-2">{users.length}</p>
                  <p>abc</p>
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
                      <th>PENDING</th>
                      <th>PROCESSING</th>
                      <th>ONDELIVERY</th>
                      <th>DELIVERED</th>
                      <th>CANCEL</th>
                      <th>COMPLETED</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><p className="fs-20 mb-2">{orders.filter(order => order.status === "CREATED").length}</p></td>
                      <td><p className="fs-20 mb-2">{orders.filter(order => order.status === "PENDING").length}</p></td>
                      <td><p className="fs-20 mb-2">{orders.filter(order => order.status === "PROCESSING").length}</p></td>
                      <td><p className="fs-20 mb-2">{orders.filter(order => order.status === "ONDELIVERY").length}</p></td>
                      <td><p className="fs-20 mb-2">{orders.filter(order => order.status === "DELIVERED").length}</p></td>
                      <td><p className="fs-20 mb-2">{orders.filter(order => order.status === "CANCEL").length}</p></td>
                      <td><p className="fs-20 mb-2">{orders.filter(order => order.status === "COMPLETED").length}</p></td>
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
                      <th>Designer</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><p className="fs-20 mb-2">{users.filter(user => user.roles.some(role => role.name === "ROLE_USER")).length}</p></td>
                      <td><p className="fs-20 mb-2">{users.filter(user => user.roles.some(role => role.name === "ROLE_ADMIN")).length}</p></td>
                      <td><p className="fs-20 mb-2">{users.filter(user => user.roles.some(role => role.name === "ROLE_DESIGNER")).length}</p></td>
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
    </div>
  );
}

export default HomeAdmin;
