import ContactUsForm from "../components/ContactUsForm";
import { Link } from "react-router-dom";
import "../ContactUsPage.css";

function ContactUsPage() {
  return (
    <div className="page-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className="content-wrapper">
        <div className="login-page">
          <div className="login-container">
            <div className="login-header">
              <h2>Get in Touch</h2>
              <p>We'd love to hear from you</p>
            </div>
            <ContactUsForm />
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

