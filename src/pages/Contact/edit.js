import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import { createContact, getContactsReplyIsNull, editContactReply } from '~/services/User/contactService';

function EditContact() {
    const { contactReplyId } = useParams();
    const [contactReplys, setContactReplys] = useState([]);
    const [data, setData] = useState({
        username: '',
        phoneNumber: '',
        email: '',
        note: '',
        contactReplyId: 0,
        contactReply: null,
    });
    const [dataPost, setDataPost] = useState({
        username: 'Epicgures',
        phoneNumber: '0123456789',
        email: 'quannhth2210007@fpt.edu.vn',
        note: '',
        contactReplyId: 0,
    });

    useEffect(() => {
        setDataPost((prevDataPost) => ({
            ...prevDataPost,
            id: data.id,
        }));
    }, [data.id]);

    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchContactReply = async () => {
            try {
                const response = await getContactsReplyIsNull();
                setContactReplys(response.data.content);
            } catch (error) {
                toast.error('Failed to fetch contact reply');
            }
        };

        fetchContactReply();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await editContactReply(contactReplyId);
                if (result.data.length > 0) {
                    setData(result.data[0]);
                } else {
                    toast.error('No contact reply found');
                }
            } catch (error) {
                toast.error('Failed to fetch contact or contact reply');
            }
        };
        fetchData();
    }, [contactReplyId]);

    useEffect(() => {
        if (dataPost.contactReplyId) {
            const selected = contactReplys.find((reply) => reply.id === dataPost.contactReplyId);
            // setSelectedReply(selected || null);
        }
    }, [dataPost.contactReplyId, contactReplys]);

    const handleSubmitPost = async (event) => {
        event.preventDefault();
        try {
            await createContact(dataPost);
            toast.success('Contact created successfully');
            navigate('/contact');
        } catch (error) {
            console.error('Error creating Contact:', error.response ? error.response.data : error.message);
            toast.error('Failed to create Contact');
        }
    };

    const handleClickShowForm = () => {
        setDataPost({
            ...dataPost,
            contactReplyId: data.contactReplyId || 0,
        });
        setShowForm(true);
    };

    return (
        <>
            <div className="content-wrapper">
                <div className="col-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="font-weight-bold">Detail Reply Contact</h3>
                            <div className="row mb-4">
                                <div className="col-md-4">
                                    <address>
                                        <strong>Contact Admin Reply:</strong>
                                        <p>Username: {data.username}</p>
                                        <p>Email: {data.email}</p>
                                        <p>PhoneNumber: {data.phoneNumber}</p>
                                        <p>Note: {data.note}</p>
                                    </address>
                                </div>
                                <div className="col-md-4">
                                    <address>
                                        <strong>Contact User Reply:</strong>
                                        {data.contactReply ? (
                                            <>
                                                <p>Username: {data.contactReply.username}</p>
                                                <p>Email: {data.contactReply.email}</p>
                                                <p>PhoneNumber: {data.contactReply.phoneNumber}</p>
                                                <p>Note: {data.contactReply.note}</p>
                                                <p>ContactReplyId: {data.contactReply.id}</p>
                                            </>
                                        ) : (
                                            <p>No contact reply available</p>
                                        )}
                                    </address>
                                </div>
                            </div>

                            {data.contactReplyId !== 0 && (
                                <div className="mb-4">
                                    <button className="btn btn-primary" onClick={handleClickShowForm}>
                                        Show Reply Form
                                    </button>
                                </div>
                            )}

                            {showForm && (
                                <div className="mt-4">
                                    <form className="forms-sample ml-2" onSubmit={handleSubmitPost}>
                                        <div className="row mb-4">
                                            <div className="col-md-4">
                                                <address>
                                                    <strong>Contact Admin Reply:</strong>
                                                    <p>Username: {dataPost.username}</p>
                                                    <p>Email: {dataPost.email}</p>
                                                    <p>PhoneNumber: {dataPost.phoneNumber}</p>
                                                    <p>ContactReplyId: {dataPost.contactReplyId}</p>
                                                </address>
                                            </div>
                                            <div className="col-md-5">
                                                <label className="col-form-label text-md-right">Note</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Note"
                                                    value={dataPost.note}
                                                    onChange={(e) => setDataPost({ ...dataPost, note: e.target.value })}
                                                />
                                            </div>
                                            <div className="col-md-3">
                                                <label className="col-form-label text-md-right">Contact Reply</label>
                                                <select
                                                    name="contactReplyId"
                                                    className="form-control"
                                                    value={data.contactReply.id}
                                                    onChange={(e) =>
                                                        setDataPost({
                                                            ...dataPost,
                                                            contactReplyId: parseInt(e.target.value) || null,
                                                        })
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
                                        <button type="submit" className="btn btn-success">
                                            Submit
                                        </button>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {/* <ToastContainer /> */}
            </div>
        </>
    );
}

export default EditContact;
