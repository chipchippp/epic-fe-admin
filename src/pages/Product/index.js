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
      getData();
    }, []);
  
    const getData = async () => {
      try {
        const response = await axios.get('http://localhost:8082/api/v1/products?limit=1000');
        setData(response.data.data.content);
        setLoading(false);
      } catch (error) {
        toast.error('Failed');
        setLoading(false);
      }
    };
  
    useEffect(() => {
      const applyFilters = () => {
        const [minPrice, maxPrice] = priceRange;
        let filteredData = data.filter((item) => {
          const price = parseFloat(item.price);
          return (
            item.name.toLowerCase().includes(search.toLowerCase()) &&
            price >= minPrice &&
            price <= maxPrice &&
            (selectedCategory ? item.category && item.category.categoryId === Number(selectedCategory) : true)
        );
        });
  
        // Sắp xếp dữ liệu
        filteredData = filteredData.sort((a, b) => {
          const priceA = parseFloat(a.price);
          const priceB = parseFloat(b.price);
          return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
        });
  
        // Cập nhật tổng số trang
        const totalItems = filteredData.length;
        const totalPages = Math.ceil(totalItems / limit);
        setTotalPages(totalPages);
  
        // Tạo mảng số trang
        const pagesArray = Array.from({ length: totalPages }, (_, i) => i + 1);
        setNumbers(pagesArray);
  
        // Áp dụng phân trang
        const startIndex = (currentPage - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedData = filteredData.slice(startIndex, endIndex);
  
        // Cập nhật dữ liệu hiển thị
        setFilteredProducts(paginatedData);
      };
  
      applyFilters();
    }, [data, search, priceRange, sortOrder, currentPage, limit, selectedCategory]);
  
    useEffect(() => {
      axios
        .get('http://localhost:8082/api/v1/categories')
        .then((response) => {
          setCategories(response.data.data.content);
        })
        .catch((error) => {
          console.error('Error fetching categories:', error.message);
        });
    }, []);
  
    const handleCategoryChange = (categoryId) => {
      setSelectedCategory(categoryId);
      setCurrentPage(1);
    };

    const handleDeleteConfirm = async () => {
      try {
        await axios.delete(`http://localhost:8082/api/v1/products/in-trash/${deleteId}`);
        toast.success('Product has been deleted');
        handleClose();
        setData((prevData) => prevData.filter(product => product.productId !== deleteId));
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
                                    <div className="float-left ml-2">
                                        <select onChange={(e) => handleCategoryChange(e.target.value)} className="form-control selectric">
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
        </>
    );
}

export default Product;
