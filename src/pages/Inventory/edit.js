import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { editInventory, updateInventory } from '~/services/Inventory/inventoryService';
import { getProduct } from '~/services/Product/productService';

function EditInventory() {
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const [data, setData] = useState({
        productId: '',
        quantity: '',
        status: '', 
        reason: '',
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await getProduct();
                setProducts(response.data.content);
            } catch (error) {
                toast.error('Failed to fetch products');
            }
        };
    
        fetchProduct();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await editInventory(id);
                setData({
                    productId: result.productId,
                    quantity: result.quantity,
                    status: result.status,
                    reason: result.reason
                });
            } catch (error) {
                toast.error('Failed to fetch inventory data');
            }
        };
        fetchData();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const inventoryData = {
            ...data,
            productId: Number(data.productId),
            quantity: Number(data.quantity), 
          };
          await updateInventory(id, inventoryData);
          toast.success('Inventory updated successfully');
          navigate('/inventory');
        } catch (error) {
          toast.error(`Failed to update inventory: ${error.message}`);
        }
    };
    

    return (
        <>
            <div className="content-wrapper">
                <div className="col-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                        <h3 className="font-weight-bold">Edit Inventory</h3>
                                <Link to="/inventory" className="btn btn-primary mb-3">
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
                      {products.length > 0 && products.map((product) => (
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
        </>
    );
}

export default EditInventory;
