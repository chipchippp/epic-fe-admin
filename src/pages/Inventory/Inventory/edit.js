import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { editInventoryStatus, updateInventoryStatus, getInventoryStatus } from '~/services/Inventory/inventoryStatusService';
import { getProduct } from '~/services/Product/productService';

function EditInventoryStatus() {
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const [inventoryStatuses, setInventoryStatuses] = useState([]);
    const [data, setData] = useState({
        productId: '',
        inventoryStatusId: '',
        quantity: '',
        reason: '',
        date: '',
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getProduct();
                setProducts(response.data.content);
            } catch (error) {
                toast.error('Failed to fetch products');
            }
        };

        const fetchInventoryStatuses = async () => {
            try {
                const response = await getInventoryStatus();
                setInventoryStatuses(response.data.content);
            } catch (error) {
                toast.error('Failed to fetch inventory statuses');
            }
        };

        fetchProducts();
        fetchInventoryStatuses();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await editInventoryStatus(id);
                setData({
                    productId: result.productId || '',
                    inventoryStatusId: result.inventoryStatusId || '',
                    quantity: result.quantity || '',
                    reason: result.reason || '',
                    date: result.date || '',
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
            const parsedDate = new Date(data.date);
            if (isNaN(parsedDate.getTime())) {
                toast.error('Please enter a valid date');
                return;
            }

            const formattedDate = `${parsedDate.getFullYear()}-${String(parsedDate.getMonth() + 1).padStart(2, '0')}-${String(parsedDate.getDate()).padStart(2, '0')} ${String(parsedDate.getHours()).padStart(2, '0')}:${String(parsedDate.getMinutes()).padStart(2, '0')}:${String(parsedDate.getSeconds()).padStart(2, '0')}`;

            const inventoryData = {
                ...data,
                productId: Number(data.productId),
                inventoryStatusId: Number(data.inventoryStatusId),
                quantity: Number(data.quantity),
                date: formattedDate,
            };

            await updateInventoryStatus(id, inventoryData);
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
                            <h4 className="card-title">Edit Inventory</h4>
                            <Link to="/inventory" className="btn btn-primary">
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
                                            required
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
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-md-6">
                                        <label className="col-form-label text-md-right">Status</label>
                                        <select
                                            className="form-control"
                                            value={data.inventoryStatusId}
                                            onChange={(e) => setData({ ...data, inventoryStatusId: e.target.value })}
                                            required
                                        >
                                            <option value="">Select Inventory Status</option>
                                            {inventoryStatuses.map((status) => (
                                                <option key={status.id} value={status.id}>
                                                    {status.name}
                                                </option>
                                            ))}
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
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="col-form-label text-md-right">Date</label>
                                        <input
                                            type="datetime-local"
                                            className="form-control"
                                            value={data.date}
                                            onChange={(e) => setData({ ...data, date: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary mr-2">
                                    Save
                                </button>
                                <Link to="/inventory" className="btn btn-light">
                                    Back
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export default EditInventoryStatus;
