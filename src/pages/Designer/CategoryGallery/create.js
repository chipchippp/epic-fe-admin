import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { createCategoryGallery } from '~/services/Designer/categoryGallery';

function CreateCategory() {
    const [data, setData] = useState({
        name: '',
        description: '',
        parentCategoryGalleryId: 0
    });
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/categories/parentCategoryIsNull');
                setCategories(response.data.data);
            } catch (error) {
                toast.error('Failed to fetch categories');
                console.error('Fetch error:', error);
            }
        };
    
        fetchCategories();
    }, []);
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await createCategoryGallery(data);
            toast.success('Category created successfully');
            navigate('/category-gallery');
        } catch (error) {
            toast.error('Failed to create category');
        }
    };
    
    return (
        <>
            <div className="content-wrapper">
                <div className="row">
                    <div className="col-md-12 grid-margin">
                        <div className="row">
                            <div className="col-12 col-xl-8 mb-4 mb-xl-0">
                                <h3 className="font-weight-bold">New Category Gallery</h3>
                                <Link to="/category-gallery" className="btn btn-primary mb-3">
                                 <i className="fas fa-arrow-left"></i> Back
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Category Gallery</h4>
                            <form className="forms-sample" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="exampleInputName1">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="exampleInputName1"
                                        placeholder="Name"
                                        value={data.name}
                                        onChange={(e) => setData({ ...data, name: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputCity1">Description</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="exampleInputCity1"
                                        placeholder="Description"
                                        value={data.description}
                                        onChange={(e) => setData({ ...data, description: e.target.value })}
                                    />
                                </div>
                                {/* <div className="form-group">
    <label htmlFor="exampleInputCity1">ParentCategoryId</label>
    <select
        name="categoryId"
        className="form-control"
        value={data.parentCategoryGalleryId || ''}
        onChange={(e) => setData({ ...data, parentCategoryGalleryId: e.target.value || null })}
    >
        <option value="" disabled>Select Category</option>
        {categories.map((category) => (
            <option key={category.categoryId} value={category.categoryId}>
                {category.name}
            </option>
        ))}
    </select>
                                </div> */}

                                <button type="submit" className="btn btn-primary mr-2">
                                    Submit
                                </button>
                                <Link to="/category-gallery" className="btn btn-light"> Back </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateCategory;