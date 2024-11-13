import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom';
import { createContact, getContactsReplyIsNull } from '~/services/User/contactService';

function CreateContact() {
    const [data, setData] = useState({
        username: '',
        phoneNumber: '',
        email: '',
        note: '',
        contactReplyId: 0,
    });
    const [contactReplys, setContactReplys] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchContactReply = async () => {
            try {
                const response = await getContactsReplyIsNull();
                console.log(response.data.content);
                setContactReplys(response.data.content);
            } catch (error) {
                toast.error('Failed to fetch contact reply');
            }
        };

        fetchContactReply();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await createContact(data);
            toast.success('Contact created successfully');
            navigate('/contact');
        } catch (error) {
            console.error('Error creating Contact:', error.response ? error.response.data : error.message);
            toast.error('Failed to create Contact');
        }
    };

    return (
        <>
            <div className="content-wrapper">
                <div className="col-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="font-weight-bold">New Contact</h3>
                            <form className="forms-sample" onSubmit={handleSubmit}>
                                <div className="row mb-4">
                                    <div className="col-md-4">
                                        <label className="col-form-label text-md-right">Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="exampleInputName1"
                                            placeholder="Name"
                                            value={data.username}
                                            onChange={(e) => setData({ ...data, username: e.target.value })}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="col-form-label text-md-right">Email</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="exampleInputCity1"
                                            placeholder="Email"
                                            value={data.email}
                                            onChange={(e) => setData({ ...data, email: e.target.value })}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="col-form-label text-md-right">PhoneNumber</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="exampleInputCity1"
                                            placeholder="phoneNumber"
                                            value={data.phoneNumber}
                                            onChange={(e) => setData({ ...data, phoneNumber: e.target.value })}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="col-form-label text-md-right">Note</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="exampleInputCity1"
                                            placeholder="Note"
                                            value={data.note}
                                            onChange={(e) => setData({ ...data, note: e.target.value })}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="col-form-label text-md-right">Contact Reply</label>
                                        <select
                                            name="contactReplyId"
                                            className="form-control"
                                            value={data.contactReplyId || ''}
                                            onChange={(e) =>
                                                setData({ ...data, contactReplyId: e.target.value || null })
                                            }
                                        >
                                            <option value="" disabled>
                                                Select Contact Reply
                                            </option>
                                            {contactReplys.map((contact) => (
                                                <option key={contact.id} value={contact.id}>
                                                    {contact.username}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary mr-2">
                                    Save
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

export default CreateContact;
