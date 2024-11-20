import React, { useState, useEffect, useCallback } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import Search from '~/layouts/components/Search';
import Pagination from '~/layouts/components/Pagination';
import { getContact, deleteContact } from '~/services/User/contactService';
import { debounce } from 'lodash';

function Contact() {
    const [filteredContact, setFilteredContact] = useState([]);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [numbers, setNumbers] = useState([]);
    const [search, setSearch] = useState('');
    const [sortOrder, setSortOrder] = useState('desc');

    useEffect(() => {
        const applyFilters = () => {
            const filteredData = data.filter((item) => {
                const email = item.email ? item.email.toString().toLowerCase() : '';
                const username = item.username ? item.username.toString().toLowerCase() : '';
                const searchLower = search.toLowerCase();

                return (
                    email.includes(searchLower) || username.includes(searchLower)
                );
            });
            setFilteredContact(filteredData);
        };
        applyFilters();
    }, [search, data]);

    useEffect(() => {
        getFilteredData();
    }, [currentPage, limit, search, sortOrder]);

    const getFilteredData = async () => {
        try {
            const params = {
                page: currentPage,
                size: limit,
                sort: `id:${sortOrder}`,
            };

            if (search) {
                params.contact = `username~${search}, 'email~${search}`;
            }

            const response = await getContact(params);
            setData(response.data.content);
            setLoading(false);
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
                                        <h3 className="font-weight-bold">Contact</h3>
                                        <Search setSearch={handleSearch} />
                                        <div className="float-left ml-2">
                                            <div className="sort-container">
                                                <select
                                                    className="sort-dropdown"
                                                    onChange={(e) => handleSort(e.target.value)}
                                                >
                                                    <option value="desc">Sort Date</option>
                                                    <option value="asc">Sort Ascending</option>
                                                    <option value="desc">Sort Descending</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="table-responsive">
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Username</th>
                                                        <th>Email</th>
                                                        <th>Phone</th>
                                                        <th>Note</th>
                                                        {/* <th>Action</th> */}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {filteredContact.map((item, index) => (
                                                        <tr key={item.id}>
                                                            <td>{(currentPage - 1) * limit + index + 1}</td>
                                                            <td>{item.username}</td>
                                                            <td>{item.email}</td>
                                                            <td>{item.phoneNumber}</td>
                                                            <td>{item.note}</td>
                                                            <td>
                                                                <Link
                                                                    to={`/contact/edit/${item.id}`}
                                                                    className="btn btn-warning"
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

export default Contact;
