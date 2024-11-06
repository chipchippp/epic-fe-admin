import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { editAppointment, updateAppointment } from '~/services/User/appointmentService';

function OrderDetail() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({
        id: '',
        userId: '',
        email: '',
        address: '',
        phone: '',
        status: '',
        createdAt: '',
        updatedAt: '',
        appointmentUrl: '',
    });

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await editAppointment(id);
                setData(result.data);
                setLoading(false);
            } catch (error) {
                toast.error('Failed to fetch order data');
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await updateAppointment(id, data);
            toast.success('Appointment status updated successfully');
            navigate(`/designer-appointments/detail/${id}`);
            window.location.reload();
        } catch (error) {
            toast.error('Failed to update order status', error);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
        });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="content-wrapper">
                <div className="row">
                    <div className="col-md-12 grid-margin">
                        <div className="row">
                            <div className="col-12 col-xl-8 mb-4 mb-xl-0">
                                <h3 className="font-weight-bold">Appointment Details</h3>
                                <Link to="/designer" className="btn btn-primary mb-3">
                                    <i className="fas fa-arrow-left"></i> Back
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <div className="invoice">
                                <div className="invoice-print">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="invoice-title">
                                                <h4>
                                                    Appointment <span style={{ color: 'gray' }}>#{id}</span>
                                                </h4>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <address>
                                                        <strong>Appointment To:</strong>
                                                        <p>Username: {data.designer.username}</p>
                                                        <p>Email: {data.designer.email}</p>
                                                        <p>Telephone: {data.designer.phoneNumber}</p>
                                                        <p>Address: {data.designer.address}</p>
                                                        <p>Status: {data.status}</p>
                                                    </address>
                                                </div>
                                                <div className="col-md-6 text-md-right">
                                                    <address>
                                                        <strong>AppointmentUrl To:</strong>
                                                        <p>{data.appointmentUrl}</p>
                                                    </address>
                                                    <address>
                                                        <strong>Date Start:</strong>
                                                        <p>{formatDate(data.datetimeStart)}</p>
                                                    </address>
                                                    <address>
                                                        <strong>Date End:</strong>
                                                        <p>{formatDate(data.datetimeEnd)}</p>
                                                    </address>
                                                </div>
                                            </div>
                                            <form onSubmit={handleSubmit}>
                                                <div className="row mb-4">
                                                    <div className="col-md-6">
                                                        <label htmlFor="appointmentUrl">Appointment URL</label>
                                                        <input
                                                            type="text"
                                                            id="appointmentUrl"
                                                            name="appointmentUrl"
                                                            value={data.appointmentUrl}
                                                            onChange={handleInputChange}
                                                            className="form-control"
                                                        />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <button className="btn btn-primary" type="submit">
                                                            Update
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                        <hr />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export default OrderDetail;
