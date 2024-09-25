import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom';
import { createInventory } from '~/services/Inventory/inventoryService';

function ManageInventory() {
  const [products, setProducts] = useState([]);
  const [data, setData] = useState({
    productId: '',
    quantity: '',
    status: '', 
    reason: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productData = await fetch('https://techwiz-product-service-fpd5bedth9ckdgay.eastasia-01.azurewebsites.net/api/v1/products/getAll?page=1&limit=100');
        const productJson = await productData.json();
        setProducts(productJson.data.content);
      } catch (error) {
        toast.error('Failed to fetch products');
      }
    };
    fetchData();
  }, []);
  

  const handleSave = async (event) => {
    event.preventDefault();
    try {
      const inventoryData = {
        ...data,
        productId: Number(data.productId),
        quantity: Number(data.quantity), 
      };
      await createInventory(inventoryData);
      toast.success('Inventory created successfully');
      navigate('/inventory');
    } catch (error) {
      toast.error(`Failed to create inventory: ${error.message}`);
    }
  };

  return (
    <>
      <div className="content-wrapper">
        <div className="row">
          <div className="col-md-12 grid-margin">
            <h3 className="font-weight-bold">Manage Inventory</h3>
            <Link to="/inventory" className="btn btn-primary mb-3">
              <i className="fas fa-arrow-left"></i> Back
            </Link>
          </div>
        </div>
        <div className="col-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Inventory Form</h4>
              <form className="forms-sample" onSubmit={handleSave}>
                <div className="form-group">
                  <label>Product</label>
                  <select
                    className="form-control selectric"
                    value={data.productId}
                    onChange={(e) => setData({ ...data, productId: e.target.value })}
                  >
                    <option value="">Select product</option>
                    {products.map((product) => (
                      <option key={product.productId} value={product.productId}>
                        {product.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Quantity</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Quantity"
                    value={data.quantity}
                    onChange={(e) => setData({ ...data, quantity: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Status"
                    value={data.status}
                    onChange={(e) => setData({ ...data, status: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="reason">Reason</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Reason"
                    value={data.reason}
                    onChange={(e) => setData({ ...data, reason: e.target.value })}
                  />
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