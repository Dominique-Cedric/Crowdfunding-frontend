import SignUpForm from "../components/SignUpForm";
import { Link } from "react-router-dom";
import "../SignUpPage.css";

function SignUpPage() {
  return (
    <div className="page-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className="content-wrapper">
               <div className="login-page">
          <div className="login-container">
            <div className="login-header">
              <h2>Join Rising Athletes</h2>
              <p>Create account to continue</p>
            </div>
            <SignUpForm />
            <div className="signup-section">
              <p>Already have an account?</p>
              <Link to="/login" className="signup-button">Log in</Link>
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