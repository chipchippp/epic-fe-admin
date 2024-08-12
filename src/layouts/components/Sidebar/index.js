import { Link } from 'react-router-dom';

function SidebarAdmin() {
    return (
        <>
           <nav className="sidebar sidebar-offcanvas" id="sidebar">
  <ul className="nav">
    <li className="nav-item">
      <a className="nav-link" href="index.html">
        <i className="icon-grid menu-icon" />
        <span className="menu-title">Dashboard</span>
      </a>
    </li>
   
    <li className="nav-item">
      <a
        className="nav-link"
        data-toggle="collapse"
        href="#form-elements"
        aria-expanded="false"
        aria-controls="form-elements"
      >
        <i className="icon-columns menu-icon" />
        <span className="menu-title">Form elements</span>
        <i className="menu-arrow" />
      </a>
      <div className="collapse" id="form-elements">
        <ul className="nav flex-column sub-menu">
          <li className="nav-item">
            <a className="nav-link" href="pages/forms/basic_elements.html">
              Basic Elements
            </a>
          </li>
        </ul>
      </div>
    </li>
    <li className="nav-item">
      <a
        className="nav-link"
        data-toggle="collapse"
        href="#charts"
        aria-expanded="false"
        aria-controls="charts"
      >
        <i className="icon-bar-graph menu-icon" />
        <span className="menu-title">Charts</span>
        <i className="menu-arrow" />
      </a>
      <div className="collapse" id="charts">
        <ul className="nav flex-column sub-menu">
          <li className="nav-item">
            <a className="nav-link" href="pages/charts/chartjs.html">
              ChartJs
            </a>
          </li>
        </ul>
      </div>
    </li>
    <li className="nav-item">
      <a
        className="nav-link"
        data-toggle="collapse"
        href="#tables"
        aria-expanded="false"
        aria-controls="tables"
      >
        <i className="icon-grid-2 menu-icon" />
        <span className="menu-title">Tables</span>
        <i className="menu-arrow" />
      </a>
      <div className="collapse" id="tables">
        <ul className="nav flex-column sub-menu">
          <li className="nav-item">
            {" "}
            <a className="nav-link" href="pages/tables/basic-table.html">
              Basic table
            </a>
          </li>
        </ul>
      </div>
    </li>
    
    <li className="nav-item">
      <a
        className="nav-link"
        data-toggle="collapse"
        href="#auth"
        aria-expanded="false"
        aria-controls="auth"
      >
        <i className="icon-head menu-icon" />
        <span className="menu-title">User Pages</span>
        <i className="menu-arrow" />
      </a>
      <div className="collapse" id="auth">
        <ul className="nav flex-column sub-menu">
          <li className="nav-item">
            {" "}
            <a className="nav-link" href="pages/samples/login.html">
              {" "}
              Login{" "}
            </a>
          </li>
          <li className="nav-item">
            {" "}
            <a className="nav-link" href="pages/samples/register.html">
              {" "}
              Register{" "}
            </a>
          </li>
        </ul>
      </div>
    </li>
    <li className="nav-item">
      <a
        className="nav-link"
        data-toggle="collapse"
        href="#error"
        aria-expanded="false"
        aria-controls="error"
      >
        <i className="icon-ban menu-icon" />
        <span className="menu-title">Error pages</span>
        <i className="menu-arrow" />
      </a>
      <div className="collapse" id="error">
        <ul className="nav flex-column sub-menu">
          <li className="nav-item">
            {" "}
            <a className="nav-link" href="pages/samples/error-404.html">
              {" "}
              404{" "}
            </a>
          </li>
          <li className="nav-item">
            {" "}
            <a className="nav-link" href="pages/samples/error-500.html">
              {" "}
              500{" "}
            </a>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</nav>

        </>
    );
}

export default SidebarAdmin;
