import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom';
import { createImgDesign, getCategoryGallery } from '~/services/Designer/imgDesignerService';

const CreateImgDesign = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: '',
        tags: '',
        description: '',
        categoryGalleryId: '',
    });
    const [categoryGallery, setCategoryGallery] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    useEffect(() => {
        const fetchCategoryGallery = async () => {
            try {
                const response = await getCategoryGallery();
                setCategoryGallery(response.data.content || []);
            } catch (error) {
                toast.error('Failed to fetch CategoryGallery');
            }
        };

        fetchCategoryGallery();
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
            formData.append('imagesDesign', new Blob([JSON.stringify(data)], { type: 'application/json' }));
    
            if (selectedFiles.length > 0) {
                Array.from(selectedFiles).forEach((file) => formData.append('file', file));
            }
    
            await createImgDesign(formData);
    
            toast.success('ImgDesign created successfully');
            navigate('/img-designer');
        } catch (error) {
            
            toast.error(`Failed to create img-designer: ${error.message}`);
        }
    };

    return (
        <div className="content-wrapper">
            <div className="row">
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Create ImgDesign</h4>
                            <Link to="/img-designer" className="btn btn-primary mb-3">
                                <i className="fas fa-arrow-left"></i> Back
                            </Link>
                            <form onSubmit={handleSubmit}>
                                <div className="row mb-4">
                                    <div className="col-md-6">
                                        <label className="col-form-label text-md-right">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            className="form-control"
                                            value={data.name}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="col-form-label text-md-right">Tags</label>
                                        <input
                                            type="text"
                                            name="tags"
                                            className="form-control"
                                            value={data.tags}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-md-6">
                                        <label className="col-form-label text-md-right">Description</label>
                                        <input
                                            type="text"
                                            name="description"
                                            className="form-control"
                                            value={data.description}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="col-form-label text-md-right">CategoryGallery</label>
                                        <select
                                            name="categoryGalleryId"
                                            className="form-control"
                                            value={data.categoryGalleryId}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="" disabled>
                                                Select CategoryGallery
                                            </option>
                                            {categoryGallery.map((categoryGalleries) => (
                                                <option key={categoryGalleries.id} value={categoryGalleries.id}>
                                                    {categoryGalleries.name}
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

export default CreateImgDesign;
