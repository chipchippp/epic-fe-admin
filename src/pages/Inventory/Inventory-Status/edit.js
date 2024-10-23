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
        addAction: '',
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await editInventoryStatus(id);
                setData({
                    name: result.name,
                    description: result.description,
                    addAction: result.addAction || '',
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
                                    <div className="col-md-6">
                                        <label className="col-form-label text-md-right">Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Name"
                                            value={data.name}
                                            onChange={(e) => setData({ ...data, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="col-form-label text-md-right">Description</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="description"
                                            value={data.description}
                                            onChange={(e) => setData({ ...data, description: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-md-6">
                                        <label className="col-form-label text-md-right">IsAddAction</label>
                                        <select
                                            className="form-control"
                                            value={data.addAction}
                                            onChange={(e) => setData({ ...data, addAction: e.target.value })}
                                        >
                                            <option value="">Select addAction</option>
                                            <option value="true">True</option>
                                            <option value="false">False</option>
                                        </select>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary mr-2">
                                    Save
                                </button>
                                <Link to="/inventory-status" className="btn btn-light">
                                    Back
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditInventoryStatus;
