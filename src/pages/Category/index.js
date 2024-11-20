import React, { useState, useEffect, useCallback } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import Search from '~/layouts/components/Search';
import Pagination from '~/layouts/components/Pagination';
import { getCategory, deleteCategory } from '~/services/Category/categoryService';
import { debounce } from 'lodash';

function Category() {
    const [loading, setLoading] = useState(true);
    const [deleteShow, setDeleteShow] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [numbers, setNumbers] = useState([]);

    const [search, setSearch] = useState('');
    const [searchedData, setSearchedData] = useState([]);

    const debouncedSearch = useCallback(
        debounce((query) => {
            const filteredData = data.filter((item) => item.categoryName.toLowerCase().includes(query.toLowerCase()));
            setSearchedData(filteredData);
        }, 500),
        [data],
    );

    useEffect(() => {
        debouncedSearch(search);
    }, [search, debouncedSearch]);

    useEffect(() => {
        getData();
    }, [currentPage, limit]);

    const getData = async () => {
        try {
            const response = await getCategory(currentPage, limit);

            if (response && response.data && response.data.content) {
                setData(response.data.content);
                setSearchedData(response.data.content);
                setTotalPages(response.data.totalPages);
                const pagesArray = Array.from({ length: response.data.totalPages }, (_, i) => i + 1);
                setNumbers(pagesArray);
            } else {
                toast.error('Invalid response structure from server');
            }
            setLoading(false);
        } catch (error) {
            toast.error('Failed to fetch categories');
        }
    };

    const handleDelete = (id) => {
        setDeleteId(id);
        setDeleteShow(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await deleteCategory(deleteId);
            toast.success('Category has been deleted successfully');
            handleClose();
            getData();
        } catch (error) {
            toast.error('Failed to delete category');
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

    const formatDescription = (description, maxLength = 70) => {
        if (!description) return ''; // Handle null or undefined description
        const regex = new RegExp(`.{1,${maxLength}}`, 'g');
        return description.match(regex).join('\n');
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
                                        <h3 className="font-weight-bold">Categories</h3>
                                        <Link to="/category/create" className="float-left btn btn-primary">
                                            <i className="fas fa-plus"></i> New
                                        </Link>
                                        <Search setSearch={setSearch} />

                                        <div className="table-responsive">
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Category Name</th>
                                                        <th>Description</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {searchedData.map((item, index) => (
                                                        <tr key={item.categoryId}>
                                                            <td>{(currentPage - 1) * limit + index + 1}</td>
                                                            <td>{item.categoryName}</td>
                                                            <td style={{ whiteSpace: 'pre-wrap' }}>
                                                                {formatDescription(item.description)}
                                                            </td>
                                                            <td>
                                                                <Link
                                                                    to={`/category/edit/${item.categoryId}`}
                                                                    className="btn btn-primary"
                                                                    title="Edit"
                                                                >
                                                                    <i className="fas fa-pencil-alt"></i>
                                                                </Link>
                                                                &nbsp;
                                                                <button
                                                                    className="btn btn-danger"
                                                                    onClick={() => handleDelete(item.categoryId)}
                                                                    title="Delete"
                                                                >
                                                                    <i className="fas fa-trash"></i>
                                                                </button>
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
                    <Modal.Body>Are you sure you want to delete this category?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={handleDeleteConfirm}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
                {/* <ToastContainer /> */}
            </div>
        </>
    );
}

export default Category;
