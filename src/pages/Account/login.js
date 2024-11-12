import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { httpRequest } from '~/utils/httpRequest';
import jwtDecode from 'jwt-decode';
import { isAuthenticated } from '~/utils/httpRequest';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated()) {
            navigate('/');
        }
    }, [navigate]);

    const handleLogin = async (event) => {
        event.preventDefault();

        if (validate()) {
            try {
                const response = await httpRequest.post('/auth/login', {
                    username,
                    password,
                    platform: 'WEB',
                });

                if (response && response.data && response.data.accessToken) {
                    const { accessToken, refreshToken, roles, id } = response.data;

                    if (!roles.includes('ROLE_ADMIN')) {
                        toast.warn('You are not authorized to access this section.');
                        return;
                    }

                    // Lưu cả accessToken và refreshToken vào localStorage
                    localStorage.setItem('accessToken', accessToken);
                    localStorage.setItem('refreshToken', refreshToken);
                    localStorage.setItem('roles', JSON.stringify(roles));
                    localStorage.setItem('id', id);
                    localStorage.setItem('username', username);

                    navigate('/');
                    window.location.reload();
                } else {
                    toast.warning('Invalid server response');
                }
            } catch (error) {
                toast.error('Login failed. Please try again.');
            }
        }
    };

    const validate = () => {
        if (!username.trim()) {
            toast.warning('Please enter a username.');
            return false;
        }
        if (!password.trim()) {
            toast.warning('Please enter a password.');
            return false;
        }
        return true;
    };

    return (
        <>
            <div className="container-scroller">
                <div className="container-fluid page-body-wrapper full-page-wrapper">
                    <div className="content-wrapper d-flex align-items-center auth px-0">
                        <div className="row w-100 mx-0">
                            <div className="col-lg-4 mx-auto">
                                <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                                    <div className="brand-logo">
                                        <img src="src/assets/images/logo.svg" alt="logo" />
                                    </div>
                                    <h4>Hello! let's get started</h4>
                                    <h6 className="font-weight-light">Sign in to continue.</h6>
                                    <form className="pt-3" onSubmit={handleLogin}>
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                placeholder="Username"
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="Password"
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="mt-3">
                                            <button
                                                type="submit"
                                                className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                                            >
                                                SIGN IN
                                            </button>
                                        </div>
                                        <div className="my-2 d-flex justify-content-between align-items-center">
                                            <div className="form-check">
                                                <label className="form-check-label text-muted">
                                                    <input type="checkbox" className="form-check-input" />
                                                    Keep me signed in
                                                </label>
                                            </div>
                                            <Link to="#" className="auth-link text-black">
                                                Forgot password?
                                            </Link>
                                        </div>
                                        <div className="mb-2">
                                            <button type="button" className="btn btn-block btn-facebook auth-form-btn">
                                                <i className="ti-facebook mr-2" />
                                                Connect using facebook
                                            </button>
                                        </div>
                                        <div className="text-center mt-4 font-weight-light">
                                            Don't have an account?
                                            <Link to="/register" className="text-primary">
                                                Create
                                            </Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export default Login;
