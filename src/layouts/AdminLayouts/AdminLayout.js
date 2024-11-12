import HeaderAdmin from '../components/Header';
import SidebarAdmin from '../components/Sidebar';
import FooterAdmin from '../components/Footer';
import PartialAdmin from '../components/Partial';
import { ToastContainer } from 'react-toastify';

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
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
}

export default AdminLayout;
