import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { httpRequest } from '~/utils/httpRequest';
import {jwtDecode} from 'jwt-decode';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        sessionStorage.clear();
    }, []);

    const handleLogin = async (event) => {
        event.preventDefault();

        if (validate()) {
            try {
                const response = await httpRequest.post(
                    'http://localhost:8081/api/v1/auth/login',
                    {
                        username: username,
                        password: password,
                    },
                );

                if (response && response.data && response.data.accessToken) {
                    const accessToken = response.data.accessToken;
                    let decodedToken;

                    try {
                        decodedToken = jwtDecode(accessToken);
                        console.log('Decoded Token:', decodedToken);

                        const id = response.data.id;
                        const roles = response.data.roles;

                        if (!roles.includes('ROLE_ADMIN')) {
                            toast.warn('username and password wrong');
                            return;
                        }

                        localStorage.setItem('roles', roles);
                        localStorage.setItem('accessToken', accessToken);
                        localStorage.setItem('id', id);
                        localStorage.setItem('username', username);

                        navigate('/');
                        window.location.reload();
                    } catch (error) {
                        toast.error('Failed to decode token.');
                        return;
                    }
                } else {
                    toast.error('Invalid response from server');
                }
            } catch (error) {
                toast.error('Failed to login. Please try again.');
            }
        }
    };

    const validate = () => {
        if (!username.trim()) {
            toast.warning('Please enter username.');
            return false;
        }
        if (!password.trim()) {
            toast.warning('Please enter password.');
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
                  <form className="pt-3">
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control form-control-lg"
                        id="exampleInputEmail1"
                        placeholder="Username"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control form-control-lg"
                        id="exampleInputPassword1"
                        placeholder="Password"
                      />
                    </div>
                    <div className="mt-3">
                      <Link
                        className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                        to="/submit"
                      >
                        SIGN IN
                      </Link>
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
                      <button
                        type="button"
                        className="btn btn-block btn-facebook auth-form-btn"
                      >
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
          {/* content-wrapper ends */}
        </div>
        {/* page-body-wrapper ends */}
      </div>
</>

    );
}

export default Login;