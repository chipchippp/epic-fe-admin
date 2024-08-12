function Product() {
    return (
      <>
         <div className="content-wrapper">
  <div className="row">
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
                    <img src="../../images/faces/face1.jpg" alt="image" />
                  </td>
                  <td>Herman Beck</td>
                  <td>
                    <div className="progress">
                      <div
                        className="progress-bar bg-success"
                        role="progressbar"
                        style={{ width: "25%" }}
                        aria-valuenow={25}
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

export default Product;
