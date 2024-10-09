import HeaderAdmin from '../components/Header';
import SidebarAdmin from '../components/Sidebar';
import FooterAdmin from '../components/Footer';
import PartialAdmin from '../components/Partial';

function AdminLayout({ children }) {
    return (
        <div className="container-scroller">
            <HeaderAdmin />
            <div className="container-fluid page-body-wrapper">
                <PartialAdmin />
                <SidebarAdmin />
                <div className="main-panel">
                    {children}
                    <FooterAdmin />
                </div>
            </div>
        </div>
    );
}

export default AdminLayout;
