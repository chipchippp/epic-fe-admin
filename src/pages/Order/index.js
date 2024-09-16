import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Search from '~/layouts/components/Search';
import Pagination from '~/layouts/components/Pagination';
import { getOrders } from '~/services/Orders/orderService';

function Order() {
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState('');   
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [numbers, setNumbers] = useState([]);
    const [search, setSearch] = useState('');
    const [searchedData, setSearchedData] = useState([]);

    useEffect(() => {
        let filteredData = data;
        
        if (search) {
            filteredData = filteredData.filter(
                (item) =>
                    item.id.toString().toLowerCase().includes(search.toLowerCase())
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
        const fetchOrder = async () => {
            try {
                const response = await getOrders(currentPage, limit);
                setData(response.data.content);
                setSearchedData(response.data.content);
                setTotalPages(response.data.totalPages);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };
        fetchOrder();
    }, [currentPage, limit]);

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
                                <h3 className="font-weight-bold">Orders</h3>
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
                                                <option value="PENDING">Pending</option>
                                                <option value="PROCESSING">Processing</option>
                                                <option value="ONDELIVERY">On Delivery</option>
                                                <option value="DELIVERED">Delivered</option>
                                                <option value="CANCEL">Cancel</option>
                                                <option value="COMPLETE">Complete</option>
                                            </select>
                                        </div>
                                        <div className="float-left ml-2">
                                            <select onChange={handleLimitChange} className='btn-primary form-control selectric' value={limit}>
                                                <option value={15}>Show</option>
                                                <option value={10}>10</option>
                                                <option value={20}>20</option>
                                                <option value={30}>30</option>
                                            </select>
                                        </div>
                                        <Search className="float-left ml-2" setSearch={setSearch} />
                                        <div className="table-responsive">
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>OrderCode</th>
                                                        <th>FirstName</th>
                                                        <th>Total Price</th>
                                                        <th>Created At</th>
                                                        <th>Status</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {searchedData.map((item, index) => (
                                                        <tr key={item.id}>
                                                            <td>{(currentPage - 1) * limit + index + 1}</td>
                                                            <td>{item.id}</td>
                                                            <td>{item.firstName}</td>
                                                            <td>{item.totalPrice}</td>
                                                            <td>{item.createdAt}</td>
                                                            <td>
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
                                                                {item.status === "CANCEL" && (
                                                                    <div className="badge badge-danger">Cancel</div>
                                                                )}
                                                                {item.status === "COMPLETE" && (
                                                                    <div className="badge badge-success">Complete</div>
                                                                )}
                                                            </td>
                                                            <td>
                                                                <Link
                                                                    to={`/order/detail/${item.id}`}
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

export default Order;
