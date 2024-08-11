import HeaderAdmin from '../components/Header';
import SidebarAdmin from '../components/Sidebar';
import FooterAdmin from '../components/Footer';

function AdminLayout({ children }) {
    return (
    <body class="bg-theme bg-theme1">
        <div className="wrapper">
            <HeaderAdmin />
            <SidebarAdmin />
            <div className="content-wrapper">{children}</div>
            <FooterAdmin />
        </div>
    </body>
    );
}

export default AdminLayout;
