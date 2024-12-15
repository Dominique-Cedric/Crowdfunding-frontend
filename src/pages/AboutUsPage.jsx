import React from 'react';
import { Link } from 'react-router-dom';
import "./AboutUsPage.css";

function AboutUsPage() {
    return (
        <div className="page-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <div className="content-wrapper flex-1">
                <div className="about-container">
                    <div className="about-card">
                        <div className="about-header">
                            <h1>About Rising Athletes</h1>
                            <p>Supporting the next generation of sports stars</p>
                        </div>

                        <div className="about-content">
                            <section className="mission-section">
                                <h2>Our Mission</h2>
                                <p>
                                    Rising Athletes is dedicated to empowering young athletes by connecting them with 
                                    supporters who believe in their potential. We provide a platform where athletic 
                                    dreams can become reality through community support and engagement.
                                </p>
                            </section>

                            <section className="values-section">
                                <h2>Our Values</h2>
                                <div className="values-grid">
                                    <div className="value-item">
                                        <h3>Integrity</h3>
                                        <p>We maintain the highest standards of transparency and honesty in all our operations.</p>
                                    </div>
                                    <div className="value-item">
                                        <h3>Community</h3>
                                        <p>We believe in the power of community support to help athletes achieve their goals.</p>
                                    </div>
                                    <div className="value-item">
                                        <h3>Excellence</h3>
                                        <p>We strive for excellence in everything we do, just like the athletes we support.</p>
                                    </div>
                                </div>
                            </section>

                            <section className="team-section">
                                <h2>Our Team</h2>
                                <p>
                                    Our dedicated team brings together expertise in sports, technology, and community 
                                    building to create the best platform for supporting rising athletes.
                                </p>
                            </section>

                            <div className="cta-section">
                                <h2>Join Our Community</h2>
                                <p>Be part of something special. Support rising athletes today.</p>
                                <div className="cta-buttons">
                                    <Link to="/signup" className="cta-button primary">Create Account</Link>
                                    <Link to="/contact" className="cta-button secondary">Contact Us</Link>
                                </div>
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

export default AboutUsPage; 