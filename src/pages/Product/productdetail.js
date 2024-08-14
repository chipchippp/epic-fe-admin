import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = () => {
  const { id } = useParams(); // Đảm bảo rằng bạn đang lấy đúng tham số từ URL
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null); // Khai báo state cho error
  const [loading, setLoading] = useState(true); // Khai báo state cho loading

  console.log('productId', id);
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
    fetchProduct();
}, [id]);

  if (!product) {
    return <div>Loading...1</div>;
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
      <h4 className="card-title">ProductDetail</h4>
      
      <table className="table">
        <tbody>
        <tr>
            <th>Description</th>
            <td>{product.description}</td>
          </tr>
          <tr>
            <th>Price</th>
            <td>{product.price}$</td>
          </tr>
          <tr>
            <th>Category</th>
            <td>{product.category ? product.category.categoryName : 'N/A'}</td>
          </tr>
          <tr>
            <th>Stock Quantity</th>
            <td>{product.stockQuantity}</td>
          </tr>
          <tr>
            <th>Manufacturer</th>
            <td>{product.manufacturer}</td>
          </tr>
          <tr>
            <th>Size</th>
            <td>{product.size}</td>
          </tr>
          <tr>
            <th>Weight</th>
            <td>{product.weight}</td>
          </tr>
          <tr>
            <th>Created At</th>
            <td>{new Date(product.createdAt).toLocaleString()}</td>
          </tr>
          <tr>
            <th>Updated At</th>
            <td>{new Date(product.updatedAt).toLocaleString()}</td>
          </tr>
          <tr>
            <th>Images</th>
            <td>
              {product.images.length > 0 ? (
                product.images.map((image, index) => (
                  <img key={index} src={`http://localhost:8082/api/v1/product-images/images/${image.imageUrl}`} alt={product.name} style={{ width: '100px', height: '100px', marginRight: '10px',borderRadius: '0px' }} />
                ))
              ) : (
                <p>No Images</p>
              )}
            </td>
          </tr>
        </tbody>
      </table>
      <Link to="/product" className="btn btn-light"> Back </Link>
    </div>
  </div>
</div>
    </div>
  );
};

export default ProductDetail;