function HomeAdmin() {
  return (
    <>
    <div className="container-fluid">
  {/*Start Dashboard Content*/}
  <div className="card mt-3">
    <div className="card-content">
      <div className="row row-group m-0">
        <div className="col-12 col-lg-6 col-xl-3 border-light">
          <div className="card-body">
            <h5 className="text-white mb-0">
              9526{" "}
              <span className="float-right">
                <i className="fa fa-shopping-cart" />
              </span>
            </h5>
            <div className="progress my-3" style={{ height: 3 }}>
              <div className="progress-bar" style={{ width: "55%" }} />
            </div>
            <p className="mb-0 text-white small-font">
              Total Orders{" "}
              <span className="float-right">
                +4.2% <i className="zmdi zmdi-long-arrow-up" />
              </span>
            </p>
          </div>
        </div>
        <div className="col-12 col-lg-6 col-xl-3 border-light">
          <div className="card-body">
            <h5 className="text-white mb-0">
              8323{" "}
              <span className="float-right">
                <i className="fa fa-usd" />
              </span>
            </h5>
            <div className="progress my-3" style={{ height: 3 }}>
              <div className="progress-bar" style={{ width: "55%" }} />
            </div>
            <p className="mb-0 text-white small-font">
              Total Revenue{" "}
              <span className="float-right">
                +1.2% <i className="zmdi zmdi-long-arrow-up" />
              </span>
            </p>
          </div>
        </div>
        <div className="col-12 col-lg-6 col-xl-3 border-light">
          <div className="card-body">
            <h5 className="text-white mb-0">
              6200{" "}
              <span className="float-right">
                <i className="fa fa-eye" />
              </span>
            </h5>
            <div className="progress my-3" style={{ height: 3 }}>
              <div className="progress-bar" style={{ width: "55%" }} />
            </div>
            <p className="mb-0 text-white small-font">
              Visitors{" "}
              <span className="float-right">
                +5.2% <i className="zmdi zmdi-long-arrow-up" />
              </span>
            </p>
          </div>
        </div>
        <div className="col-12 col-lg-6 col-xl-3 border-light">
          <div className="card-body">
            <h5 className="text-white mb-0">
              5630{" "}
              <span className="float-right">
                <i className="fa fa-envira" />
              </span>
            </h5>
            <div className="progress my-3" style={{ height: 3 }}>
              <div className="progress-bar" style={{ width: "55%" }} />
            </div>
            <p className="mb-0 text-white small-font">
              Messages{" "}
              <span className="float-right">
                +2.2% <i className="zmdi zmdi-long-arrow-up" />
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="row">
    <div className="col-12 col-lg-12">
      <div className="card">
        <div className="card-header">
          Recent Order Tables
          <div className="card-action">
            <div className="dropdown">
              <a
                href="javascript:void();"
                className="dropdown-toggle dropdown-toggle-nocaret"
                data-toggle="dropdown"
              >
                <i className="icon-options" />
              </a>
              <div className="dropdown-menu dropdown-menu-right">
                <a className="dropdown-item" href="javascript:void();">
                  Action
                </a>
                <a className="dropdown-item" href="javascript:void();">
                  Another action
                </a>
                <a className="dropdown-item" href="javascript:void();">
                  Something else here
                </a>
                <div className="dropdown-divider" />
                <a className="dropdown-item" href="javascript:void();">
                  Separated link
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table align-items-center table-flush table-borderless">
            <thead>
              <tr>
                <th>Product</th>
                <th>Photo</th>
                <th>Product ID</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Shipping</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Iphone 5</td>
                <td>
                  <img
                    src="https://via.placeholder.com/110x110"
                    className="product-img"
                    alt="product img"
                  />
                </td>
                <td>#9405822</td>
                <td>$ 1250.00</td>
                <td>03 Aug 2017</td>
                <td>
                  <div className="progress shadow" style={{ height: 3 }}>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: "90%" }}
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>Earphone GL</td>
                <td>
                  <img
                    src="https://via.placeholder.com/110x110"
                    className="product-img"
                    alt="product img"
                  />
                </td>
                <td>#9405820</td>
                <td>$ 1500.00</td>
                <td>03 Aug 2017</td>
                <td>
                  <div className="progress shadow" style={{ height: 3 }}>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: "60%" }}
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>HD Hand Camera</td>
                <td>
                  <img
                    src="https://via.placeholder.com/110x110"
                    className="product-img"
                    alt="product img"
                  />
                </td>
                <td>#9405830</td>
                <td>$ 1400.00</td>
                <td>03 Aug 2017</td>
                <td>
                  <div className="progress shadow" style={{ height: 3 }}>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: "70%" }}
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>Clasic Shoes</td>
                <td>
                  <img
                    src="https://via.placeholder.com/110x110"
                    className="product-img"
                    alt="product img"
                  />
                </td>
                <td>#9405825</td>
                <td>$ 1200.00</td>
                <td>03 Aug 2017</td>
                <td>
                  <div className="progress shadow" style={{ height: 3 }}>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: "100%" }}
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>Hand Watch</td>
                <td>
                  <img
                    src="https://via.placeholder.com/110x110"
                    className="product-img"
                    alt="product img"
                  />
                </td>
                <td>#9405840</td>
                <td>$ 1800.00</td>
                <td>03 Aug 2017</td>
                <td>
                  <div className="progress shadow" style={{ height: 3 }}>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: "40%" }}
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>Clasic Shoes</td>
                <td>
                  <img
                    src="https://via.placeholder.com/110x110"
                    className="product-img"
                    alt="product img"
                  />
                </td>
                <td>#9405825</td>
                <td>$ 1200.00</td>
                <td>03 Aug 2017</td>
                <td>
                  <div className="progress shadow" style={{ height: 3 }}>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: "100%" }}
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <div className="row">
    <div className="col-12 col-lg-12">
      <div className="card">
        <div className="card-header">
          Recent Order Tables
          <div className="card-action">
            <div className="dropdown">
              <a
                href="javascript:void();"
                className="dropdown-toggle dropdown-toggle-nocaret"
                data-toggle="dropdown"
              >
                <i className="icon-options" />
              </a>
              <div className="dropdown-menu dropdown-menu-right">
                <a className="dropdown-item" href="javascript:void();">
                  Action
                </a>
                <a className="dropdown-item" href="javascript:void();">
                  Another action
                </a>
                <a className="dropdown-item" href="javascript:void();">
                  Something else here
                </a>
                <div className="dropdown-divider" />
                <a className="dropdown-item" href="javascript:void();">
                  Separated link
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table align-items-center table-flush table-borderless">
            <thead>
              <tr>
                <th>Product</th>
                <th>Photo</th>
                <th>Product ID</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Shipping</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Iphone 5</td>
                <td>
                  <img
                    src="https://via.placeholder.com/110x110"
                    className="product-img"
                    alt="product img"
                  />
                </td>
                <td>#9405822</td>
                <td>$ 1250.00</td>
                <td>03 Aug 2017</td>
                <td>
                  <div className="progress shadow" style={{ height: 3 }}>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: "90%" }}
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>Earphone GL</td>
                <td>
                  <img
                    src="https://via.placeholder.com/110x110"
                    className="product-img"
                    alt="product img"
                  />
                </td>
                <td>#9405820</td>
                <td>$ 1500.00</td>
                <td>03 Aug 2017</td>
                <td>
                  <div className="progress shadow" style={{ height: 3 }}>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: "60%" }}
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>HD Hand Camera</td>
                <td>
                  <img
                    src="https://via.placeholder.com/110x110"
                    className="product-img"
                    alt="product img"
                  />
                </td>
                <td>#9405830</td>
                <td>$ 1400.00</td>
                <td>03 Aug 2017</td>
                <td>
                  <div className="progress shadow" style={{ height: 3 }}>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: "70%" }}
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>Clasic Shoes</td>
                <td>
                  <img
                    src="https://via.placeholder.com/110x110"
                    className="product-img"
                    alt="product img"
                  />
                </td>
                <td>#9405825</td>
                <td>$ 1200.00</td>
                <td>03 Aug 2017</td>
                <td>
                  <div className="progress shadow" style={{ height: 3 }}>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: "100%" }}
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>Hand Watch</td>
                <td>
                  <img
                    src="https://via.placeholder.com/110x110"
                    className="product-img"
                    alt="product img"
                  />
                </td>
                <td>#9405840</td>
                <td>$ 1800.00</td>
                <td>03 Aug 2017</td>
                <td>
                  <div className="progress shadow" style={{ height: 3 }}>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: "40%" }}
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>Clasic Shoes</td>
                <td>
                  <img
                    src="https://via.placeholder.com/110x110"
                    className="product-img"
                    alt="product img"
                  />
                </td>
                <td>#9405825</td>
                <td>$ 1200.00</td>
                <td>03 Aug 2017</td>
                <td>
                  <div className="progress shadow" style={{ height: 3 }}>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: "100%" }}
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div> 
  <div className="row">
    <div className="col-12 col-lg-12">
      <div className="card">
        <div className="card-header">
          Recent Order Tables
          <div className="card-action">
            <div className="dropdown">
              <a
                href="javascript:void();"
                className="dropdown-toggle dropdown-toggle-nocaret"
                data-toggle="dropdown"
              >
                <i className="icon-options" />
              </a>
              <div className="dropdown-menu dropdown-menu-right">
                <a className="dropdown-item" href="javascript:void();">
                  Action
                </a>
                <a className="dropdown-item" href="javascript:void();">
                  Another action
                </a>
                <a className="dropdown-item" href="javascript:void();">
                  Something else here
                </a>
                <div className="dropdown-divider" />
                <a className="dropdown-item" href="javascript:void();">
                  Separated link
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table align-items-center table-flush table-borderless">
            <thead>
              <tr>
                <th>Product</th>
                <th>Photo</th>
                <th>Product ID</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Shipping</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Iphone 5</td>
                <td>
                  <img
                    src="https://via.placeholder.com/110x110"
                    className="product-img"
                    alt="product img"
                  />
                </td>
                <td>#9405822</td>
                <td>$ 1250.00</td>
                <td>03 Aug 2017</td>
                <td>
                  <div className="progress shadow" style={{ height: 3 }}>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: "90%" }}
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>Earphone GL</td>
                <td>
                  <img
                    src="https://via.placeholder.com/110x110"
                    className="product-img"
                    alt="product img"
                  />
                </td>
                <td>#9405820</td>
                <td>$ 1500.00</td>
                <td>03 Aug 2017</td>
                <td>
                  <div className="progress shadow" style={{ height: 3 }}>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: "60%" }}
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>HD Hand Camera</td>
                <td>
                  <img
                    src="https://via.placeholder.com/110x110"
                    className="product-img"
                    alt="product img"
                  />
                </td>
                <td>#9405830</td>
                <td>$ 1400.00</td>
                <td>03 Aug 2017</td>
                <td>
                  <div className="progress shadow" style={{ height: 3 }}>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: "70%" }}
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>Clasic Shoes</td>
                <td>
                  <img
                    src="https://via.placeholder.com/110x110"
                    className="product-img"
                    alt="product img"
                  />
                </td>
                <td>#9405825</td>
                <td>$ 1200.00</td>
                <td>03 Aug 2017</td>
                <td>
                  <div className="progress shadow" style={{ height: 3 }}>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: "100%" }}
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>Hand Watch</td>
                <td>
                  <img
                    src="https://via.placeholder.com/110x110"
                    className="product-img"
                    alt="product img"
                  />
                </td>
                <td>#9405840</td>
                <td>$ 1800.00</td>
                <td>03 Aug 2017</td>
                <td>
                  <div className="progress shadow" style={{ height: 3 }}>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: "40%" }}
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>Clasic Shoes</td>
                <td>
                  <img
                    src="https://via.placeholder.com/110x110"
                    className="product-img"
                    alt="product img"
                  />
                </td>
                <td>#9405825</td>
                <td>$ 1200.00</td>
                <td>03 Aug 2017</td>
                <td>
                  <div className="progress shadow" style={{ height: 3 }}>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: "100%" }}
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  {/*End Row*/}
  {/*End Dashboard Content*/}
  {/*start overlay*/}
  <div className="overlay toggle-menu" />
  {/*end overlay*/}
</div>


  </>
  
  );
}
export default HomeAdmin;
