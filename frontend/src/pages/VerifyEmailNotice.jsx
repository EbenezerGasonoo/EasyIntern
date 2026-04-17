import { Link } from 'react-router-dom';
import './VerifyEmailNotice.css';

function VerifyEmailNotice() {
  return (
    <div className="verify-shell">
      <div className="verify-card">
        <div className="verify-icon-wrap" aria-hidden="true">
          <span className="verify-icon">✉</span>
        </div>
        <h1>Check Your Email</h1>
        <p className="verify-lead">
          We sent a verification link to your inbox. Open the email and click the link to activate your account.
        </p>
        <div className="verify-tips">
          <p>Did not see it yet? Check spam or promotions.</p>
          <p>The link opens this app and completes verification instantly.</p>
        </div>
        <div className="verify-actions">
          <Link to="/login" className="btn btn-primary">
            Go to Login
          </Link>
          <Link to="/register" className="verify-secondary-link">
            Use a different email
          </Link>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmailNotice;
