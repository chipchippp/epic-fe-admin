function Order() {
    return (
      <>
      <div className="content-wrapper">
  <div className="row">
    <div className="col-lg-6 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Basic Table</h4>
          <p className="card-description">
            Add class <code>.table</code>
          </p>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Profile</th>
                  <th>VatNo.</th>
                  <th>Created</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Jacob</td>
                  <td>53275531</td>
                  <td>12 May 2017</td>
                  <td>
                    <label className="badge badge-danger">Pending</label>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div className="col-lg-6 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Hoverable Table</h4>
          <p className="card-description">
            Add class <code>.table-hover</code>
          </p>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Product</th>
                  <th>Sale</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Jacob</td>
                  <td>Photoshop</td>
                  <td className="text-danger">
                    28.76% <i className="ti-arrow-down" />
                  </td>
                  <td>
                    <label className="badge badge-danger">Pending</label>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div className="col-lg-12 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Striped Table</h4>
          <p className="card-description">
            Add class <code>.table-striped</code>
          </p>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>User</th>
                  <th>First name</th>
                  <th>Progress</th>
                  <th>Amount</th>
                  <th>Deadline</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-1">
                    <img src="../../images/faces/face4.jpg" alt="image" />
                  </td>
                  <td>Peter Meggik</td>
                  <td>
                    <div className="progress">
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: "50%" }}
                        aria-valuenow={50}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                  </td>
                  <td>$ 77.99</td>
                  <td>May 15, 2015</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
      </>
    );

}

export default Order;
