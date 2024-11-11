import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom';
import { createUsers } from '~/services/User/userService';

function CreateUser() {
    const [data, setData] = useState({
        username: '',
        email: '',
        password: '',
        fullName: '',
        phoneNumber: '',
        address: '',
        roles: ['user'],
    });

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await createUsers(data);
            toast.success('User created successfully');
            navigate('/users');
        } catch (error) {
            toast.error(`Failed to create user: ${error.message}`);
        }
    };

    return (
        <div className="content-wrapper">
            <div className="row">
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="font-weight-bold">Create User</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="row mb-4">
                                    <div className="col-md-4">
                                        <label className="col-form-label text-md-right">FullName</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="fullName"
                                            value={data.fullName}
                                            onChange={(e) => setData({ ...data, fullName: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="col-form-label text-md-right">Username</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="username"
                                            value={data.username}
                                            onChange={(e) => setData({ ...data, username: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="col-form-label text-md-right">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            value={data.email}
                                            onChange={(e) => setData({ ...data, email: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-md-4">
                                        <label className="col-form-label text-md-right">Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="password"
                                            value={data.password}
                                            onChange={(e) => setData({ ...data, password: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="col-form-label text-md-right">Phone Number</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="phoneNumber"
                                            value={data.phoneNumber}
                                            onChange={(e) => setData({ ...data, phoneNumber: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="col-form-label text-md-right">Address</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="address"
                                            value={data.address}
                                            onChange={(e) => setData({ ...data, address: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary mr-2">
                                    Save
                                </button>
                                <Link to="/users" className="btn btn-light">
                                    Back
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default CreateUser;
