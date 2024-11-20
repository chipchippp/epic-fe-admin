import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom';
import { createBlog } from '~/services/Inventory/blogService';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './CreateBlog.css';

const CreateBlog = () => {
    const navigate = useNavigate();
    const [blog, setBlog] = useState({
        title: '',
        content: '',
        author: '',
        userId: 1,
    });
    const [selectedFile, setSelectedFile] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBlog({ ...blog, [name]: value });
    };

    const handleContentChange = (value) => {
        setBlog({ ...blog, content: value });
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('blog', new Blob([JSON.stringify(blog)], { type: 'application/json' }));

            if (selectedFile) {
                formData.append('file', selectedFile);
            }

            await createBlog(formData);

            toast.success('Blog created successfully');
            navigate('/blog');
        } catch (error) {
            toast.error(`Failed to create Blog: ${error.message}`);
        }
    };

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

    return (
        <div className="content-wrapper">
            <div className="row">
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Create Blog</h4>
                            <Link to="/blog" className="btn btn-primary mb-3">
                                <i className="fas fa-arrow-left"></i> Back
                            </Link>
                            <form onSubmit={handleSubmit}>
                                <div className="row mb-4">
                                    <div className="col-md-4">
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
                                    <div className="col-md-4">
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
                                    <div className="col-md-4">
                                        <label className="col-form-label text-md-right">Image</label>
                                        <input
                                            type="file"
                                            name="image"
                                            className="form-control"
                                            onChange={handleFileChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-md-12">
                                        <label className="col-form-label text-md-right">Content</label>
                                        <ReactQuill
                                            value={blog.content}
                                            onChange={handleContentChange}
                                            modules={modules}
                                            formats={formats}
                                            className="custom-quill"
                                            theme="snow"
                                        />
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary mr-2">
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
            {/* <ToastContainer /> */}
        </div>
    );
};

export default CreateBlog;
