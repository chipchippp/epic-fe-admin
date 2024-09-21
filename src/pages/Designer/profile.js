import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateAdmins } from '~/services/User/userService';
import { useNavigate, useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './Profile.css';

function Profile() {
    // Assume data fetched from API or state management
    const [data, setData] = useState({
        username: 'JohnDoe', 
        email: 'john@example.com',
        role: 'Admin',
        imageSrc: 'http://localhost:8080/api/v1/product-images/imagesPost/6b153e14-f9ce-473c-aa85-89b77cce39c9.jpg'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add update profile logic here
        toast.success("Profile updated successfully!");
    };

    return (
        <div className="content-wrapper">
            <div className="card">
                <div className="card-body">

                    <div className="section-body">
                        <h2 className="section-title">
                            Hi, {data.username}
                        </h2>
                        <p className="section-lead">
                            Change information about yourself on this page.
                        </p>

                        <div className="row mt-sm-4">
                            {/* Profile Image and Details */}
                            <div className="col-12 col-md-12 col-lg-5">
                                <div className="card profile-widget">
                                    <div className="profile-widget-header">
                                        <img
                                            alt="Profile"
                                            src={data.imageSrc}
                                            className="rounded-circle profile-widget-picture fixed-profile-img"
                                        />
                                        <div className="profile-widget-items  d-flex justify-content-between btn btn-primary">
                                            <div className="profile-widget-item">
                                                <div className="profile-widget-item-label">Posts</div>
                                                <div className="profile-widget-item-value">187</div>
                                            </div>
                                            <div className="profile-widget-item">
                                                <div className="profile-widget-item-label">Followers</div>
                                                <div className="profile-widget-item-value">6.8K</div>
                                            </div>
                                            <div className="profile-widget-item">
                                                <div className="profile-widget-item-label">Following</div>
                                                <div className="profile-widget-item-value">2.1K</div>
                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                    <br />
                                    <div className="profile-widget-description">
                                        <div className="profile-widget-name">
                                            {data.username} 
                                            <div className="text-muted d-inline font-weight-normal">
                                                &nbsp; Web Developer
                                            </div>
                                        </div>
                                        {data.username} is a superhero name in <b>Indonesia</b>.
                                    </div>
                                    <div className="card-footer text-center">
                                        <div className="font-weight-bold mb-2">Follow On</div>
                                        {/* Add social media icons or links here */}
                                    </div>
                                </div>
                            </div>

                            {/* Edit Profile Section */}
                            <div className="col-12 col-md-12 col-lg-7">
                                <div className="card">
                                    <form onSubmit={handleSubmit} className="needs-validation">
                                        <div className="card-header">
                                            <h4>Edit Profile</h4>
                                        </div>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="form-group col-md-6 col-12">
                                                    <label>UserName</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={data.username}
                                                        required
                                                        onChange={(e) => setData({ ...data, username: e.target.value })}
                                                    />
                                                    <div className="invalid-feedback">Please fill in the UserName</div>
                                                </div>
                                                <div className="form-group col-md-6 col-12">
                                                    <label>Email</label>
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        value={data.email}
                                                        required
                                                        onChange={(e) => setData({ ...data, email: e.target.value })}
                                                    />
                                                    <div className="invalid-feedback">Please fill in the Email</div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="form-group col-md-6 col-12">
                                                    <label>Role</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={data.role}
                                                        required
                                                        onChange={(e) => setData({ ...data, role: e.target.value })}
                                                    />
                                                    <div className="invalid-feedback">Please fill in the Role</div>
                                                </div>
                                                <div className="form-group col-md-6 col-12">
                                                    <label>Role</label>
                                                    <input
                                                        type="file"
                                                        className="form-control"
                                                        required
                                                    />
                                                    <div className="invalid-feedback">Please fill in the Role</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-footer text-right">
                                            <button type="submit" className="btn btn-primary">
                                                Update Profile
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
