import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Search from '~/layouts/components/Search';
import Pagination from '~/layouts/components/Pagination';
import { getTrashCategory, updateRestoreCategory, removeCategory } from '~/services/Category/categoryService';

function Category() {
    const [loading, setLoading] = useState(true);
    const [updateShow, setUpdateShow] = useState(false);
    const [updateId, setUpdateId] = useState(null);
    const [deleteShow, setDeleteShow] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [numbers, setNumbers] = useState([]);

    const [search, setSearch] = useState('');
    const [searchedData, setSearchedData] = useState([]);

    useEffect(() => {
        const filteredData = data.filter((item) => item.categoryName.toLowerCase().includes(search.toLowerCase()));
        const pagesArray = Array.from({ length: totalPages }, (_, i) => i + 1);
        setNumbers(pagesArray);
        setSearchedData(filteredData);
    }, [search, data, totalPages]);

    useEffect(() => {
        getData();
    }, [currentPage, limit]);

    const getData = async () => {
        try {
            const response = await getTrashCategory(currentPage, limit);

            if (response && response.data && response.data.content) {
                setData(response.data.content);
                setSearchedData(response.data.content);
                setTotalPages(response.data.totalPages);
            } else {
                toast.error('Invalid response structure from server');
            }
            setLoading(false);
        } catch (error) {
            toast.error('Failed to fetch categories');
        }
    };

    const handleUpdate = (id) => {
        setUpdateId(id);
        setUpdateShow(true);
    };

    const handleDelete = (id) => {
        setDeleteId(id);
        setDeleteShow(true);
    };

    const handleUpdateConfirm = async () => {
        try {
            await updateRestoreCategory(updateId);
            toast.success('Category has been restored');
            handleClose();
            getData();
        } catch (error) {
            toast.error('Failed to restore category');
        }
    };

    const handleDeleteConfirm = async () => {
        try {
            await removeCategory(deleteId);
            toast.success('Category has been remove');
            handleClose();
            getData();
        } catch (error) {
            toast.error('Failed to restore category');
        }
    };
    const handleCloses = () => setUpdateShow(false);
    const handleClose = () => setDeleteShow(false);

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
                                {loading ? (
                                    <div>Loading...</div>
                                ) : (
                                    <>
                                        <h3 className="font-weight-bold">Trash Categories</h3>
                                        <Search setSearch={setSearch} />

                                        <div className="table-responsive">
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Category Name</th>
                                                        <th>Description</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {searchedData.map((item, index) => (
                                                        <tr key={item.categoryId}>
                                                            <td>{(currentPage - 1) * limit + index + 1}</td>
                                                            <td>{item.categoryName}</td>
                                                            <td>{item.description}</td>
                                                            <td>
                                                                <button
                                                                    className="btn btn-success"
                                                                    onClick={() => handleUpdate(item.categoryId)}
                                                                    title="Update Restore"
                                                                >
                                                                    <i class="fa-solid fa-check"></i>
                                                                </button>
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

                <Modal show={updateShow} onHide={handleCloses}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Update</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to update this category?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloses}>
                            Cancel
                        </Button>
                        <Button variant="success" onClick={handleUpdateConfirm}>
                            Update
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={deleteShow} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Update</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to update this category?</Modal.Body>
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
