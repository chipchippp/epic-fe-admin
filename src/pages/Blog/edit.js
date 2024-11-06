import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { editBlog, updateBlog } from '~/services/Inventory/blogService';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './CreateBlog.css';

const EditBlog = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [data, setData] = useState({});
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
                setData(blogData);
                setImagesOld(blogData.imageTitle ? [blogData.imageTitle] : []);
                setLoading(false);
            } catch (error) {
                toast.error('Failed to fetch blog details');
            }
        };

        fetchBlog();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
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
                ...data,
                userId: data.userId || (data.user && data.user.userId),
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

    const handleContentChange = (value) => {
        setData({ ...data, content: value });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    const modules = {
        toolbar: [
            [{ header: '1' }, { header: '2' }, { font: [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
            ['link', 'image'],
            [{ align: [] }, { color: [] }, { background: [] }],
            ['clean'],
        ],
    };

    const formats = [
        'header',
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
        'align',
        'color',
        'background',
    ];

    const imageUrl = imagesOld.length > 0 ? `http://localhost:8080/api/v1/blogs/blog/${imagesOld[0]}` : '';

    return (
        <div className="content-wrapper">
            <div className="col-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Edit Blog</h4>
                        <Link to="/blog" className="btn btn-primary mb-3">
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
                                    <label className="col-form-label text-md-right">Author</label>
                                    <input
                                        type="text"
                                        name="author"
                                        className="form-control"
                                        value={data.author}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-12">
                                    <label className="col-form-label text-md-right">Content</label>
                                    <ReactQuill
                                        value={data.content}
                                        onChange={handleContentChange}
                                        modules={modules}
                                        formats={formats}
                                        className="custom-quill"
                                        theme="snow"
                                    />
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
                                <div
                                    style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}
                                >
                                    <div>
                                        <h4>List of available blog:</h4>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                            {imagesOld.length > 0 ? (
                                                imagesOld.map((image, index) => (
                                                    <div key={index} style={{ position: 'relative' }}>
                                                        <img
                                                            src={image.imageTitle}
                                                            alt={image.imageName}
                                                            style={{
                                                                width: '100px',
                                                                height: '100px',
                                                                objectFit: 'cover',
                                                            }}
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
                                                            style={{
                                                                width: '100px',
                                                                height: '100px',
                                                                objectFit: 'cover',
                                                            }}
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
