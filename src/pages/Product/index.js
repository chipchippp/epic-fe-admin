import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Product.css'; // Import the CSS file
import Search from '~/layouts/components/Search';
import Pagination from '~/layouts/components/Pagination';

function Product() {
    const [products, setProducts] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 90905.00]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc');
    const [limit, setLimit] = useState(5); // Thêm state limit
    const [currentPage, setCurrentPage] = useState(1); // Thêm state currentPage
    const [totalPages, setTotalPages] = useState(0); // Thêm state totalPages
    const [search, setSearch] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:8082/api/v1/products`, {
                    params: {
                        page: currentPage,
                        limit: limit,
                        search: search
                    }
                });
                setProducts(response.data.content);
                setTotalPages(response.data.totalPages); // Cập nhật totalPages
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [currentPage, limit, search]); // Thêm currentPage, limit và search vào dependency array

    useEffect(() => {
        const applyFilters = () => {
            const [minPrice, maxPrice] = priceRange;
            const filteredData = products.filter((item) => {
                const price = parseFloat(item.price);
                return (
                    item.name.toLowerCase().includes(search.toLowerCase()) &&
                    price >= minPrice && price <= maxPrice
                );
            });
            setFilteredProducts(filteredData);
        };

        applyFilters();
    }, [search, priceRange, products]);

    const handleDelete = async (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await axios.delete(`http://localhost:8082/api/v1/products/${productId}`);
                setProducts(products.filter(product => product.productId !== productId));
                alert('Product deleted successfully');
            } catch (error) {
                console.error('Error deleting product:', error);
                alert('Failed to delete product');
            }
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

    const handleLimitChange = (e) => {
        setLimit(e.target.value);
        setCurrentPage(1); // Reset currentPage về 1 khi thay đổi limit
    };

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        const priceA = parseFloat(a.price);
        const priceB = parseFloat(b.price);
        if (sortOrder === 'asc') {
            return priceA - priceB;
        } else {
            return priceB - priceA;
        }
    });

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
                                    <div className="float-left">
                                        <select onChange={handleLimitChange} className='btn-primary form-control selectric' value={limit}>
                                            <option value={5}>Show</option>
                                            <option value={10}>10</option>
                                            <option value={20}>20</option>
                                            <option value={30}>30</option>
                                        </select>
                                    </div>
                                    <Search setSearch={setSearch} />
                                    <div className="filter-sort-group">
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
                                        <div className="sort-container">
                                            <button className="sort-button" onClick={() => handleSort('asc')}>Sort Ascending</button>
                                            <button className="sort-button" onClick={() => handleSort('desc')}>Sort Descending</button>
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
                                            {sortedProducts.map((product) => (
                                                <tr key={product.productId}>
                                                    <td>{product.productId}</td>
                                                    <td> <Link to={`/productdetail/${product.productId}`}>{product.name}</Link></td>
                                                    <td>
                                                        {product.images.length > 0 ? (
                                                            <img src={`http://localhost:8082/api/v1/product-images/images/${product.images[0].imageUrl}`} alt={product.name} style={{ width: '70px', height: '70px', borderRadius: '0px' }} />
                                                        ) : (
                                                            'No Image'
                                                        )}
                                                    </td>
                                                    <td>{product.price}$</td>
                                                    <td>{product.category ? product.category.categoryName : 'N/A'}</td>
                                                    <td>{product.stockQuantity}</td>
                                                    <td>
                                                        <Link
                                                            to={`/editproduct/${product.productId}`}
                                                            className="btn btn-primary"
                                                            title="Edit"
                                                        >
                                                            <i className="fas fa-pencil-alt"></i>
                                                        </Link>
                                                        &nbsp;
                                                        <button
                                                            className="btn btn-danger"
                                                            onClick={() => handleDelete(product.productId)}
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
                                    changeCPage={setCurrentPage}
                                    currentPage={currentPage}
                                    numbers={Array.from({ length: totalPages }, (_, i) => i + 1)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Product;