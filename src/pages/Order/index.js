import React, { useState, useEffect, useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import Search from '~/layouts/components/Search';
import Pagination from '~/layouts/components/Pagination';
import { getFilteredOrders } from '~/services/Orders/orderService';
import debounce from 'lodash.debounce';

function Order() {
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState('');
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [numbers, setNumbers] = useState([]);
    const [search, setSearch] = useState('');
    const [sortOrder, setSortOrder] = useState('desc');
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [dateStart, setDateStart] = useState('');
    const [dateEnd, setDateEnd] = useState('');

    useEffect(() => {
        let filteredData = data;

        if (search) {
            filteredData = filteredData.filter(
                (item) =>
                    item?.orderCode?.toString().toLowerCase().includes(search.toLowerCase()) ||
                    item?.name?.toString().toLowerCase().includes(search.toLowerCase()) ||
                    item?.id?.toString().toLowerCase().includes(search.toLowerCase()),
            );
        }

        if (status !== '') {
            filteredData = filteredData.filter((item) => item.status === status);
        }

        const pagesArray = Array.from({ length: totalPages }, (_, i) => i + 1);
        setNumbers(pagesArray);
        setFilteredOrders(filteredData);

        console.log('Data fetched:', data);
    }, [search, data, totalPages, status]);

    useEffect(() => {
        getFilteredData();
    }, [currentPage, limit, sortOrder, search, dateStart, dateEnd]);

    const getFilteredData = async () => {
        try {
            const params = {
                page: currentPage,
                size: Number(limit),
                sort: `createdAt:${sortOrder}`,
            };

            if (search) {
                params.order = `id~${search}`;
            }
            if (dateStart) {
                params.dateStart = dateStart;
            }
            if (dateEnd) {
                params.dateEnd = dateEnd;
            }

            const response = await getFilteredOrders(params);
            setData(response.data.content);
            setTotalPages(response.data.totalPages);
            setNumbers([...Array(response.data.totalPages).keys()].map((i) => i + 1));
            setLoading(false);
        } catch (error) {
            toast.error('Failed to fetch products', error);
            setLoading(false);
        }
    };

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleLimitChange = (e) => {
        setLimit(Number(e.target.value));
        setCurrentPage(1);
    };

    const handleSort = (order) => {
        setSortOrder(order);
    };

    const handleSearch = useCallback(
        debounce((value) => {
            setSearch(value);
        }, 500),
        [],
    );

    const handleDateStartChange = useCallback(
        debounce((value) => {
            setDateStart(value);
        }, 500),
        [],
    );

    const handleDateEndChange = useCallback(
        debounce((value) => {
            setDateEnd(value);
        }, 500),
        [],
    );

    return (
        <>
            <div className="content-wrapper">
                <div className="row">
                    <div className="col-lg-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                {loading ? (
                                    <div>Loading...</div>
                                ) : (
                                    <>
                                        <h3 className="font-weight-bold">Orders</h3>

                                        <div className="float-left">
                                            <select
                                                className="form-control selectric btn-primary"
                                                onChange={handleStatusChange}
                                            >
                                                <option value="">Sort Status</option>
                                                <option value="CREATED">Created</option>
                                                <option value="PAYMENT_FAILED">Payment Failed</option>
                                                <option value="PENDING">Pending</option>
                                                <option value="PROCESSING">Processing</option>
                                                <option value="ONDELIVERY">On Delivery</option>
                                                <option value="DELIVERED">Delivered</option>
                                                <option value="CANCEL">Cancel</option>
                                                <option value="COMPLETE">Complete</option>
                                            </select>
                                        </div>
                                        {/* <div className="float-left ml-2">
                                            <input
                                                type="date"
                                                className="form-control"
                                                value={dateStart}
                                                onChange={(e) => handleDateStartChange(e.target.value)}
                                            />
                                        </div>
                                        <div className="float-left ml-2">
                                            <input
                                                type="date"
                                                className="form-control"
                                                value={dateEnd}
                                                onChange={(e) => handleDateEndChange(e.target.value)}
                                            />
                                        </div> */}

                                        <div className="float-left ml-2">
                                            <select
                                                className="sort-dropdown"
                                                onChange={(e) => handleSort(e.target.value)}
                                            >
                                                <option value="asc">Sort Date</option>
                                                <option value="asc">Sort Ascending</option>
                                                <option value="desc">Sort Descending</option>
                                            </select>
                                        </div>
                                        <Search className="float-left ml-2" setSearch={handleSearch} />
                                        <div className="table-responsive">
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th>OrderCode</th>
                                                        <th>Full Name</th>
                                                        <th>Total Price</th>
                                                        <th>Created At</th>
                                                        <th>Status</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {filteredOrders.map((item, index) => (
                                                        <tr key={item.id}>

                                                            <td>{item.codeOrder}</td>
                                                            <td>
                                                                {item.firstName} {item.lastName}
                                                            </td>
                                                            <td>{item.totalPrice}</td>
                                                            <td>{item.createdAt}</td>
                                                            <td>
                                                                {item.status === 'CREATED' && (
                                                                    <div
                                                                        className="badge"
                                                                        style={{
                                                                            backgroundColor: '#FFA500',
                                                                            color: '#FFFFFF',
                                                                        }}
                                                                    >
                                                                        Created
                                                                    </div>
                                                                )}
                                                                {item.status === 'PAYMENT_FAILED' && (
                                                                    <div
                                                                        className="badge"
                                                                        style={{
                                                                            backgroundColor: '#FF0000',
                                                                            color: '#FFFFFF',
                                                                        }}
                                                                    >
                                                                        Payment Failed
                                                                    </div>
                                                                )}
                                                                {item.status === 'PENDING' && (
                                                                    <div
                                                                        className="badge"
                                                                        style={{
                                                                            backgroundColor: '#808080',
                                                                            color: '#FFFFFF',
                                                                        }}
                                                                    >
                                                                        Pending
                                                                    </div>
                                                                )}
                                                                {item.status === 'PROCESSING' && (
                                                                    <div
                                                                        className="badge"
                                                                        style={{
                                                                            backgroundColor: '#0000FF',
                                                                            color: '#FFFFFF',
                                                                        }}
                                                                    >
                                                                        Processing
                                                                    </div>
                                                                )}
                                                                {item.status === 'ONDELIVERY' && (
                                                                    <div
                                                                        className="badge"
                                                                        style={{
                                                                            backgroundColor: '#17A2B8',
                                                                            color: '#FFFFFF',
                                                                        }}
                                                                    >
                                                                        On Delivery
                                                                    </div>
                                                                )}
                                                                {item.status === 'DELIVERED' && (
                                                                    <div
                                                                        className="badge"
                                                                        style={{
                                                                            backgroundColor: '#28A745',
                                                                            color: '#FFFFFF',
                                                                        }}
                                                                    >
                                                                        Delivered
                                                                    </div>
                                                                )}
                                                                {item.status === 'CANCEL' && (
                                                                    <div
                                                                        className="badge"
                                                                        style={{
                                                                            backgroundColor: '#DC3545',
                                                                            color: '#FFFFFF',
                                                                        }}
                                                                    >
                                                                        Cancel
                                                                    </div>
                                                                )}
                                                                {item.status === 'COMPLETE' && (
                                                                    <div
                                                                        className="badge"
                                                                        style={{
                                                                            backgroundColor: '#008000',
                                                                            color: '#FFFFFF',
                                                                        }}
                                                                    >
                                                                        Complete
                                                                    </div>
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
                                            prePage={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                            nextPage={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
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
