import React, { useState, useEffect, useCallback } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import Search from '~/layouts/components/Search';
import Pagination from '~/layouts/components/Pagination';
import { getBlog, deleteBlog } from '~/services/Inventory/blogService';
import { debounce } from 'lodash';

function Blog() {
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
            const filteredData = data.filter((item) =>
                item.title.toLowerCase().includes(query.toLowerCase())
            );
            setSearchedData(filteredData);
        }, 500),
        [data]
    );

    useEffect(() => {
        debouncedSearch(search);
    }, [search, debouncedSearch]);

    useEffect(() => {
        getData();
    }, [currentPage, limit]);

    const getData = async () => {
        try {
            const response = await getBlog(currentPage, limit);
    
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
            await deleteBlog(deleteId);
            toast.success('blog has been deleted');
            handleClose();
            getData();
        } catch (error) {
            toast.error('Failed to delete blog');
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

    return (
        <>
            <div className="content-wrapper">
                <div className="row">
                    <div className="col-md-12 grid-margin">
                        <div className="row">
                            <div className="col-12 col-xl-8 mb-4 mb-xl-0">
                                <h3 className="font-weight-bold">Blogs</h3>
                                <Link to="/blog/create" className="btn btn-primary">
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
                                            <select onChange={handleLimitChange} className='btn-primary form-control selectric' value={limit}>
                                                <option value={5}>Show</option>
                                                <option value={10}>10</option>
                                                <option value={20}>20</option>
                                                <option value={30}>30</option>
                                            </select>
                                        </div>
                                        <Search setSearch={setSearch} />
                                    
                                        <div className="table-responsive">
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Title</th>
                                                        <th>ImageTitle</th>
                                                        <th>Content</th>
                                                        <th>Author</th>
                                                        <th>UserId</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {searchedData.map((item, index) => (
                                                        <tr key={item.id}>
                                                            <td>{(currentPage - 1) * limit + index + 1}</td>
                                                            <td>{item.title}</td>
                                                            <td>
                                            {item.imageTitle ? (
                                                <img
                                                    src={`http://localhost:8080/api/v1/blogs/blog/${item.imageTitle}`}
                                                    alt={item.title}
                                                    style={{ width: '70px', height: '70px', borderRadius: '0px' }}
                                                />
                                            ) : (
                                                'No Image'
                                            )}
                                        </td>
                                                            <td>{item.content}</td>
                                                            <td>{item.author}</td>
                                                            <td>{item.userId}</td>
                                                            <td>
                                                                <Link
                                                                    to={`/blog/edit/${item.id}`}
                                                                    className="btn btn-primary"
                                                                    title="Edit"
                                                                >
                                                                    <i className="fas fa-pencil-alt"></i>
                                                                </Link>
                                                                &nbsp;
                                                                <button
                                                                    className="btn btn-danger"
                                                                    onClick={() => handleDelete(item.id)}
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
                                            prePage={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                            nextPage={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
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
                    <Modal.Body>Are you sure you want to delete this blog?</Modal.Body>
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

export default Blog;