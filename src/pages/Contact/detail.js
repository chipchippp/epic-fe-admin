import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import { createContact, getContactByReplyId, getContactById } from '~/services/User/contactService';

function EditContact() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [contactData, setContactData] = useState({
        username: '',
        phoneNumber: '',
        email: '',
        note: '',
        isReply: false,
    });
    const [contactReplyData, setContactReplyData] = useState({
        username: '',
        phoneNumber: '',
        email: '',
        note: '',
    });
    const [replyFormData, setReplyFormData] = useState({
        username: 'Epicgures',
        phoneNumber: '0123456789',
        email: 'quannhth2210007@fpt.edu.vn',
        note: '',
        contactReplyId: 0,
    });

    const [showForm, setShowForm] = useState(false);
    const [isDataFetched, setIsDataFetched] = useState(false);

    useEffect(() => {
        const fetchContactData = async () => {
            try {
                const replyResponse = await getContactByReplyId(id);
                console.log('replyResponse', replyResponse);

                if (replyResponse?.data && replyResponse.data.length > 0) {
                    setContactData(replyResponse.data[0]?.contactReply);
                    setContactData((prevData) => ({
                        ...prevData,
                        isReply: true,
                    }));
                    setContactReplyData(replyResponse.data[0]);
                } else {
                    const contactResponse = await getContactById(id);
                    if (contactResponse?.data) {
                        setContactData(contactResponse.data);
                    } else {
                        toast.error('Contact not found');
                    }
                    console.log('contactResponse', contactResponse);
                }
                setIsDataFetched(true);
            } catch (error) {
                toast.error('Failed to fetch contact data');
                console.error('Error fetching contact data:', error);
                setIsDataFetched(true);
            }
        };

        fetchContactData();
    }, [id]);

    const handleSubmitPost = async (event) => {
        event.preventDefault();
        try {
            await createContact(replyFormData);
            toast.success('Contact created successfully');
            navigate('/contact');
        } catch (error) {
            toast.error('Failed to create Contact');
            console.error('Error creating Contact:', error.response ? error.response.data : error.message);
        }
    };

    const handleShowForm = () => {
        setReplyFormData((prevData) => ({
            ...prevData,
            contactReplyId: id || 0,
        }));
        setShowForm((prevState) => !prevState);
    };

    return (
        <div className="content-wrapper">
            <div className="col-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h3 className="font-weight-bold">Detail Contact</h3>
                        <div className="row mb-4">
                            <div className="col-md-4">
                                <address>
                                    <h4>
                                        <strong>User send contact:</strong>
                                    </h4>
                                    <p>Username: {contactData.username}</p>
                                    <p>Email: {contactData.email}</p>
                                    <p>PhoneNumber: {contactData.phoneNumber}</p>
                                    <p>Note: {contactData.note}</p>
                                </address>
                            </div>
                            {contactData.isReply && (
                                <div className="col-md-4">
                                    <address>
                                        <h4>
                                            <strong>Contact Reply:</strong>
                                        </h4>
                                        <p>Username: {contactReplyData.username}</p>
                                        <p>Email: {contactReplyData.email}</p>
                                        <p>PhoneNumber: {contactReplyData.phoneNumber}</p>
                                        <p>Note: {contactReplyData.note}</p>
                                    </address>
                                </div>
                            )}
                        </div>

                        {/* <div className="row mb-4">
                            <div className="col-12">
                                {' '}
                                <address>
                                    <h4>
                                        <strong>User send contact:</strong>
                                    </h4>
                                    <p>Username: {contactData.username}</p>
                                    <p>Email: {contactData.email}</p>
                                    <p>PhoneNumber: {contactData.phoneNumber}</p>
                                    <p>Note: {contactData.note}</p>
                                </address>
                            </div>
                            {contactData.isReply && (
                                <div className="col-12">
                                    {' '}
                                    <address>
                                        <h4>
                                            <strong>Contact Reply:</strong>
                                        </h4>
                                        <p>Username: {contactReplyData.username}</p>
                                        <p>Email: {contactReplyData.email}</p>
                                        <p>PhoneNumber: {contactReplyData.phoneNumber}</p>
                                        <p>Note: {contactReplyData.note}</p>
                                    </address>
                                </div>
                            )}
                        </div> */}

                        {isDataFetched && !contactData.isReply && (
                            <div className="mb-4">
                                <button className="btn btn-primary" onClick={handleShowForm}>
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
                                                <p>Username: {replyFormData.username}</p>
                                                <p>Email: {replyFormData.email}</p>
                                                <p>PhoneNumber: {replyFormData.phoneNumber}</p>
                                            </address>
                                        </div>
                                        <div className="col-md-5">
                                            <label className="col-form-label text-md-right">Note</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Note"
                                                value={replyFormData.note}
                                                onChange={(e) =>
                                                    setReplyFormData({
                                                        ...replyFormData,
                                                        note: e.target.value,
                                                    })
                                                }
                                            />
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
            <ToastContainer />
        </div>
    );
}

export default EditContact;
