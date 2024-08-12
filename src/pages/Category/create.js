import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function CreateCategory() {
 
  const [data, setData] = useState({
    categoryName: '',
    description: '',
  });

  const navigate = useNavigate();

  const handleCreate = async (event) => {
    event.preventDefault();

    await axios.post('http://localhost:8082/api/v1/categories', {
        categoryName: data.categoryName,
        description: data.description
    });
    try {
        toast.success('Product created successfully');
        navigate('/category');
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
      <h3 className="font-weight-bold">New Category</h3>
      <h6 className="font-weight-normal mb-0">
        All systems are running smoothly! You have
        <span className="text-primary">3 unread alerts!</span>
      </h6>
    </div>
  </div>
</div>
</div>
      <div className="col-12 grid-margin stretch-card">
<div className="card">
<div className="card-body">
<h4 className="card-title">Basic form elements</h4>
<p className="card-description">Basic form elements</p>
<form className="forms-sample" onSubmit={handleCreate}>
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
  <Link to="/category" className="btn btn-light"> Back </Link>
</form>
</div>
</div>
</div>
</div>
  </>
    );
}

export default CreateCategory;