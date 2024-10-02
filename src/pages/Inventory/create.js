import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom';
import { createInventory } from '~/services/Inventory/inventoryService';
import { getProduct } from '~/services/Product/productService';

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
        const productData = await getProduct();
        setProducts(productData.data.content);
      } catch (error) {
        toast.error('Failed to fetch products');
      }
    };
    fetchData();
  }, []);
  
  const handleSubmit = async (event) => {
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
          </div>
        </div>
        <div className="col-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Create Inventory</h4>
              <Link to="/inventory" className=" btn btn-primary">
                    <i className="fas fa-arrow-left"></i> Back
              </Link>
              <form onSubmit={handleSubmit}>
                <div className="row mb-4">
                  <div className="col-md-6">
                    <label className="col-form-label text-md-right">Product</label>
                    <select
                      className="form-control"
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
                  <div className="col-md-6">
                    <label className="col-form-label text-md-right">Quantity</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Quantity"
                      value={data.quantity}
                      onChange={(e) => setData({ ...data, quantity: e.target.value })}
                    />
                  </div>
                </div>
                <div className="row mb-4">
                <div className="col-md-6">
  <label className="col-form-label text-md-right">Status</label>
  <select
    className="form-control"
    value={data.status}
    onChange={(e) => setData({ ...data, status: e.target.value })}
  >
    <option value="">Select status</option>
    <option value="IN">IN</option>
    <option value="OUT">OUT</option>
  </select>
</div>

                  <div className="col-md-6">
                    <label className="col-form-label text-md-right">Reason</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Reason"
                      value={data.reason}
                      onChange={(e) => setData({ ...data, reason: e.target.value })}
                    />
                  </div>
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
