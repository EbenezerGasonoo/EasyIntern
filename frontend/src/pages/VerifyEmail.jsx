import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import api from '../utils/api';
import './VerifyEmailNotice.css';

function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState('verifying');
  const [error, setError] = useState('');

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await api.get(`/auth/verify-email?token=${token}`);
        setStatus('success');
      } catch (err) {
        setError(err.response?.data?.error || 'Verification failed');
        setStatus('error');
      }
    };

    if (token) {
      verifyToken();
    } else {
      setStatus('error');
      setError('Invalid token');
    }
  }, [token]);

  return (
    <div className="verify-shell">
      <div className="verify-card">
        {status === 'verifying' && (
          <>
            <div className="verify-icon-wrap" aria-hidden="true">
              <span className="verify-icon verify-icon-pulse">...</span>
            </div>
            <h1>Verifying Your Email</h1>
            <p className="verify-lead">Please wait while we confirm your verification link.</p>
          </>
        )}
        {status === 'success' && (
          <>
            <div className="verify-icon-wrap verify-success" aria-hidden="true">
              <span className="verify-icon">✓</span>
            </div>
            <h1>Email Verified</h1>
            <p className="verify-lead">Your account is now active. Continue to login and start using EasyIntern.</p>
            <div className="verify-actions">
              <Link to="/login" className="btn btn-primary">Continue to Login</Link>
            </div>
          </>
        )}
        {status === 'error' && (
          <>
            <div className="verify-icon-wrap verify-error" aria-hidden="true">
              <span className="verify-icon">!</span>
            </div>
            <h1>Verification Failed</h1>
            <p className="verify-lead">{error}</p>
            <div className="verify-actions">
              <Link to="/register" className="btn btn-primary">Register Again</Link>
              <Link to="/verify-email-notice" className="verify-secondary-link">Back to verification help</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default VerifyEmail;
