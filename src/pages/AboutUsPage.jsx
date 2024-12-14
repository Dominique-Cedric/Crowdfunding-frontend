import { Link } from "react-router-dom";
import "../AboutUsPage.css";

function AboutUsPage() {
    return (
        <div className="page-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <div className="content-wrapper">
                <div className="about-container">
                    <div className="about-header">
                        <h1>About Rising Athletes</h1>
                        <p>Empowering the next generation of sports stars</p>
                    </div>
                    
                    <div className="about-section">
                        <h2>Our Mission</h2>
                        <p>At Rising Athletes, we're dedicated to connecting young athletes with opportunities to excel in their chosen sports. We believe every athlete deserves the chance to reach their full potential.</p>
                    </div>

                    <div className="about-section">
                        <h2>What We Do</h2>
                        <p>The platform aims to support children in sports by raising funds and incentives for families facing unexpected expenses such as:</p>
                        <ul>
                            <li>Travel and accommodation costs</li>
                            <li>Sporting gear and equipment</li>
                            <li>Registration fees and levies</li>
                            <li>Training and development programs</li>
                            <li>Competition entry fees</li>
                        </ul>
                    </div>

                    <div className="about-section">
                        <h2>Our Values</h2>
                        <div className="values-grid">
                            <div className="value-item">
                                <h3>Excellence</h3>
                                <p>Striving for the highest standards in everything we do</p>
                            </div>
                            <div className="value-item">
                                <h3>Integrity</h3>
                                <p>Operating with honesty and transparency</p>
                            </div>
                            <div className="value-item">
                                <h3>Community</h3>
                                <p>Building strong connections in the sports world</p>
                            </div>
                            <div className="value-item">
                                <h3>Innovation</h3>
                                <p>Continuously improving our platform and services</p>
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