import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom';
import { createInventory } from '~/services/Inventory/inventoryService';
import { getProduct } from '~/services/Product/productService';
import { getInventoryStatus } from '~/services/Inventory/inventoryStatusService';

function ManageInventory() {
    const [products, setProducts] = useState([]);
    const [inventoryStatus, setInventoryStatus] = useState([]);
    const [data, setData] = useState({
        productId: '',
        inventoryStatusId: '',
        quantity: '',
        unitPrice: '',
        note: '',
        date: '',
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const productData = await getProduct();
                setProducts(productData.data.content);
            } catch (error) {
                toast.error('Failed to fetch products');
            }
        };

        const fetchInventoryStatus = async () => {
            try {
                const statusData = await getInventoryStatus();
                setInventoryStatus(statusData.data.content);
            } catch (error) {
                toast.error('Failed to fetch status');
            }
        };

        fetchProductData();
        fetchInventoryStatus();
    }, []);

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
                productId: Number(data.productId),
                quantity: Number(data.quantity),
                inventoryStatusId: Number(data.inventoryStatusId),
                // unitPrice: data.unitPrice,
                note: data.note,
                date: formattedDate,
            };

            await createInventory(inventoryData);
            toast.success('Inventory created successfully');
            navigate('/inventory');
        } catch (error) {
            toast.error(`Failed to create inventory: ${error.message}`);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'quantity' && value < 1) {
            toast.warning('Quantity must be 1 or higher');
            return;
        }

        setData({ ...data, [name]: value });
    };

    return (
        <>
            <div className="content-wrapper">
                <div className="row">
                    <div className="col-md-12 grid-margin"></div>
                </div>
                <div className="col-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Create Inventory</h4>
                            <form onSubmit={handleSubmit}>
                                <div className="row mb-4">
                                    <div className="col-md-4">
                                        <label className="col-form-label text-md-right">Product</label>
                                        <select
                                            className="form-control"
                                            name="productId"
                                            value={data.productId}
                                            onChange={handleInputChange}
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
                                    <div className="col-md-4">
                                        <label className="col-form-label text-md-right">Status</label>
                                        <select
                                            className="form-control"
                                            name="inventoryStatusId"
                                            value={data.inventoryStatusId}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Select Inventory Status</option>
                                            {inventoryStatus.map((status) => (
                                                <option key={status.id} value={status.id}>
                                                    {status.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-md-4">
                                        <label className="col-form-label text-md-right">Quantity</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="Quantity"
                                            name="quantity"
                                            value={data.quantity}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-md-4">
                                        <label className="col-form-label text-md-right">Note</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Note"
                                            name="note"
                                            value={data.note}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="col-form-label text-md-right">Date</label>
                                        <input
                                            type="datetime-local"
                                            className="form-control"
                                            name="date"
                                            value={data.date}
                                            onChange={handleInputChange}
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

export default ManageInventory;
