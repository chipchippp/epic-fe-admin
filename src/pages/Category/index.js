import React, { useState, useEffect } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Category() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteShow, setDeleteShow] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8082/api/v1/categories')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setCategories(data.content);
                setLoading(false);
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
                toast.error('Failed to load categories');
                setLoading(false);
            });
    }, []);

    const handleEdit = (id) => {
        // Redirect to edit page or open an edit modal
        // Here, using Link to redirect to an edit page
        console.log(`Edit category with ID: ${id}`);
    };

    const handleDelete = (id) => {
        setDeleteId(id);
        setDeleteShow(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await axios.delete(`http://localhost:8082/api/v1/categories/${deleteId}`);
            toast.success('Category has been deleted');
            setDeleteShow(false);
            setCategories(categories.filter(category => category.categoryId !== deleteId));
        } catch (error) {
            toast.error('Failed to delete category');
        }
    };

    const handleClose = () => setDeleteShow(false);

    return (
        <>
            <div className="content-wrapper">
            <div className="row">
      <div className="col-md-12 grid-margin">
        <div className="row">
          <div className="col-12 col-xl-8 mb-4 mb-xl-0">
            <h3 className="font-weight-bold">Categories</h3>
            <h6 className="font-weight-normal mb-0">
              All systems are running smoothly! You have
              <span className="text-primary">3 unread alerts!</span>
            </h6>
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
                                        <Link to="/category/create" className="btn btn-primary">
                                            <i className="fas fa-plus"></i> New
                                        </Link>
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
                                                    {categories.map((item, index) => (
                                                        <tr key={item.categoryId}>
                                                            <td>{index + 1}</td>
                                                            <td>{item.categoryName}</td>
                                                            <td>{item.description}</td>
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

                <ToastContainer />
            </div>
        </>
    );
}

export default Category;
