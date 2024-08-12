function CreateCategory() {
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
<form className="forms-sample">
  <div className="form-group">
    <label htmlFor="exampleInputName1">Name</label>
    <input
      type="text"
      className="form-control"
      id="exampleInputName1"
      placeholder="Name"
    />
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputCity1">Description</label>
    <input
      type="text"
      className="form-control"
      id="exampleInputCity1"
      placeholder="Location"
    />
  </div>
  <button type="submit" className="btn btn-primary mr-2">
    Submit
  </button>
  <button className="btn btn-light">Cancel</button>
</form>
</div>
</div>
</div>
</div>
  </>
    );
}

export default CreateCategory;