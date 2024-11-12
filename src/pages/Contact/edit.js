import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { editContact, updateContact } from '~/services/User/contactService';

function EditContact() {
    const { id } = useParams();
    const [data, setData] = useState({
        read: '',
        important: '',
        spam: '',
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await editContact(id);
                setData({
                    read: result.read || '',
                    important: result.important || '',
                    spam: result.spam || '',
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
                            <form className="forms-sample" onSubmit={handleSubmit}>
                                <div className="row mb-4">
                                    <div className="col-md-4">
                                        <label className="col-form-label text-md-right">Is Read</label>
                                        <select
                                            className="form-control"
                                            value={data.read}
                                            onChange={(e) => setData({ ...data, read: e.target.value })}
                                        >
                                            <option value="">Select read</option>
                                            <option value="true">True</option>
                                            <option value="false">False</option>
                                        </select>
                                    </div>
                                    <div className="col-md-4">
                                        <label className="col-form-label text-md-right">Is Important</label>
                                        <select
                                            className="form-control"
                                            value={data.important}
                                            onChange={(e) => setData({ ...data, important: e.target.value })}
                                        >
                                            <option value="">Select important</option>
                                            <option value="true">True</option>
                                            <option value="false">False</option>
                                        </select>
                                    </div>
                                    <div className="col-md-4">
                                        <label className="col-form-label text-md-right">Is Spam</label>
                                        <select
                                            className="form-control"
                                            value={data.spam}
                                            onChange={(e) => setData({ ...data, spam: e.target.value })}
                                        >
                                            <option value="">Select spam</option>
                                            <option value="true">True</option>
                                            <option value="false">False</option>
                                        </select>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary mr-2">
                                    Update
                                </button>
                                <Link to="/contact" className="btn btn-light">
                                    Back
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    );
}

export default EditContact;
