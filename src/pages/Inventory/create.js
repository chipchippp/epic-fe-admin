import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function ManageInventory() {
  const [products, setProducts] = useState([]);

  const [data, setData] = useState({
    productId: '',
    quantity: '',
    type: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productData = await fetch('http://localhost:8082/api/v1/products?page=1&limit=100');
        const productJson = await productData.json();
        setProducts(productJson.data.content);
      } catch (error) {
      toast.error('Failed to select product');
      }
    };
    fetchData();
  }, []);
  

  const handleSave = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:8888/api/v1/inventory', {
        productId: data.productId,
        quantity: data.quantity,
        type: data.type
      });
      console.log(data);
      toast.success('Inventory create successfully');
      navigate('/inventory');
    } catch (error) {
      console.log(data);
      console.error(error.response?.data);
      toast.error('Failed to update inventory');
    }
  };

  return (
    <>
      <div className="content-wrapper">
        <div className="row">
          <div className="col-md-12 grid-margin">
            <h3 className="font-weight-bold">Manage Inventory</h3>
          </div>
        </div>
        <div className="col-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Inventory Form</h4>
              <form className="forms-sample" onSubmit={handleSave}>
                <div className="form-group">
                  <label className="col-form-label text-md-right">Product</label>
                  <select
                    className="form-control selectric"
                    value={data.productId}
                    onChange={(e) => setData({ ...data, productId: e.target.value })}
                  >
                    <option>Select product</option>
                    {products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name}
                      </option>                    
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="quantity">Quantity</label>
                  <input
                    type="number"
                    className="form-control"
                    id="quantity"
                    placeholder="Quantity"
                    value={data.quantity}
                    onChange={(e) => setData({ ...data, quantity: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="type">Type</label>
                  <select
                    className="form-control"
                    id="type"
                    value={data.type}
                    onChange={(e) => setData({ ...data, type: e.target.value })}
                  >
                    <option value="">Select type</option>
                    <option value="IN">IN</option>
                    <option value="OUT">OUT</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary mr-2">
                  Save
                </button>
                <Link to="/inventory" className="btn btn-light">Back</Link>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default ManageInventory;
