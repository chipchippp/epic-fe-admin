import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]); // Khởi tạo là mảng rỗng
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/api/v1/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        setError('Failed to fetch product details');
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8082/api/v1/categories');
        setCategories(response.data.content);
      } catch (error) {
        setError('Failed to fetch categories');
      }
    };

    fetchProduct();
    fetchCategories();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setProduct({ ...product, category: { ...product.category, categoryId } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedProduct = {
        ...product,
        categoryId: product.category.categoryId // Đảm bảo categoryId được gửi lên API
      };
      await axios.put(`http://localhost:8082/api/v1/products/${id}`, updatedProduct);
      navigate('/product');
      
    } catch (error) {
      alert('Failed to update product');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="content-wrapper">
      <div className="row">
        <div className="col-md-12 grid-margin">
          <div className="row">
            <div className="col-12 col-xl-8 mb-4 mb-xl-0">
              <h2 className="font-weight-bold">{product.name}</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Edit Product</h4>
            <form onSubmit={handleSubmit}>
              <table className="table">
                <tbody>
                  <tr>
                    <th>Product Name</th>
                    <td><input type="text" name="name" value={product.name} onChange={handleInputChange} /></td>
                  </tr>
                  <tr>
                    <th>Description</th>
                    <td><input type="text" name="description" value={product.description} onChange={handleInputChange} /></td>
                  </tr>
                  <tr>
                    <th>Price</th>
                    <td><input type="number" name="price" value={product.price} onChange={handleInputChange} /></td>
                  </tr>
                  <tr>
                    <th>Category</th>
                    <td>
                      <select name="category" value={product.category?.categoryId || ''} onChange={handleCategoryChange}>
                        <option value="" disabled>Select Category</option>
                        {categories.map((category) => (
                          <option key={category.categoryId} value={category.categoryId}>
                            {category.categoryName}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <th>Stock Quantity</th>
                    <td><input type="number" name="stockQuantity" value={product.stockQuantity} onChange={handleInputChange} /></td>
                  </tr>
                  <tr>
                    <th>Manufacturer</th>
                    <td><input type="text" name="manufacturer" value={product.manufacturer} onChange={handleInputChange} /></td>
                  </tr>
                  <tr>
                    <th>Size</th>
                    <td><input type="text" name="size" value={product.size} onChange={handleInputChange} /></td>
                  </tr>
                  <tr>
                    <th>Weight</th>
                    <td><input type="text" name="weight" value={product.weight} onChange={handleInputChange} /></td>
                  </tr>
                  <tr>
                    <th>Images</th>
                    <td>
                      {product.images.length > 0 ? (
                        product.images.map((image, index) => (
                          <img key={index} src={`http://localhost:8082/api/v1/product-images/images/${image.imageUrl}`} alt={product.name} style={{ width: '100px', height: '100px', marginRight: '10px', borderRadius: '0px' }} />
                        ))
                      ) : (
                        <p>No Images</p>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
              <button type="submit" className="btn btn-primary">Save</button>
              <Link to="/product" className="btn btn-light">Back</Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;