import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { editInventory, updateInventory } from '~/services/Inventory/inventoryService';
import { getInventoryStatus } from '~/services/Inventory/inventoryStatusService';
import { getProduct } from '~/services/Product/productService';

function EditInventoryStatus() {
    const { id } = useParams();
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
                setInventoryStatus(response.data.content);
            } catch (error) {
                toast.error('Failed to fetch inventory statuses');
            }
        };

        fetchProducts();
        fetchInventoryStatuses();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (!id || inventoryStatus.length === 0) return;

            try {
                const result = await editInventory(id);
                const parsedDate = new Date(result.date);
                const formattedDate = parsedDate.toISOString().slice(0, 16);

                const statusId = inventoryStatus.find((status) => status.name === result.status)?.id;

                setData({
                    productId: result.productResponse.productId,
                    inventoryStatusId: statusId || '',
                    quantity: result.quantity,
                    note: result.note,
                    date: formattedDate,
                });
            } catch (error) {
                toast.error('Failed to fetch inventory data');
            }
        };

        fetchData();
    }, [id, inventoryStatus]);

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

            await updateInventory(id, inventoryData);
            toast.success('Inventory updated successfully');
            navigate('/inventory');
        } catch (error) {
            toast.error(`Failed to update inventory: ${error.message}`);
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
                            <h4 className="card-title">Edit Inventory</h4>
                            <Link to="/inventory" className="btn btn-primary mb-3">
                                <i className="fas fa-arrow-left"></i> Back
                            </Link>
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
                                    {/* <div className="col-md-6">
                                        <label className="col-form-label text-md-right">UnitPrice</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="unitPrice"
                                            value={data.unitPrice}
                                            onChange={handleInputChange}
                                        />
                                    </div> */}
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
            {/* <ToastContainer /> */}
        </>
    );
}

export default EditInventoryStatus;
