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

    const [priceRange, setPriceRange] = useState([0, 500]);
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
        const applyFilters = () => {
            const [minPrice, maxPrice] = priceRange;
            const filteredData = data.filter((item) => {
                const price = parseFloat(item.price);
                return (
                    (item.codeProduct.toLowerCase().includes(search.toLowerCase()) &&
                        price >= minPrice &&
                        price <= maxPrice) ||
                    item.name.toLowerCase().includes(search.toLowerCase())
                );
            });
            setFilteredProducts(filteredData);
        };

        applyFilters();
    }, [search, priceRange, data]);

    useEffect(() => {
        getFilteredData();
    }, [currentPage, limit, search, priceRange, sortOrder, selectedCategory]);

    const getFilteredData = async () => {
        try {
            const params = {
                page: currentPage,
                size: limit,
                sort: `productId:${sortOrder}`,
            };

            if (search) {
                params.product = `codeProduct~${search}, 'name~${search}`;
            }

            if (selectedCategory) {
                params.category = `categoryName~${selectedCategory}`;
            }
            const response = await getFilteredProducts(params);
            setData(response.data.content);
            setTotalPages(response.data.totalPages);
            setNumbers([...Array(response.data.totalPages).keys()].map((i) => i + 1));
        } catch (error) {
            toast.error('Failed to fetch products');
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await getCategories();
            const sortedCategories = response.data.content.sort((a, b) => a.categoryName.localeCompare(b.categoryName));
            setCategories(sortedCategories);
        } catch (error) {
            toast.error('Failed to fetch categories');
        }
    };

    const handleCategoryChange = (event) => {
        const categoryName = event.target.value;
        setSelectedCategory(categoryName);
        setCurrentPage(1);
    };

    const debouncedHandleSliderChange = debounce((value) => {
        if (value[0] <= value[1]) {
            setPriceRange(value);
        }
    }, 0);

    const handleSliderChange = (value) => {
        debouncedHandleSliderChange(value);
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
                    <div className="col-lg-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h3 className="font-weight-bold">Products</h3>
                                <div className="filter-product">
                                    <Link to="/create/product" className="btn btn-primary">
                                        <i className="fas fa-plus"></i> New
                                    </Link>
                                    <div className="filter-container">
                                        <div className="float-left price-labels">
                                            <span className="min-price">{priceRange[0]}$</span>
                                            <span className="max-price">{priceRange[1]}$</span>
                                        </div>
                                        <div className="float-left slider-button-group">
                                            <Slider
                                                className="price-slider"
                                                range
                                                min={0}
                                                max={500}
                                                defaultValue={[0, 500]}
                                                value={priceRange}
                                                onChange={handleSliderChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="float-left filter-sort-group">
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
                                    <div className="float-left">
                                        <select onChange={handleCategoryChange} className="form-control selectric">
                                            <option value="">All Categories</option>
                                            {categories.map((category) => (
                                                <option key={category.categoryId} value={category.categoryName}>
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
                                                <th>#</th>
                                                <th>Name</th>
                                                <th>Images</th>
                                                <th>Code Product</th>
                                                <th>Category</th>
                                                <th>Price</th>
                                                <th>Stock Quantity</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredProducts.map((item, index) => (
                                                <tr key={item.productId}>
                                                    <td>{(currentPage - 1) * limit + index + 1}</td>
                                                    <td>
                                                        <Link to={`/product/detail/${item.productId}`}>
                                                            {item.name.length > 20
                                                                ? item.name.slice(0, 20) + '...'
                                                                : item.name}
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        {item.images.length > 0 ? (
                                                            <img
                                                                src={item.images[0].imageUrl}
                                                                alt={item.name}
                                                                style={{
                                                                    width: '70px',
                                                                    height: '70px',
                                                                    borderRadius: '0px',
                                                                }}
                                                            />
                                                        ) : (
                                                            'No Image'
                                                        )}
                                                    </td>
                                                    <td>{item.codeProduct}</td>
                                                    <td>{item.category ? item.category.categoryName : 'N/A'}</td>
                                                    <td>{item.price}$</td>
                                                    <td>{item.stockQuantity}</td>
                                                    <td>
                                                        <Link
                                                            to={`/edit/product/${item.productId}`}
                                                            className="btn btn-primary"
                                                            title="Edit"
                                                        >
                                                            <i className="fas fa-pencil-alt"></i>
                                                        </Link>
                                                        &nbsp;
                                                        {/* <button
                                                            className="btn btn-danger"
                                                            onClick={() => handleDelete(item.productId)}
                                                            title="Delete"
                                                        >
                                                            <i className="fas fa-trash"></i>
                                                        </button> */}
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
