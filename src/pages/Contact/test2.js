import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import { editContact, createContact, getContactsReplyIsNull, editContactReply } from '~/services/User/contactService';

function EditContact() {
    const { id } = useParams();
    const [contactReplys, setContactReplys] = useState([]);
    const [data, setData] = useState({
        username: '',
        phoneNumber: '',
        email: '',
        note: '',
        contactReplyId: 0,
    });
    const [dataContactReply, setDataContactReply] = useState({
        username: '',
        phoneNumber: '',
        email: '',
        note: '',
        contactReplyId: 0,
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
                const result = await editContact(id);
                const contactReplyResult = await editContactReply(id);

                const contactReplyData =
                    Array.isArray(contactReplyResult.data) && contactReplyResult.data.length > 0
                        ? contactReplyResult.data[0]
                        : {};

                if (Array.isArray(contactReplyResult.data) && contactReplyResult.data.length > 0) {
                    setContactReplys(contactReplyResult.data);
                }

                setDataContactReply({
                    username: contactReplyData.username || '',
                    phoneNumber: contactReplyData.phoneNumber || '',
                    email: contactReplyData.email || '',
                    note: contactReplyData.note || '',
                    contactReplyId: contactReplyData.contactReplyId || 0,
                });

                setData({
                    username: result.data.username || '',
                    phoneNumber: result.data.phoneNumber || '',
                    email: result.data.email || '',
                    note: result.data.note || '',
                    contactReplyId: result.data.contactReplyId || 0,
                });

                setDataPost((prevDataPost) => ({
                    ...prevDataPost,
                    contactReplyId: result.data.contactReplyId || 0,
                }));

                console.log('result ', result.data);
                console.log('contactReplyResult ', contactReplyResult.data);
            } catch (error) {
                toast.error('Failed to fetch contact or contact reply');
            }
        };
        fetchData();
    }, [id]);

    const handleSubmitPost = async (event) => {
        event.preventDefault();
        try {
            await createContact(dataPost);
            toast.success('Contact created successfully');
            navigate('/contact');
        } catch (error) {
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
                                        <strong>Contact User Reply:</strong>
                                        <p>Username: {data.username}</p>
                                        <p>Email: {data.email}</p>
                                        <p>PhoneNumber: {data.phoneNumber}</p>
                                        <p>Note: {data.note}</p>
                                        <p>ContactReply: {data.contactReplyId}</p>
                                    </address>
                                </div>
                                {contactReplys.map((contactReply, index) => (
                                    <div key={index} className="col-md-4">
                                        <address>
                                            <strong>Contact Admin Reply {index + 1}:</strong>
                                            <p>Username: {contactReply.username}</p>
                                            <p>Email: {contactReply.email}</p>
                                            <p>PhoneNumber: {contactReply.phoneNumber}</p>
                                            <p>Note: {contactReply.note}</p>
                                            <p>ContactReply: {contactReply.contactReplyId}</p>
                                        </address>
                                    </div>
                                ))}
                            </div>
                            {data.contactReplyId === 0 && (
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
                                                    <p>ContactReplyId: {data.contactReplyId}</p>
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
                                                    value={dataPost.contactReplyId || ''} // Bind to dataPost.contactReplyId
                                                    onChange={(e) =>
                                                        setDataPost({
                                                            ...dataPost,
                                                            contactReplyId: parseInt(e.target.value) || null,
                                                        })
                                                    }
                                                    disabled={data.contactReplyId !== 0} // Keep this condition for disabling the form when needed
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
