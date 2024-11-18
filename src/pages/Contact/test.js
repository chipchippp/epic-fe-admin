import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import { editContact, createContact, getContactsReplyIsNull, editContactReply } from '~/services/User/contactService';

function EditContact() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [contactReplies, setContactReplies] = useState([]);
    const [contactDetails, setContactDetails] = useState({
        user: {
            username: '',
            phoneNumber: '',
            email: '',
            note: '',
        },
        adminReply: {
            username: '',
            phoneNumber: '',
            email: '',
            note: '',
        },
        contactReplyId: 0,
    });

    const [replyFormData, setReplyFormData] = useState({
        username: '',
        phoneNumber: '',
        email: '',
        note: '',
        contactReplyId: 0,
    });

    const [showReplyForm, setShowReplyForm] = useState(false);

    // Fetch danh sách contact replies khi component load
    useEffect(() => {
        const fetchContactReplies = async () => {
            try {
                const response = await getContactsReplyIsNull();
                setContactReplies(response.data.content);
            } catch (error) {
                toast.error('Failed to fetch contact replies.');
            }
        };
        fetchContactReplies();
    }, []);

    // Fetch chi tiết contact và đồng bộ dữ liệu
    useEffect(() => {
        const fetchContactDetails = async () => {
            try {
                const contactResponse = await editContact(id);
                const adminReplyResponse = await editContactReply(id);

                const contactReplyId = contactResponse.data.contactReplyId || 0;
                console.log(contactReplyId.data);
                setContactDetails({
                    user: {
                        username: contactResponse.data.username || '',
                        phoneNumber: contactResponse.data.phoneNumber || '',
                        email: contactResponse.data.email || '',
                        note: contactResponse.data.note || '',
                    },
                    adminReply: {
                        username: adminReplyResponse.data.username || '',
                        phoneNumber: adminReplyResponse.data.phoneNumber || '',
                        email: adminReplyResponse.data.email || '',
                        note: adminReplyResponse.data.note || '',
                    },
                    contactReplyId,
                });

                // Cập nhật replyFormData khi dữ liệu tải xong
                setReplyFormData({
                    username: adminReplyResponse.data.username || 'Epicgures',
                    phoneNumber: adminReplyResponse.data.phoneNumber || '0123456789',
                    email: adminReplyResponse.data.email || 'quannhth2210007@fpt.edu.vn',
                    note: '',
                    contactReplyId,
                });
            } catch (error) {
                toast.error('Failed to fetch contact details.');
            }
        };
        fetchContactDetails();
    }, [id]);

    const handleReplySubmit = async (event) => {
        event.preventDefault();
        try {
            await createContact(replyFormData);
            toast.success('Contact reply sent successfully.');
            navigate('/contact');
        } catch (error) {
            toast.error('Failed to send contact reply.');
        }
    };

    const handleShowReplyForm = () => {
        setShowReplyForm(true);
    };

    return (
        <>
            <div className="content-wrapper">
                <div className="col-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="font-weight-bold">Detail Reply Contact</h3>
                            <div className="row mb-4">
                                {/* Thông tin liên hệ của User */}
                                <div className="col-md-4">
                                    <address>
                                        <strong>User Contact Details:</strong>
                                        <p>Username: {contactDetails.user.username}</p>
                                        <p>Email: {contactDetails.user.email}</p>
                                        <p>Phone: {contactDetails.user.phoneNumber}</p>
                                        <p>Note: {contactDetails.user.note}</p>
                                        <p>contactReplyId: {contactDetails.contactReplyId}</p>
                                    </address>
                                </div>
                                {/* Thông tin trả lời từ Admin */}
                                <div className="col-md-4">
                                    <address>
                                        <strong>Admin Reply Details:</strong>
                                        <p>Username: {contactDetails.adminReply.username}</p>
                                        <p>Email: {contactDetails.adminReply.email}</p>
                                        <p>Phone: {contactDetails.adminReply.phoneNumber}</p>
                                        <p>Note: {contactDetails.adminReply.note}</p>
                                        <p>contactReplyId: {contactDetails.contactReplyId}</p>
                                    </address>
                                </div>
                            </div>
                            {/* Nút hiện form reply */}
                            {contactDetails.contactReplyId === 0 && (
                                <button className="btn btn-primary mb-4" onClick={handleShowReplyForm}>
                                    Show Reply Form
                                </button>
                            )}
                            {/* Form reply */}
                            {showReplyForm && (
                                <div className="mt-4">
                                    <form className="forms-sample ml-2" onSubmit={handleReplySubmit}>
                                        <div className="row mb-4">
                                            <div className="col-md-4">
                                                <address>
                                                    <strong>Contact Admin Reply:</strong>
                                                    <p>Username: {replyFormData.username}</p>
                                                    <p>Email: {replyFormData.email}</p>
                                                    <p>PhoneNumber: {replyFormData.phoneNumber}</p>
                                                    <p>ContactReplyId: {replyFormData.contactReplyId}</p>
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
                                                        setReplyFormData({ ...replyFormData, note: e.target.value })
                                                    }
                                                />
                                            </div>
                                            <div className="col-md-3">
                                                <label className="col-form-label text-md-right">Contact Reply</label>
                                                <select
                                                    name="contactReplyId"
                                                    className="form-control"
                                                    value={replyFormData.contactReplyId}
                                                    onChange={(e) =>
                                                        setReplyFormData({
                                                            ...replyFormData,
                                                            contactReplyId: parseInt(e.target.value, 10) || 0,
                                                        })
                                                    }
                                                    disabled={contactDetails.contactReplyId === 0}
                                                >
                                                    <option value="" disabled>
                                                        Select Contact Reply
                                                    </option>
                                                    {contactReplies.map((reply) => (
                                                        <option key={reply.id} value={reply.id}>
                                                            {reply.username}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-12 text-right">
                                            <button type="submit" className="btn btn-primary">
                                                Send Email
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    );
}

export default EditContact;
