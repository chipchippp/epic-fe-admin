import React, { useState, useEffect, useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import Search from '~/layouts/components/Search';
import Pagination from '~/layouts/components/Pagination';
import 'rc-slider/assets/index.css';
import debounce from 'lodash.debounce';
import { getReturn } from '~/services/Orders/returnService';

function Return() {
    const [filteredReturns, setFilteredReturns] = useState([]);
    const [sortOrder, setSortOrder] = useState('desc');
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [numbers, setNumbers] = useState([]);

    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState('');

    useEffect(() => {
        const applyFilters = () => {
            const filteredData = data.filter((item) => {
                return item.orderDetail && item.orderDetail.id.toString().toLowerCase().includes(search.toLowerCase());
            });
            setFilteredReturns(filteredData);
        };

        applyFilters();
    }, [search, data]);

    useEffect(() => {
        getFilteredData();
    }, [currentPage, limit, sortStatus, search, sortOrder]);

    const getFilteredData = async () => {
        try {
            const params = {
                page: currentPage,
                size: limit,
                sort: `id:${sortOrder}`,
            };

            if (sortStatus) {
                params.returnItem = `status:${sortStatus}`;
            }

            if (search) {
                params.orderDetail = `id~${search}`;
            }

            const response = await getReturn(params);
            console.log('response ', response.data.content);
            setData(response.data.content);
            setTotalPages(response.data.totalPages);
            setNumbers([...Array(response.data.totalPages).keys()].map((i) => i + 1));
        } catch (error) {
            toast.error('Failed to fetch return item');
        }
    };

    const handleSearch = useCallback(
        debounce((value) => {
            setSearch(value);
        }, 500),
        [],
    );

    const handleSort = (order) => {
        setSortOrder(order);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSortStatus = (order) => {
        setSortStatus(order);
    };

    const statusColors = {
        PENDING: { backgroundColor: '#808080', label: 'Pending', color: '#FFFFFF' },
        APPROVED: { backgroundColor: '#FFA500', label: 'Approved', color: '#FFFFFF' },
        REJECTED: { backgroundColor: '#0000FF', label: 'Rejected', color: '#FFFFFF' },
        REFUNDED: { backgroundColor: '#17A2B8', label: 'Refunded', color: '#FFFFFF' },
        REPLACEMENT_SHIPPED: { backgroundColor: '#28A745', label: 'ReplacementShipped', color: '#FFFFFF' },
        COMPLETED: { backgroundColor: '#008000', label: 'Completed', color: '#FFFFFF' },
    };

    return (
        <>
            <div className="content-wrapper">
                <div className="row">
                    <div className="col-lg-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h3 className="font-weight-bold">Return-Item</h3>
                                <div className="float-left">
                                    <select
                                        className="form-control selectric btn-primary"
                                        onChange={(e) => handleSortStatus(e.target.value)}
                                    >
                                        <option value="">Filter Status</option>
                                        <option value="PENDING">Pending</option>
                                        <option value="APPROVED">Approved</option>
                                        <option value="REJECTED">Rejected</option>
                                        <option value="REFUNDED">Refunded</option>
                                        {/* <option value="REPLACEMENT_SHIPPED">Replacement Shipped</option> */}
                                        {/* <option value="COMPLETED">Completed</option> */}
                                    </select>
                                </div>
                                <div className="float-left ml-2">
                                    <div className="sort-container">
                                        <select className="sort-dropdown" onChange={(e) => handleSort(e.target.value)}>
                                            <option value="desc">Sort Date</option>
                                            <option value="asc">Sort Ascending</option>
                                            <option value="desc">Sort Descending</option>
                                        </select>
                                    </div>
                                </div>
                                <Search setSearch={handleSearch} />
                                <div className="table-responsive">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>OrderDetailId</th>
                                                <th>Images</th>
                                                <th>QuantityReturned</th>
                                                <th>Reason</th>
                                                <th>ReasonNote</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredReturns.map((item, index) => (
                                                <tr key={item.id}>
                                                    <td>{(currentPage - 1) * limit + index + 1}</td>
                                                    <td>
                                                        {item.orderDetail && item.orderDetail.id
                                                            ? item.orderDetail.id.length > 20
                                                                ? item.orderDetail.id.slice(0, 20) + '...'
                                                                : item.orderDetail.id
                                                            : 'No Order Detail'}
                                                    </td>
                                                    <td>
                                                        {item.images.length > 0 ? (
                                                            <img
                                                                src={item.images[0]}
                                                                alt="Return Item"
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
                                                    <td>{item.quantityReturned}</td>
                                                    <td>
                                                        {item.reason && item.reason
                                                            ? item.reason.length > 20
                                                                ? item.reason.slice(0, 20) + '...'
                                                                : item.reason
                                                            : 'No Order Detail'}
                                                    </td>
                                                    <td>{item.reasonNote}</td>
                                                    <td>
                                                        <div className="badge" style={statusColors[item.status]}>
                                                            {statusColors[item.status]?.label || item.status}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <Link
                                                            to={`/return-item/edit/${item.id}`}
                                                            className="btn btn-primary"
                                                            title="Edit"
                                                        >
                                                            <i className="fas fa-pencil-alt"></i>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <Pagination
                                    prePage={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    nextPage={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                    changeCPage={handlePageChange}
                                    currentPage={currentPage}
                                    numbers={numbers}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <ToastContainer /> */}
        </>
    );
}

export default Return;
