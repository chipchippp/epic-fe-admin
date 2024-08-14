import React, { useState, useEffect } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Search from '~/layouts/components/Search';
import Pagination from '~/layouts/components/Pagination';

function Order() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const [search, setSearch] = useState('');
    const [searchedData, setSearchedData] = useState([]);
    useEffect(() => {
        const filteredData = data.filter((item) =>
            item.categoryName.toLowerCase().includes(search.toLowerCase())
        );
        setSearchedData(filteredData);
    }, [search, data]);

    // Page
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 7;
    const lastindex = currentPage * recordsPerPage;
    const firstIndex = lastindex - recordsPerPage;
    const records = searchedData.slice(firstIndex, lastindex);
    const npage = Math.ceil(searchedData.length / recordsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);

    function prePage() {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    }
    function changeCPage(id) {
        setCurrentPage(id);
    }
    function nextPage() {
        if (currentPage !== npage) {
            setCurrentPage(currentPage + 1);
        }
    }

        useEffect(() => {
            const fetchCategory = async () => {
                try {
                    const response = await axios.post(`http://localhost:8084/api/v1/orders/search`);
                    setData(response.data.content);
                    setSearchedData(response.data.content);
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching products:', error);
                    setLoading(false);
                }
            };
            fetchCategory();
        }, []);

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
    return (
        <>
            <div className="content-wrapper">
                <div className="row">
                    <div className="col-md-12 grid-margin">
                        <div className="row">
                            <div className="col-12 col-xl-8 mb-4 mb-xl-0">
                                <h3 className="font-weight-bold">Orders</h3>
                                <h6 className="font-weight-normal mb-0">
                                    All systems are running smoothly! You have
                                    <span className="text-primary">3 unread alerts!</span>
                                </h6>
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
                                        <Link to="/category/create" className="btn btn-primary">
                                            <i className="fas fa-plus"></i> New
                                        </Link>
                                        <Search setSearch={setSearch} />

                                        <div className="table-responsive">
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th>Id</th>
                                                        <th>OrderCode</th>
                                                        <th>Email</th>
                                                        <th>OrderDate</th>
                                                        <th>Payment</th>
                                                        <th>Status</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {records.map((item, index) => (
                                                        <tr key={item.id}>
                                                            <td>{index + firstIndex + 1}</td>
                                                            <td>{item.orderCode}</td>
                                                            <td>{item.userId}</td>
                                                            <td>{formatDate(item.createdAt)}</td>
                                                            <td>
                                                                {item.status === 0 && (
                                                                    <div className="badge badge-warning">Pending</div>
                                                                )}
                                                                {item.status === 1 && (
                                                                    <div className="badge badge-secondary">
                                                                        Confirmed
                                                                    </div>
                                                                )}
                                                                {item.status === 2 && (
                                                                    <div className="badge badge-primary">Shipping</div>
                                                                )}
                                                                {item.status === 3 && (
                                                                    <div className="badge badge-info">Shipped</div>
                                                                )}
                                                                {item.status === 4 && (
                                                                    <div className="badge badge-success">Complete</div>
                                                                )}
                                                                {item.status === 5 && (
                                                                    <div className="badge badge-danger">Cancel</div>
                                                                )}
                                                            </td>
                                                            <td colSpan={2}>
                                                                <Link
                                                                    to={`/Orders/detail/${item.id}`}
                                                                    className="btn btn-info"
                                                                    title="Details"
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
                                            prePage={prePage}
                                            nextPage={nextPage}
                                            changeCPage={changeCPage}
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
