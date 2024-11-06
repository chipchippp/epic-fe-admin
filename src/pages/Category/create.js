import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom';
import { createCategory } from '~/services/Category/categoryService';
import axios from 'axios';

function CreateCategory() {
    const [data, setData] = useState({
        categoryName: '',
        description: '',
        parentCategoryId: 0,
    });
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/categories/parentCategoryIsNull');
                setCategories(response.data.data.content);
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
            await createCategory(data);
            toast.success('Category created successfully');
            navigate('/category');
        } catch (error) {
            toast.error('Failed to create category');
        }
    };

    return (
        <>
            <div className="content-wrapper">
                <div className="col-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="font-weight-bold">New Category</h3>
                            <Link to="/category" className="btn btn-primary mb-3">
                                <i className="fas fa-arrow-left"></i> Back
                            </Link>
                            <form className="forms-sample" onSubmit={handleSubmit}>
                                <div className="row mb-4">
                                    <div className="col-md-6">
                                        <label className="col-form-label text-md-right">Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="exampleInputName1"
                                            placeholder="Name"
                                            value={data.categoryName}
                                            onChange={(e) => setData({ ...data, categoryName: e.target.value })}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="col-form-label text-md-right">Description</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="exampleInputCity1"
                                            placeholder="Description"
                                            value={data.description}
                                            onChange={(e) => setData({ ...data, description: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputCity1">ParentCategoryId</label>
                                    <select
                                        name="categoryId"
                                        className="form-control"
                                        value={data.parentCategoryId || ''}
                                        onChange={(e) => setData({ ...data, parentCategoryId: e.target.value || null })}
                                    >
                                        <option value="" disabled>
                                            Select Category
                                        </option>
                                        {categories.map((category) => (
                                            <option key={category.categoryId} value={category.categoryId}>
                                                {category.categoryName}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <button type="submit" className="btn btn-primary mr-2">
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateCategory;
