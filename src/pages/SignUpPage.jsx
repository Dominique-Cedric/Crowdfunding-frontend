import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import "./SignUpPage.css";

function SignUpPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password_confirmation: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.password_confirmation) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await fetch(
                'https://risingathletes-495c4007dfac.herokuapp.com/users/',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                }
            );

            const data = await response.json();
            if (response.ok) {
                navigate('/login');
            } else {
                setError(data.detail || 'Registration failed');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="page-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <div className="content-wrapper flex-1">
                <div className="signup-container">
                    <div className="signup-card">
                        <div className="signup-header">
                            <h1>Create Account</h1>
                            <p>Join Rising Athletes today</p>
                        </div>

                        {error && (
                            <div className="error-message">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="signup-form">
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                    className="form-input"
                                    placeholder="Choose a username"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="form-input"
                                    placeholder="Enter your email"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="form-input"
                                    placeholder="Create a password"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password_confirmation">Confirm Password</label>
                                <input
                                    type="password"
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    value={formData.password_confirmation}
                                    onChange={handleChange}
                                    required
                                    className="form-input"
                                    placeholder="Confirm your password"
                                />
                            </div>

                            <button type="submit" className="signup-button">
                                Create Account
                            </button>
                        </form>

                        <div className="signup-footer">
                            <p>Already have an account? <Link to="/login" className="login-link">Log in</Link></p>
                        </div>

                        <div className="signup-info">
                            <div className="info-item">
                                <h3>Need Help?</h3>
                                <p>Contact our support team</p>
                                <Link to="/contact" className="help-link">Get Support</Link>
                            </div>
                            <div className="info-item">
                                <h3>About Us</h3>
                                <p>Learn more about Rising Athletes</p>
                                <Link to="/about" className="help-link">Learn More</Link>
                            </div>
                            <div className="info-item">
                                <h3>Contact Us</h3>
                                <p>Get in touch with our team</p>
                                <Link to="/contact" className="help-link">Contact Us</Link>
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

export default SignUpPage;