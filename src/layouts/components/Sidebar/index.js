import { Link } from 'react-router-dom';

function SidebarAdmin() {
    return (
        <>
            <div id="sidebar-wrapper" data-simplebar="" data-simplebar-auto-hide="true">
  <div className="brand-logo">
    <a href="index.html">
      <img
        src="assets/images/logo-icon.png"
        className="logo-icon"
        alt="logo icon"
      />
      <h5 className="logo-text">Dashtreme Admin</h5>
    </a>
  </div>
  <ul className="sidebar-menu do-nicescrol">
    <li className="sidebar-header">MAIN NAVIGATION</li>
    <li>
      <a href="index.html">
        <i className="zmdi zmdi-view-dashboard" /> <span>Dashboard</span>
      </a>
    </li>
    <li>
      <a href="tables.html">
        <i className="zmdi zmdi-grid" /> <span>Tables</span>
      </a>
    </li>
    <li>
      <a href="calendar.html">
        <i className="zmdi zmdi-calendar-check" /> <span>Calendar</span>
        <small className="badge float-right badge-light">New</small>
      </a>
    </li>
    <li>
      <a href="profile.html">
        <i className="zmdi zmdi-face" /> <span>Profile</span>
      </a>
    </li>
    <li>
      <a href="login.html" target="_blank">
        <i className="zmdi zmdi-lock" /> <span>Login</span>
      </a>
    </li>
    <li>
      <a href="register.html" target="_blank">
        <i className="zmdi zmdi-account-circle" /> <span>Registration</span>
      </a>
    </li>
  </ul>
</div>

        </>
    );
}

export default SidebarAdmin;
