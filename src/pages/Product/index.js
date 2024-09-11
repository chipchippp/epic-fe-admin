import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Search from '~/layouts/components/Search';
import Pagination from '~/layouts/components/Pagination';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Product.css';

function Product() {
    const [loading, setLoading] = useState(true);
    const [deleteShow, setDeleteShow] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const [priceRange, setPriceRange] = useState([0, 90905.0]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [sortOrder, setSortOrder] = useState('desc');
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [numbers, setNumbers] = useState([]);

    const [search, setSearch] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        getFilteredData();
    }, [search, priceRange, sortOrder, currentPage, limit, selectedCategory]);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:8082/api/v1/categories');
            setCategories(response.data.data.content);
        } catch (error) {
            console.error('Error fetching categories:', error.message);
        }
    };

    const getFilteredData = async () => {
        try {
            const params = {
                page: currentPage,
                size: limit,
                sort: `productId:${sortOrder}`,
            };
    
            // Add product search filter
            if (search) {
                params.product = `name~${search}`;
            }
    
            // Add category filter
            if (selectedCategory) {
                params.categoryId = selectedCategory;  // Change this based on API specification
            }
    
            // Add price range filter
            params.minPrice = priceRange[0];
            params.maxPrice = priceRange[1];
    
            const response = await axios.get('http://localhost:8082/api/v1/products/search-by-specification', { params });
    
            setData(response.data.data.content);
    
            const totalItems = response.data.data.totalElements;
            const totalPages = Math.ceil(totalItems / limit);
            setTotalPages(totalPages);
            const pagesArray = Array.from({ length: totalPages }, (_, i) => i + 1);
            setNumbers(pagesArray);
    
            setFilteredProducts(response.data.data.content);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            if (error.response) {
                toast.error(`Server error: ${error.response.data.message || error.response.statusText}`);
            } else if (error.request) {
                toast.error('No response from the server. Please check the server or try again later.');
            } else {
                toast.error('Unexpected error occurred while fetching data. Please try again.');
            }
        }
    };

    const handleCategoryChange = (event) => {
        const categoryId = event.target.value;
        setSelectedCategory(categoryId);
        setCurrentPage(1); // Reset to the first page
    };

    const handleDeleteConfirm = async () => {
        try {
            await axios.delete(`http://localhost:8082/api/v1/products/in-trash/${deleteId}`);
            toast.success('Product has been deleted');
            handleClose();
            setData(prevData => prevData.filter(product => product.productId !== deleteId));
        } catch (error) {
            toast.error('Failed to delete product');
        }
    };

    const handleSliderChange = (value) => {
        if (value[0] <= value[1]) {
            setPriceRange(value);
        }
    };

    const handleSort = (order) => {
        setSortOrder(order);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleLimitChange = (e) => {
        setLimit(Number(e.target.value));
        setCurrentPage(1);
    };

    const handleClose = () => setDeleteShow(false);

    const handleDelete = (id) => {
        setDeleteId(id);
        setDeleteShow(true);
    };

    return (
        <>
            <div className="content-wrapper">
                <div className="row">
                    <div className="col-md-12 grid-margin">
                        <div className="row">
                            <div className="col-12 col-xl-8 mb-4 mb-xl-0">
                                <h3 className="font-weight-bold">Products</h3>
                                <Link to="/addcreate" className="btn btn-primary">
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
                                <div className="filter-product">
                                    <div className="filter-container">
                                        <div className="price-labels">
                                            <span className="min-price">{priceRange[0]}$</span>
                                            <span className="max-price">{priceRange[1]}$</span>
                                        </div>
                                        <div className="slider-button-group">
                                            <Slider
                                                className="price-slider"
                                                range
                                                min={0}
                                                max={90905.00}
                                                defaultValue={[0, 90905.00]}
                                                value={priceRange}
                                                onChange={handleSliderChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="float-left ml-2">
                                        <select onChange={handleCategoryChange} className="form-control selectric">
                                            <option value="">All Categories</option>
                                            {categories.map((category) => (
                                                <option key={category.categoryId} value={category.categoryId}>
                                                    {category.categoryName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <Search setSearch={setSearch} />
                                    <div className="filter-sort-group">
                                        <div className="sort-container">
                                            <select className="sort-dropdown" onChange={(e) => handleSort(e.target.value)}>
                                                <option value="asc">Sort Ascending</option>
                                                <option value="desc">Sort Descending</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>Product ID</th>
                                                <th>Name</th>
                                                <th>Images</th>
                                                <th>Price</th>
                                                <th>Category</th>
                                                <th>Stock Quantity</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredProducts.map((item, index) => (
                                                <tr key={item.productId}>
                                                    <td>{(currentPage - 1) * limit + index + 1}</td>
                                                    <td>
                                                        <Link to={`/productdetail/${item.productId}`}>{item.name}</Link>
                                                    </td>
                                                    <td>
                                                        {item.images.length > 0 ? (
                                                            <img src={`http://localhost:8082/api/v1/product-images/images/${item.images[0].imageUrl}`} alt={item.name} style={{ width: '70px', height: '70px', borderRadius: '0px' }} />
                                                        ) : (
                                                            'No Image'
                                                        )}
                                                    </td>
                                                    <td>{item.price}$</td>
                                                    <td>{item.category ? item.category.categoryName : 'N/A'}</td>
                                                    <td>{item.stockQuantity}</td>
                                                    <td>
                                                        <Link to={`/editproduct/${item.productId}`} className="btn btn-primary" title="Edit">
                                                            <i className="fas fa-pencil-alt"></i>
                                                        </Link>
                                                        &nbsp;
                                                        <button className="btn btn-danger" onClick={() => handleDelete(item.productId)} title="Delete">
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={deleteShow} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
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
        </>
    );
}

export default Product;
