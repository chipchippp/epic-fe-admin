import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { editImgDesign, updateImgDesign, getCategoryGallery } from '~/services/Designer/imgDesignerService';

const EditImgDesign = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [categoryGalleryId, setCategoryGallery] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [imgDesign, setImgDesign] = useState({});
    const [imagesOld, setImagesOld] = useState([]);
    const [imagesNew, setImagesNew] = useState([]);
    useEffect(() => {
        const fetchImgDesign = async () => {
            try {
                const response = await editImgDesign(id);
                const imgDesignData = response.data;

                if (imgDesignData.user && imgDesignData.user.categoryGalleryId) {
                    imgDesignData.categoryGalleryId = imgDesignData.user.categoryGalleryId;
                }
                setImgDesign(imgDesignData);
                setImagesOld(imgDesignData.imageUrl ? [imgDesignData.imageUrl] : []);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setError('Failed to fetch imgDesign details');
            }
        };

        const fetchCategoryGallery = async () => {
            try {
                const response = await getCategoryGallery();
                setCategoryGallery(response.data.content || []);
            } catch (error) {
                toast('Failed to fetch CategoryGallery');
            }
        };

        fetchImgDesign();
        fetchCategoryGallery();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setImgDesign({ ...imgDesign, [name]: value });
    };

    const handleUserChange = (e) => {
        const categoryGalleryId = e.target.value;
        setImgDesign({ ...imgDesign, user: { ...imgDesign.user, categoryGalleryId } });
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
            const updatedImgDesign = {
                ...imgDesign,
                categoryGalleryId:
                    imgDesign.categoryGalleryId || (imgDesign.categoryGalleryId && imgDesign.categoryGalleryId),
            };

            const formData = new FormData();
            formData.append('imagesDesign', new Blob([JSON.stringify(updatedImgDesign)], { type: 'application/json' }));

            if (selectedFiles.length > 0) {
                selectedFiles.forEach((file) => formData.append('file', file));
            }
            await updateImgDesign(id, formData);
            navigate('/img-designer');
        } catch (error) {
            toast('Failed to update imgDesign');
        }
    };
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const imageUrl =
        imagesOld.length > 0 ? `http://localhost:8080/api/v1/images_design/imagesDesign/${imagesOld[0]}` : '';

    return (
        <div className="content-wrapper">
            <div className="row">
                <div className="col-md-12 grid-margin">
                    <h2 className="font-weight-bold">{imgDesign.name}</h2>
                    <Link to="/img-designer" className="btn btn-primary mb-3">
                        <i className="fas fa-arrow-left"></i> Back
                    </Link>
                </div>
            </div>
            <div className="col-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Edit ImgDesign</h4>
                        <form onSubmit={handleSubmit}>
                            <div className="row mb-4">
                                <div className="col-md-6">
                                    <label className="col-form-label text-md-right">Title</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        value={imgDesign.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="col-form-label text-md-right">Content</label>
                                    <input
                                        type="text"
                                        name="tags"
                                        className="form-control"
                                        value={imgDesign.tags}
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
                                        name="description"
                                        className="form-control"
                                        value={imgDesign.description}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="col-form-label text-md-right">Category GalleryId</label>
                                    <select
                                        name="categoryGalleryId"
                                        className="form-control"
                                        value={imgDesign.categoryGalleryId}
                                        onChange={handleUserChange}
                                        required
                                    >
                                        <option value="" disabled>
                                            Select User
                                        </option>
                                        {categoryGalleryId.map((categoryGalleries) => (
                                            <option key={categoryGalleries.id} value={categoryGalleries.id}>
                                                {categoryGalleries.name}
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
                                <div
                                    style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}
                                >
                                    <div>
                                        <h4>List of available imgDesigns:</h4>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                            {imagesOld.length > 0 ? (
                                                imagesOld.map((image, index) => (
                                                    <div key={index} style={{ position: 'relative' }}>
                                                        <img
                                                            src={imageUrl}
                                                            alt={image.imageTitle}
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
                            <Link to="/img-designer" className="btn btn-light">
                                Back
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditImgDesign;
