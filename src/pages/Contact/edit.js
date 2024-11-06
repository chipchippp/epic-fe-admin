import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { editContact, updateContact } from '~/services/User/contactService';

function EditContact() {
    const { id } = useParams();
    const [data, setData] = useState({
        isRead: '',
        isImportant: '',
        isSpam: '',
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await editContact(id);
                setData({
                    isRead: result.isRead || '',
                    isImportant: result.isImportant || '',
                    isSpam: result.isSpam || '',
                });
            } catch (error) {
                toast.error('Failed to fetch contact data');
            }
        };
        fetchData();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await updateContact(id, data);
            toast.success('Contact updated successfully');
            navigate('/contact');
        } catch (error) {
            toast.error('Failed to update contact');
        }
    };

    return (
        <>
            <div className="content-wrapper">
                <div className="col-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="font-weight-bold">Edit Contact</h3>
                            <Link to="/contact" className="btn btn-primary mb-3">
                                <i className="fas fa-arrow-left"></i> Back
                            </Link>
                            <form className="forms-sample" onSubmit={handleSubmit}>
                                <div className="row mb-4">
                                    <div className="col-md-6">
                                        <label className="col-form-label text-md-right">IsRead</label>
                                        <select
                                            className="form-control"
                                            value={data.isRead}
                                            onChange={(e) => setData({ ...data, isRead: e.target.value })}
                                        >
                                            <option value="">Select isRead</option>
                                            <option value="true">True</option>
                                            <option value="false">False</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="col-form-label text-md-right">IsImportant</label>
                                        <select
                                            className="form-control"
                                            value={data.isImportant}
                                            onChange={(e) => setData({ ...data, isImportant: e.target.value })}
                                        >
                                            <option value="">Select isImportant</option>
                                            <option value="true">True</option>
                                            <option value="false">False</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-md-6">
                                        <label className="col-form-label text-md-right">IsSpam</label>
                                        <select
                                            className="form-control"
                                            value={data.isSpam}
                                            onChange={(e) => setData({ ...data, isSpam: e.target.value })}
                                        >
                                            <option value="">Select isSpam</option>
                                            <option value="true">True</option>
                                            <option value="false">False</option>
                                        </select>
                                    </div>
                                </div>

                                <button type="submit" className="btn btn-primary mr-2">
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditContact;
