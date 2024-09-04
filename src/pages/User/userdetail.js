import React, { useState, useEffect } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Search from '~/layouts/components/Search';
import Pagination from '~/layouts/components/Pagination';

function UserDetail() {
    const { userId } = useParams(); // Get userId from URL parameters
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState('');   
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(15);
    const [numbers, setNumbers] = useState([]);
    const [search, setSearch] = useState('');
    const [searchedData, setSearchedData] = useState([]);
    const [userName, setUserName] = useState(''); // State to store the user's name

    useEffect(() => {
        let filteredData = data;
        
        if(search){
            filteredData = filteredData.filter(
                (item) =>
                item.id.orderId.toString().toLowerCase().includes(search.toLowerCase())
            );
        }
        if (status !== '') {
            filteredData = filteredData.filter((item) => item.status === status);
        }
    
        const pagesArray = Array.from({ length: totalPages }, (_, i) => i + 1);
        setNumbers(pagesArray);
        setSearchedData(filteredData);
    }, [search, data, totalPages, status]);

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:8084/api/v1/orders/user/${userId}`);
                console.log('response', response.data.data);
                const orderDetails = response.data.data.orderDetails || []; // Ensure it's an array
                const enrichedOrderDetails = orderDetails.map(detail => ({
                    ...detail,
                    orderCode: response.data.data.id,
                    userId: response.data.data.userId,
                    totalPrice: response.data.data.totalPrice,
                    status: response.data.data.status
                }));
                setData(enrichedOrderDetails);
                setSearchedData(enrichedOrderDetails);
                setTotalPages(response.data.data.totalPages || 1); // Assuming totalPages is part of the response
                setUserName(`${response.data.data.firstName} ${response.data.data.lastName}`); // Set the user's name
                setLoading(false);
            } catch (error) {
                console.error('Error fetching orders:', error);
                setLoading(false);
            }
        };
        fetchOrders();
    }, [currentPage, limit, userId]);

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleLimitChange = (e) => {
        setLimit(e.target.value);
        setCurrentPage(1);
    };

    return ( 
        <>
            <div className="content-wrapper">
                <div className="row">
                    <div className="col-md-12 grid-margin">
                        <div className="row">
                            <div className="col-12 col-xl-8 mb-4 mb-xl-0">
                                <h3 className="font-weight-bold"> Order of {userName}</h3>
                                <Link to="/Orders/create" className="btn btn-primary">
                                    <i className="fas fa-plus"></i> New
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                {loading ? (
                                    <div>Loading...</div>
                                ) : (
                                    <>
                                        <div className="float-left">
                                            <select
                                                className="form-control selectric"
                                                value={status}
                                                onChange={handleStatusChange}
                                            >
                                                <option value="">All</option>
                                                <option value="CREATED">Created</option>
                                                <option value="PENDING">Pending</option>
                                                <option value="PROCESSING">Processing</option>
                                                <option value="ONDELIVERY">On Delivery</option>
                                                <option value="DELIVERED">Delivered</option>
                                                <option value="CANCELLED">Cancelled</option>
                                            </select>
                                        </div>
                                        <div className="float-left ml-2">
                                            <select onChange={handleLimitChange} className='btn-primary form-control selectric' value={limit}>
                                                <option value={15}>Show</option>
                                                <option value={20}>10</option>
                                                <option value={25}>20</option>
                                                <option value={30}>30</option>
                                            </select>
                                        </div>
                                        <Search  className="float-left ml-2" setSearch={setSearch} />
                                        <div className="table-responsive">
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>OrderCode</th>
                                                        <th>UserId</th>
                                                        <th>Total Price</th>
                                                        <th>Status</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {searchedData.map((item, index) => (
                                                        <tr key={item.id.orderId + '-' + item.id.productId}>
                                                            <td>{(currentPage - 1) * limit + index + 1}</td>
                                                            <td>{item.orderCode}</td>
                                                            <td>{item.userId}</td>
                                                            <td>{item.totalPrice}</td>
                                                            <td>
                                                                {item.status === "CREATED" && (
                                                                    <div className="badge badge-warning">Created</div>
                                                                )}
                                                                {item.status === "PENDING" && (
                                                                    <div className="badge badge-secondary">Pending</div>
                                                                )}
                                                                {item.status === "PROCESSING" && (
                                                                    <div className="badge badge-primary">Processing</div>
                                                                )}
                                                                {item.status === "ONDELIVERY" && (
                                                                    <div className="badge badge-info">On Delivery</div>
                                                                )}
                                                                {item.status === "DELIVERED" && (
                                                                    <div className="badge badge-success">Delivered</div>
                                                                )}
                                                                {item.status === "CANCELLED" && (
                                                                    <div className="badge badge-danger">Cancelled</div>
                                                                )}
                                                            </td>
                                                            <td>
                                                                <Link
                                                                    to={`/order/detail/${item.id.orderId}`}
                                                                    className="btn btn-primary"
                                                                    title="Detail"
                                                                >
                                                                    <i className="far fa-eye"></i>
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        <Pagination
                                            prePage={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                            nextPage={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                            changeCPage={handlePageChange}
                                            currentPage={currentPage}
                                            numbers={numbers}
                                        />
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
     );
}

export default UserDetail;