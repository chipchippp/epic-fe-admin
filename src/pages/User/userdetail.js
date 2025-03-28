import React, { useState, useEffect, useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useParams } from 'react-router-dom';
import Search from '~/layouts/components/Search';
import Pagination from '~/layouts/components/Pagination';
import { getOrderUser } from '~/services/User/userService';
import debounce from 'lodash.debounce';

function UserDetail() {
    const { userId } = useParams();
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
            filteredData = filteredData.filter((item) =>
                item.id.orderId.toString().toLowerCase().includes(search.toLowerCase()),
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
                const response = await getOrderUser(userId, { page: currentPage, limit: limit, status: status });
                const orderDetails = response.data.content || [];
                const enrichedOrderDetails = orderDetails.map((detail) => ({
                    ...detail,
                    orderCode: detail.id,
                    userId: detail.userId,
                    totalPrice: detail.totalPrice,
                    status: detail.status,
                }));

                setData(enrichedOrderDetails);
                setSearchedData(enrichedOrderDetails);
                setTotalPages(response.data.totalPages || 1);
                setLoading(false);
            } catch (error) {
                toast.error('Error fetching Orders user data:', error);
                setLoading(false);
            }
        };
        fetchOrders();
    }, [currentPage, limit, userId, status]);

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    const handleSearch = useCallback(
        debounce((value) => {
            setSearch(value);
        }, 500),
        [],
    );

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
                    <div className="col-lg-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h3 className="font-weight-bold"> UserDetails</h3>
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
                                            <select
                                                onChange={handleLimitChange}
                                                className="btn-primary form-control selectric"
                                                value={limit}
                                            >
                                                <option value={10}>Show</option>
                                                <option value={20}>20</option>
                                                <option value={30}>30</option>
                                            </select>
                                        </div>
                                        <Search className="float-left ml-2" setSearch={handleSearch} />
                                        <div className="table-responsive">
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>OrderCode</th>
                                                        <th>Username</th>
                                                        <th>Total Price</th>
                                                        <th>Status</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {searchedData.map((item, index) => (
                                                        <tr
                                                            key={
                                                                (item.id?.orderId || index) +
                                                                '-' +
                                                                (item.id?.productId || index)
                                                            }
                                                        >
                                                            <td>{(currentPage - 1) * limit + index + 1}</td>
                                                            <td>{item.orderCode}</td>
                                                            <td>
                                                                {item.firstName} {item.lastName}
                                                            </td>
                                                            <td>{item.totalPrice}</td>
                                                            <td>
                                                                {item.status === 'CREATED' && (
                                                                    <div className="badge badge-warning">Created</div>
                                                                )}
                                                                {item.status === 'PENDING' && (
                                                                    <div className="badge badge-secondary">Pending</div>
                                                                )}
                                                                {item.status === 'PROCESSING' && (
                                                                    <div className="badge badge-primary">
                                                                        Processing
                                                                    </div>
                                                                )}
                                                                {item.status === 'ONDELIVERY' && (
                                                                    <div className="badge badge-info">On Delivery</div>
                                                                )}
                                                                {item.status === 'DELIVERED' && (
                                                                    <div className="badge badge-success">Delivered</div>
                                                                )}
                                                                {item.status === 'CANCEL' && (
                                                                    <div className="badge badge-danger">Cancel</div>
                                                                )}
                                                                {item.status === 'COMPLETE' && (
                                                                    <div className="badge badge-success">Complete</div>
                                                                )}
                                                            </td>
                                                            <td>
                                                                <Link
                                                                    to={`/order/detail/${item.id}`}
                                                                    className="btn btn-primary"
                                                                    title="Detail"
                                                                >
                                                                    <i class="fa-solid fa-cart-shopping"></i>
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

export default UserDetail;
