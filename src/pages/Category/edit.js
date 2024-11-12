import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { editCategory, updateCategory } from '~/services/Category/categoryService';
import axios from 'axios';

function EditCategory() {
    const { id } = useParams();
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await editCategory(id);
                setData({
                    categoryId: result.categoryId,
                    categoryName: result.categoryName,
                    description: result.description,
                    parentCategoryId: result.parentCategoryId || 0,
                });
            } catch (error) {
                toast.error('Failed to fetch category data');
                console.error('Fetch error:', error);
            }
        };
        fetchData();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await updateCategory(id, data);
            toast.success('Category updated successfully');
            navigate('/category');
        } catch (error) {
            toast.error('Failed to update category');
            console.error('Update error:', error);
        }
    };

    return (
        <>
            <div className="content-wrapper">
                <div className="col-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="font-weight-bold">Edit Category</h3>
                            <form className="forms-sample" onSubmit={handleSubmit}>
                                <div className="row mb-4">
                                    <div className="col-md-4">
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
                                    <div className="col-md-4">
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
                                    <div className="col-md-4">
                                        <label className="col-form-label text-md-right">ParentCategoryId</label>
                                        <select
                                            name="categoryId"
                                            className="form-control"
                                            value={data.parentCategoryId || ''}
                                            onChange={(e) =>
                                                setData({ ...data, parentCategoryId: e.target.value || null })
                                            }
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
                                </div>
                                <button type="submit" className="btn btn-primary mr-2">
                                    Save
                                </button>
                                <Link to="/category" className="btn btn-light">
                                    Back
                                </Link>
                            </form>
                        </div>
                    </div>
                    <ToastContainer />
                </div>
                <ToastContainer />
            </div>
            
        </>
    );
}

export default EditCategory;
