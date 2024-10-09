import React, { useState, useEffect, useCallback } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import Search from '~/layouts/components/Search';
import Pagination from '~/layouts/components/Pagination';
import { getDesign, deleteDesign } from '~/services/Designer/designService';
import { debounce } from 'lodash';

function Design() {
    const [loading, setLoading] = useState(true);
    const [deleteShow, setDeleteShow] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [numbers, setNumbers] = useState([]);

    const [status, setStatus] = useState('PENDING');
    const [search, setSearch] = useState('');
    const [searchedData, setSearchedData] = useState([]);

    const debouncedSearch = useCallback(
        debounce((query) => {
            const filteredData = data.filter((item) => item.username.toLowerCase().includes(query.toLowerCase()));
            setSearchedData(filteredData);
        }, 500),
        [data],
    );

    useEffect(() => {
        debouncedSearch(search);
    }, [search, debouncedSearch]);

    useEffect(() => {
        getData();
    }, [currentPage, limit, status]);

    const getData = async () => {
        try {
            const response = await getDesign(status);

            if (response && response.data) {
                setData(response.data);
                setSearchedData(response.data);
            } else {
                toast.error('Invalid response structure from server');
            }
            setLoading(false);
        } catch (error) {
            toast.error('Failed to fetch designer profiles');
        }
    };

    const handleDeleteConfirm = async () => {
        try {
            await deleteDesign(deleteId);
            toast.success('Design has been deleted');
            handleClose();
            getData();
        } catch (error) {
            toast.error('Failed to delete design');
        }
    };

    const handleClose = () => setDeleteShow(false);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleLimitChange = (e) => {
        setLimit(e.target.value);
        setCurrentPage(1);
    };

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
        setCurrentPage(1);
    };

    return (
        <>
            <div className="content-wrapper">
                <div className="row">
                    <div className="col-md-12 grid-margin">
                        <div className="row">
                            <div className="col-12 col-xl-8 mb-4 mb-xl-0">
                                <h3 className="font-weight-bold">Designer Profiles</h3>
                                <Link to="/designer/create" className="btn btn-primary">
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
                                                onChange={handleLimitChange}
                                                className="btn-primary form-control selectric"
                                                value={limit}
                                            >
                                                <option value={5}>Show</option>
                                                <option value={10}>10</option>
                                                <option value={20}>20</option>
                                                <option value={30}>30</option>
                                            </select>
                                        </div>
                                        &nbsp;
                                        <div className="float-left">
                                            <select className="form-control selectric" onChange={handleStatusChange}>
                                                <option value="">Sort Status</option>
                                                <option value="REJECTED">Rejected</option>
                                                <option value="PENDING">Pending</option>
                                                <option value="ACCEPTED">Accepted</option>
                                            </select>
                                        </div>
                                        <Search setSearch={setSearch} />
                                        <div className="table-responsive">
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Username</th>
                                                        <th>Email</th>
                                                        <th>Phone Number</th>
                                                        <th>Status</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {searchedData.map((item, index) => (
                                                        <tr key={item.id}>
                                                            <td>{(currentPage - 1) * limit + index + 1}</td>
                                                            <td>{item.username}</td>
                                                            <td>{item.email}</td>
                                                            <td>{item.phoneNumber}</td>
                                                            <td>{item.status}</td>
                                                            <td>
                                                                <Link
                                                                    to={`/designer-detail/${item.id}`}
                                                                    className="btn btn-primary"
                                                                    title="Detail"
                                                                >
                                                                    <i className="far fa-eye"></i>
                                                                </Link>
                                                                &nbsp;
                                                                <Link
                                                                    to={`/designer-appointments/${item.id}`}
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

                <Modal show={deleteShow} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to delete this designer profile?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={handleDeleteConfirm}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>

                <ToastContainer />
            </div>
        </>
    );
}

export default Design;
