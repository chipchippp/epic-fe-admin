import React, { useState, useEffect, useCallback } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import Search from '~/layouts/components/Search';
import Pagination from '~/layouts/components/Pagination';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Product.css';
import debounce from 'lodash.debounce';
import { getFilteredProducts, deleteProduct, getCategories } from '~/services/Product/productService';

function Product() {
    const [deleteShow, setDeleteShow] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const [priceRange, setPriceRange] = useState([0, 90905.0]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc');
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [numbers, setNumbers] = useState([]);

    const [search, setSearch] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        const applyFilters = () => {
            const [minPrice, maxPrice] = priceRange;
            const filteredData = data.filter((item) => {
                const price = parseFloat(item.price);
                return (
                    item.name.toLowerCase().includes(search.toLowerCase()) &&
                    price >= minPrice && price <= maxPrice
                );
            });
            setFilteredProducts(filteredData);
        };

        applyFilters();
    }, [search, priceRange, data]);

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        getFilteredData();
    }, [search, priceRange, sortOrder, currentPage, limit, selectedCategory]);

    const fetchCategories = async () => {
        try {
            const response = await getCategories();
            const sortedCategories = response.data.content.sort((a, b) =>
                a.categoryName.localeCompare(b.categoryName)
            );
            setCategories(sortedCategories);
        } catch (error) {
            toast.error('Failed to fetch categories');
        }
    };

    const getFilteredData = async () => {
        try {
            const params = {
                page: currentPage,
                size: limit,
                sort: `productId:${sortOrder}`,
            };
    
            if (search) {
                params.product = `name~${search}`;
            }

            if (selectedCategory) {
                params.category = `categoryId-${Number(selectedCategory)}`;
            }

            const response = await getFilteredProducts(params);
            setData(response.data.content);
            setTotalPages(response.data.totalPages);
            setNumbers([...Array(response.data.totalPages).keys()].map(i => i + 1));
        } catch (error) {
            toast.error('Failed to fetch products');
        }
    };

    const handleCategoryChange = (event) => {
        const categoryId = event.target.value;
        setSelectedCategory(categoryId);
        setCurrentPage(1);
    };

    const debouncedHandleSliderChange = debounce((value) => {
        if (value[0] <= value[1]) {
            setPriceRange(value);
        }
    }, 300);
    
    const handleSliderChange = (value) => {
        debouncedHandleSliderChange(value);
    };

    const handleSearch = useCallback(debounce((value) => {
        setSearch(value);
    }, 500), []);

    const handleSort = (order) => {
        setSortOrder(order);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleClose = () => setDeleteShow(false);

    const handleDelete = (id) => {
        setDeleteId(id);
        setDeleteShow(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await deleteProduct(deleteId);
            toast.success('Product deleted successfully');
            getFilteredData();
            handleClose();
        } catch (error) {
            toast.error('Failed to delete product');
        }
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
                                    <div className="filter-sort-group">
                                        <div className="sort-container">
                                            <select className="sort-dropdown" onChange={(e) => handleSort(e.target.value)}>
                                                <option value="asc">Sort Ascending</option>
                                                <option value="desc">Sort Descending</option>
                                            </select>
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
                                    <Search setSearch={handleSearch} />
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>Id</th>
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
                                                            <img src={`https://techwiz-product-service-fpd5bedth9ckdgay.eastasia-01.azurewebsites.net/api/v1/product-images/imagesPost/${item.images[0].imageUrl}`} alt={item.name} style={{ width: '70px', height: '70px', borderRadius: '0px' }} />
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