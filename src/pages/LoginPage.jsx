import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../components/AuthProvider";
import "./LoginPage.css";

function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({
            ...credentials,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch(
                'https://risingathletes-495c4007dfac.herokuapp.com/api-token-auth/',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(credentials),
                }
            );

            const data = await response.json();
            console.log('Login response:', data);

            if (response.ok && data.token) {
                login({ token: data.token });
                navigate('/');
            } else {
                setError(data.detail || 'Invalid username or password');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="page-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <div className="content-wrapper flex-1">
                <div className="login-container">
                    <div className="login-card">
                        <div className="login-header">
                            <h1>Welcome Back</h1>
                            <p>Sign in to your account</p>
                        </div>

                        {error && (
                            <div className="error-message">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="login-form">
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={credentials.username}
                                    onChange={handleChange}
                                    required
                                    className="form-input"
                                    placeholder="Enter your username"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={credentials.password}
                                    onChange={handleChange}
                                    required
                                    className="form-input"
                                    placeholder="Enter your password"
                                />
                            </div>

                            <button type="submit" className="login-button">
                                Sign In
                            </button>
                        </form>

                        <div className="login-footer">
                            <p>Don't have an account? <Link to="/signup" className="signup-link">Sign up</Link></p>
                        </div>

                        <div className="login-info">
                            <div className="info-item">
                                <h3>Need Help?</h3>
                                <p>Contact our support team</p>
                                <Link to="/contact" className="help-link">Get Support</Link>
                            </div>
                            <div className="info-item">
                                <h3>New Here?</h3>
                                <p>Create an account to get started</p>
                                <Link to="/signup" className="help-link">Create Account</Link>
                            </div>
                            <div className="info-item">
                                <h3>About Us</h3>
                                <p>Learn more about Rising Athletes</p>
                                <Link to="/about" className="help-link">Learn More</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="login-footer" style={{ marginTop: 'auto' }}>
                <p className="copyright">© 2024 Rising Athletes, Inc. All Rights Reserved</p>
                <div className="footer-links">
                    <Link to="/terms">Terms and Conditions</Link>
                    <Link to="/privacy">Privacy Policy</Link>
                    <Link to="/contact">Contact us</Link>
                </div>
            </footer>
        </div>
    );
}

export default LoginPage;

