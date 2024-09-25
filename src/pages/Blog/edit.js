import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { editBlog, updateBlog } from '~/services/Inventory/blogService';
import { getUsers } from '~/services/User/userService';

const EditBlog = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [blog, setBlog] = useState({});
    const [imagesOld, setImagesOld] = useState([]);
    const [imagesNew, setImagesNew] = useState([]);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await editBlog(id);
                const blogData = response.data;
        
                if (blogData.user && blogData.user.userId) {
                    blogData.userId = blogData.user.userId;
                }
                setBlog(blogData);
                setImagesOld(blogData.imageTitle ? [blogData.imageTitle] : []);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch blog details');
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
    
        fetchBlog();
        fetchUsers();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBlog({ ...blog, [name]: value });
    };

    const handleUserChange = (e) => {
        const userId = e.target.value;
        setBlog({ ...blog, user: { ...blog.user, userId } });
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
            const updatedBlog = {
                ...blog,
                userId: blog.userId || (blog.user && blog.user.userId),
            };
    
            const formData = new FormData();
            formData.append('blog', new Blob([JSON.stringify(updatedBlog)], { type: 'application/json' }));
    
            if (selectedFiles.length > 0) {
                selectedFiles.forEach((file) => formData.append('file', file));
            }
    
            await updateBlog(id, formData);
            navigate('/blog');
        } catch (error) {
            toast('Failed to update blog');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const imageUrl = imagesOld.length > 0 ? `https://techwiz5-inventory-service-ekb0h0d4c9gyfpby.eastasia-01.azurewebsites.net/api/v1/blogs/blog/${imagesOld[0]}` : '';

    return (
        <div className="content-wrapper">
            <div className="row">
                <div className="col-md-12 grid-margin">
                    <h2 className="font-weight-bold">{blog.title}</h2>
                <Link to="/blog" className="btn btn-primary mb-3">
                    <i className="fas fa-arrow-left"></i> Back
                </Link>
                </div>
            </div>
            <div className="col-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Edit Blog</h4>
                        <form onSubmit={handleSubmit}>
                            <div className="row mb-4">
                                <div className="col-md-6">
                                    <label className="col-form-label text-md-right">Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        className="form-control"
                                        value={blog.title}
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
                                        value={blog.content}
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
                                        name="author"
                                        className="form-control"
                                        value={blog.author}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="col-form-label text-md-right">Users</label>
                                    <select
                                        name="userId"
                                        className="form-control"
                                        value={blog.userId}
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
                                <h4>List of available blogs:</h4>
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
                            <Link to="/blog" className="btn btn-light">
                                Back
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditBlog;