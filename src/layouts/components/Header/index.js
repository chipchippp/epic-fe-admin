import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
function HeaderAdmin() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        // if (storedUsername) {
        //     setUsername(storedUsername);
        // } else {
        //     navigate('/login');
        // }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('roles');
        localStorage.removeItem('id');
        localStorage.removeItem('username');

        toast.success('Successfully logged out.');
        navigate('/login');
    };

    return (
        <>
            <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
                <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
                    <Link className="navbar-brand brand-logo mr-5" to="/">
                        <img src="/src/assets/images/Epic-logo.png" className="mr-2" alt="logo" />
                    </Link>
                    <a className="navbar-brand brand-logo-mini" href="index.html">
                        <img src="/src/assets/images/logo-mini.svg" alt="logo" />
                    </a>
                </div>
                <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
                    <button
                        className="navbar-toggler navbar-toggler align-self-center"
                        type="button"
                        data-toggle="minimize"
                    >
                        <span className="icon-menu" />
                    </button>
                    <ul className="navbar-nav navbar-nav-right">
                        <li className="nav-item nav-profile dropdown">
                            <div className="d-sm-none d-lg-inline-block">Hi, {username}</div>
                            <a
                                className="nav-link dropdown-toggle"
                                href="#"
                                data-toggle="dropdown"
                                id="profileDropdown"
                            >
                                <img src="/src/assets/images/faces/face28.jpg" className="ml-2" alt="profile" />
                            </a>
                            <div
                                className="dropdown-menu dropdown-menu-right navbar-dropdown"
                                aria-labelledby="profileDropdown"
                            >
                                <Link className="dropdown-item" to="/profile">
                                    <i className="ti-settings text-primary" />
                                    Profile
                                </Link>
                                <a className="dropdown-item" onClick={handleLogout}>
                                    <i className="ti-power-off text-primary" />
                                    Logout
                                </a>
                            </div>
                        </li>
                    </ul>
                    <button
                        className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
                        type="button"
                        data-toggle="offcanvas"
                    >
                        <span className="icon-menu" />
                    </button>
                </div>
                {/* <ToastContainer /> */}
            </nav>
        </>
    );
}

export default HeaderAdmin;
