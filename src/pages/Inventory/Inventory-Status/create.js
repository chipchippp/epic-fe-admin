import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom';
import { createInventoryStatus } from '~/services/Inventory/inventoryStatusService';

function ManageInventoryStatus() {
    const [data, setData] = useState({
        name: '',
        description: '',
        inventoryActionType: '',
    });

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const inventoryData = {
                ...data,
            };
            await createInventoryStatus(inventoryData);
            toast.success('InventoryStatus created successfully');
            navigate('/inventory-status');
        } catch (error) {
            toast.error(`Failed to create inventory-status: ${error.message}`);
        }
    };

    return (
        <>
            <div className="content-wrapper">
                <div className="col-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="font-weight-bold">Create InventoryStatus</h3>
                            <Link to="/inventory-status" className="btn btn-primary mb-3">
                                <i className="fas fa-arrow-left"></i> Back
                            </Link>
                            <form onSubmit={handleSubmit}>
                                <div className="row mb-4">
                                    <div className="col-md-4">
                                        <label className="col-form-label text-md-right">Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Name"
                                            value={data.name}
                                            onChange={(e) => setData({ ...data, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="col-form-label text-md-right">Description</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="description"
                                            value={data.description}
                                            onChange={(e) => setData({ ...data, description: e.target.value })}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="col-form-label text-md-right">IsAddAction</label>
                                        <select
                                            className="form-control"
                                            value={data.inventoryActionType}
                                            onChange={(e) => setData({ ...data, inventoryActionType: e.target.value })}
                                        >
                                            <option value="">Select Action Type</option>
                                            <option value="ADD">Add</option>
                                            <option value="SUBTRACT">Subtract</option>
                                            <option value="NONE">None</option>
                                        </select>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary mr-2">
                                    Save
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                {/* <ToastContainer /> */}
            </div>
        </>
    );
}

export default ManageInventoryStatus;
