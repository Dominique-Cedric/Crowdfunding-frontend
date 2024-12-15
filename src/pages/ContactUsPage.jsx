import React, { useState } from 'react';
import "./ContactUsPage.css";
import { Link } from 'react-router-dom';

function ContactUsPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: 'info', message: 'Sending message...' });

        try {
            // Replace with your actual API endpoint
            const response = await fetch('YOUR_CONTACT_API_ENDPOINT', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus({ type: 'success', message: 'Message sent successfully!' });
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                setStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
            }
        } catch (err) {
            setStatus({ type: 'error', message: 'An error occurred. Please try again later.' });
        }
    };

    return (
        <div className="page-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <div className="content-wrapper flex-1">
                <div className="contact-container">
                    <div className="contact-card">
                        <div className="contact-header">
                            <h1>Contact Us</h1>
                            <p>Get in touch with our team</p>
                        </div>

                        {status.message && (
                            <div className={`status-message ${status.type}`}>
                                {status.message}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="contact-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="form-input"
                                        placeholder="Your name"
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
                                        placeholder="Your email"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="subject">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="form-input"
                                    placeholder="Message subject"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    className="form-input"
                                    rows="6"
                                    placeholder="Your message"
                                />
                            </div>

                            <button type="submit" className="contact-button">
                                Send Message
                            </button>
                        </form>

                        <div className="contact-info">
                            <div className="info-item">
                                <h3>Email</h3>
                                <p>support@risingathletes.com</p>
                            </div>
                            <div className="info-item">
                                <h3>Phone</h3>
                                <p>+1 (555) 123-4567</p>
                            </div>
                            <div className="info-item">
                                <h3>Address</h3>
                                <p>123 Sports Avenue<br />Melbourne, VIC 3000</p>
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

export default ContactUsPage;

