import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { editUsers, updateUsers } from '~/services/User/userService';

function EditUser() {
    const { id } = useParams();
    const [data, setData] = useState({
        username: '',
        email: '',
        fullName: '',
        phoneNumber: '',
        address: '',
        roles: ['user'],
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await editUsers(id);
                setData({
                    username: result.username,
                    email: result.email,
                    password: result.password,
                    phoneNumber: result.phoneNumber,
                    address: result.address,
                });
            } catch (error) {
                toast.error('Failed to fetch user data');
            }
        };
        fetchData();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await updateUsers(id, data);
            toast.success('User updated successfully');
            navigate('/users');
        } catch (error) {
            toast.error('Failed to update user');
        }
    };

    return (
        <div className="content-wrapper">
            <div className="row">
                <div className="col-md-12 grid-margin">
                    <div className="row">
                        <div className="col-12 col-xl-8 mb-4 mb-xl-0">
                            <h3 className="font-weight-bold">Update User</h3>
                            <Link to="/users" className="btn btn-primary mb-3">
                                <i className="fas fa-arrow-left"></i> Back
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Username</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="username"
                                        value={data.username}
                                        onChange={(e) => setData({ ...data, username: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        value={data.email}
                                        onChange={(e) => setData({ ...data, email: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="fullName"
                                        value={data.fullName}
                                        onChange={(e) => setData({ ...data, fullName: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Phone Number</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="phoneNumber"
                                        value={data.phoneNumber}
                                        onChange={(e) => setData({ ...data, phoneNumber: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Address</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="address"
                                        value={data.address}
                                        onChange={(e) => setData({ ...data, address: e.target.value })}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">
                                    Update
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default EditUser;
