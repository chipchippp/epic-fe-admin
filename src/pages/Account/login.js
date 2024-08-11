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
        {/* start loader */}
        <div id="pageloader-overlay" className="visible incoming">
          <div className="loader-wrapper-outer">
            <div className="loader-wrapper-inner">
              <div className="loader" />
            </div>
          </div>
        </div>
        {/* end loader */}
        {/* Start wrapper*/}
        <div id="wrapper">
          <div className="loader-wrapper">
            <div className="lds-ring">
              <div />
              <div />
              <div />
              <div />
            </div>
          </div>
          <div className="card card-authentication1 mx-auto my-5">
            <div className="card-body">
              <div className="card-content p-2">
                <div className="text-center">
                  <img src="assets/images/logo-icon.png" alt="logo icon" />
                </div>
                <div className="card-title text-uppercase text-center py-3">
                  Sign In
                </div>
                <form>
                  <div className="form-group">
                    <label htmlFor="exampleInputUsername" className="sr-only">
                      Username
                    </label>
                    <div className="position-relative has-icon-right">
                      <input
                        type="text"
                        id="exampleInputUsername"
                        className="form-control input-shadow"
                        placeholder="Enter Username"
                      />
                      <div className="form-control-position">
                        <i className="icon-user" />
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword" className="sr-only">
                      Password
                    </label>
                    <div className="position-relative has-icon-right">
                      <input
                        type="password"
                        id="exampleInputPassword"
                        className="form-control input-shadow"
                        placeholder="Enter Password"
                      />
                      <div className="form-control-position">
                        <i className="icon-lock" />
                      </div>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-6">
                      <div className="icheck-material-white">
                        <input type="checkbox" id="user-checkbox" defaultChecked="" />
                        <label htmlFor="user-checkbox">Remember me</label>
                      </div>
                    </div>
                    <div className="form-group col-6 text-right">
                      <a href="reset-password.html">Reset Password</a>
                    </div>
                  </div>
                  <button type="button" className="btn btn-light btn-block">
                    Sign In
                  </button>
                  <div className="text-center mt-3">Sign In With</div>
                  <div className="form-row mt-4">
                    <div className="form-group mb-0 col-6">
                      <button type="button" className="btn btn-light btn-block">
                        <i className="fa fa-facebook-square" /> Facebook
                      </button>
                    </div>
                    <div className="form-group mb-0 col-6 text-right">
                      <button type="button" className="btn btn-light btn-block">
                        <i className="fa fa-twitter-square" /> Twitter
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="card-footer text-center py-3">
              <p className="text-warning mb-0">
                Do not have an account? <a href="register.html"> Sign Up here</a>
              </p>
            </div>
          </div>
          {/*Start Back To Top Button*/}
          <a href="javaScript:void();" className="back-to-top">
            <i className="fa fa-angle-double-up" />{" "}
          </a>
          {/*End Back To Top Button*/}
          {/*start color switcher*/}
          <div className="right-sidebar">
            <div className="switcher-icon">
              <i className="zmdi zmdi-settings zmdi-hc-spin" />
            </div>
            <div className="right-sidebar-content">
              <p className="mb-0">Gaussion Texture</p>
              <hr />
              <ul className="switcher">
                <li id="theme1" />
                <li id="theme2" />
                <li id="theme3" />
                <li id="theme4" />
                <li id="theme5" />
                <li id="theme6" />
              </ul>
              <p className="mb-0">Gradient Background</p>
              <hr />
              <ul className="switcher">
                <li id="theme7" />
                <li id="theme8" />
                <li id="theme9" />
                <li id="theme10" />
                <li id="theme11" />
                <li id="theme12" />
                <li id="theme13" />
                <li id="theme14" />
                <li id="theme15" />
              </ul>
            </div>
          </div>
          {/*end color switcher*/}
        </div>
        {/*wrapper*/}
      </>
    );
}

export default Login;