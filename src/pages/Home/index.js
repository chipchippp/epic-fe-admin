import BarChart from './barChart';



function HomeAdmin() {
  return (
    <>
  <div className="content-wrapper">
    <div className="row">
      <div className="col-md-12 grid-margin">
        <div className="row">
          <div className="col-12 col-xl-8 mb-4 mb-xl-0">
            <h3 className="font-weight-bold">Welcome Aamir</h3>
            <h6 className="font-weight-normal mb-0">
              All systems are running smoothly! You have
              <span className="text-primary">3 unread alerts!</span>
            </h6>
          </div>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-md-6 grid-margin stretch-card">
        <div className="card tale-bg">
          <div className="card-people mt-auto">
            <img src="/src/assets/images/dashboard/people.svg" alt="people" />
            <div className="weather-info">
              <div className="d-flex">
                <div>
                  <h2 className="mb-0 font-weight-normal">
                    <i className="icon-sun mr-2" />
                    31<sup>C</sup>
                  </h2>
                </div>
                <div className="ml-2">
                  <h4 className="location font-weight-normal">Bangalore</h4>
                  <h6 className="font-weight-normal">India</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-6 grid-margin transparent">
        <div className="row">
          <div className="col-md-6 mb-4 stretch-card transparent">
            <div className="card card-tale">
              <div className="card-body">
                <p className="mb-4">Today’s Bookings</p>
                <p className="fs-30 mb-2">4006</p>
                <p>10.00% (30 days)</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4 stretch-card transparent">
            <div className="card card-dark-blue">
              <div className="card-body">
                <p className="mb-4">Total Bookings</p>
                <p className="fs-30 mb-2">61344</p>
                <p>22.00% (30 days)</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-4 mb-lg-0 stretch-card transparent">
            <div className="card card-light-blue">
              <div className="card-body">
                <p className="mb-4">Number of Meetings</p>
                <p className="fs-30 mb-2">34040</p>
                <p>2.00% (30 days)</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 stretch-card transparent">
            <div className="card card-light-danger">
              <div className="card-body">
                <p className="mb-4">Number of Clients</p>
                <p className="fs-30 mb-2">47033</p>
                <p>0.22% (30 days)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* <div className="row">
      <BarChart />
    </div> */}
    <div className="row">
      <div className="col-md-12 grid-margin stretch-card">
        <div className="card position-relative">
          <div className="card-body">
            <div
              id="detailedReports"
              className="carousel slide detailed-report-carousel position-static pt-2"
              data-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <div className="row">
                    <div className="col-md-12 col-xl-3 d-flex flex-column justify-content-start">
                      <div className="ml-xl-4 mt-3">
                        <p className="card-title">Detailed Reports</p>
                        <h1 className="text-primary">$34040</h1>
                        <h3 className="font-weight-500 mb-xl-4 text-primary">
                          North America
                        </h3>
                        <p className="mb-2 mb-xl-0">
                          The total number of sessions within the date range. It
                          is the period time a user is actively engaged with
                          your website, page or app, etc
                        </p>
                      </div>
                    </div>
                    <div className="col-md-12 col-xl-9">
                      <div className="row">
                        <div className="col-md-6 border-right">
                          <div className="table-responsive mb-3 mb-md-0 mt-3">
                            <table className="table table-borderless report-table">
                              <tbody>
                                <tr>
                                  <td className="text-muted">Illinois</td>
                                  <td className="w-100 px-0">
                                    <div className="progress progress-md mx-4">
                                      <div
                                        className="progress-bar bg-primary"
                                        role="progressbar"
                                        style={{ width: "70%" }}
                                        aria-valuenow={70}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                      />
                                    </div>
                                  </td>
                                  <td>
                                    <h5 className="font-weight-bold mb-0">
                                      713
                                    </h5>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="text-muted">Washington</td>
                                  <td className="w-100 px-0">
                                    <div className="progress progress-md mx-4">
                                      <div
                                        className="progress-bar bg-warning"
                                        role="progressbar"
                                        style={{ width: "30%" }}
                                        aria-valuenow={30}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                      />
                                    </div>
                                  </td>
                                  <td>
                                    <h5 className="font-weight-bold mb-0">
                                      583
                                    </h5>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="text-muted">Mississippi</td>
                                  <td className="w-100 px-0">
                                    <div className="progress progress-md mx-4">
                                      <div
                                        className="progress-bar bg-danger"
                                        role="progressbar"
                                        style={{ width: "95%" }}
                                        aria-valuenow={95}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                      />
                                    </div>
                                  </td>
                                  <td>
                                    <h5 className="font-weight-bold mb-0">
                                      924
                                    </h5>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="text-muted">California</td>
                                  <td className="w-100 px-0">
                                    <div className="progress progress-md mx-4">
                                      <div
                                        className="progress-bar bg-info"
                                        role="progressbar"
                                        style={{ width: "60%" }}
                                        aria-valuenow={60}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                      />
                                    </div>
                                  </td>
                                  <td>
                                    <h5 className="font-weight-bold mb-0">
                                      664
                                    </h5>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="text-muted">Maryland</td>
                                  <td className="w-100 px-0">
                                    <div className="progress progress-md mx-4">
                                      <div
                                        className="progress-bar bg-primary"
                                        role="progressbar"
                                        style={{ width: "40%" }}
                                        aria-valuenow={40}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                      />
                                    </div>
                                  </td>
                                  <td>
                                    <h5 className="font-weight-bold mb-0">
                                      560
                                    </h5>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="text-muted">Alaska</td>
                                  <td className="w-100 px-0">
                                    <div className="progress progress-md mx-4">
                                      <div
                                        className="progress-bar bg-danger"
                                        role="progressbar"
                                        style={{ width: "75%" }}
                                        aria-valuenow={75}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                      />
                                    </div>
                                  </td>
                                  <td>
                                    <h5 className="font-weight-bold mb-0">
                                      793
                                    </h5>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <div className="col-md-6 mt-3">
                          <canvas id="north-america-chart" />
                          <div id="north-america-legend" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="row">
                    <div className="col-md-12 col-xl-3 d-flex flex-column justify-content-start">
                      <div className="ml-xl-4 mt-3">
                        <p className="card-title">Detailed Reports</p>
                        <h1 className="text-primary">$34040</h1>
                        <h3 className="font-weight-500 mb-xl-4 text-primary">
                          North America
                        </h3>
                        <p className="mb-2 mb-xl-0">
                          The total number of sessions within the date range. It
                          is the period time a user is actively engaged with
                          your website, page or app, etc
                        </p>
                      </div>
                    </div>
                    <div className="col-md-12 col-xl-9">
                      <div className="row">
                        <div className="col-md-6 border-right">
                          <div className="table-responsive mb-3 mb-md-0 mt-3">
                            <table className="table table-borderless report-table">
                              <tbody>
                                <tr>
                                  <td className="text-muted">Illinois</td>
                                  <td className="w-100 px-0">
                                    <div className="progress progress-md mx-4">
                                      <div
                                        className="progress-bar bg-primary"
                                        role="progressbar"
                                        style={{ width: "70%" }}
                                        aria-valuenow={70}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                      />
                                    </div>
                                  </td>
                                  <td>
                                    <h5 className="font-weight-bold mb-0">
                                      713
                                    </h5>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="text-muted">Washington</td>
                                  <td className="w-100 px-0">
                                    <div className="progress progress-md mx-4">
                                      <div
                                        className="progress-bar bg-warning"
                                        role="progressbar"
                                        style={{ width: "30%" }}
                                        aria-valuenow={30}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                      />
                                    </div>
                                  </td>
                                  <td>
                                    <h5 className="font-weight-bold mb-0">
                                      583
                                    </h5>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="text-muted">Mississippi</td>
                                  <td className="w-100 px-0">
                                    <div className="progress progress-md mx-4">
                                      <div
                                        className="progress-bar bg-danger"
                                        role="progressbar"
                                        style={{ width: "95%" }}
                                        aria-valuenow={95}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                      />
                                    </div>
                                  </td>
                                  <td>
                                    <h5 className="font-weight-bold mb-0">
                                      924
                                    </h5>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="text-muted">California</td>
                                  <td className="w-100 px-0">
                                    <div className="progress progress-md mx-4">
                                      <div
                                        className="progress-bar bg-info"
                                        role="progressbar"
                                        style={{ width: "60%" }}
                                        aria-valuenow={60}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                      />
                                    </div>
                                  </td>
                                  <td>
                                    <h5 className="font-weight-bold mb-0">
                                      664
                                    </h5>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="text-muted">Maryland</td>
                                  <td className="w-100 px-0">
                                    <div className="progress progress-md mx-4">
                                      <div
                                        className="progress-bar bg-primary"
                                        role="progressbar"
                                        style={{ width: "40%" }}
                                        aria-valuenow={40}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                      />
                                    </div>
                                  </td>
                                  <td>
                                    <h5 className="font-weight-bold mb-0">
                                      560
                                    </h5>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="text-muted">Alaska</td>
                                  <td className="w-100 px-0">
                                    <div className="progress progress-md mx-4">
                                      <div
                                        className="progress-bar bg-danger"
                                        role="progressbar"
                                        style={{ width: "75%" }}
                                        aria-valuenow={75}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                      />
                                    </div>
                                  </td>
                                  <td>
                                    <h5 className="font-weight-bold mb-0">
                                      793
                                    </h5>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <div className="col-md-6 mt-3">
                          <canvas id="south-america-chart" />
                          <div id="south-america-legend" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <a
                className="carousel-control-prev"
                href="#detailedReports"
                role="button"
                data-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                />
                <span className="sr-only">Previous</span>
              </a>
              <a
                className="carousel-control-next"
                href="#detailedReports"
                role="button"
                data-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                />
                <span className="sr-only">Next</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-md-7 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <p className="card-title mb-0">Top Products</p>
            <div className="table-responsive">
              <table className="table table-striped table-borderless">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Search Engine Marketing</td>
                    <td className="font-weight-bold">$362</td>
                    <td>21 Sep 2018</td>
                    <td className="font-weight-medium">
                      <div className="badge badge-success">Completed</div>
                    </td>
                  </tr>
                  <tr>
                    <td>Search Engine Optimization</td>
                    <td className="font-weight-bold">$116</td>
                    <td>13 Jun 2018</td>
                    <td className="font-weight-medium">
                      <div className="badge badge-success">Completed</div>
                    </td>
                  </tr>
                  <tr>
                    <td>Display Advertising</td>
                    <td className="font-weight-bold">$551</td>
                    <td>28 Sep 2018</td>
                    <td className="font-weight-medium">
                      <div className="badge badge-warning">Pending</div>
                    </td>
                  </tr>
                  <tr>
                    <td>Pay Per Click Advertising</td>
                    <td className="font-weight-bold">$523</td>
                    <td>30 Jun 2018</td>
                    <td className="font-weight-medium">
                      <div className="badge badge-warning">Pending</div>
                    </td>
                  </tr>
                  <tr>
                    <td>E-Mail Marketing</td>
                    <td className="font-weight-bold">$781</td>
                    <td>01 Nov 2018</td>
                    <td className="font-weight-medium">
                      <div className="badge badge-danger">Cancelled</div>
                    </td>
                  </tr>
                  <tr>
                    <td>Referral Marketing</td>
                    <td className="font-weight-bold">$283</td>
                    <td>20 Mar 2018</td>
                    <td className="font-weight-medium">
                      <div className="badge badge-warning">Pending</div>
                    </td>
                  </tr>
                  <tr>
                    <td>Social media marketing</td>
                    <td className="font-weight-bold">$897</td>
                    <td>26 Oct 2018</td>
                    <td className="font-weight-medium">
                      <div className="badge badge-success">Completed</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-5 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">To Do Lists</h4>
            <div className="list-wrapper pt-2">
              <ul className="d-flex flex-column-reverse todo-list todo-list-custom">
                <li>
                  <div className="form-check form-check-flat">
                    <label className="form-check-label">
                      <input className="checkbox" type="checkbox" />
                      Meeting with Urban Team
                    </label>
                  </div>
                  <i className="remove ti-close" />
                </li>
                <li className="completed">
                  <div className="form-check form-check-flat">
                    <label className="form-check-label">
                      <input
                        className="checkbox"
                        type="checkbox"
                        defaultChecked=""
                      />
                      Duplicate a project for new customer
                    </label>
                  </div>
                  <i className="remove ti-close" />
                </li>
                <li>
                  <div className="form-check form-check-flat">
                    <label className="form-check-label">
                      <input className="checkbox" type="checkbox" />
                      Project meeting with CEO
                    </label>
                  </div>
                  <i className="remove ti-close" />
                </li>
                <li className="completed">
                  <div className="form-check form-check-flat">
                    <label className="form-check-label">
                      <input
                        className="checkbox"
                        type="checkbox"
                        defaultChecked=""
                      />
                      Follow up of team zilla
                    </label>
                  </div>
                  <i className="remove ti-close" />
                </li>
                <li>
                  <div className="form-check form-check-flat">
                    <label className="form-check-label">
                      <input className="checkbox" type="checkbox" />
                      Level up for Antony
                    </label>
                  </div>
                  <i className="remove ti-close" />
                </li>
              </ul>
            </div>
            <div className="add-items d-flex mb-0 mt-2">
              <input
                type="text"
                className="form-control todo-list-input"
                placeholder="Add new task"
              />
              <button className="add btn btn-icon text-primary todo-list-add-btn bg-transparent">
                <i className="icon-circle-plus" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-md-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <p className="card-title">Advanced Table</p>
            <div className="row">
              <div className="col-12">
                <div className="table-responsive">
                  <table
                    id="example"
                    className="display expandable-table"
                    style={{ width: "100%" }}
                  >
                    <thead>
                      <tr>
                        <th>Quote#</th>
                        <th>Product</th>
                        <th>Business type</th>
                        <th>Policy holder</th>
                        <th>Premium</th>
                        <th>Status</th>
                        <th>Updated at</th>
                        <th />
                      </tr>
                    </thead>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* content-wrapper ends */}

    </>
  );
}
export default HomeAdmin;
