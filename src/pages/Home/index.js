import BarChart from './barChart';
import React, { useState, useEffect } from 'react';
import { getProducts, getOrders, getUsers } from '~/services/Dashboard/dashService';

function HomeAdmin() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getOrderData();
    getProductData();
    getUserData();
  }, []);

  const getOrderData = () => {
    getOrders()
      .then((data) => {
        setOrders(data.data.content);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const getProductData = () => {
    getProducts()
      .then((data) => {
        setProducts(data.data.content);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const getUserData = () => {
    getUsers()
      .then((data) => {
        setUsers(data.data.content);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <>
      <div className="content-wrapper">
        <div className="row mb-4">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="font-weight-bold">Welcome Aamir</h3>
              <h6 className="font-weight-normal mb-0">
                All systems are running smoothly! You have
                <span className="text-primary"> 3 unread alerts!</span>
              </h6>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="card card-tale">
              <div className="card-body">
                <p className="mb-4 fs-30">Order Statistics</p>
                <p className="fs-20 mb-2">CREATED {orders.filter((order) => order.status === "CREATED").length}</p>
                <p className="fs-20 mb-2">PENDING {orders.filter((order) => order.status === "PENDING").length}</p>
                <p className="fs-20 mb-2">PROCESSING {orders.filter((order) => order.status === "PROCESSING").length}</p>
                <p className="fs-20 mb-2">ONDELIVERY {orders.filter((order) => order.status === "ONDELIVERY").length}</p>
                <p className="fs-20 mb-2">DELIVERED {orders.filter((order) => order.status === "DELIVERED").length}</p>
                <p className="fs-20 mb-2">CANCEL {orders.filter((order) => order.status === "CANCEL").length}</p>
                <p className="fs-20 mb-2">COMPLETED {orders.filter((order) => order.status === "COMPLETED").length}</p>
              </div>
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="card card-tale">
              <div className="card-body">
                <p className="mb-4 fs-30">Total Product {products.length}</p>
                <p className="mb-4 fs-30">User Statistics</p>
                <p className="fs-20 mb-2">User {users.filter((user) => user.roles.some(role => role.name === "ROLE_USER")).length}</p>
                <p className="fs-20 mb-2">Admin {users.filter((user) => user.roles.some(role => role.name === "ROLE_ADMIN")).length}</p>
                <p className="fs-20 mb-2">Designer {users.filter((user) => user.roles.some(role => role.name === "ROLE_DESIGNER")).length}</p>
                <p className="fs-20 mb-2">Employee {users.filter((user) => user.roles.some(role => role.name === "ROLE_EMPLOYEE")).length}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            {/* <BarChart /> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeAdmin;
