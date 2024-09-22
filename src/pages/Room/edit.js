import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { editRoom, updateRoom, getUsers } from '~/services/User/roomService';

const EditRoom = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [users, setUsers] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [data, setRoom] = useState({});
    const [imagesOld, setImagesOld] = useState([]);
    const [imagesNew, setImagesNew] = useState([]);

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const response = await editRoom(id);
                const roomData = response.data;
        
                if (roomData.user && roomData.user.userId) {
                    roomData.userId = roomData.user.userId;
                }
                setRoom(roomData);
                setImagesOld(roomData.imageTitle ? [roomData.imageTitle] : []);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch room details');
            }
        };
    
        const fetchUsers = async () => {
            try {
                const response = await getUsers();
                setUsers(response.data.content || []);
            } catch (error) {
                toast('Failed to fetch Users');
            }
        };
    
        fetchRoom();
        fetchUsers();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRoom({ ...data, [name]: value });
    };

    const handleUserChange = (e) => {
        const userId = e.target.value;
        setRoom({ ...data, user: { ...data.user, userId } });
    };

    const handleAppointmentChange = (e) => {
        const userId = e.target.value;
        setRoom({ ...data, user: { ...data.user, userId } });
    };

    const handleFileChange = (e) => {
        const filesArray = Array.from(e.target.files);
        setImagesNew([]);
        
        filesArray.forEach((file) => {
            const reader = new FileReader();
            reader.onload = (x) => {
                setImagesNew((prevImages) => [
                    ...prevImages,
                    {
                        imageId: null,
                        imageName: file.name,
                        imageSrc: x.target.result,
                    },
                ]);
            };
            reader.readAsDataURL(file);
        });

        setSelectedFiles(filesArray);
    };

    const handleRemoveOldImage = (e, index) => {
        e.preventDefault();
        setImagesOld((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedRoom = {
                ...data,
                userId: data.userId || (data.user && data.user.userId),
            };
    
            const formData = new FormData();
            formData.append('room', new Blob([JSON.stringify(updatedRoom)], { type: 'application/json' }));
    
            if (selectedFiles.length > 0) {
                selectedFiles.forEach((file) => formData.append('file', file));
            }
    
            await updateRoom(id, formData);
            navigate('/room');
        } catch (error) {
            toast('Failed to update room');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const imageUrl = imagesOld.length > 0 ? `http://localhost:8080/api/v1/rooms/room/${imagesOld[0]}` : '';

    return (
        <div className="content-wrapper">
            <div className="row">
                <div className="col-md-12 grid-margin">
                    <h2 className="font-weight-bold">{data.title}</h2>
                <Link to="/room" className="btn btn-primary mb-3">
                    <i className="fas fa-arrow-left"></i> Back
                </Link>
                </div>
            </div>
            <div className="col-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Create Room</h4>
                        <form onSubmit={handleSubmit}>
                            <div className="row mb-4">
                                <div className="col-md-6">
                                    <label className="col-form-label text-md-right">Title</label>
                                    <input
                                        type="text"
                                        name="room_length"
                                        className="form-control"
                                        value={data.room_length}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="col-form-label text-md-right">Content</label>
                                    <input
                                        type="text"
                                        name="room_width"
                                        className="form-control"
                                        value={data.room_width}
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
                                        name="white"
                                        className="form-control"
                                        value={data.white}
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
                                        onChange={handleUserChange}
                                        required
                                    >
                                        <option value="" disabled>
                                            Select User
                                        </option>
                                        {users.map((user) => (
                                            <option key={user.id} value={user.id}>
                                                {user.username}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label className="col-form-label text-md-right">Users</label>
                                    <select
                                        name="appointmentId"
                                        className="form-control"
                                        value={data.appointmentId}
                                        onChange={handleAppointmentChange}
                                        required
                                    >
                                        <option value="" disabled>
                                            Select appointments
                                        </option>
                                        {appointments.map((appointment) => (
                                            <option key={appointment.id} value={appointment.id}>
                                                {appointment.username}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="row mb-4">
                                <div className="col-md-6">
                                    <label className="col-form-label text-md-right">Images</label>
                                    <input
                                      type="file"
                                      name="images"
                                      className="form-control"
                                      multiple
                                      onChange={handleFileChange}
                                    />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
                            <div>
                                <h4>List of available rooms:</h4>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                    {imagesOld.length > 0 ? (
                                        imagesOld.map((image, index) => (
                                            <div key={index} style={{ position: 'relative' }}>
                                                <img
                                                    src={imageUrl}
                                                    alt={image.imageTitle}
                                                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                                />
                                                <button
                                                    onClick={(e) => handleRemoveOldImage(e, index)}
                                                    style={{
                                                        position: 'absolute',
                                                        top: '5px',
                                                        right: '5px',
                                                        background: 'red',
                                                        color: 'white',
                                                        border: 'none',
                                                        cursor: 'pointer',
                                                        padding: '2px 5px',
                                                    }}
                                                >
                                                    X
                                                </button>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No Images</p>
                                    )}
                                </div>
                            </div>
                            <div>
                                <h4>Preview new images:</h4>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                    {imagesNew.length > 0 ? (
                                        imagesNew.map((image, index) => (
                                            <div key={index}>
                                                <img
                                                    src={image.imageSrc}
                                                    alt={image.imageName}
                                                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                                />
                                            </div>
                                        ))
                                    ) : (
                                        <p>No Images</p>
                                    )}
                                </div>
                            </div>
                            </div>
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Save
                            </button>
                            <Link to="/room" className="btn btn-light">
                                Back
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditRoom;