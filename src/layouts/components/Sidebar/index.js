import { Link } from 'react-router-dom';

function SidebarAdmin() {
    return (
        <>
           <nav className="sidebar sidebar-offcanvas" id="sidebar">
  <ul className="nav">
    <li className="nav-item">
      <a
        className="nav-link"
        data-toggle="collapse"
        href="#charts"
        aria-expanded="false"
        aria-controls="charts"
      >
        <i className="icon-bar-graph menu-icon" />
        <span className="menu-title">Dashboard</span>
        <i className="menu-arrow" />
      </a>
      <div className="collapse" id="charts">
        <ul className="nav flex-column sub-menu">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
            <Link className="nav-link" to="/chart">
              ChartJs
            </Link>
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
        <span className="menu-title">Manager</span>
        <i className="menu-arrow" />
      </a>
      <div className="collapse" id="tables">
        <ul className="nav flex-column sub-menu">
          <li className="nav-item">
          <Link className="nav-link" to="/category">
                Category
            </Link>
            <Link className="nav-link" to="/product">
                Products
            </Link>
            <Link className="nav-link" to="/inventory">
                Inventory
            </Link>
            <Link className="nav-link" to="/blog">
                Blogs
            </Link>
            <Link className="nav-link" to="/order">
                Orders
            </Link>
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
        <i className="icon-head menu-icon"></i>

        <span className="menu-title">User</span>
        <i className="menu-arrow" />
      </a>
      <div className="collapse" id="auth">
        <ul className="nav flex-column sub-menu">
          <li className="nav-item">
            <Link className="nav-link" to="/users">
                Users
            </Link>
            <Link className="nav-link" to="/room/create">
                Rooms
            </Link>
          </li>
        </ul>
      </div>
    </li>

    <li className="nav-item">
      <a
        className="nav-link"
        data-toggle="collapse"
        href="#design"
        aria-expanded="false"
        aria-controls="design"
      >
        <i class="menu-icon fa-solid fa-people-roof"></i>
        <span className="menu-title">Designer</span>
        <i className="menu-arrow" />
      </a>
      <div className="collapse" id="design">
        <ul className="nav flex-column sub-menu">
          <li className="nav-item">
            <Link className="nav-link" to="/designer">
                Designer
            </Link>
            <Link className="nav-link" to="/category-gallery">
                Category Gallery
            </Link>
            <Link className="nav-link" to="/img-designer">
                ImgDesign
            </Link>
          </li>
        </ul>
      </div>
    </li>

    <li className="nav-item">
      <a
        className="nav-link"
        data-toggle="collapse"
        href="#trash"
        aria-expanded="false"
        aria-controls="trash"
      >
        <i class="fas fa-trash menu-icon"></i>

        <span className="menu-title">Trash</span>
        <i className="menu-arrow" />
        
      </a>
      <div className="collapse" id="trash">
        <ul className="nav flex-column sub-menu">
          <li className="nav-item">
            <Link className="nav-link" to="/trash/categories">
                Trash Category
            </Link>
            <Link className="nav-link" to="/trash/products">
                Trash Products
            </Link>
            <Link className="nav-link" to="/trash/category-gallery">
                Trash Category Gallery
            </Link>
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
