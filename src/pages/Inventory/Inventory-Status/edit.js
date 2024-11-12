import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { editInventoryStatus, updateInventoryStatus } from '~/services/Inventory/inventoryStatusService';

function EditInventoryStatus() {
    const { id } = useParams();
    const [data, setData] = useState({
        name: '',
        description: '',
        inventoryActionType: '',
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await editInventoryStatus(id);
                setData({
                    name: result.name,
                    description: result.description,
                    inventoryActionType: result.inventoryActionType || '',
                });
            } catch (error) {
                toast.error('Failed to fetch inventory-status data');
            }
        };
        fetchData();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await updateInventoryStatus(id, data);
            toast.success('InventoryStatus updated successfully');
            navigate('/inventory-status');
        } catch (error) {
            toast.error(`Failed to update inventory-status: ${error.message}`);
        }
    };

    return (
        <>
            <div className="content-wrapper">
                <div className="col-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="font-weight-bold">Edit InventoryStatus</h3>
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
                <ToastContainer />
            </div>
        </>
    );
}

export default EditInventoryStatus;
