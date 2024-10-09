import React, { useState, useEffect, useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useParams } from 'react-router-dom';
import Search from '~/layouts/components/Search';
import Pagination from '~/layouts/components/Pagination';
import debounce from 'lodash.debounce';
import { editAppointmentDesign } from '~/services/User/appointmentService';

function DesignerAppointment() {
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
                const response = await editAppointmentDesign(userId, currentPage, limit);
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
                setLoading(false);
            }
        };
        if (userId) {
            fetchOrders();
        }
    }, [currentPage, limit, userId, status]);

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
                    <div className="col-md-12 grid-margin">
                        <div className="row">
                            <div className="col-12 col-xl-8 mb-4 mb-xl-0">
                                <h3 className="font-weight-bold"> DesignerAppointments</h3>
                                <Link to="/designer" className="btn btn-primary mb-3">
                                    <i className="fas fa-arrow-left"></i> Back
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
                                                        <th>Username</th>
                                                        <th>Email</th>
                                                        <th>Status</th>
                                                        <th>datetimeStart</th>
                                                        <th>datetimeEnd</th>
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
                                                            <td>{item.designer.username}</td>
                                                            <td>{item.designer.email}</td>
                                                            <td>{item.status}</td>
                                                            <td>{item.datetimeStart}</td>
                                                            <td>{item.datetimeEnd}</td>
                                                            <td>
                                                                <Link
                                                                    to={`/designer-appointments/detail/${item.id}`}
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

export default DesignerAppointment;
