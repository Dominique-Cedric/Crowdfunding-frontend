import LoginForm from "../components/LoginForm";
import { Link } from "react-router-dom";
import "../LoginPage.css";

function LoginPage() {
  return (
    <div className="page-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className="content-wrapper">
        <div className="login-container">
          <div className="login-header">
            <h2>Welcome Back</h2>
            <p>Please log in to continue</p>
          </div>
          <LoginForm />
          <div className="signup-section">
            <p>Don't have an account?</p>
            <Link to="/signup" className="signup-button">Sign Up</Link>
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

