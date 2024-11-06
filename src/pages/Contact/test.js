import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { editContact, updateContact } from '~/services/User/contactService';

function EditContact() {
    const { id } = useParams();
    const [data, setData] = useState({
        isRead: false,
        isImportant: false,
        isSpam: false,
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await editContact(id);
                setData({
                    isRead: result.isRead,
                    isImportant: result.isImportant,
                    isSpam: result.isSpam,
                });
            } catch (error) {
                toast.error('Failed to fetch category data');
                console.error('Fetch error:', error);
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
            console.error('Update error:', error);
        }
    };

    const handleToggleChange = (field) => {
        setData((prevData) => ({
            ...prevData,
            [field]: !prevData[field],
        }));
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
                                        <div className="form-check form-switch">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="isReadSwitch"
                                                checked={data.isRead}
                                                onChange={() => handleToggleChange('isRead')}
                                            />
                                            <label className="form-check-label" htmlFor="isReadSwitch">
                                                Is Read
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-check form-switch">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="isImportantSwitch"
                                                checked={data.isImportant}
                                                onChange={() => handleToggleChange('isImportant')}
                                            />
                                            <label className="form-check-label" htmlFor="isImportantSwitch">
                                                Is Important
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-md-6">
                                        <div className="form-check form-switch">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="isSpamSwitch"
                                                checked={data.isSpam}
                                                onChange={() => handleToggleChange('isSpam')}
                                            />
                                            <label className="form-check-label" htmlFor="isSpamSwitch">
                                                Is Spam
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <button type="submit" className="btn btn-primary mr-2">
                                    Submit
                                </button>
                                <Link to="/contact" className="btn btn-light">
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

export default EditContact;
