import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom';
import { createRoom, getUsers } from '~/services/User/roomService';

const CreateRoom = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        room_length: '',
        room_width: '',
        color: '',
        userId: '',
        appointmentId: '',
    });
    const [users, setUsers] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getUsers();
                setUsers(response.data.content || []);
            } catch (error) {
                toast.error('Failed to fetch Users');
            }
        };

        fetchUsers();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };
    
    
    const handleFileChange = (e) => {
        setSelectedFiles(e.target.files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('blog', new Blob([JSON.stringify(data)], { type: 'application/json' }));
    
            if (selectedFiles.length > 0) {
                Array.from(selectedFiles).forEach((file) => formData.append('file', file));
            }
    
            await createRoom(formData);
    
            toast.success('Room created successfully');
            navigate('/Room');
        } catch (error) {
            toast.error(`Failed to create Room: ${error.message}`);
            console.error('Error creating Room:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="content-wrapper">
            <div className="row">
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Create Blog</h4>
                            <Link to="/Blog" className="btn btn-primary mb-3">
                                <i className="fas fa-arrow-left"></i> Back
                            </Link>
                            <form onSubmit={handleSubmit}>
                                <div className="row mb-4">
                                    <div className="col-md-6">
                                        <label className="col-form-label text-md-right">Title</label>
                                        <input
                                            type="text"
                                            name="title"
                                            className="form-control"
                                            value={data.title}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="col-form-label text-md-right">Content</label>
                                        <input
                                            type="text"
                                            name="content"
                                            className="form-control"
                                            value={data.content}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-md-6">
                                        <label className="col-form-label text-md-right">Author</label>
                                        <input
                                            type="text"
                                            name="color"
                                            className="form-control"
                                            value={data.color}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="col-form-label text-md-right">Users</label>
                                        <select
                                            name="userId"
                                            className="form-control"
                                            value={data.userId}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="" disabled>
                                                Select UserId
                                            </option>
                                            {users.map((user) => (
                                                <option key={user.id} value={user.id}>
                                                    {user.username}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Images</label>
                                    <input
                                        type="file"
                                        name="images"
                                        className="form-control"
                                        multiple
                                        onChange={handleFileChange}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">
                                    Create
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateRoom;