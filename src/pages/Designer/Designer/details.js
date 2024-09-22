import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import './Profile.css';
import { editDesign, updateDesign } from '~/services/Designer/designService';
import React, { useState, useEffect } from 'react';

function DesignDetail() {
    const [loading, setLoading] = useState(true);
    const [tempStatus, setTempStatus] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({
        id: '',
        username: '',
        email: '',
        phoneNumber: '',
        address: '',
        avatar: '',
        experience: '',
        projects: '',
        skills: '',
        education: '',
        certification: '',
        userId: '',
        status: '',
        createdAt: '',
        updatedAt: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await editDesign(id);
                setData(result.data);
                setLoading(false);
            } catch (error) {
                toast.error('Failed to fetch design data');
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await updateDesign(id, tempStatus);
            toast.success('Design status updated successfully');
            navigate(`/designer-detail/${id}`);
            window.location.reload();
        } catch (error) {
            toast.error('Failed to update design status', error);
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

    const getSelectableOptions = () => {
        const options = [
            { value: 'PENDING', label: 'Pending' },
            { value: 'REJECTED', label: 'Rejected' },
            { value: 'ACCEPTED', label: 'Accepted' },
        ];

        switch (data.status) {
            case 'PENDING':
                return options.filter((option) => ['PENDING', 'ACCEPTED', 'REJECTED'].includes(option.value));
            case 'REJECTED':
                return options.filter((option) => ['REJECTED'].includes(option.value));
            case 'ACCEPTED':
                return options.filter((option) => ['ACCEPTED'].includes(option.value));
            default:
                return options;
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }


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
                            <div className="col-12 col-md-12 col-lg-5">
                                <div className="card profile-widget">
                                    <div className="profile-widget-header">
                                        <img
                                            alt="DesignDetail"
                                             src={`http://localhost:8080/api/v1/image_design_designer/imagesPost/${data.avatar}`} style={{ width: '70px', height: '70px', borderRadius: '0px' }}

                                            className="rounded-circle profile-widget-picture fixed-profile-img"
                                        />
                                        <div className="profile-widget-items btn btn-primary d-flex justify-content-between">
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
                                </div>
                            </div>

                            <div className="col-12 col-md-12 col-lg-7">
                                <div className="card">
                                    <div className="card-header">
                                        <h4>Design Details</h4>
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        <div className="card-body">
                                            <h5 className="mb-4">Status</h5>
                                            <div className="row mb-4">
                                                <div className="col-md-6">
                                                    <select
                                                        className="form-control"
                                                        id="status"
                                                        value={tempStatus}
                                                        onChange={(e) => setTempStatus(e.target.value)}
                                                        disabled={data.status === 'REJECTED' || data.status === 'ACCEPTED'}
                                                    >
                                                        {getSelectableOptions().map((option) => (
                                                            <option key={option.value} value={option.value}>
                                                                {option.label}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="col-md-6 d-flex align-items-end">
                                                    <button className="btn btn-primary" type="submit">
                                                        Update Status
                                                    </button>
                                                </div>
                                            </div>

                                            <h5 className="mb-4">Basic Info</h5>
                                            <div className="row">
                                                <div className="form-group col-md-6 col-12">
                                                    <label>Username</label>
                                                    <p className="form-control-plaintext">{data.username}</p>
                                                </div>
                                                <div className="form-group col-md-6 col-12">
                                                    <label>Email</label>
                                                    <p className="form-control-plaintext">{data.email}</p>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="form-group col-md-6 col-12">
                                                    <label>Phone Number</label>
                                                    <p className="form-control-plaintext">{data.phoneNumber}</p>
                                                </div>
                                                <div className="form-group col-md-6 col-12">
                                                    <label>Address</label>
                                                    <p className="form-control-plaintext">{data.address}</p>
                                                </div>
                                            </div>

                                            <h5 className="mb-4">Experience & Projects</h5>
                                            <div className="row">
                                                <div className="form-group col-md-6 col-12">
                                                    <label>Experience</label>
                                                    <p className="form-control-plaintext">{data.experience}</p>
                                                </div>
                                                <div className="form-group col-md-6 col-12">
                                                    <label>Projects</label>
                                                    <p className="form-control-plaintext">{data.projects}</p>
                                                </div>
                                            </div>

                                            <h5 className="mb-4">Skills & Education</h5>
                                            <div className="row">
                                                <div className="form-group col-md-6 col-12">
                                                    <label>Skills</label>
                                                    <p className="form-control-plaintext">{data.skills}</p>
                                                </div>
                                                <div className="form-group col-md-6 col-12">
                                                    <label>Education</label>
                                                    <p className="form-control-plaintext">{data.education}</p>
                                                </div>
                                            </div>

                                            <h5 className="mb-4">Additional Info</h5>
                                            <div className="row">
                                                <div className="form-group col-md-6 col-12">
                                                    <label>Certification</label>
                                                    <p className="form-control-plaintext">{data.certification}</p>
                                                </div>
                                                <div className="form-group col-md-6 col-12">
                                                    <label>Created At</label>
                                                    <p className="form-control-plaintext">{formatDate(data.createdAt)}</p>
                                                </div>  
                                            </div>

                                            <h5 className="mb-4">Timestamps</h5>
                                            <div className="row">
                                                <div className="form-group col-md-6 col-12">
                                                    <label>Created At</label>
                                                    <p className="form-control-plaintext">{formatDate(data.createdAt)}</p>
                                                </div>
                                                <div className="form-group col-md-6 col-12">
                                                    <label>Update At</label>
                                                    <p className="form-control-plaintext">{formatDate(data.updateAt)}</p>
                                                </div>
                                            </div>
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

export default DesignDetail;
