import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { editCategory, updateCategory } from '~/services/Category/categoryService';

function EditCategory() {
    const { id } = useParams();
    const [data, setData] = useState({
        categoryId: '',
        categoryName: '',
        description: '',
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await editCategory(id);
                setData({
                    categoryId: result.categoryId,
                    categoryName: result.categoryName,
                    description: result.description,
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
                <div className="row">
                    <div className="col-md-12 grid-margin">
                        <div className="row">
                            <div className="col-12 col-xl-8 mb-4 mb-xl-0">
                                <h3 className="font-weight-bold">Edit Category</h3>
                                <Link to="/category" className="btn btn-primary mb-3">
                                    <i className="fas fa-plus"></i> Back
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Basic form elements</h4>
                            <p className="card-description">Edit the category details below</p>
                            <form className="forms-sample" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="exampleInputName1">Id</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="exampleInputName1"
                                        placeholder="Id"
                                        disabled
                                        value={data.categoryId}
                                        onChange={(e) => setData({ ...data, categoryId: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputName1">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="exampleInputName1"
                                        placeholder="Name"
                                        value={data.categoryName}
                                        onChange={(e) => setData({ ...data, categoryName: e.target.value })}
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
                                <button type="submit" className="btn btn-primary mr-2">
                                    Submit
                                </button>
                                <Link to="/category" className="btn btn-light">Back</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export default EditCategory;