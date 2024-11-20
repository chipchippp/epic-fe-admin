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
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [numbers, setNumbers] = useState([]);
    const [search, setSearch] = useState('');
    const [sortOrder, setSortOrder] = useState('desc');
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [sortStatus, setSortStatus] = useState('');

    useEffect(() => {
        const applyFilters = () => {
            const filteredData = data.filter((item) => {
                const codeOrder = item.codeOrder ? item.codeOrder.toString().toLowerCase() : '';
                const firstName = item.firstName ? item.firstName.toString().toLowerCase() : '';
                const lastName = item.lastName ? item.lastName.toString().toLowerCase() : '';
                const searchLower = search.toLowerCase();

                return (
                    codeOrder.includes(searchLower) || firstName.includes(searchLower) || lastName.includes(searchLower)
                );
            });
            setFilteredOrders(filteredData);
        };

        applyFilters();
    }, [search, data]);

    useEffect(() => {
        const getFilteredData = async () => {
            try {
                const params = {
                    page: currentPage,
                    size: Number(limit),
                    sort: `createdAt:${sortOrder}`,
                };

                if (sortStatus) {
                    params.order = `status:${sortStatus}`;
                }

                if (search) {
                    params.order = `codeOrder~${search}, 'id~${search}, 'firstName~${search}, 'lastName~${search}`;
                }

                console.log('params', params);

                const response = await getFilteredOrders(params);
                console.log('response', response.data.content);
                setData(response.data.content);
                setTotalPages(response.data.totalPages);
                setNumbers([...Array(response.data.totalPages).keys()].map((i) => i + 1));
                setLoading(false);
            } catch (error) {
                toast.error('Failed to fetch orders', error);
                setLoading(false);
            }
        };

        getFilteredData();
    }, [currentPage, limit, sortOrder, search, sortStatus]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSort = (order) => {
        setSortOrder(order);
    };

    const handleSortStatus = (order) => {
        setSortStatus(order);
    };

    const handleSearch = useCallback(
        debounce((value) => {
            setSearch(value);
        }, 500),
        [],
    );

    const statusColors = {
        CREATED: { backgroundColor: '#FFA500', label: 'Created', color: '#FFFFFF' },
        PAYMENT_FAILED: { backgroundColor: '#FF0000', label: 'Payment Failed', color: '#FFFFFF' },
        PENDING: { backgroundColor: '#808080', label: 'Pending', color: '#FFFFFF' },
        PROCESSING: { backgroundColor: '#0000FF', label: 'Processing', color: '#FFFFFF' },
        ONDELIVERY: { backgroundColor: '#17A2B8', label: 'On Delivery', color: '#FFFFFF' },
        DELIVERED: { backgroundColor: '#28A745', label: 'Delivered', color: '#FFFFFF' },
        CANCEL: { backgroundColor: '#DC3545', label: 'Cancel', color: '#FFFFFF' },
        COMPLETE: { backgroundColor: '#008000', label: 'Complete', color: '#FFFFFF' },
    };

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
                                                onChange={(e) => handleSortStatus(e.target.value)}
                                            >
                                                <option value="">Filter Status</option>
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
                                                        <th>#</th>
                                                        <th>OrderCode</th>
                                                        <th>FullName</th>
                                                        <th>Total Price</th>
                                                        <th>CreatedAt</th>
                                                        <th>Status</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {filteredOrders.map((item, index) => (
                                                        <tr key={item.id}>
                                                            <td>{(currentPage - 1) * limit + index + 1}</td>
                                                            <td>{item.codeOrder}</td>
                                                            <td>
                                                                {item.firstName} {item.lastName}
                                                            </td>
                                                            <td>{item.totalPrice}</td>
                                                            <td>{item.createdAt}</td>
                                                            <td>
                                                                <div
                                                                    className="badge"
                                                                    style={statusColors[item.status]}
                                                                >
                                                                    {statusColors[item.status]?.label || item.status}
                                                                </div>
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
                {/* <ToastContainer /> */}
            </div>
        </>
    );
}

export default Order;
