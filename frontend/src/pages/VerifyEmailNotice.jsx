import { Link } from 'react-router-dom';
import './Auth.css';

function VerifyEmailNotice() {
  return (
    <div className="auth-page">
      <div className="auth-container" style={{ textAlign: 'center' }}>
        <h2>Check Your Email</h2>
        <p>
          We've sent a verification link to your email address. 
          Please click the link to verify your account.
        </p>
        <p>
          Once verified, you can <Link to="/login">login here</Link>.
        </p>
      </div>
    </div>
  );
}

export default VerifyEmailNotice;
