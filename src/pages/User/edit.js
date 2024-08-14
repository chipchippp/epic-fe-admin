import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';

function EditUser() {
    const { id } = useParams();
    const [data, setData] = useState({
        username: '',
        email: '',
        password: '',
        fullName: '',
        phoneNumber: '',
        address: '',
        roles: ['user'], // Assuming default role as 'user'
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(`http://localhost:8081/api/v1/users/${id}`);
                setData(result.data);
            } catch (error) {
                toast.error('Failed to fetch user data');
                console.error('Fetch error:', error);
            }
        };
        fetchData();
    }, [id]);

    const handleUpdate = async (event) => {
        event.preventDefault();

        try {
            await axios.put(`http://localhost:8081/api/v1/users/${id}`, data);
            toast.success('User updated successfully');
            navigate('/users');
        } catch (error) {
            toast.error('Failed to update user');
            console.error('Update error:', error);
        }
    };

    return (
        <>
            <div className="content-wrapper">
                <div className="row">
                    <div className="col-md-12 grid-margin">
                        <div className="row">
                            <div className="col-12 col-xl-8 mb-4 mb-xl-0">
                                <h3 className="font-weight-bold">Edit User</h3>
                                <h6 className="font-weight-normal mb-0">
                                    All systems are running smoothly! You have
                                    <span className="text-primary"> 3 unread alerts!</span>
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Edit User</h4>
                            <form className="forms-sample" onSubmit={handleUpdate}>
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        placeholder="Username"
                                        value={data.username}
                                        onChange={(e) => setData({ ...data, username: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="Email"
                                        value={data.email}
                                        onChange={(e) => setData({ ...data, email: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        placeholder="Password"
                                        value={data.password}
                                        onChange={(e) => setData({ ...data, password: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="fullName">Full Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="fullName"
                                        placeholder="Full Name"
                                        value={data.fullName}
                                        onChange={(e) => setData({ ...data, fullName: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phoneNumber">Phone Number</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="phoneNumber"
                                        placeholder="Phone Number"
                                        value={data.phoneNumber}
                                        onChange={(e) => setData({ ...data, phoneNumber: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="address">Address</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="address"
                                        placeholder="Address"
                                        value={data.address}
                                        onChange={(e) => setData({ ...data, address: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="roles">Roles</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="roles"
                                        placeholder="Roles"
                                        value={data.roles}
                                        onChange={(e) => setData({ ...data, roles: e.target.value.split(',') })}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary mr-2">
                                    Submit
                                </button>
                                <Link to="/users" className="btn btn-light">Back</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export default EditUser;
